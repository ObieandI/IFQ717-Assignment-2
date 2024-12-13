import db from '../../config/db.js';

export const viewBookingRates = async (req, res) => {
  const { region_name, start_date, end_date } = req.query;

  try {
    // Build the query dynamically based on the filters provided
    const query = db('statistics')
      .join('regions', 'statistics.region_id', '=', 'regions.id')
      .select(
        'regions.region_name',
        db.raw('AVG(statistics.average_booking_window) AS average_booking_window'),
        db.raw('AVG(statistics.average_daily_rate) AS average_daily_rate')
      )
      .groupBy('regions.region_name');

    // Apply region filter if provided
    if (region_name) {
      query.where('regions.region_name', region_name);
    }

    // Apply date range filter if both start_date and end_date are provided
    if (start_date && end_date) {
      query.whereBetween('statistics.date', [start_date, end_date]);
    }

    // Execute the query
    const results = await query;

    // Respond with the filtered data
    res.status(200).json({ data: results });
  } catch (error) {
    console.error('Error fetching booking rates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
