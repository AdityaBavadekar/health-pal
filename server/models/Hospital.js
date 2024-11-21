import mongoose from "mongoose";

const Hospital = new mongoose.Schema({
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
    address: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    licenseData: {
        type: String,
        required: false,
    },
    doctorIds: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        default: [],
    },
});

export default mongoose.model("Hospital", Hospital);