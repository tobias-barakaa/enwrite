import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useSelector((state: { auth: { userInfo: { id: string; name: string } } }) => state.auth);

  return userInfo ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
