import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust the path as necessary

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user.isVerified) {
    return <Navigate to="/transactionverify" replace />;
  }

  return children;
};

export default ProtectedRoute;
