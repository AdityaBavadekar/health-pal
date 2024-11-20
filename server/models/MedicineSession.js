import mongoose from "mongoose";

const medicineSessionSchema = new mongoose.Schema(
    {
        patientId: {
            type: String,
            required: true,
        },
        doctorId: {
            type: String,
            required: true,
        },
        items: {
            type: [
                {
                    name: {
                        // Medicine Name
                        type: String,
                        required: true,
                    },
                    frequency: {
                        // Number of times
                        type: Number,
                        required: true,
                        default: 1,
                    },
                    frequencyUnit: {
                        // Unit of frequency
                        type: String,
                        enum: ["day", "week", "month"],
                        required: true,
                        default: "day",
                    },
                    consumptionTime: {
                        // Time of the day (morning, afternoon, evening, night, after dinner, ...)
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

const MedicineSession = mongoose.model(
    "MedicineSession",
    medicineSessionSchema
);
export default MedicineSession;
