import { Router } from "express";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";

const router = Router();

router.get("/", async (req, res) => {
    const id = req.user.id;
    switch (req.user.type) {
        case "Patient":
            const patient = await Patient.findById(id);
            res.json(patient);
            break;
        case "Doctor":
            const doctor = await Doctor.findById(id);
            res.json(doctor);
            break;
        case "Hospital":
            const hospital = await Hospital.findById(id);
            res.json(hospital);
            break;
        default:
            res.status(400).json({ message: `Invalid user type ${req.user.type}` });
            break
    }
});

export { router };