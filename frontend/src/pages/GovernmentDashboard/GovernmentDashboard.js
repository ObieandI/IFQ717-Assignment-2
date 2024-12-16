import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar.js";
import "./GovernmentDashboard.css";

function GovernmentDashboard() {
    const [occupancyData, setOccupancyData] = useState([]);
    const [loading, setLoading] = useState(true);  // Start with loading true to fetch initial data
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
      region: "",
      startDate: "",
      endDate: "",
    });
  
    useEffect(() => {
      fetchOccupancyRates({});
    }, []);
  
    const applyFilters = () => {
      fetchOccupancyRates(filters);
    };
  
    const fetchOccupancyRates = async (filters) => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication error: No token found. Please log in again.");
          throw new Error("No token found. Please log in again.");
        }
  
        const params = {
          ...(filters.region && { region_name: filters.region }),
          ...(filters.startDate && { start_date: filters.startDate }),
          ...(filters.endDate && { end_date: filters.endDate }),
        };
  
        const response = await axios.get(
          "http://localhost:5000/government/occupancy-rates",
          {
            headers: { Authorization: `Bearer ${token}` },
            params,
          }
        );
  
        if(response.data.data) {
          setOccupancyData(
            response.data.data.map((item) => ({
              regionName: item.region_name,
              occupancy: item.average_historical_occupancy,
              dailyRate: item.average_daily_rate,
            }))
          );
        } else {
          setError("No data available for the given parameters.");
          setOccupancyData([]);  // Clear previous data
        }
      } catch (error) {
        console.error("Error fetching occupancy rates:", error);
        setError("Failed to fetch data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const prepareChartData = (data, labelKey, valueKey) => ({
      labels: data.map((item) => item.regionName),
      datasets: [
        {
          label: labelKey,
          data: data.map((item) => item[valueKey]),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  
    return (
      <div className="container-fluid governmentDashboard">
        <DashboardNavbar />
        <section className="dashboardContent">
          <div>
            <input
              type="text"
              placeholder="Region Name"
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
            <button onClick={applyFilters}>Submit</button>
          </div>
          {error && <p className="text-danger">{error}</p>}
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="chart-container">
                    <h3>Average Occupancy Rates by Region</h3>
                    {occupancyData.length > 0 ? (
                      <Bar
                        data={prepareChartData(
                          occupancyData,
                          "Average Historical Occupancy",
                          "occupancy"
                        )}
                        options={{
                          maintainAspectRatio: false,
                          scales: {
                            y: { beginAtZero: true },
                          },
                        }}
                      />
                    ) : (
                      <p>No data to display</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="chart-container">
                    <h3>Average Daily Rates by Region</h3>
                    {occupancyData.length > 0 ? (
                      <Bar
                        data={prepareChartData(
                          occupancyData,
                          "Average Daily Rate",
                          "dailyRate"
                        )}
                        options={{
                          maintainAspectRatio: false,
                          scales: {
                            y: { beginAtZero: true },
                          },
                        }}
                      />
                    ) : (
                      <p>No data to display</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
  
  export default GovernmentDashboard;