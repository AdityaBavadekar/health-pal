import { Router } from 'express';
import { getMedicineSessionById, getAllMedicineSessions, addMedicineSession } from '../controllers/medicineSession.js';
import { getMedicineConsumptionReport, markAsTaken } from '../controllers/medicineConsumption.js';

const router = Router();

router.get("/sessions/:id", getMedicineSessionById);
router.get("/sessions/", getAllMedicineSessions);
router.post("/sessions/", addMedicineSession);
router.get("/consumption-report/", getMedicineConsumptionReport);
router.post("/mark-as-taken/", markAsTaken);

export { router };