import mongoose from "mongoose";

const Appointment = new mongoose.Schema(
    {
        patientId: {
            type: String,
            required: true,
        },
        hospitalId: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: false,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Appointment", Appointment);
