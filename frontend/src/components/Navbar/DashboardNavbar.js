import React from "react";
import "./DashboardNavbar.css"; // Ensure the CSS path matches your file structure
import localisLogo from "../../assets/images/localisLogo.png"; // Correct path to your logo image
import { Row, Col, Container } from "react-bootstrap";

function DashboardNavbar({ onLogout }) {
  return (
    <nav className="dashboard-navbar">
      <Container>
        <Row>
          <Col md={2}>
            <div className="nav-content">
              <div className="logo-section">
                <img src={localisLogo} alt="Localis Logo" /> // Updated to use
                imported image
              </div>
              <div className="nav-links">
                <a href="#occupancy">Occupancy Rates</a>
                <a href="#dailyRates">Daily Rates</a>
              </div>
              <div className="logout-section">
                <button onClick={onLogout}>Log Out</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}

export default DashboardNavbar;
