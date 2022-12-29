import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Token } from "../utils/utils";

const access_token = Token();
const authenticated =
  access_token !== null && access_token !== undefined && access_token !== "";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = async (e: any) => {
    await localStorage.removeItem("access_token");
    console.log("Logout");
    navigate("/login");
  };

  return authenticated ? (
    <Navigate to="/cycles" />
  ) : (
    <div className="App">
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
};
export default LogoutPage;
