import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = async (e: any) => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <div className=" is-active focus:text-green-600  p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold">
      <label className="mr-3 p-1">
      <Icon icon="nimbus:arrow-left"></Icon>
      </label>
      <button className=" p-1" onClick={(e) => handleLogout(e)}>
        Logout
      </button>
    </div>
  );
};
export default LogoutPage;
