import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3Client.js";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import PatientReport from "../models/PatientReport.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Patient from "../models/Patient.js";
import Report from "../models/PatientReport.js";
import { PDFExtract } from "pdf.js-extract";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatPatientDocImageDescriptionPrompt, generateImageDescriptionResponse } from "./textgencontroller.js";

const pdfExtract = new PDFExtract();
const options = {};

const isSupportedImageType = (mimetype) => {
    return mimetype === "image/png" || mimetype === "image/jpeg";
};

export const uploadReport = async (req, res) => {
    try {
        const { title, notes, patientId, scan } = req.body;
        const file = req.file;
        let scanRequested = scan === "true";
        let scanResult = null;

        if (!file) return res.status(400).json({ message: "No file uploaded" });

        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }

        const fileExtension = mime.extension(file.mimetype);
        const key = `reports/${uuidv4()}.${fileExtension}`;
        const fileType = file.mimetype || "application/pdf";

        if (fileType !== "application/pdf" && fileType !== "image/png" && fileType !== "image/jpeg" && fileType !== "text/plain") {
            return res.status(400).json({ message: "Unsupported file type" });
        }

        if (scanRequested && isSupportedImageType(fileType)) {
            // use gemini to transcribe the Image
            const prompt = formatPatientDocImageDescriptionPrompt();
            const generatedResponse = await generateImageDescriptionResponse(prompt, file.buffer, fileType);
            if (generatedResponse.error) {
                // do not throw error, just log it
                console.error("Failed to generate image description:", generatedResponse.content);
            } else {
                scanResult = generatedResponse.content;
            }
        }

        // Upload to S3
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(params));

        const signedUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
            }),
            { expiresIn: 3600 } // seconds
        );

        const newReport = await PatientReport.create({
            patientId,
            title,
            s3Key: key,
            fileType,
            notes,
            scanResult,
        });

        newReport.fileUrl = signedUrl;
        res.status(201).json({ message: "Report uploaded", report: newReport });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to upload report" });
    }
};

export const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await Report.findById(reportId);
        if (!report) return res.status(404).json({ message: "Report not found" });

        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: report.s3Key,
            })
        );

        await report.deleteOne();
        res.status(200).json({ message: "Report deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete report" });
    }
};

async function getPDFTextFromS3(key) {
    const cmd = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key });
    const response = await s3.send(cmd);
    const buffer = await response.Body.transformToByteArray();
    const data = await pdfExtract.extractBuffer(Buffer.from(buffer), options);

    const allText = data.pages
        .map((page) =>
            page.content
                .sort((a, b) => a.y - b.y || a.x - b.x) // sort lines top-down, then left-right
                .map((item) => item.str)
                .join(" ")
        )
        .join("\n");

    return { text: allText };
}

async function formatPrompt(patient, reports, message) {
    let fullReportText = "";
    for (const report of reports) {
        let { text } = await getPDFTextFromS3(report.s3Key);
        text = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
        if (text.length > 1000) {
            text = text.substring(0, 1000) + "...";
        }
        fullReportText += `\n\n=== Report: ${report.title} ===\n${text}`;
    }

    if (!fullReportText) {
        fullReportText = "[No reports]";
    }

    const prompt = `
Patient Profile:
Name: ${patient.name}
DOB: ${patient.dob}
Gender: ${patient.gender}
Weight: ${patient.weight}kg
Blood Type: ${patient.bloodSign}

Reports: 
${fullReportText}

Now answer the following user question:
"${message}"
`;
    return prompt;
}

async function generateResponse(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    const result = await model.generateContent(prompt);
    if (!result) {
        return { error: true, content: "Failed to generate response" };
    }
    return { error: false, content: result.response.text() };
}

export const chatWithReports = async (req, res) => {
    const { patientId, message } = req.body;

    // IMPORTANT: TODO
    // if (req.user.type !== "Doctor" && req.user.type !== "Hospital") {
    //     return res.status(403).json({ message: "Forbidden" });
    // }

    try {
        const patient = await Patient.findById(patientId).lean();

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const reports = await Report.find({ patientId, fileType: "application/pdf" }).lean();
        reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const prompt = await formatPrompt(patient, reports, message);
        const generatedResponse = await generateResponse(prompt);
        if (generatedResponse.error) {
            return res.status(500).json({ message: "Failed to generate response", error: true });
        }
        res.json({ message: generatedResponse.content, error: false });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Chat failed", error: err.message });
    }
};

export const getAllReports = async (req, res) => {
    try {
        const reports = await PatientReport.find().populate("patientId", "name").lean();

        // correct older reports that might not have fileUrl
        for (const report of reports) {
            if (!report.fileType) {
                report.fileType = "application/pdf"; // default to PDF if not set
            }
        }
        reports.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

        res.json({
            reports
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch reports" });
    }
};

export const viewReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await PatientReport.findById(reportId).lean();
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: report.s3Key,
        });

        const s3Response = await s3.send(command);

        // Set appropriate headers
        res.setHeader("Content-Type", report.fileType || "application/octet-stream");
        res.setHeader("Content-Disposition", `inline; filename="${report.title}"`);

        // Pipe the file stream to the response
        s3Response.Body.pipe(res);
    } catch (err) {
        console.error("Error viewing report:", err);
        res.status(500).json({ message: "Failed to stream report file" });
    }
};
