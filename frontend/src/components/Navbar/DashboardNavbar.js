import React from 'react';
import './DashboardNavbar.css';  // Ensure the CSS path matches your file structure

function DashboardNavbar({ onLogout }) {
    return (
        <nav className="dashboard-navbar">
            <div className="nav-content">
                <div className="logo-section">
                    <img src="/path-to-your-logo.svg" alt="Localis Logo" />
                </div>
                <div className="nav-links">
                    <a href="#occupancy">Occupancy Rates</a>
                    <a href="#dailyRates">Daily Rates</a>
                </div>
                <div className="logout-section">
                    <button onClick={onLogout}>Log Out</button>
                </div>
            </div>
        </nav>
    );
}

export default DashboardNavbar;
