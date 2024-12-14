const db = require('../../config/db');

// Controller to add new tourism statistics
const addStatistics = async (req, res) => {
  const {
    region_name,
    date,
    average_historical_occupancy,
    average_daily_rate,
    average_length_of_stay,
    average_booking_window,
  } = req.body;

  try {
    // Validate the required fields
    if (
      !region_name ||
      !date ||
      average_historical_occupancy === undefined ||
      average_daily_rate === undefined ||
      average_length_of_stay === undefined ||
      average_booking_window === undefined
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Ensure region exists in the `regions` table
    let region = await db('regions').where({ region_name }).first();
    if (!region) {
      // Add the region to the `regions` table if it doesn't exist
      const [regionId] = await db('regions').insert({ region_name });
      region = { id: regionId };
    }

    // Insert the statistics into the `statistics` table
    await db('statistics').insert({
      region_id: region.id,
      date,
      average_historical_occupancy,
      average_daily_rate,
      average_length_of_stay,
      average_booking_window,
    });

    // Send a success response
    res.status(201).json({ message: 'Tourism statistics added successfully.' });
  } catch (error) {
    console.error('Error adding tourism statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addStatistics };