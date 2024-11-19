import mongoose from "mongoose";

const Hospital = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
    licenseData: {
        type: String,
        required: true
    }
})

export default mongoose.model("Hospital", Hospital);