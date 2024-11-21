import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected!");
    } catch (error) {
        console.error("Could not connect to MongoDB!\n", error);
    }
};

export default connectDB;