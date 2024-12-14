require('dotenv').config();
const express = require('express');
const db = require('./config/db.js');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();

// Middleware
app.use(cors());
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
const userRegisterRoute = require('./routes/users/PostRegisterRoute.js');
const userLoginRoute = require('./routes/users/PostLoginRoute.js'); // Import login route
const adminRoutes = require('./routes/admin/PostStatisticsRoute.js');
const governmentRoute = require('./routes/government/ViewOccupancyRoute.js');
const governmentExportRoute = require('./routes/government/ExportDataRoute.js');
const hotelRoute = require('./routes/hotel/ViewBookingRatesRoute.js');


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
