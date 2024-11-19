import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    hospitalIds: [
        {
            type: String,
            required: true
        }
    ],
    experience: {
        type: Number, // In years
        required: true
    },
    licenseData: {
        type: String,
        required: true
    }
})

export default mongoose.model("Doctor", doctorSchema);