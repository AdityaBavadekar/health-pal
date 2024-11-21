import { GoogleGenerativeAI } from '@google/generative-ai';
import Patient from '../models/Patient.js';

function formatPrompt(operations, diseases, alergies){
    const prompt = `
Summarize the following patient's health data in a clear, concise, and professional manner for medical review purposes. Ensure the summary is anonymous and focuses only on medical details, avoiding any personally identifiable information (PII).

Health Data:
- **Operations**: ${operations}
- **Diseases**: ${diseases}
- **Allergies**: ${alergies}

Intention:
The summary will be used by healthcare professionals to quickly assess the patient's medical history and current health status while maintaining anonymity. Ensure the tone is neutral and factual, and include relevant insights if possible.
`
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
            message: "Patient not found"
        });
    }
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Gives overloaded error

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const prompt = formatPrompt(patient.operations, patient.diseases, patient.allergies);

    const result = await model.generateContent(prompt);
    if (!result) {
        return res.status(500).json({
            message: "Failed to generate summary",
            error: true
        });
    }
    res.json({
        message: result.response.text(),
        error: false
    });
}

export { generateSummary };