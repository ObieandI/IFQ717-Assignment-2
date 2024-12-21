import React, { useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import "../../../styles/global.css";
import Navbar from "../../components/Navbar/Navbar.js";

function AdminDashboard() {
  const [formData, setFormData] = useState({
    region_name: "",
    date: "",
    average_historical_occupancy: "",
    average_daily_rate: "",
    average_length_of_stay: "",
    average_booking_window: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success message
  
    // Validate date
    if (!isValidDate(formData.date)) {
      setError("Invalid date. Please enter a valid date.");
      return;
    }
  
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }
  
    try {
      const data = {
        region_name: formData.region_name,
        date: formData.date,
        average_historical_occupancy: formData.average_historical_occupancy,
        average_daily_rate: formData.average_daily_rate,
        average_length_of_stay: formData.average_length_of_stay,
        average_booking_window: formData.average_booking_window,
      };
  
      const response = await axios.post(
        "http://localhost:5000/admin/statistics",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly send the token
          },
        }
      );
  
      setSuccess("Tourism statistics added successfully!");
      setFormData({
        region_name: "",
        date: "",
        average_historical_occupancy: "",
        average_daily_rate: "",
        average_length_of_stay: "",
        average_booking_window: "",
      });
    } catch (error) {
      console.error("Failed to add statistics:", error);
      setError("Failed to add statistics. Please try again.");
    }
  };
  
  // Helper function to validate date
  function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
  }

  return (
    <div className="container-fluid admin-dashboard">
      <Navbar dashboardType="admin" />
      <section className="admin-content">
        <div className="container">
          <div className="row">
            <div className="col-12 py-5">
              <h3 className="pb-3 justify-self-center">Add New Tourism Statistics</h3>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <form onSubmit={handleSubmit} className="adminForm justify-self-center">
                <label>
                  <p>Region Name:</p>
                  <input
                    type="text"
                    name="region_name"
                    value={formData.region_name}
                    onChange={handleInputChange}
                    placeholder="Enter region name"
                    required
                  />
                </label>
                <label>
                  <p>Date:</p>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  <p>Average Historical Occupancy:</p>
                  <input
                    type="number"
                    name="average_historical_occupancy"
                    value={formData.average_historical_occupancy}
                    onChange={handleInputChange}
                    placeholder="Enter occupancy rate"
                    step="0.01"
                    required
                  />
                </label>
                <label>
                  <p>Average Daily Rate:</p>
                  <input
                    type="number"
                    name="average_daily_rate"
                    value={formData.average_daily_rate}
                    onChange={handleInputChange}
                    placeholder="Enter daily rate"
                    step="0.01"
                    required
                  />
                </label>
                <label>
                  <p>Average Length of Stay:</p>
                  <input
                    type="number"
                    name="average_length_of_stay"
                    value={formData.average_length_of_stay}
                    onChange={handleInputChange}
                    placeholder="Enter length of stay"
                    step="0.01"
                    required
                  />
                </label>
                <label>
                  <p>Average Booking Window:</p>
                  <input
                    type="number"
                    name="average_booking_window"
                    value={formData.average_booking_window}
                    onChange={handleInputChange}
                    placeholder="Enter booking window"
                    step="0.01"
                    required
                  />
                </label>
                <button className="admin-button" type="submit">
                  <p>Add Statistics</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
