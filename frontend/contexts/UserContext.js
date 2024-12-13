import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token fetched in UserContext:', token);
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token in UserContext:', decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Define useUser hook for easy access to the context
export const useUser = () => useContext(UserContext);
