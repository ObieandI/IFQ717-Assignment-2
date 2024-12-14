const express = require('express');
const { viewBookingRates } = require('../../controllers/hotel/ViewBookingRatesController');
const { verifyHotel } = require('../../middlewares/roleMiddleware');

const router = express.Router();

// Route for hotel users to view booking windows and daily rates with filters
router.get('/booking-rates', verifyHotel, viewBookingRates);

module.exports = router;