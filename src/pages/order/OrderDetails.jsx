import avatar from "@/assets/Image-120.png";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import History from "@/components/order-details/History";
import OrderItem from "@/components/order-details/OrderItem";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetApiReq from "@/hooks/useGetApiReq";
import { OrderSchema } from "@/schema/OrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { viewDbImagePreview } from "@/lib/utils";

const libraries = ["places", "marker"];

// const status = "Delivered";
// const status = "Preparing";
// const status = "New order";
const status = "Cancelled";

const capsico = true;
// const capsico = false;

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const OrderDetails = () => {
  const containerStyle = {
    width: "100%",
    height: "280px",
  };
  const [deliveryAgent, setDeliveryAgent] = useState("");
  const [open, setOpen] = useState(false);
  const [orderDetailsData, setOrderDetailsData] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [center, setCenter] = useState({
    lat: 19.8429547,
    lng: 75.2333128,
  });

  const [minute, setMinute] = useState(1);

  const form = useForm({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      otp: "",
      temperature: "",
    },
  });

  const { register, control, watch, setValue, getValues } = form;

  const { res, fetchData, isLoading } = useGetApiReq();

  const getOrderDetails = () => {
    fetchData(`/admin/get-order/${orderId}`);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getOrderDetails", res?.data);
      setOrderDetailsData(res?.data?.data);
    }
  }, [res]);

  const onSubmit = (data) => {
    console.log("data", data);
  };

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
              Orders/Order Details
            </span>
          </div>
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
            } h-[54px] capitalize w-auto px-3 text-xl hover:text-[#167316] hover:bg-[#CEFFCA]`}
          >
            {orderDetailsData?.status}
          </Button>
        </div>

        {/* h-[calc(100vh-56px)] */}
        <div className="grid grid-cols-[26%_71%] gap-[3%] mt-5 h-screen">
          <div className="rounded-lg bg-white px-4 py-10">
            <div className="flex justify-center flex-col items-center">
              <img
                className="w-32 h-32 rounded-full"
                src={
                  orderDetailsData?.userId?.image
                    ? viewDbImagePreview(orderDetailsData?.userId?.image)
                    : avatar
                }
                alt="avatar"
              />
              <h2 className="font-medium font-roboto mt-3 text-xl">
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
              <History
                status={orderDetailsData?.status}
                history={orderDetailsData?.statusHistory}
                timing={orderDetailsData?.timing && orderDetailsData?.timing}
              />
            </div>
          </div>
          <div className="">
            <div className="rounded-lg bg-white p-4 px-6 flex justify-between items-center">
              <div>
                <span className="text-sm font-roboto">
                  {capsico ? "Restaurant Details" : "Vendor Details"}
                </span>
                <h2 className="font-inter text-xl capitalize font-medium mt-3">
                  {orderDetailsData?.restaurantId?.name}
                </h2>
                <span className="font-inter text-[#565656]">
                  {orderDetailsData?.restaurantId?.address?.addressLine},{" "}
                  {orderDetailsData?.restaurantId?.address?.city},{" "}
                  {orderDetailsData?.restaurantId?.address?.state},{" "}
                  {orderDetailsData?.restaurantId?.address?.pinCode}
                </span>
              </div>
              <div>
                <Button
                  variant="ghost"
                  className="text-xl font-inter font-semibold hover:bg-transparent text-[#003CFF] hover:text-[#003CFF]"
                >
                  View
                </Button>
              </div>
            </div>
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
                  ₹{orderDetailsData?.amounts?.couponDiscount}
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
            {status === "cancelled" && (
              <div className="rounded-lg bg-white mt-5 p-4 px-6">
                <div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-inter font-medium text-sm text-[#515151]">
                      Reason
                    </h3>
                    <p className="font-inter text-xs text-[#7C7C7C]">
                      order placed by mistake
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </AdminWrapper>
  );
};

export default OrderDetails;
