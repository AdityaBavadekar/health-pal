import { Router } from 'express';
import { generateSummary } from '../controllers/summary.js';

const router = Router();

router.get('/:id', generateSummary);

export { router };