import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-grid-system";
import "./Register.css";
import localisLogo from "../../assets/images/localisLogo.png";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!role) {
        throw new Error(
          "Role is not selected. Please go back and select a role."
        );
      }

      // Send POST request to the backend
      const response = await axios.post("/users/register", {
        username,
        password,
        role, // Include role in the registration data
      });

      // Handle successful registration
      alert(response.data.message || "Registration successful!");
      navigate("/login"); // Navigate to login page
    } catch (error) {
      // Handle errors from the backend
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.error || "An error occurred during registration."
      );
    }
  };

  return (
    <div className="container register-container">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className="register-card">
            <div className="logo-container">
              <img src={localisLogo} alt="Localis Logo" className="logo" />
              <h1>localis</h1>
            </div>
            <div className="registration-details">
              <h2>Welcome</h2>
              <p className="registration-card-prompt">
                {role === "hotel" ? (
                  <>
                    Sign up as a <strong>hotel owner</strong>.
                  </>
                ) : role === "government" ? (
                  <>
                    Sign up as a <strong>government user</strong>.
                  </>
                ) : (
                  <>
                    Sign up as a <strong>{role}</strong>.
                  </>
                )}
              </p>
              <form onSubmit={handleRegister}>
                <input
                  type="email"
                  placeholder="Email address*"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input"
                />
                <input
                  type="password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <button type="submit" className="register-button">
                  Register
                </button>
              </form>
              {error && <p className="error-message">{error}</p>}
              <p className="login">
                Already have an account?{" "}
                <span className="login-link" onClick={() => navigate("/login")}>
                  Log in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
