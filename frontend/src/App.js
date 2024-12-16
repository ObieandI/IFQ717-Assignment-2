import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import RolePage from './pages/RolePage/RolePage.js';
import HotelDashboard from './pages/HotelDashboard/HotelDashboard.js';
import GovernmentDashboard from './pages/GovernmentDashboard/GovernmentDashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role-page" element={<RolePage />} />

        {/* Role-based routes */}
        <Route path="/hotel" element={<HotelDashboard />} />
        <Route path="/government" element={<GovernmentDashboard />} />

        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
