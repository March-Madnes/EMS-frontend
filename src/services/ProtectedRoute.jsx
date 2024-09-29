import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { account, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while authentication is being checked
  }

  if (!account) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
