import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../src/Context/AppContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { role } = useContext(AppContext);

  // 🔥 wait jab tak role ready nahi
  if (role === null) return null;

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;