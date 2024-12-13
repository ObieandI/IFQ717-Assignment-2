import express from 'express';
import { viewBookingRates } from '../../controllers/hotel/ViewBookingRatesController.js';
import { verifyHotel } from '../../middlewares/roleMiddleware.js';

const router = express.Router();

// Route to fetch booking rates by region and time frame
router.get('/booking-rates', verifyHotel, viewBookingRates);

export default router;
