import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode to decode the token
import { Container, Row, Col } from "react-grid-system";
import "./Login.css";
import localisLogo from "../../assets/images/localisLogo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", { username, password });
      const { token } = response.data; // Extract token

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Decode token to get user role
      const decoded = jwtDecode(token);
      console.log("Token:", token, "Role:", decoded.role);

      // Navigate based on user role extracted from the token
      switch (decoded.role) {
        case "admin":
          navigate("/admin");
          break;
        case "government":
          navigate("/government");
          break;
        case "hotel":
          navigate("/hotel");
          break;
        default:
          setError("Unknown user role. Please contact support.");
          break;
      }
    } catch (err) {
      const errorMessage = err.response ? err.response.data.error : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row justify="center" align="center" className="login-row">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="login-card">
            <div className="logo-container">
              <img src={localisLogo} alt="Localis Logo" className="logo" />
              <h1>localis</h1>
            </div>
            <div className="login-details">
              <h2>Welcome</h2>
              <p className="login-card-prompt">Log in below to continue.</p>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="login-button">
                  Continue
                </button>
              </form>
              <p className="signup">
                Don’t have an account?{" "}
                <span className="signup-link" onClick={() => navigate("/role-page")}>
                  Sign up
                </span>
              </p>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
