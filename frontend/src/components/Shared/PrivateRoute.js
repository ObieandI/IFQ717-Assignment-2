// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useUser } from '../../../contexts/UserContext.js'; // Adjust the path to where your UserContext is defined

// const PrivateRoute = ({ children, role }) => {
//   const { user } = useUser();
//   const location = useLocation();

//   // Check if the user exists and has the correct role
//   if (!user || user.role !== role) {
//     // Redirect them to the login page, but save the current location they were trying to go to
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRoute;
