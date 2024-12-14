// import React, { createContext, useContext, useState, useEffect } from 'react';
// import {jwtDecode} from 'jwt-decode';  // Ensure correct import, use 'import' not '{ jwtDecode }'

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         return jwtDecode(token); // Automatically decode token on initial load
//       } catch {
//         localStorage.removeItem('token'); // Clear token if it's invalid
//         return null;
//       }
//     }
//     return null;
//   });

//   const loginUser = (newToken) => {
//     localStorage.setItem('token', newToken); // Save new token to localStorage
//     setUser(jwtDecode(newToken)); // Decode and set user
//   };

//   const logoutUser = () => {
//     localStorage.removeItem('token'); // Clear the token from localStorage
//     setUser(null); // Reset user state
//   };

//   return (
//     <UserContext.Provider value={{ user, loginUser, logoutUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
