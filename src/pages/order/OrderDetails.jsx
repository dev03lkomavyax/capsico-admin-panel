import avatar from "@/assets/Image-120.png";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import History from "@/components/order-details/History";
import OrderItem from "@/components/order-details/OrderItem";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import { viewDbImagePreview } from "@/lib/utils";
import { OrderSchema } from "@/schema/OrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import AssignDeliveryPartnerModal from "./AssignDeliveryPartnerModal";
import { getSocket } from "@/socket";
import { format } from "date-fns";
import OrderUpdateModal from "./OrderUpdateModal";
import CancelOrderModal from "./CancelOrderModal";
import SanitizationModal from "./SanitizationModal";
import InvoiceUploadModal from "./InvoiceUploadModal";
import OrderTimingTimeline from "./OrderTimeline";

const libraries = ["places", "marker"];

// const status = "Delivered";
// const status = "Preparing";
// const status = "New order";
const status = "Cancelled";

const OrderDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetailsData, setOrderDetailsData] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [isOrderUpdateModalOpen, setIsOrderUpdateModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSanitizationModalOpen, setIsSanitizationModalOpen] = useState(false);
  const [invoiceUploadModalOpen, setInvoiceUploadModalOpen] = useState(false);

  const [minute, setMinute] = useState(1);
  const socket = getSocket();

  const { timing, scheduleAt, deliveryPartner, cancelDetails } =
    orderDetailsData || {};

  const { res, fetchData, isLoading } = useGetApiReq();

  const getOrderDetails = () => {
    fetchData(`/admin/get-order/${orderId}`, {
      reportCrash: true,
      screenName: "ORDER_DETAILS_GET",
    });
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    const handleOrderUpdate = (response) => {
      console.log("order update:", response);
      const { order } = response;
      getOrderDetails();
    };

    socket.on("partner-rejected-order", handleOrderUpdate);
    return () => {
      socket.off("partner-rejected-order", handleOrderUpdate);
    };
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getOrderDetails", res?.data);
      setOrderDetailsData(res?.data?.data);
    }
  }, [res]);

  const handleOrderReady = () => {
    socket.emit("mark-order-ready", {
      orderId,
    });
  };

  const handleOrderPickedUp = () => {
    socket.emit("order_picked_up", {
      orderId,
    });
  };

  const handleOrderDelivered = () => {
    socket.emit("delivered", {
      orderId,
    });
  };

  const handleOrderAccept = () => {
    socket.emit("order_status_update", {
      orderId,
      status: "DELIVERYPARTNER_ACCEPTED",
    });
  };

  const handleReachedRestaurant = () => {
    socket.emit("reached_restaurant", {
      orderId,
    });
  };

  const handleStartFoodCollection = () => {
    socket.emit("start_food_collection", {
      orderId,
    });
  };

  const handleVerifyItem = () => {
    console.log("items_verified called");
    const verifiedItems = orderDetailsData?.items?.map((item) => ({
      itemId: item?.foodId?._id,
      name: item?.name,
      quantity: item?.quantity,
      verified: true,
    }));
    console.log("verifiedItems", verifiedItems);

    socket.emit("items_verified", {
      orderId,
      verifiedItems,
    });
  };

  const handleOrderCollection = () => {
    socket.emit("order_collection_completed", {
      orderId,
    });
  };

  const handleArriving = () => {
    socket.emit("arriving", {
      orderId,
    });
  };

  const handleReachedDeliveryLocation = () => {
    socket.emit("reached_delivery_location", {
      orderId,
    });
  };

  useEffect(() => {
    socket.on("order_status_updated", (data) => {
      console.log("order_status_updated", data);
      getOrderDetails();
    });

    socket.on("order-ready-response", (data) => {
      console.log("order-ready-response", data);
      getOrderDetails();
    });

    socket.on("cancellation_confirmed", (data) => {
      console.log("cancellation_confirmed", data);
      getOrderDetails();
    });

    socket.on("pickup_confirmed", (data) => {
      console.log("pickup_confirmed", data);
      getOrderDetails();
    });

    socket.on("delivery_confirmed", (data) => {
      console.log("delivery_confirmed", data);
      getOrderDetails();
    });

    socket.on("order_status_update-completed", (data) => {
      console.log("order_status_update-completed", data);
      getOrderDetails();
    });

    socket.on("reached_restaurant_confirmed", (data) => {
      console.log("reached_restaurant_confirmed", data);
      getOrderDetails();
    });

    socket.on("collection_tasks", (data) => {
      console.log("collection_tasks", data);
      getOrderDetails();
    });

    socket.on("sanitization_confirmed", (data) => {
      console.log("sanitization_confirmed", data);
      getOrderDetails();
    });

    socket.on("items_verification_confirmed", (data) => {
      console.log("items_verification_confirmed", data);
      getOrderDetails();
    });

    socket.on("collection_completed", (data) => {
      console.log("collection_completed", data);
      getOrderDetails();
    });

    socket.on("arriving_confirmed", (data) => {
      console.log("arriving_confirmed", data);
      getOrderDetails();
    });

    socket.on("reached_location_confirmed", (data) => {
      console.log("reached_location_confirmed", data);
      getOrderDetails();
    });

    return () => {
      socket.off("order_status_updated");
      socket.off("order-ready-response");
      socket.off("cancellation_confirmed");
      socket.off("pickup_confirmed");
      socket.off("order_status_update-completed");
      socket.off("reached_restaurant_confirmed");
      socket.off("collection_tasks");
      socket.off("sanitization_confirmed");
      socket.off("collection_completed");
      socket.off("arriving_confirmed");
      socket.off("reached_location_confirmed");
      socket.off("delivery_confirmed");
    };
  }, []);

   useEffect(() => {
     const handleOrderUpdate = (response) => {
       console.log("order update:", response);
       const { order } = response;
       getOrderDetails();
     };

     socket.on("order_update", handleOrderUpdate);
     socket.on("order-ready", handleOrderUpdate);
     socket.on("delivery-partner-assigned", handleOrderUpdate);
     socket.on("delivery-partner-arrived", handleOrderUpdate);
     socket.on("order-cancelled", handleOrderUpdate); // TODO: Test
     socket.on("order-picked-up", handleOrderUpdate);
     socket.on("accept-order", handleOrderUpdate);
     socket.on("reached-delivery-location", handleOrderUpdate);
     socket.on("order-delivered", handleOrderUpdate);
     socket.on("customer-unavailable", handleOrderUpdate);
     socket.on("items-verified", handleOrderUpdate);
     socket.on("collection-started", handleOrderUpdate);
     socket.on("partner-rejected-order", handleOrderUpdate);

     return () => {
       socket.off("order_update", handleOrderUpdate);
       socket.off("order-ready", handleOrderUpdate);
       socket.off("delivery-partner-assigned", handleOrderUpdate);
       socket.off("delivery-partner-arrived", handleOrderUpdate);
       socket.off("order-picked-up", handleOrderUpdate);
       socket.off("accept-order", handleOrderUpdate);
       socket.off("reached-delivery-location", handleOrderUpdate);
       socket.off("order-delivered", handleOrderUpdate);
       socket.off("customer-unavailable", handleOrderUpdate);
       socket.off("items-verified", handleOrderUpdate);
       socket.off("collection-started", handleOrderUpdate);
       socket.off("partner-rejected-order", handleOrderUpdate);
     };
   }, []);

  return (
    <AdminWrapper>
      <section>
        <div className="flex justify-between h-14">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1"
            >
              <IoIosArrowBack className="text-2xl" />
              <span className="font-roboto text-lg font-medium">
                Order ID #{orderDetailsData?.orderNumber}
              </span>
            </button>
            <span className="text-sm text-[#5F5F5F] font-roboto">
              Order Details
            </span>
          </div>
          {isModalOpen && (
            <AssignDeliveryPartnerModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              getDetails={getOrderDetails}
            />
          )}
          <div className="flex gap-5 items-center">
            {orderDetailsData?.status === "pending" && (
              <Button
                className="px-4"
                onClick={() => setIsOrderUpdateModalOpen(true)}
              >
                Accept Order
              </Button>
            )}

            {/* {orderDetailsData?.status === "confirmed" && (
              <Button className="px-4" onClick={() => setOpen(true)}>
                Cancel Order
              </Button>
            )} */}

            {orderDetailsData?.status === "confirmed" ||
              orderDetailsData?.status === "assigned_to_partner" ||
              (orderDetailsData?.status === "DELIVERYPARTNER_ACCEPTED" && (
                <Button className="px-4" onClick={handleOrderReady}>
                  Mark Order Ready
                </Button>
              ))}

            {orderDetailsData?.status === "ready_for_pickup" && (
              // <Button className="px-4" onClick={handleOrderPickedUp}>
              //   Mark Order Picked Up
              // </Button>
              <Button className="px-4" onClick={handleReachedRestaurant}>
                Mark Delivery Partner Reached Restaurant
              </Button>
            )}

            {orderDetailsData?.status === "reached_delivery_location" && (
              <Button className="px-4" onClick={handleOrderDelivered}>
                Mark Order Delivered
              </Button>
            )}

            {(orderDetailsData?.status === "assigned_to_partner" ||
              orderDetailsData?.status === "reassigned_to_partner") && (
              <Button className="px-4" onClick={handleOrderAccept}>
                Accept Order (Delivery Partner)
              </Button>
            )}

            {/* {orderDetailsData?.status === "DELIVERYPARTNER_ACCEPTED" && (
              <Button className="px-4" onClick={handleReachedRestaurant}>
                Mark Delivery Partner Reached Restaurant
              </Button>
            )} */}

            {orderDetailsData?.status === "delivery_partner_at_restaurant" &&
              orderDetailsData?.deliveryPartner?.collectionStatus !==
                "started" && (
                <Button className="px-4" onClick={handleStartFoodCollection}>
                  Start Food Collection
                </Button>
              )}

            {orderDetailsData?.deliveryPartner?.collectionStatus ===
              "started" &&
              !orderDetailsData?.deliveryPartner?.sanitizationCheck
                ?.completed && (
                <Button
                  className="px-4"
                  onClick={() => setIsSanitizationModalOpen(true)}
                >
                  Complete Sanitization
                </Button>
              )}

            {orderDetailsData?.deliveryPartner?.collectionStatus ===
              "started" &&
              orderDetailsData?.deliveryPartner?.sanitizationCheck?.completed &&
              !orderDetailsData?.deliveryPartner?.invoicePhoto && (
                <Button
                  className="px-4"
                  onClick={() => setInvoiceUploadModalOpen(true)}
                >
                  Upload Invoice
                </Button>
              )}

            {orderDetailsData?.deliveryPartner?.collectionStatus ===
              "started" &&
              !orderDetailsData?.deliveryPartner?.itemsVerification && (
                <Button className="px-4" onClick={handleVerifyItem}>
                  Verify Items
                </Button>
              )}

            {orderDetailsData?.status !== "picked_up" &&
              orderDetailsData?.deliveryPartner?.collectionStatus ===
                "started" &&
              orderDetailsData?.deliveryPartner?.sanitizationCheck?.completed &&
              orderDetailsData?.deliveryPartner?.itemsVerification &&
              orderDetailsData?.deliveryPartner?.invoicePhoto &&
              !orderDetailsData?.timing?.pickedUpAt && (
                <Button className="px-4" onClick={handleOrderCollection}>
                  Complete Order Collection
                </Button>
              )}

            {orderDetailsData?.status === "picked_up" && (
              <Button className="px-4" onClick={handleArriving}>
                Mark Arriving
              </Button>
            )}

            {orderDetailsData?.status === "arriving" && (
              <Button className="px-4" onClick={handleReachedDeliveryLocation}>
                Mark Reached Delivery Location
              </Button>
            )}

            {(orderDetailsData?.status === "confirmed" ||
              orderDetailsData?.status === "DELIVERYPARTNER_ACCEPTED" ||
              orderDetailsData?.status === "assigned_to_partner" ||
              orderDetailsData?.status === "reassigned_to_partner") && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="px-3 w-auto"
              >
                Assign Delivery Partner
              </Button>
            )}
            <div className="flex flex-col gap-1">
              <Button
                className={`${
                  orderDetailsData?.status === "delivered"
                    ? "text-[#167316] bg-[#CEFFCA]"
                    : orderDetailsData?.status === "preparing" ||
                        orderDetailsData?.status === "pending"
                      ? "text-[#787A23] bg-[#F7FFCA]"
                      : orderDetailsData?.status === "cancelled"
                        ? "text-[#BF1010] bg-[#FFE7E7]"
                        : "text-[#6223B5] bg-[#E1CAFF]"
                } !h-10 capitalize w-auto px-3 text-sm hover:text-[#167316] hover:bg-[#CEFFCA]`}
              >
                {orderDetailsData.status}
              </Button>
              <span className="text-xs text-muted-foreground">
                {orderDetailsData?.status === "assigned_to_partner"
                  ? "Delivery partner assigned but not accepted yet"
                  : orderDetailsData?.status === "DELIVERYPARTNER_ACCEPTED"
                    ? "Order accepted by Delivery Partner"
                    : ""}
              </span>
            </div>
          </div>
        </div>
        {/* h-[calc(100vh-56px)] */}
        <div className="grid grid-cols-[26%_71%] gap-[3%] mt-5">
          <div className="rounded-lg bg-white px-4 py-10">
            <div className="flex justify-center flex-col items-center">
              <img
                className="w-32 h-32 rounded-full cursor-pointer"
                src={
                  orderDetailsData?.userId?.image
                    ? viewDbImagePreview(orderDetailsData?.userId?.image)
                    : avatar
                }
                onClick={() =>
                  navigate(`/admin/customer/${orderDetailsData?.userId?._id}`)
                }
                alt="avatar"
              />
              <h2
                onClick={() =>
                  navigate(`/admin/customer/${orderDetailsData?.userId?._id}`)
                }
                className="font-medium font-roboto mt-3 cursor-pointer hover:text-blue-500 text-xl"
              >
                {orderDetailsData?.userId?.name}
              </h2>
              <p className="font-roboto text-[#838383] text-sm">Customer</p>
              {status === "preparing" && (
                <Button className="w-full text-white bg-[#1064FD] mt-2 hover:bg-[#1064FD]">
                  Order ready in{" "}
                  {orderDetailsData?.timing?.expectedPreparationTime}
                </Button>
              )}
              {status === "New order" && (
                <div className="border rounded-lg p-3 w-full">
                  <h5 className="font-inter -mt-[6px] font-medium text-[10px] text-[#666666]">
                    Enter food preparation time
                  </h5>
                  <div className="flex justify-between w-full items-center mt-2 px-4 py-1 border rounded-lg">
                    <FaMinus
                      onClick={() => setMinute((prev) => prev - 1)}
                      className="cursor-pointer text-2xl"
                    />
                    <p className="font-medium font-dmSans text-[#515151]">
                      {minute} mins
                    </p>
                    <FaPlus
                      onClick={() => setMinute((prev) => prev + 1)}
                      className="cursor-pointer text-2xl"
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-[40%_58%] gap-[2%]">
                    <Button className="w-full font-dmSans font-normal bg-[#F05542] hover:bg-[#e84f3b] text-white hover:text-white rounded-lg">
                      Reject
                    </Button>
                    <Button className="w-full font-dmSans font-normal bg-[#1064FD] hover:bg-[#255fcb] to-40% text-white rounded-lg">
                      Accept in 02:19
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col mt-12">
              <h2 className="font-roboto text-sm mb-2">History</h2>
              <OrderTimingTimeline
                timing={{
                  ...timing,
                  scheduleAt,
                  assignedAt: deliveryPartner?.assignedAt,
                  deliveryRejectedAt:
                    cancelDetails?.cancelledBy === "delivery_partner" &&
                    cancelDetails?.cancelledAt,
                }}
              />
            </div>
          </div>
          <div className="">
            <div className="rounded-lg bg-white p-4 px-6 flex justify-between items-center">
              <div>
                <span className="text-sm font-roboto">Restaurant Details</span>
                <h2 className="font-inter text-xl capitalize font-medium mt-3">
                  {orderDetailsData?.restaurantId?.name}
                </h2>
                <span className="font-inter text-[#565656]">
                  {orderDetailsData?.restaurantId?.address?.addressLine},{" "}
                  {orderDetailsData?.restaurantId?.address?.city},{" "}
                  {orderDetailsData?.restaurantId?.address?.state},{" "}
                  {orderDetailsData?.restaurantId?.address?.pinCode}
                </span>

                {orderDetailsData?.status === "delivered" && (
                  <div className="grid grid-cols-3 mt-5">
                    <h3 className="col-span-2 font-semibold">Commission: </h3>
                    <p className="text-muted-foreground">
                      ₹{orderDetailsData?.commission?.amount || 0}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Button
                  onClick={() =>
                    navigate(
                      `/admin/restaurant/${orderDetailsData?.restaurantId?._id}/dashboard`,
                    )
                  }
                  variant="ghost"
                  className="text-xl font-inter font-semibold hover:bg-transparent text-[#003CFF] hover:text-[#003CFF]"
                >
                  View
                </Button>
              </div>
            </div>
            {orderDetailsData?.deliveryPartner?.partnerId && (
              <div className="rounded-lg bg-white p-4 px-6 mt-5 flex justify-between items-center">
                <div>
                  <span className="text-sm font-roboto">
                    Delivery Partner Details
                  </span>
                  <h2 className="font-inter text-xl capitalize font-medium mt-3">
                    {
                      orderDetailsData?.deliveryPartner?.partnerId?.personalInfo
                        ?.name
                    }
                  </h2>
                  <span className="font-inter text-[#565656]">
                    {
                      orderDetailsData?.deliveryPartner?.partnerId?.address
                        ?.street
                    }
                    ,{" "}
                    {
                      orderDetailsData?.deliveryPartner?.partnerId?.address
                        ?.city
                    }
                    ,{" "}
                    {
                      orderDetailsData?.deliveryPartner?.partnerId?.address
                        .state
                    }
                    ,{" "}
                    {
                      orderDetailsData?.deliveryPartner?.partnerId?.address
                        ?.pincode
                    }
                  </span>
                </div>
              </div>
            )}
            <div className="rounded-lg bg-white mt-5 p-4 px-6">
              <div className="grid grid-cols-3 gap-3">
                <h2 className="font-inter text-sm font-medium">Items</h2>
                <h2 className="font-inter text-sm font-medium text-center">
                  Oty
                </h2>
                <h2 className="font-inter text-sm font-medium text-right">
                  Price
                </h2>
              </div>
              <div className="flex flex-col gap-3 mt-3">
                <OrderItem items={orderDetailsData?.items} />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                <h3 className="font-roboto font-medium flex gap-1 items-center text-[#515151]">
                  Sub Total
                </h3>
                <div></div>
                <h3 className="font-roboto text-[#515151] font-medium text-right">
                  ₹{orderDetailsData?.amounts?.subtotal}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                <h3 className="font-roboto font-medium flex gap-1 items-center text-[#515151]">
                  Coupon Discount
                </h3>
                <div></div>
                <h3 className="font-roboto text-[#515151] font-medium text-right">
                  ₹{orderDetailsData?.amounts?.couponDiscount || 0}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                <h3 className="font-roboto font-medium flex gap-1 items-center text-[#515151]">
                  Delivery Fee
                </h3>
                <div></div>
                <h3 className="font-roboto text-[#515151] font-medium text-right">
                  ₹{orderDetailsData?.amounts?.deliveryFee}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                <h3 className="font-roboto font-medium flex gap-1 items-center text-[#515151]">
                  Packaging Charge
                </h3>
                <div></div>
                <h3 className="font-roboto text-[#515151] font-medium text-right">
                  ₹{orderDetailsData?.amounts?.packagingCharge}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                <h3 className="font-roboto font-medium flex gap-1 items-center text-[#515151]">
                  Tip
                </h3>
                <div></div>
                <h3 className="font-roboto text-[#515151] font-medium text-right">
                  ₹{orderDetailsData?.amounts?.tip}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                <h3 className="font-roboto font-medium flex gap-1 items-center text-[#515151]">
                  Tax
                </h3>
                <div></div>
                <h3 className="font-roboto text-[#515151] font-medium text-right">
                  ₹{orderDetailsData?.amounts?.taxes?.total?.toFixed(2)}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                <h3 className="font-roboto font-medium flex gap-1 items-center text-[#515151]">
                  Total amount
                  {status === "New order" && (
                    <div className="bg-[#FFEFB5] text-black font-inter rounded-lg text-[10px] font-semibold flex justify-center px-2 py-[3px]">
                      PAID
                    </div>
                  )}
                </h3>
                <div></div>
                <h3 className="font-roboto text-[#515151] text-right font-medium">
                  ₹{orderDetailsData?.amounts?.total}
                </h3>
              </div>
            </div>
            {orderDetailsData?.status === "rejected" && (
              <div className="rounded-lg bg-white mt-5 p-4 px-6">
                <div>
                  <div className="border rounded-lg p-4">
                    <p className="text-muted-foreground">
                      Cancelled By:
                      <span className="capitalize text-[#515151]">
                        {" "}
                        {orderDetailsData?.cancelDetails?.cancelledBy}
                      </span>
                    </p>
                    <h3 className="font-inter font-medium text-sm text-[#515151]">
                      Reason:
                    </h3>
                    <p className="font-inter text-xs text-[#7C7C7C]">
                      {orderDetailsData?.cancelDetails?.cancellationReason ||
                        "NA"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {isOrderUpdateModalOpen && (
          <OrderUpdateModal
            open={isOrderUpdateModalOpen}
            setOpen={setIsOrderUpdateModalOpen}
            newOrder={orderDetailsData}
          />
        )}

        {open && (
          <CancelOrderModal
            open={open}
            onClose={() => setOpen(false)}
            orderId={orderId}
          />
        )}

        {isSanitizationModalOpen && (
          <SanitizationModal
            open={isSanitizationModalOpen}
            setOpen={setIsSanitizationModalOpen}
            orderId={orderId}
          />
        )}

        {invoiceUploadModalOpen && (
          <InvoiceUploadModal
            open={invoiceUploadModalOpen}
            setOpen={setInvoiceUploadModalOpen}
            orderId={orderId}
            getOrderDetails={getOrderDetails}
          />
        )}
      </section>
    </AdminWrapper>
  );
};

export default OrderDetails;


const TimeItem = ({ label, value, highlight = false }) => (
  <p
    className={`text-xs font-semibold whitespace-nowrap ${
      highlight ? "text-muted-foreground" : "text-black"
    }`}
  >
    {label}: {format(new Date(value), "hh:mm:ss a")}
  </p>
);

const OrderTiming = ({ scheduleAt, timing }) => {
  const timeline = [
    {
      label: "Order Scheduled At",
      value: scheduleAt,
    },
    {
      label: "Order Placed",
      value: timing?.orderedAt,
    },
    {
      label: "Order Accepted (Restaurant)",
      value: timing?.confirmedAt,
    },
    {
      label: "Order Accepted (Delivery Partner)",
      value: timing?.deliveryAcceptedAt,
      highlight: true,
    },
    {
      label: "Order Rejected (Delivery Partner)",
      value: timing?.deliveryRejectedAt,
      highlight: true,
    },
    {
      label: "Order Prepared",
      value: timing?.readyAt,
    },
    {
      label: "Order Picked Up",
      value: timing?.pickedUpAt,
    },
    {
      label: "Order Delivered",
      value: timing?.deliveredAt,
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      {timeline.map(
        (item, index) =>
          item.value && (
            <TimeItem
              key={index}
              label={item.label}
              value={item.value}
              highlight={item.highlight}
            />
          )
      )}
    </div>
  );
};


