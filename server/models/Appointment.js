import mongoose from "mongoose";

const Appointment = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    hospitalId: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})

export default mongoose.model("Appointment", Appointment);