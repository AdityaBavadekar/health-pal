import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    address: {
        type: String,
        required: false,
        default: "",
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number, // In years
        required: true,
    },
    licenseData: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Doctor", doctorSchema);