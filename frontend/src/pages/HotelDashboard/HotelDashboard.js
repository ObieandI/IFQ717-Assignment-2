import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const HotelDashboard = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Average Daily Rate',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }]
    });

    useEffect(() => {
        const fetchData = async () => {

            try {
                const token = localStorage.getItem('token'); // Assuming you have stored the JWT token in localStorage
                const role = localStorage.getItem("role"); // Retrieve role from localStorage

                const response = await axios.get('http://localhost:5000/hotel/booking-rates', {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Set the Authorization header
                    },
                    params: {
                        region_name: 'YourRegion', // Specify your region dynamically if needed
                        start_date: '2023-01-01',
                        end_date: '2023-01-31',
                    }
                });

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
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                    <Bar data={chartData} />
                </section>
            </main>
        </div>
    );
}

export default HotelDashboard;
