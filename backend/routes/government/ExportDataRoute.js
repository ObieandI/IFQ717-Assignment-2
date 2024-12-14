const express = require('express');
const { exportData } = require('../../controllers/government/ExportDataController');
const { verifyGovernment } = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Route for exporting filtered data as CSV
router.get('/export-data', verifyGovernment, exportData);

module.exports = router;