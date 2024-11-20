import { Router } from 'express';
import { getPatientById, addPatient, updatePatient, getAllPatients } from '../controllers/patients.js';
import { PatientLogin, PatientRegister } from '../controllers/authcontroller.js';
const router = Router();

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.post('/register', PatientRegister);
router.post('/login', PatientLogin);

export { router };
