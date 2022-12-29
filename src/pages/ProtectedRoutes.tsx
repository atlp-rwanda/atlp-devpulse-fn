import React from "react";
import { Navigate } from "react-router-dom";
import { Token } from "../utils/utils";

const access_token = Token();
const user =
  access_token !== null && access_token !== undefined && access_token !== "";

const ProtectedRoutes = ({ children }) => {
  // const ProtectedRoutes = ({ isSignedIn, children }) => {
  //   if (!user) {
  //     return <Navigate to="/login" replace />;
  //   }
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
