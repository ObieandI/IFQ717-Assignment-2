import dotenv from 'dotenv';
import knex from 'knex';
import knexConfig from './config/knexfile.js';
import express from 'express';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config({ path: '../.env' });
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  req.setTimeout(10000); // 10 seconds timeout
  next();
});

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Tourism Stats API!');
});

//  a test route
import { verifyAdmin } from './middlewares/roleMiddleware.js';

app.get('/test-admin', verifyAdmin, (req, res) => {
  res.status(200).json({ message: 'Admin access granted', user: req.user });
});


// Routes
import userRegisterRoute from './routes/users/PostRegisterRoute.js';
import userLoginRoute from './routes/users/PostLoginRoute.js';
import adminRoutes from './routes/admin/PostStatisticsRoute.js';
import governmentRoute from './routes/government/ViewOccupancyRoute.js';
import governmentExportRoute from './routes/government/ExportDataRoute.js';
import hotelRoute from './routes/hotel/ViewBookingRatesRoute.js';


// Use Routes
app.use('/users', userRegisterRoute);
app.use('/users', userLoginRoute); // Add login route to users
app.use('/admin', adminRoutes); // Admin route to allow admin to upload new statistics
app.use('/government', governmentRoute); // Add route to allow goverment to view average occupancy and daily rate
app.use('/government', governmentExportRoute); // Add route to allow government to export filtered data to csv
app.use('/hotel', hotelRoute); // Add route to allow hotel to view average booking window and daily rate

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const db = knex(knexConfig.development); // Example for Knex setup
export default db;
