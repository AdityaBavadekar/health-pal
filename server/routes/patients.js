import { Router } from 'express';
import { getPatientById, addPatient, updatePatient, getAllPatients, getPatientsByName, getReportsOfPatient } from '../controllers/patients.js';
const router = Router();

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.get('/by-name/:name', getPatientsByName);
router.get('/:id/reports', getReportsOfPatient);
export { router };
