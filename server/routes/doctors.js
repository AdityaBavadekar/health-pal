import { Router } from "express";
import { getDoctorById, addDoctor, updateDoctor, getAllDoctors } from "../controllers/doctors.js";

const router = Router();

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", addDoctor);
router.put("/:id", updateDoctor);


export { router };
