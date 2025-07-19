import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: false,
    },
    s3Key: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
        default: "application/pdf",
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
        default: "",
    },
    scanResult: {
        type: String,
        required: false,
    },
});

export default mongoose.model("PatientReport", reportSchema);
