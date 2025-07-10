import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/shared/Loading/Loading";
import { handlePremiumExpiry } from "../utils/utils";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  handlePremiumExpiry();
  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={location?.pathname}></Navigate>;
  }
  return children;
};

export default PrivetRoutes;
