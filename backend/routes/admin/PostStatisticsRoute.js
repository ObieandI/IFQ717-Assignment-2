const express = require('express');
const { addStatistics } = require('../../controllers/admin/PostStatisticsController');
const { verifyAdmin } = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Admin route for adding statistics
router.post('/statistics', verifyAdmin, addStatistics);

module.exports = router;