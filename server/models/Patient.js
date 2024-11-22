import mongoose from "mongoose";

const Patient = new mongoose.Schema({
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
    country: {
        type: String,
        required: false,
        default: "",
    },
    province: {
        type: String,
        required: false,
        default: "",
    },
    city: {
        type: String,
        required: false,
        default: "",
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
    weight: {
        type: Number, // In SI Unit
        required: false,
        default: -1,
    },
    bloodSign: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        required: true,
        default: "A+",
    },
    familyDoctor: {
        type: String,
        required: false,
        default: "",
    },
    emergencyNumber: {
        type: String,
        required: false,
        default: "",
    },
    diseases: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: false,
        default: [],
    },
    operations: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: false,
        default: [],
    },
    alergies: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: false,
        default: [],
    },
});

export default mongoose.model("Patient", Patient);