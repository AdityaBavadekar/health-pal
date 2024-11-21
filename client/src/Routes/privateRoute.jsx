import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookie.get("jwt");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
