import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";

configDotenv();

const app = express();

// Connect database
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
    res.json({
        message: "API working"
    })
})

// Listen
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})