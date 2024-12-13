import express from 'express';
import { exportData } from '../../controllers/government/ExportDataController.js';
import { verifyGovernment } from '../../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/export-data', verifyGovernment, exportData);

export default router;