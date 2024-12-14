const db = require('../../config/db');
const { Parser } = require('json2csv');

// Controller to export filtered data as CSV
const exportData = async (req, res) => {
  const { region_name, start_date, end_date } = req.query;

  try {
    // Build the SQL query dynamically based on filters
    const query = db('statistics')
      .join('regions', 'statistics.region_id', '=', 'regions.id')
      .select(
        'regions.region_name',
        'statistics.date',
        'statistics.average_historical_occupancy',
        'statistics.average_daily_rate',
        'statistics.average_length_of_stay',
        'statistics.average_booking_window'
      );

    // Apply filters
    if (region_name) {
      query.where('regions.region_name', region_name);
    }
    if (start_date && end_date) {
      query.whereBetween('statistics.date', [start_date, end_date]);
    }

    // Execute the query
    const results = await query;

    // Check if there are results
    if (results.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified filters.' });
    }

    // Convert results to CSV
    const fields = [
      'region_name',
      'date',
      'average_historical_occupancy',
      'average_daily_rate',
      'average_length_of_stay',
      'average_booking_window',
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(results);

    // Set response headers for file download
    res.header('Content-Type', 'text/csv');
    res.attachment('exported_data.csv');
    res.status(200).send(csv);
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { exportData };