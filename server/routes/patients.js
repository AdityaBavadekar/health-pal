import { Router } from 'express';
import { getPatientById, addPatient, updatePatient, getAllPatients } from '../controllers/patients.js';

const router = Router();

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', addPatient);
router.put('/:id', updatePatient);

export { router };