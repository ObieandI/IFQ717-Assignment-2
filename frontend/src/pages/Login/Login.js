import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import localisLogo from "../../assets/images/localisLogo.png";
import ".././../components/AuthCard/Auth.css";
import "../../../styles/global.css";

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
      const errorMessage = err.response
        ? err.response.data.error
        : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <div className="container auth-container">
      <div className="row">
        <div className="col-lg-6 col-md-6 justify-items-center">
          <div className="auth-card">
            <div className="logo-container py-3">
              <img src={localisLogo} alt="Localis Logo" className="logo" />
              <h1>Localis</h1>
            </div>
            <h3 className="py-2">Welcome</h3>
            <p className="card-prompt">Log in below to continue.</p>
            <form onSubmit={handleLogin}>
              <input
                type="text"
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
              <button type="submit" className="auth-button">
                Continue
              </button>
            </form>
            <p className="small-font py-1">
              Don’t have an account?{" "}
              <span
                className="auth-link"
                onClick={() => navigate("/role-page")}
              >
                Sign up
              </span>
            </p>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
