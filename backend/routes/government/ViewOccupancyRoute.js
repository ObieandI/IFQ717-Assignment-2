import express from 'express';
import { viewOccupancyRates } from '../../controllers/government/ViewOccupancyController.js';
import { verifyGovernment } from '../../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/occupancy-rates', verifyGovernment, viewOccupancyRates);

export default router;