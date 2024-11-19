import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const {children} = props;
  return localStorage.getItem("jwt") ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
