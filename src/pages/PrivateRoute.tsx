import { Navigate } from 'react-router-dom';
import { Token } from '../utils/utils';

const PrivateRoute = ({ children }) => {
  const access_token = Token();
  const user = access_token !== null && access_token !== undefined;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
