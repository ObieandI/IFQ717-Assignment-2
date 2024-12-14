require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Tourism Stats API!');
});

//  a test route
const { verifyAdmin } = require('./middlewares/roleMiddleware');

app.get('/test-admin', verifyAdmin, (req, res) => {
  res.status(200).json({ message: 'Admin access granted', user: req.user });
});


// Routes
const userRegisterRoute = require('./routes/users/PostRegisterRoute');
const userLoginRoute = require('./routes/users/PostLoginRoute'); // Import login route
const adminRoutes = require('./routes/admin/PostStatisticsRoute');
const governmentRoute = require('./routes/government/ViewOccupancyRoute');
const governmentExportRoute = require('./routes/government/ExportDataRoute');
const hotelRoute = require('./routes/hotel/ViewBookingRatesRoute');


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
