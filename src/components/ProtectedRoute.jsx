import { SocketProvider } from "@/socket";
import { readCookie } from "@/utils/readCookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const adminStatus = readCookie("admin-status");
  const isAuthenticated = JSON.parse(JSON.stringify(adminStatus) || "false");

  const [isReturn, setIsReturn] = useState(true);
  const userInfo = readCookie("userInfo");
  const permissions = userInfo?.permissions || "";
  const { pathname } = useLocation();
  // console.log("userInfo", userInfo);

  const perm = {
    dashboard: "dashboard",
    "sub-admin": "subAdmin",
    customer: "customer",
    restaurant: "restaurant",
    vendor: "vendor",
    "delivery-agent": "deliveryAgent",
    order: "order",
    reviews: "review",
    offers: "offer",
    "application-request": "applicationRequest",
  };

  const value = pathname.split("/admin/").join("").split("/")[0];
  const navigate = useNavigate();
  let foundValue = perm[value];
  // console.log("value", value);
  // console.log("foundValue", foundValue);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    // Don’t do anything until userInfo is defined
    if (!userInfo) return;

    const hasPermission = permissions?.[foundValue] !== "none";

    if (
      pathname.includes("/admin/") &&
      value &&
      hasPermission &&
      isAuthenticated
    ) {
      setIsReturn(false);
    } else {
      if (isAuthenticated) navigate(-1); // Only navigate back if the user is logged in but unauthorized
    }
  }, [
    pathname,
    userInfo,
    foundValue,
    value,
    isAuthenticated,
    navigate,
    permissions,
  ]);

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};

export default ProtectedRoute;
