import { Router } from 'express';
import { getHospitalById, addHospital, updateHospital, getAllHospitals } from '../controllers/hospitals.js';
const router = Router();

router.get('/', getAllHospitals);
router.get('/:id', getHospitalById);
router.post('/', addHospital);
router.put('/:id', updateHospital);

export { router };
