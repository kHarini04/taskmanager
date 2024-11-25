

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Signup';  // Default import
import Login from './Login';    // Default import
import Dashboard from './Dashboard';  // Default import
import ProtectedRoute from './ProtectedRoute';  // Default import
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

