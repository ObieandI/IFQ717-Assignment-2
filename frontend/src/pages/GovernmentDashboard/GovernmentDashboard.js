import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import DashboardNavbar from '../../components/Navbar/DashboardNavbar.js';
import './GovernmentDashboard.css';

function GovernmentDashboard() {
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [occupancyData, setOccupancyData] = useState([]);
    const [dailyRateData, setDailyRateData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOccupancyRates();
    }, [selectedRegion, startDate, endDate]);

    const fetchOccupancyRates = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/government/occupancy-rates', {
                params: { region_name: selectedRegion, start_date: startDate, end_date: endDate }
            });
            setOccupancyData(response.data.data.map(item => ({
                regionName: item.region_name,
                occupancy: item.average_historical_occupancy
            })));
            setDailyRateData(response.data.data.map(item => ({
                regionName: item.region_name,
                dailyRate: item.average_daily_rate
            })));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching occupancy rates:', error);
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    const handleExport = async () => {
        // Assuming there's an export functionality on '/government/export-data'
        try {
            const response = await axios.get('/government/export-data', {
                params: { region_name: selectedRegion, start_date: startDate, end_date: endDate },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'exported_data.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error exporting data:', error);
            setError('Failed to export data');
        }
    };

    const prepareChartData = (data) => ({
        labels: data.map(item => item.regionName),
        datasets: [{
            label: 'Average Historical Occupancy',
            data: data.map(item => item.occupancy),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderColor: 'rgba(53, 162, 235, 1)',
            borderWidth: 1
        }, {
            label: 'Average Daily Rate',
            data: data.map(item => item.dailyRate),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    });

    return (
        <div className="container-fluid governmentDashboard">
            <DashboardNavbar />
            <section className="dashboardContent">
                <div className="filters row">
                    <div className="col-md-4">
                        <select id="regionFilter" value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} className="form-control">
                            <option value="">Select Region</option>
                            {regions.map(region => (
                                <option key={region.id} value={region.region_name}>{region.region_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="form-control" />
                    </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {loading ? (
                    <p>Loading data...</p>
                ) : (
                    <>
                        <div className="chart" id="occupancyChart">
                            <h3>Average Occupancy Rates by Region</h3>
                            {occupancyData.length > 0 ? (
                                <Bar data={prepareChartData(occupancyData)} options={{ scales: { y: { beginAtZero: true } } }} />
                            ) : (
                                <p>No data to display</p>
                            )}
                        </div>
                        <div className="chart" id="dailyRateChart">
                            <h3>Average Daily Rates by Region</h3>
                            {dailyRateData.length > 0 ? (
                                <Bar data={prepareChartData(dailyRateData)} options={{ scales: { y: { beginAtZero: true } } }} />
                            ) : (
                                <p>No data to display</p>
                            )}
                        </div>
                    </>
                )}
                <button id="exportBtn" onClick={handleExport} className="btn btn-warning">Export CSV</button>
            </section>
        </div>
    );
}

export default GovernmentDashboard;
