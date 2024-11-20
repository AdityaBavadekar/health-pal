import { Router } from "express";
import { getDoctorById, addDoctor, updateDoctor, getAllDoctors } from "../controllers/doctors.js";
import { DoctorLogin, DoctorRegister } from "../controllers/authcontroller.js";

const router = Router();

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", addDoctor);
router.put("/:id", updateDoctor);
router.post("/register", DoctorRegister);
router.post("/login", DoctorLogin);

export { router };
