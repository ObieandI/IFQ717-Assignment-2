import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHotel } from "react-icons/fa"; // Icons for roles
import { Container, Row, Col } from "react-grid-system";
import "./RolePage.css";

function RolePage() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // Store the selected role in localStorage
    localStorage.setItem("role", role);
    navigate("/register");
  };

  return (
    <Container fluid className="role-container">
      <Row justify="center" align="center" className="role-row">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="role-card">
            <h1 className="role-title">Select Your Role</h1>
            <Row className="role-buttons">
              <Col xs={12} className="role-col">
                <button
                  className="role-button"
                  onClick={() => handleRoleSelection("government")}
                >
                  <Row align="center">
                    <Col xs={2} className="role-icon-col">
                      <FaUsers className="role-icon" />
                    </Col>
                    <Col xs={10} className="role-text-col">
                      Government User
                    </Col>
                  </Row>
                </button>
              </Col>
              <Col xs={12} className="role-col">
                <button
                  className="role-button"
                  onClick={() => handleRoleSelection("hotel")}
                >
                  <Row align="center">
                    <Col xs={2} className="role-icon-col">
                      <FaHotel className="role-icon" />
                    </Col>
                    <Col xs={10} className="role-text-col">
                      Hotel Owner
                    </Col>
                  </Row>
                </button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RolePage;
