import { Router } from 'express';
import { getHospitalById, addHospital, updateHospital, getAllHospitals } from '../controllers/hospitals.js';
import { HospitalRegister, HospitalLogin } from '../controllers/authcontroller.js';
const router = Router();

router.get('/', getAllHospitals);
router.get('/:id', getHospitalById);
router.post('/', addHospital);
router.put('/:id', updateHospital);
router.post('/register', HospitalRegister);
router.post('/login', HospitalLogin);

export { router };
