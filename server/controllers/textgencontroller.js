import { GoogleGenerativeAI } from "@google/generative-ai";
import Patient from "../models/Patient.js";
import Conversation from "../models/Conversation.js";
import { messageSchema } from "../models/Conversation.js";
import { GoogleGenAI } from "@google/genai";

async function generateResponse(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    const result = await model.generateContent(prompt);
    if (!result) {
        return { error: true, content: "Failed to generate response" };
    }
    return { error: false, content: result.response.text() };
}

async function generateImageDescriptionResponse(prompt, buffer, mimetype) {
    const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);
    const base64ImageData = Buffer.from(buffer).toString("base64");

    const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                inlineData: {
                    mimeType: mimetype,
                    data: base64ImageData,
                },
            },
            { text: prompt },
        ],
    });

    if (!result) {
        return { error: true, content: "Failed to generate image description" };
    }
    return { error: false, content: result.text };
}

function formatPatientDocImageDescriptionPrompt() {
    const prompt = `
This is an medical document image uploaded by a patient/doctor. Describe the content of the image in a clear, concise, and professional manner for medical review purposes. Ensure the description is anonymous and focuses only on medical details, avoiding any personally identifiable information (PII).
If the image is prescription, then transcribe the prescription details in a structured format.

`;
    return prompt;
}

function formatSummaryPrompt(operations, diseases, alergies) {
    const prompt = `
Summarize the following patient's health data in a clear, concise, and professional manner for medical review purposes. Ensure the summary is anonymous and focuses only on medical details, avoiding any personally identifiable information (PII).

Health Data:
- **Operations**: ${operations}
- **Diseases**: ${diseases}
- **Allergies**: ${alergies}

Intention:
The summary will be used by healthcare professionals to quickly assess the patient's medical history and current health status while maintaining anonymity. Ensure the tone is neutral and factual, and include relevant insights if possible.
`;
    return prompt;
}

async function generateSummary(req, res) {
    if (req.user.type === "Patient") {
        return res.status(403).json({
            message: "Forbidden",
        });
    }

    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
        return res.status(404).json({
            message: "Patient not found",
        });
    }
    const prompt = formatSummaryPrompt(patient.operations, patient.diseases, patient.allergies);
    const result = await generateResponse(prompt);
    if (result.error) {
        return res.status(500).json({
            message: "Failed to generate summary due to an internal error",
            error: true,
        });
    }
    res.json({
        message: result.content,
        error: false,
    });
}

function formatChatPrompt(patient, previousMessages, message) {
    let patientInfo = "";
    if (patient) {
        patientInfo = `**Patient Information:**
- **Name**: ${patient.name}
- **Age**: ${patient.age}
- **Gender**: ${patient.gender}
- **Medical History**: ${patient.medicalHistory.join(", ")}
`;
    }

    const prompt = `You are a medical assistant chatbot designed to help patients with their queries. 
    
${patientInfo ? patientInfo : ""}

Previous Messages:
${previousMessages.map((msg) => `- **${msg.role}**: ${msg.content}`).join("\n")}

Now, the patient has sent a message: "${message}"
`;
    return prompt;
}

const MAX_CHAT_HISTORY = 10;
const MAX_MESSAGE_LENGTH = 1000;

async function simpleChat(req, res) {
    let { patientId, sessionId, message } = req.body;

    if (!message) {
        return res.status(400).json({
            message: "Message is required",
            error: true,
        });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
        message = message.substring(0, MAX_MESSAGE_LENGTH) + "..."; // Limit to first 1000 characters
    }

    let newMessage = {
        sender: "patient",
        content: message,
        timestamp: new Date(),
    };

    let conversationId = sessionId;
    let previousMessages = [];
    if (!conversationId) {
        // new conversation
        const conversation = new Conversation({
            patientId: patientId,
            messages: [newMessage],
            contextFiles: [],
        });
        await conversation.save();
        conversationId = conversation._id;
    } else {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found",
            });
        }
        previousMessages = conversation.messages;
    }

    // limit to last MAX_CHAT_HISTORY messages
    previousMessages = previousMessages.slice(-MAX_CHAT_HISTORY);

    // convert messages to prompt format
    previousMessages = previousMessages.map((msg) => {
        return {
            role: msg.sender === "patient" ? "user" : "assistant",
            content: msg.content,
        };
    });

    let patient = await Patient.findById(patientId);
    if (patientId && !patient) {
        return res.status(404).json({
            message: "Patient not found",
            error: true,
        });
    }

    const prompt = formatChatPrompt(patient, previousMessages, message);
    const result = await generateResponse(prompt);

    // save the new message to the conversation
    const newChatMessage = {
        sender: "bot",
        content: result.content,
        timestamp: new Date(),
    };
    await Conversation.findByIdAndUpdate(conversationId, {
        $push: { messages: newMessage, messages: newChatMessage },
        lastUpdated: new Date(),
    });

    if (result.error) {
        return res.status(500).json({
            message: "Failed to generate chat response",
            error: true,
        });
    }
    res.json({
        sessionId: conversationId,
        message: result.content,
        anonymous: patientId ? false : true,
        error: false,
    });
}

export { generateSummary, simpleChat, generateImageDescriptionResponse, formatPatientDocImageDescriptionPrompt };
