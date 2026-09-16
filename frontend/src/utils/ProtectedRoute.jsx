import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading === true) {
    return null;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
