const express = require('express');
const { viewOccupancyRates } = require('../../controllers/government/ViewOccupancyController.js');
const { verifyGovernment } = require('../../middlewares/roleMiddleware.js');

const router = express.Router();

// Route for government users to view average occupancy rates
router.get('/occupancy-rates', verifyGovernment, viewOccupancyRates);

module.exports = router;