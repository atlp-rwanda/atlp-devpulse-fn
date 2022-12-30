import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = async (e: any) => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="App grid h-screen place-items-center justify-center text-lg font-bold border-2 border-solid rounded-sm">
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
};
export default LogoutPage;
