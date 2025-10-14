import { getSocket } from "@/socket";
import playSound from "@/utils/NotificationSound";
import { readCookie } from "@/utils/readCookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const showToast = (message) => {
  toast.success(message, {
    duration: 4000,
  });
};

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
    zones: "zones",
    notifications: "notifications",
    tickets: "tickets",
    content: "content",
  };

  const value = pathname.split("/admin/").join("").split("/")[0];
  const navigate = useNavigate();
  let foundValue = perm[value];
  // console.log("value", value);
  // console.log("foundValue", foundValue);


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
      const { order, message } = response;
      if (message) {
        showToast(message);
        return;
      }
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

    const handleOrderReady = (response) => {
      console.log("handleOrderReady res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleDeliveryPartnerAssigned = (response) => {
      console.log("handledeliveryPartnerAssigned res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleDeliveryPartnerArrived = (response) => {
      console.log("handleDeliveryPartnerArrived res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleOrderCancelled = (response) => {
      console.log("handleOrderCancelled res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleOrderPickedUp = (response) => {
      console.log("handleOrderCancelled res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleAcceptOrder = (response) => {
      console.log("handleAcceptOrder res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleReachedDeliveryLocation = (response) => {
      console.log("handleReachedDeliveryLocation res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleOrderDelivered = (response) => {
      console.log("handleOrderDelivered res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleCustomerUnavailable = (response) => {
      console.log("handleCustomerUnavailable res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleItemsVerified = (response) => {
      console.log("handleItemsVerified res:", response);
      const { message } = response;
      showToast(message);
    };

    const handleCollectionStarted = (response) => {
      console.log("handleCollectionStarted res:", response);
      const { message } = response;
      showToast(message);
    };

    const handlePartnerRejectedOrder = (response) => {
      console.log("handlePartnerRejectedOrder res:", response);
      const { message } = response;
      showToast(message);
    };

    socket.on("NEW_ORDER", handleNewOrder);
    socket.on("order_update", handleOrderUpdate);
    socket.on("order-ready", handleOrderReady);
    socket.on("delivery-partner-assigned", handleDeliveryPartnerAssigned);
    socket.on("delivery-partner-arrived", handleDeliveryPartnerArrived);
    socket.on("order-cancelled", handleOrderCancelled); // TODO: Test
    socket.on("order-picked-up", handleOrderPickedUp);
    socket.on("accept-order", handleAcceptOrder);
    socket.on("reached-delivery-location", handleReachedDeliveryLocation);
    socket.on("order-delivered", handleOrderDelivered);
    socket.on("customer-unavailable", handleCustomerUnavailable);
    socket.on("items-verified", handleCustomerUnavailable);
    socket.on("collection-started", handleItemsVerified);
    socket.on("partner-rejected-order", handlePartnerRejectedOrder);

    return () => {
      socket.off("NEW_ORDER", handleNewOrder);
      socket.off("order_update", handleOrderUpdate);
      socket.off("order-ready", handleOrderReady);
      socket.off("delivery-partner-assigned", handleDeliveryPartnerAssigned);
      socket.off("delivery-partner-arrived", handleDeliveryPartnerArrived);
      socket.off("order-picked-up", handleOrderPickedUp);
      socket.off("accept-order", handleAcceptOrder);
      socket.off("reached-delivery-location", handleReachedDeliveryLocation);
      socket.off("order-delivered", handleOrderDelivered);
      socket.off("customer-unavailable", handleCustomerUnavailable);
      socket.off("items-verified", handleItemsVerified);
      socket.off("collection-started", handleCollectionStarted);
      socket.off("partner-rejected-order", handlePartnerRejectedOrder);
    };
  }, []);

  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
