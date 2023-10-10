import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = async (e: any) => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <div className="flex items-center p-1 cursor-pointer">
      <Icon icon="nimbus:arrow-left"></Icon>
      <button className="ml-2" onClick={(e) => handleLogout(e)}>
        Logout
      </button>
    </div>
  );
};
export default LogoutPage;
