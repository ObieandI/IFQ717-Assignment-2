const express = require('express');
const { addStatistics } = require('../../controllers/admin/PostStatisticsController.js');
const { verifyAdmin } = require('../../middlewares/roleMiddleware.js');

const router = express.Router();

// Admin route for adding statistics
router.post('/statistics', verifyAdmin, addStatistics);

module.exports = router;