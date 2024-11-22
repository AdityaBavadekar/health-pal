import { Router } from 'express';
import { getHospitalById, addHospital, updateHospital, getAllHospitals, getHospitalsByName, addDoctorToHospital, getDoctors } from '../controllers/hospitals.js';
const router = Router();

router.get('/', getAllHospitals);
router.get('/:id', getHospitalById);
router.post('/', addHospital);
router.put('/:id', updateHospital);
router.get('/by-name/:name', getHospitalsByName);
router.post('/add-doctor', addDoctorToHospital);
router.post('/get-doctors', getDoctors);

export { router };
