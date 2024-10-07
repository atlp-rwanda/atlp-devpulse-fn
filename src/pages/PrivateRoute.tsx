import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Token } from "../utils/utils";
import { useEffect, useState } from "react";


const PrivateRoute = ({ children, allowedRoles }) => {
  const access_token = Token();
  const roleName = localStorage.getItem('roleName');
  const location = useLocation();
  
  const user = access_token && roleName && allowedRoles.includes(roleName);
  if (!access_token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Navigate to="/pageNotFound" />;
  }

  return children; 
};


export default PrivateRoute;