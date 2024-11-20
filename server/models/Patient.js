import mongoose from "mongoose";

const Patient = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
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
        required: false,
        default: ""
    },
    mobileNumber: {
        type: String,
        required: true
    },
    weight: {
        type: Number, // In SI Unit
        required: false,
        default: -1
    },
    bloodSign: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        required: false,
        default: 'A+'
    },
    familyDoctor: {
        type: String,
        required: false,
        default: ""
    },
    emergencyNumber: {
        type: String,
        required: false,
        default: ""
    },
    diseases: {
        type:[
            {
                name : {
                    type: String,
                    required: true,
                }
            }
        ],
        required: false,
        default: []
    },
    operations: {
        type:[
            {
                name : {
                    type: Number,
                    required: true,
                }
            }
        ],
        required: false,
        default: []
    },
    alergies: {
        type:[
            {
                name : {
                    type: Number,
                    required: true,
                }
            }
        ],
        required: false,
        default: []
    }
})

export default mongoose.model("Patient", Patient);