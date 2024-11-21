import { Router } from 'express';
import { getPatientById, addPatient, updatePatient, getAllPatients, getPatientsByName } from '../controllers/patients.js';
const router = Router();

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.get('/by-name/:name', getPatientsByName);
export { router };
