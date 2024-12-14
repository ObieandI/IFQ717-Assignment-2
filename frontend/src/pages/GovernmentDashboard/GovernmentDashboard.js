import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import DashboardNavbar from '../../components/Navbar/DashboardNavbar.js';
import './GovernmentDashboard.css';

function GovernmentDashboard() {
    const [occupancyData, setOccupancyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOccupancyRates();
    }, []);

    const fetchOccupancyRates = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            if (!token) {
                throw new Error('No token found. Please log in again.');
            }
            console.log("Token sent:", token);

            const response = await axios.get('http://localhost:5000/government/occupancy-rates', {
                headers: {
                    Authorization: `Bearer ${token}` // Include token for authentication
                }
            });

            // Map data into a usable format
            setOccupancyData(response.data.data.map(item => ({
                regionName: item.region_name,
                occupancy: item.average_historical_occupancy,
                dailyRate: item.average_daily_rate
            })));
        } catch (error) {
            console.error('Error fetching occupancy rates:', error);
            setError(error.response?.data?.error || 'Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            if (!token) {
                throw new Error('No token found. Please log in again.');
            }

            const response = await axios.get('/government/export-data', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob' // Indicate the response is a file
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
            setError(error.response?.data?.error || 'Failed to export data.');
        }
    };

    const prepareChartData = (data, labelKey, valueKey) => ({
        labels: data.map(item => item.regionName),
        datasets: [{
            label: labelKey,
            data: data.map(item => item[valueKey]),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    });

    return (
        <div className="container-fluid governmentDashboard">
            <DashboardNavbar />
            <section className="dashboardContent">
                {error && <p className="text-danger">{error}</p>}
                {loading ? (
                    <p>Loading data...</p>
                ) : (
                    <>
                        <div className="chart" id="occupancyChart">
                            <h3>Average Occupancy Rates by Region</h3>
                            {occupancyData.length > 0 ? (
                                <Bar
                                    data={prepareChartData(occupancyData, 'Average Historical Occupancy', 'occupancy')}
                                    options={{ scales: { y: { beginAtZero: true } } }}
                                />
                            ) : (
                                <p>No data to display</p>
                            )}
                        </div>
                        <div className="chart" id="dailyRateChart">
                            <h3>Average Daily Rates by Region</h3>
                            {occupancyData.length > 0 ? (
                                <Bar
                                    data={prepareChartData(occupancyData, 'Average Daily Rate', 'dailyRate')}
                                    options={{ scales: { y: { beginAtZero: true } } }}
                                />
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



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import DashboardNavbar from '../../components/Navbar/DashboardNavbar.js';
// import './GovernmentDashboard.css';

// function GovernmentDashboard() {
//     const [occupancyData, setOccupancyData] = useState([]);
//     const [dailyRateData, setDailyRateData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchOccupancyRates();
//     }, []);

//     const fetchOccupancyRates = async () => {
//         setLoading(true);
//         try {
//             // Assuming the token is stored in localStorage or another secure place
//             const token = localStorage.getItem('token'); // Replace with your token retrieval method
//             console.log('Token:', token);
//             // Include the token in the Authorization header
//             const response = await axios.get('/government/occupancy-rates', {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
    
//             setOccupancyData(response.data.data.map(item => ({
//                 regionName: item.region_name,
//                 occupancy: item.average_historical_occupancy
//             })));
//             setDailyRateData(response.data.data.map(item => ({
//                 regionName: item.region_name,
//                 dailyRate: item.average_daily_rate
//             })));
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching occupancy rates:', error);
//             setError('Failed to fetch data');
//             setLoading(false);
//         }
//     };

//     const handleExport = async () => {
//         try {
//             const response = await axios.get('/government/export-data', {
//                 responseType: 'blob'
//             });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', 'exported_data.csv');
//             document.body.appendChild(link);
//             link.click();
//             link.parentNode.removeChild(link);
//         } catch (error) {
//             console.error('Error exporting data:', error);
//             setError('Failed to export data');
//         }
//     };

//     const prepareChartData = (data) => ({
//         labels: data.map(item => item.regionName),
//         datasets: [{
//             label: 'Average Historical Occupancy',
//             data: data.map(item => item.occupancy),
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//             borderColor: 'rgba(53, 162, 235, 1)',
//             borderWidth: 1
//         }, {
//             label: 'Average Daily Rate',
//             data: data.map(item => item.dailyRate),
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1
//         }]
//     });

//     return (
//         <div className="container-fluid governmentDashboard">
//             <DashboardNavbar />
//             <section className="dashboardContent">
//                 {error && <p className="text-danger">{error}</p>}
//                 {loading ? (
//                     <p>Loading data...</p>
//                 ) : (
//                     <>
//                         <div className="chart" id="occupancyChart">
//                             <h3>Average Occupancy Rates by Region</h3>
//                             {occupancyData.length > 0 ? (
//                                 <Bar data={prepareChartData(occupancyData)} options={{ scales: { y: { beginAtZero: true } } }} />
//                             ) : (
//                                 <p>No data to display</p>
//                             )}
//                         </div>
//                         <div className="chart" id="dailyRateChart">
//                             <h3>Average Daily Rates by Region</h3>
//                             {dailyRateData.length > 0 ? (
//                                 <Bar data={prepareChartData(dailyRateData)} options={{ scales: { y: { beginAtZero: true } } }} />
//                             ) : (
//                                 <p>No data to display</p>
//                             )}
//                         </div>
//                     </>
//                 )}
//                 <button id="exportBtn" onClick={handleExport} className="btn btn-warning">Export CSV</button>
//             </section>
//         </div>
//     );
// }

// export default GovernmentDashboard;