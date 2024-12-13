import React from "react";
import { Container, Row, Col } from "react-grid-system";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import localisLogo from "../../assets/images/localisLogo.png";
import landingPage from "../../assets/images/landingPage.jpg";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container fluid className="landing-page-container">
      <Row justify="center" align="center" className="landing-page-row">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="landing-title">Welcome</h1>
          <div className="landing-card">
            <div className="logo-container">
              <img src={localisLogo} alt="Localis Logo" className="logo" />
              <h1 className="logo-title">Localis</h1>
            </div>
            <div className="button-container">
              <button
                className="primary-button"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <p
                className="register-link"
                onClick={() => navigate("/role-page")}
              >
                Register
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
