import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../state/hooks/useStore";

function PrivateRoute() {
  const { user } = useStore();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
