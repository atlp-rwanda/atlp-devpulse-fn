import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = async (e: any) => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <div className="flex ">
      <Icon icon="nimbus:arrow-left"></Icon>
      <button className="ml-2 pt-1" onClick={(e) => handleLogout(e)}>
        Logout
      </button>
    </div>
  );
};
export default LogoutPage;
