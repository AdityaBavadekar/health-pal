import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: String, // 'patient' or 'bot'
            enum: ["patient", "bot"],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const conversationSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: false,
        },
        messages: {
            type: [messageSchema],
            default: [],
        },
        contextFiles: [
            {
                type: String, // Signed file URLs or file keys
            },
        ],
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
export { messageSchema };
