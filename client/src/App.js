import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './authfrom';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import Dashboard from './Dashboard'; // Example of a protected component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public route for login or auth form */}
        <Route path="/" element={<AuthForm />} />

        {/* Protected route, only accessible if authenticated */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard /> {/* This is the protected component */}
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
