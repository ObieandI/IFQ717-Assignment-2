import express from 'express';
import { verifyAdmin } from '../../middlewares/roleMiddleware.js';
import { addStatistics } from '../../controllers/admin/PostStatisticsController.js';

const router = express.Router();

// Admin route for adding statistics
router.post('/statistics', verifyAdmin, addStatistics);

export default router;
