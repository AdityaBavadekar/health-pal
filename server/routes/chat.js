import { Router } from 'express';
import { generateSummary, simpleChat } from '../controllers/textgencontroller.js';
import { chatWithReports } from '../controllers/reportController.js';

const router = Router();

router.get('/summary/:id', generateSummary);
router.post('/with-reports/:id', chatWithReports);
router.post('/for-patient', simpleChat);

export { router };