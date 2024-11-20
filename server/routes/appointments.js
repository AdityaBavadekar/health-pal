import { Router } from "express";
import { getAllAppointments, getAppointmentById, addAppointment, cancelAppointment } from "../controllers/appointments.js";
const router = Router();

router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.post("/", addAppointment);
router.delete("/:id", cancelAppointment);

export { router };
