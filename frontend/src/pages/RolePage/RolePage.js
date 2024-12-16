import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaHotel } from "react-icons/fa"; // Icons for roles
import "./RolePage.css";
import "../../../styles/global.css"

function RolePage() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // Store the selected role in localStorage
    localStorage.setItem("role", role);
    navigate("/register");
  };

  return (
    <div className="container-fluid role-container">
      <div className="row">
        <div className="col-lg-12">
          <div className="role-card">
            <h1 className="role-title">Select Your Role</h1>
            <div className="row role-buttons d-inline-flex">
            <div className="col-12 justify-items-center">
              <button
                  className="role-button"
                  onClick={() => handleRoleSelection("government")}
                >
                  <div align="center">
                    <div className="col-2 role-icon-col">
                      <FaUsers className="role-icon" />
                    </div>
                    <div className="col-10 role-text-col">
                      Government User
                    </div>
                  </div>
                </button>
              </div>
            <div className="col-12 d-inline-flex justify-items-center">
                <button
                  className="role-button"
                  onClick={() => handleRoleSelection("hotel")}
                >
                  <div align="center">
                    <div className="col-2 role-icon-col">
                      <FaHotel className="role-icon" />
                    </div>
                    <div className="col-10 role-text-col">
                      Hotel Owner
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolePage;
