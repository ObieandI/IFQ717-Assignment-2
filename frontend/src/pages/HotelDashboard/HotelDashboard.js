import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Chart from 'chart.js/auto';

const HotelDashboard = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Average Daily Rate',
            data: [],
            backgroundColor: 'rgba(75,192,192,0.5)'
        }]
    });
    const chartRef = useRef(null); // Ref for the canvas

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found. Please log in.');
                    return;
                }
    
                // Make the API request
                const response = await axios.get('http://localhost:5000/hotel/booking-rates', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Pass token for verification
                    }
                });
    
                // Log the data received
                console.log('Data received:', response.data);
    
                // Process and set chart data
                const labels = response.data.data.map(item => item.region_name);
                const data = response.data.data.map(item => item.average_daily_rate);
    
                setChartData({
                    labels,
                    datasets: [{
                        label: 'Average Daily Rate',
                        data,
                        backgroundColor: 'rgba(75,192,192,0.5)'
                    }]
                });
    
            } catch (error) {
                // Handle errors
                if (error.response) {
                    // Server responded with a status other than 2xx
                    console.error('Error response:', error.response.status, error.response.data);
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('No response received:', error.request);
                } else {
                    // Something else happened
                    console.error('Error during request:', error.message);
                }
            }
        };
    
        fetchData();
    }, []); // Run only once after the component mounts

    useEffect(() => {
        if (chartRef.current && chartData.labels.length > 0) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        x: {
                            type: 'category'
                        }
                    }
                }
            });

            return () => {
                chartInstance.destroy(); // Clean up chart instance on component unmount or data update
            };
        }
    }, [chartData]); // Effect runs when chartData updates

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
                    <h2>Booking Trends View</h2>
                    <canvas ref={chartRef}></canvas> {/* Use a canvas directly with a ref */}
                </section>
            </main>
        </div>
    );
};

export default HotelDashboard;
