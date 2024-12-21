import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Navbar from "../../components/Navbar/Navbar.js";
import Footer from "../../components/Footer/Footer.js";
import "./HotelDashboard.css";
import "../../../styles/global.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HotelDashboard = () => {
  const [dailyRates, setDailyRates] = useState([]);
  const [bookingWindows, setBookingWindows] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/hotel/booking-rates",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setLabels(response.data.data.map((item) => item.region_name));
        setDailyRates(
          response.data.data.map((item) => item.average_daily_rate)
        );
        setBookingWindows(
          response.data.data.map((item) => item.average_booking_window)
        );
      } catch (error) {
        console.error("Error during data fetch:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid hotel-dashboard">
      <Navbar dashboardType="hotel" />
      <section className="hotel-content">
        <div className="container">
          <div className="row">
            <div className="col-12 py-5">
              <h3 className="py-3 justify-self-center">Average Daily Rates</h3>
              <div className="chart-container">
                <Bar
                  key={`dailyRates-${dailyRates.length}`}
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        label: "Average Daily Rate",
                        data: dailyRates,
                        backgroundColor: "rgba(3, 120, 86, 0.8)",
                        borderColor: "rgba(3, 131, 95, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="col-12 py-5">
              <h3 className="py-3 justify-self-center">
                Average Booking Windows
              </h3>
              <div className="chart-container">
                <Bar
                  key={`bookingWindows-${bookingWindows.length}`}
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        label: "Average Booking Window",
                        data: bookingWindows,
                        backgroundColor: "rgba(200, 132, 65, 0.8)",
                        borderColor: "rgba(178, 96, 47, 1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HotelDashboard;
