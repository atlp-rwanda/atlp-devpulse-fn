import React from "react";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("roleName");
  const rolePrefix = role === "admin" || role === "superAdmin" ? "admin" : role;

  return (
    <div>
      <h1 className="text-white font-bold text-xl py-7">PROFILE PAGE</h1>
      <button
        onClick={() => navigate(`/${rolePrefix}/update-profile`)}
        className="w-40 py-2 bg-green text-white rounded-md hover:bg-"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
