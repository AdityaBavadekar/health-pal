import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";
import { router as doctorsRouter } from "./routes/doctors.js";
import { router as patientsRouter } from "./routes/patients.js";
import { router as hospitalsRouter } from "./routes/hospitals.js";

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

app.use('/api/doctors', doctorsRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/hospitals', hospitalsRouter);

// Listen
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
