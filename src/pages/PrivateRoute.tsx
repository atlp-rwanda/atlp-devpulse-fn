import { Navigate, useLocation } from "react-router-dom";
import { Token } from "../utils/utils";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const access_token = Token();
  const location = useLocation();
  const user =
    //@ts-ignore
    access_token !== null && access_token !== undefined && access_token !== '';

  useEffect(() => {
    if(!user){
      localStorage.setItem('lastAttemptedRoute', location.pathname);
    }
  }, [user, location])
  return user ? children : <Navigate to="/login" />;
};


export default PrivateRoute;
