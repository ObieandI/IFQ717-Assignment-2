import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar.js";
import "./GovernmentDashboard.css";
import "../../../styles/global.css";
import Footer from "../../components/Footer/Footer.js";

function GovernmentDashboard() {
  const [occupancyData, setOccupancyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for CSV export filters
  const [filters, setFilters] = useState({
    region: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchOccupancyRates(); // Fetch data on component mount
  }, []);

  const fetchOccupancyRates = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication error: No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/government/occupancy-rates",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.data) {
        setOccupancyData(
          response.data.data.map((item) => ({
            regionName: item.region_name,
            occupancy: item.average_historical_occupancy,
            dailyRate: item.average_daily_rate,
          }))
        );
      } else {
        setError("No data available.");
        setOccupancyData([]);
      }
    } catch (error) {
      console.error("Error fetching occupancy rates:", error);
      setError("Failed to fetch data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const exportToCsv = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication error: No token found. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/government/export-data",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            region_name: filters.region,
            start_date: filters.startDate,
            end_date: filters.endDate,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "export-data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting data:", error);
      setError("Failed to export data: " + error.message);
    }
  };

  return (
    <div className="container-fluid government-dashboard">
      <Navbar dashboardType="government" />
      <section className="government-content">
          <div className="container">
            <div className="row">
              <div className="col-12 py-5">
                <h3 className="py-3 justify-self-center">
                  Average Occupancy Rates by Region
                </h3>
                <div className="chart-container py-5">
                  {occupancyData.length > 0 ? (
                    <Bar
                      data={{
                        labels: occupancyData.map((item) => item.regionName),
                        datasets: [
                          {
                            label: "Average Historical Occupancy",
                            data: occupancyData.map((item) => item.occupancy),
                            backgroundColor: "rgba(3, 120, 86, 0.8)",
                            borderColor: "rgb(3, 131, 95, 1)",
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        maintainAspectRatio: false,
                        scales: { y: { beginAtZero: true } },
                      }}
                    />
                  ) : (
                    <p>No data to display</p>
                  )}
                </div>
              </div>
              <div className="col-12 pb-5">
                <h3 className="py-3 justify-self-center">
                  Average Daily Rates by Region
                </h3>
                <div className="chart-container py-5">
                  {occupancyData.length > 0 ? (
                    <Bar
                      data={{
                        labels: occupancyData.map((item) => item.regionName),
                        datasets: [
                          {
                            label: "Average Daily Rate",
                            data: occupancyData.map((item) => item.dailyRate),
                            backgroundColor: "rgba(3, 120, 86, 0.8)",
                            borderColor: "rgb(3, 131, 95, 1)",
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        maintainAspectRatio: false,
                        scales: { y: { beginAtZero: true } },
                      }}
                    />
                  ) : (
                    <p>No data to display</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        {/* CSV Export Section */}
        <div className="container form-container">
          <div className="row">
            <div className="col-4 input-col">
              <input
                type="text"
                name="region"
                placeholder="Region Name for Export"
                value={filters.region}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-4 input-col">
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-4 input-col">
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row py-5">
            <button className="govt-button" onClick={exportToCsv}>
              Export to CSV
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default GovernmentDashboard;
