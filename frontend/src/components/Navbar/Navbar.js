import React from "react";
import { useNavigate } from "react-router-dom";
import localisLogo from "../../assets/images/localisLogo.png"; // Correct path to your logo image
import "./Navbar.css"; // Ensure the CSS path matches your file structure
import "../../../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar({ dashboardType }) {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-content">
          <div className="row d-flex align-items-center">
            <div className="col-1 col-md-1">
              <div className="logo-section">
                <img
                  src={localisLogo}
                  alt="Localis Logo"
                  className="d-none d-md-block"
                />
              </div>
            </div>
            <div className="col-7 col-md-8">
              <div className="nav-links d-flex">
                {dashboardType === "hotel" && (
                  <>
                    <a href="#avgdailyrates">Average Daily Rates</a>
                    <a href="#avgbookingwindows">Average Booking Windows</a>
                  </>
                )}
                {dashboardType === "government" && (
                  <>
                    <a href="#occupancy">Occupancy Rates</a>
                    <a href="#dailyRates">Daily Rates</a>
                  </>
                )}
                {dashboardType === "admin" && (
                  <>
                    <a href="#tourismsettings">Tourism Settings</a>
                  </>
                )}
              </div>
            </div>
            <div className="col-4 col-md-3">
              <div className="logout-section">
                <button onClick={onLogout}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
