import { getSocket } from "@/socket";
import playSound from "@/utils/NotificationSound";
import { readCookie } from "@/utils/readCookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const adminStatus = readCookie("admin-status");
  const isAuthenticated = JSON.parse(JSON.stringify(adminStatus) || "false");
  const socket = getSocket();

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

  useEffect(() => {
    const handleNewOrder = (response) => {
      console.log("New order received:", response);
      const { order } = response;
      toast.success(`New Order #${order.orderNumber} received! 🚀`, {
        duration: 4000,
        // position: "top-right",
      });
      playSound();
    };

    const handleOrderUpdate = (response) => {
      console.log("order update:", response);
      const { order } = response;
      if (order.status === "rejected") {
         toast.error(`Order #${order.orderNumber} rejected by Resaturant! 🚀`, {
           duration: 4000,
           // position: "top-right",
         });
      } else {
        toast.success(
          `Order #${order.orderNumber} accepted by Resaturant! 🚀`,
          {
            duration: 4000,
            // position: "top-right",
          }
        );
      }
    };

    socket.on("NEW_ORDER", handleNewOrder);
    socket.on("order_update", handleOrderUpdate);

    return () => {
      socket.off("NEW_ORDER", handleNewOrder);
      socket.off("order_update", handleOrderUpdate);
    };
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
