import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correctly import jwtDecode as a named export

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />; // No token, redirect to login
  }

  try {
    // Decode token to check expiration
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      // Token has expired, redirect to login
      localStorage.removeItem('token'); // Optionally remove the token from localStorage
      return <Navigate to="/" />;
    }
  } catch (error) {
    // If the token is not valid or can't be decoded, redirect to login
    return <Navigate to="/" />;
  }

  return children; // Token is valid and not expired, render the protected component
};

export default ProtectedRoute;
