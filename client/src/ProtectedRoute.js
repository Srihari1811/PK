import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check if user is authenticated

  return isAuthenticated ? children : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
