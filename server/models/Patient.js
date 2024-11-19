import mongoose from "mongoose";

const Patient = new mongoose.Schema({
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
    weight: {
        type: Number, // In SI Unit
        required: false
    },
    bloodSign: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        required: false
    },
    familyDoctor: {
        type: Number,
        required: false
    },
    emergencyNumber: {
        type: String,
        required: false
    },
    diseases: [{
            id: {
                type: Number,
                required: true,
            },
            name : {
                type: Number,
                required: true,
            }
    }],
    operations: [{
            id: {
                type: Number,
                required: true,
            },
            name : {
                type: Number,
                required: true,
            }
    }],
    alergies: [{
            id: {
                type: Number,
                required: true,
            },
            name : {
                type: Number,
                required: true,
            }
    }]
})

export default mongoose.model("Patient", Patient);