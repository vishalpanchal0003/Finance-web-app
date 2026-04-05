import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../src/Context/AppContext"

const ProtectedRoute = ({ children, allowedRole }) => {
  const { role } = useContext(AppContext);

  if (role !== allowedRole) {
    return <Navigate to="/userpannel" replace />;
  }

  return children;
};

export default ProtectedRoute;