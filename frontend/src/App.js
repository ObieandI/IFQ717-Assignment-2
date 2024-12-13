import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext.js';
import LandingPage from './pages/LandingPage/LandingPage.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import RolePage from './pages/RolePage/RolePage.js'; // Adjust the path as necessary
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.js';
import HotelDashboard from './pages/HotelDashboard/HotelDashboard.js';
import GovernmentDashboard from './pages/GovernmentDashboard/GovernmentDashboard.js';
import PrivateRoute from './components/Shared/PrivateRoute.js'; // Adjust the path according to your file structure

const isDevelopment = process.env.NODE_ENV === 'development';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>

          {/* <Route path="/" element={<Navigate replace to="/role-page" />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role-page" element={<RolePage />} />  {/* Add the RolePage route */}

          {/* <Route path="/" element={<Navigate replace to={isDevelopment ? "/admin" : "/login"} />} /> */}

          {/* Development Mode: Direct access for faster UI development */}
          {isDevelopment && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/hotel" element={<HotelDashboard />} />
              <Route path="/government" element={<GovernmentDashboard />} />
            </>
          )}

          {/* Production Mode: Protected routes */}
          {!isDevelopment && (
            <>
              <Route 
                path="/admin" 
                element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} 
              />
              <Route 
                path="/hotel" 
                element={<PrivateRoute role="hotel"><HotelDashboard /></PrivateRoute>} 
              />
              <Route 
                path="/government" 
                element={<PrivateRoute role="government"><GovernmentDashboard /></PrivateRoute>} 
              />
            </>
          )}

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
