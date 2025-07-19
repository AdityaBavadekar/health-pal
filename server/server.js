import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { router as doctorsRouter } from "./routes/doctors.js";
import { router as patientsRouter } from "./routes/patients.js";
import { router as hospitalsRouter } from "./routes/hospitals.js";
import { router as medicinesRouter } from "./routes/medicines.js";
import { router as summaryRouter } from "./routes/summary.js";
import { router as chatRouter } from "./routes/chat.js";
import { router as appointmentsRouter } from "./routes/appointments.js";
import { router as meRouter } from "./routes/me.js";
import { router as reportsRouter } from "./routes/report.js";
import { DoctorLogin, DoctorRegister } from "./controllers/authcontroller.js";
import { HospitalRegister, HospitalLogin } from "./controllers/authcontroller.js";
import { PatientLogin, PatientRegister } from "./controllers/authcontroller.js";
import { authMiddleware } from "./controllers/authmiddleware.js";
import { testS3Connection } from "./utils/s3Client.js";

configDotenv();
testS3Connection();

const app = express();

// Connect database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);

// Routes
app.get("/api", (req, res) => {
    res.json({
        message: "API working",
    });
});

app.get("/", (req, res) => {
    res.send("Welcome to Health Pal API");
});

app.post("/api/doctors/register", DoctorRegister);
app.post("/api/doctors/login", DoctorLogin);
app.post("/api/hospitals/register", HospitalRegister);
app.post("/api/hospitals/login", HospitalLogin);
app.post("/api/patients/register", PatientRegister);
app.post("/api/patients/login", PatientLogin);

app.use("/api/doctors", authMiddleware, doctorsRouter);
app.use("/api/patients", authMiddleware, patientsRouter);
app.use("/api/hospitals", authMiddleware, hospitalsRouter);
app.use("/api/medicines", authMiddleware, medicinesRouter);
app.use("/api/appointments", authMiddleware, appointmentsRouter);
app.use("/api/summary", authMiddleware, summaryRouter);
app.use("/api/me", authMiddleware, meRouter);
app.use("/api/reports", reportsRouter);
// app.use("/api/chat", authMiddleware, chatRouter);
app.use("/api/chat", chatRouter);

// Listen
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
