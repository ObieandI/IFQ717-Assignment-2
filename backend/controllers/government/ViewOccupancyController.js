import db from '../../config/db.js';

// Controller to fetch average occupancy and daily rates by region
export const viewOccupancyRates = async (req, res) => {
  try {
    // SQL query to calculate average occupancy and daily rates
    const results = await db('statistics')
      .join('regions', 'statistics.region_id', '=', 'regions.id')
      .select(
        'regions.region_name',
        db.raw('AVG(statistics.average_historical_occupancy) AS average_historical_occupancy'),
        db.raw('AVG(statistics.average_daily_rate) AS average_daily_rate')
      )
      .groupBy('regions.region_name');

    // Respond with the formatted data
    res.status(200).json({ data: results });
  } catch (error) {
    console.error('Error fetching occupancy rates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};