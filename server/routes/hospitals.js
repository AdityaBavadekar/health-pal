import { Router } from 'express';
import { getHospitalById, addHospital, updateHospital, getAllHospitals, getHospitalsByName, addDoctorToHospital, getDoctors } from '../controllers/hospitals.js';
const router = Router();

router.get('/', getAllHospitals);
router.get('/by-name/:name', getHospitalsByName);
router.get('/get-doctors', getDoctors);
router.get('/:id', getHospitalById);
router.post('/', addHospital);
router.put('/:id', updateHospital);
router.post('/add-doctor', addDoctorToHospital);

export { router };
