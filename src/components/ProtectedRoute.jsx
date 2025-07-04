import { SocketProvider } from "@/socket";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("admin-status")|| "false");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};

export default ProtectedRoute;
