import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';

const HotelDashboard = () => {
    const [dailyRateData, setDailyRateData] = useState({
        labels: [],
        datasets: [{
            label: 'Average Daily Rate',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    });

    const [bookingWindowData, setBookingWindowData] = useState({
        labels: [],
        datasets: [{
            label: 'Average Booking Window',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    });

    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found. Please log in.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/hotel/booking-rates', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const labels = response.data.data.map(item => item.region_name);
                const dailyRates = response.data.data.map(item => item.average_daily_rate);
                const bookingWindows = response.data.data.map(item => item.average_booking_window);

                setDailyRateData({
                    labels,
                    datasets: [{
                        label: 'Average Daily Rate',
                        data: dailyRates,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                });

                setBookingWindowData({
                    labels,
                    datasets: [{
                        label: 'Average Booking Window',
                        data: bookingWindows,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                console.error('Error during data fetch:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let chartInstance1 = null;
        let chartInstance2 = null;

        if (chartRef1.current && dailyRateData.labels.length > 0) {
            chartInstance1 = new Chart(chartRef1.current, {
                type: 'bar',
                data: dailyRateData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        if (chartRef2.current && bookingWindowData.labels.length > 0) {
            chartInstance2 = new Chart(chartRef2.current, {
                type: 'bar',
                data: bookingWindowData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance1) chartInstance1.destroy();
            if (chartInstance2) chartInstance2.destroy();
        };
    }, [dailyRateData, bookingWindowData]);

    return (
        <div className="hotel-dashboard">
            <header>
                <h1>Hotel Dashboard</h1>
            </header>
            <nav>
                <ul>
                    <li>Booking Trends</li>
                    <li>Pricing Strategies</li>
                </ul>
            </nav>
            <main>
                <section>
                    <h2>Average Daily Rates</h2>
                    <div className="chart-container">
                        <canvas ref={chartRef1}></canvas>
                    </div>
                </section>
                <section>
                    <h2>Average Booking Windows</h2>
                    <div className="chart-container">
                        <canvas ref={chartRef2}></canvas>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HotelDashboard;



//TWO SEPARATE GRAPHS
// const HotelDashboard = () => {
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [
//             {
//                 label: 'Average Daily Rate',
//                 data: [],
//                 backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//             },
//             {
//                 label: 'Average Booking Window',
//                 data: [],
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 borderWidth: 1
//             }
//         ]
//     });
//     const chartRef = useRef(null); // Ref for the canvas

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     console.error('No token found. Please log in.');
//                     return;
//                 }
    
//                 const response = await axios.get('http://localhost:5000/hotel/booking-rates', {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
    
//                 const labels = response.data.data.map(item => item.region_name);
//                 const dailyRates = response.data.data.map(item => item.average_daily_rate);
//                 const bookingWindows = response.data.data.map(item => item.average_booking_window);
    
//                 setChartData({
//                     labels,
//                     datasets: [
//                         {
//                             label: 'Average Daily Rate',
//                             data: dailyRates,
//                             backgroundColor: 'rgba(75,192,192,0.5)',
//                             borderColor: 'rgba(75,192,192,1)',
//                             borderWidth: 1
//                         },
//                         {
//                             label: 'Average Booking Window',
//                             data: bookingWindows,
//                             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                             borderColor: 'rgba(255, 99, 132, 1)',
//                             borderWidth: 1
//                         }
//                     ]
//                 });
    
//             } catch (error) {
//                 console.error('Error during data fetch:', error);
//             }
//         };
    
//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (chartRef.current && chartData.labels.length > 0) {
//             const chartInstance = new Chart(chartRef.current, {
//                 type: 'bar',
//                 data: chartData,
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     scales: {
//                         x: { type: 'category' },
//                         y: { beginAtZero: true }
//                     }
//                 }
//             });

//             return () => chartInstance.destroy(); // Clean up on component unmount
//         }
//     }, [chartData]);

//     return (
//         <div className="hotel-dashboard">
//             <header>
//                 <h1>Hotel Dashboard</h1>
//             </header>
//             <nav>
//                 <ul>
//                     <li>Booking Trends</li>
//                     <li>Pricing Strategies</li>
//                 </ul>
//             </nav>
//             <main>
//                 <section>
//                     <h2>Booking Trends View</h2>
//                     <div className="chart-container">
//                         <canvas ref={chartRef}></canvas>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default HotelDashboard