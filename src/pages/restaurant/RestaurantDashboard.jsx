import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import RecentOrders from "@/components/restaurant/RecentOrders";
import RecentReviews from "@/components/restaurant/RecentReviews";
import { SalesChart } from "@/components/restaurant/SalesChart";
import SalesChart2 from "@/components/restaurant/SalesChart2";
import UpdateBannerModal from "@/components/restaurant/UpdateBannerModal";
import UpdateLogoModal from "@/components/restaurant/UpdateLogoModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { BiCheckShield } from "react-icons/bi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RiQrScan2Line } from "react-icons/ri";
// import { useNavigate, useParams } from "react-router-dom";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const data = [
  {
    orderID: "1264903",
    product: {
      image: "",
      name: "ABCD name",
    },
    date: "1 min ago",
    customer: {
      name: "Vivek",
      email: "vivek8793@gmail.com",
    },
    total: "121.00",
    payment: "Mastercard",
    status: "Processing",
  },
  {
    orderID: "1264903",
    product: {
      image: "",
      name: "ABCD name",
    },
    date: "22 min ago",
    customer: {
      name: "Vivek",
      email: "vivek8793@gmail.com",
    },
    total: "121.00",
    payment: "Visa",
    status: "Preparing",
  },
  {
    orderID: "1264903",
    product: {
      image: "",
      name: "ABCD name",
    },
    date: "2 days ago",
    customer: {
      name: "Vivek",
      email: "vivek8793@gmail.com",
    },
    total: "121.00",
    payment: "Paypall",
    status: "Delivered",
  },
  {
    orderID: "1264903",
    product: {
      image: "",
      name: "ABCD name",
    },
    date: "5 days ago",
    customer: {
      name: "Vivek",
      email: "vivek8793@gmail.com",
    },
    total: "121.00",
    payment: "Paypall",
    status: "Cancelled",
  },
];

const data2 = [
  {
    product: {
      image: "",
      name: "ABCD name",
    },
    sales: "2345",
    amount: "121.00",
    price: "Paypall",
  },
  {
    product: {
      image: "",
      name: "ABCD name",
    },
    sales: "2345",
    amount: "121.00",
    price: "Paypall",
  },
  {
    product: {
      image: "",
      name: "ABCD name",
    },
    sales: "2345",
    amount: "121.00",
    price: "Paypall",
  },
  {
    product: {
      image: "",
      name: "ABCD name",
    },
    sales: "2345",
    amount: "121.00",
    price: "Paypall",
  },
];

const RestaurantDashborad = () => {
  const [selectTab, setselectTab] = useState("All Time");
  const [menuData, setMenuData] = useState(data2);
  const [isUpdateBannerModalOpen, setIsUpdateBannerModalOpen] = useState(false);
  const [isUpdateLogoModalOpen, setIsUpdateLogoModalOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const location = useLocation(); //
  const isViewMode = location.state?.mode === "view";

  return (
    <AdminWrapper>
      <section className="px-0 py-0 w-full space-y-8">
        <div className="flex justify-between items-center mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex justify-start items-center"
          >
            <MdKeyboardArrowLeft className="text-[#000000] text-3xl" />
            <h2 className="text-[#000000] text-xl font-medium font-roboto">
              Restaurant
            </h2>
          </button>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsUpdateLogoModalOpen(true)}
              className="px-4"
            >
              Add/Update Logo
            </Button>
            <Button
              onClick={() => setIsUpdateBannerModalOpen(true)}
              className="px-4"
            >
              Add/Update Banner
            </Button>
            <Button
              onClick={() =>
                navigate(`/admin/restaurant/edit-profile`, {
                  state: { restaurantId: params?.restaurantId },
                })
              }
              className="h-10 border-[1px] border-[#E0E2E7] rounded-lg text-[#667085] hover:text-white text-sm font-medium font-inter px-4 bg-[#FFFFFF]"
            >
              Edit Profile
            </Button>
            <Button
              onClick={() =>
                navigate(`/admin/restaurant/${params?.restaurantId}/menu`)
              }
              className="h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD] flex items-center gap-2"
            >
              <span className="text-xl">+</span> Add Menu
            </Button>
          </div>
        </div>
        <RecentOrders />
        <div className="flex justify-between items-center gap-6 w-full mb-8">
          <button
            onClick={() => navigate("/admin/restaurant/revenue")}
            className="bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1"
          >
            <div className="flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#EFEFFD] bg-[#DEDEFA]">
              <BiCheckShield className="text-[#5C59E8] text-2xl" />
            </div>
            <div>
              <p className="text-[#667085] text-base font-medium font-inter mb-2 text-start">
                Total Revenue
              </p>
              <p className="text-[#333843] text-2xl font-medium font-inter flex items-center gap-2">
                $75,500
                <span className="text-[#0D894F] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full">
                  +10%
                </span>
              </p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/restaurant/menu")}
            className="bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1"
          >
            <div className="flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#E7F4EE] bg-[#CFE7DC]">
              <PiShoppingCartSimple className="text-[#0D894F] text-2xl" />
            </div>
            <div>
              <p className="text-[#667085] text-base font-medium font-inter mb-2 text-start">
                Total Sales
              </p>
              <p className="text-[#333843] text-2xl font-medium font-inter flex items-center gap-2">
                31,500
                <span className="text-[#0D894F] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full">
                  +15%
                </span>
              </p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/restaurant/menu")}
            className="bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1"
          >
            <div className="flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#FEEDEC] bg-[#FCDAD7]">
              <RiQrScan2Line className="text-[#F04438] text-2xl" />
            </div>
            <div>
              <p className="text-[#667085] text-base font-medium font-inter mb-2 text-start">
                Menu
              </p>
              <p className="text-[#333843] text-2xl font-medium font-inter flex items-center gap-2">
                247
                <span className="text-[#667085] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full">
                  0%
                </span>
              </p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/restaurant/menu")}
            className="bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1"
          >
            <div className="flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#FDF1E8] bg-[#FAE1CF]">
              <BiCheckShield className="text-[#E46A11] text-2xl" />
            </div>
            <div>
              <p className="text-[#667085] text-base font-medium font-inter mb-2 text-start">
                Total Order
              </p>
              <p className="text-[#333843] text-2xl font-medium font-inter flex items-center gap-2">
                303
                <span className="text-[#F04438] text-xs font-semibold font-inter bg-[#FEEDEC] py-[2px] px-[6px] rounded-full">
                  -25%
                </span>
              </p>
            </div>
          </button>
        </div>
        <div className="flex w-full gap-8">
          <SalesChart />
          <SalesChart2 />
        </div>
        <div className="flex flex-col gap-3">
          <div className="border-[1px] border-[#E0E2E7] rounded-lg p-1 w-fit bg-[#FFFFFF]">
            <button
              onClick={() => setselectTab("All Time")}
              className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${
                selectTab === "All Time"
                  ? "text-[#4543AE] bg-[#DEDEFA] font-semibold"
                  : "text-[#667085] font-medium bg-transparent"
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setselectTab("12 Months")}
              className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${
                selectTab === "12 Months"
                  ? "text-[#4543AE] bg-[#DEDEFA] font-semibold"
                  : "text-[#667085] font-medium bg-transparent"
              }`}
            >
              12 Months
            </button>
            <button
              onClick={() => setselectTab("30 Days")}
              className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${
                selectTab === "30 Days"
                  ? "text-[#4543AE] bg-[#DEDEFA] font-semibold"
                  : "text-[#667085] font-medium bg-transparent"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setselectTab("7 Days")}
              className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${
                selectTab === "7 Days"
                  ? "text-[#4543AE] bg-[#DEDEFA] font-semibold"
                  : "text-[#667085] font-medium bg-transparent"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setselectTab("24 Hour")}
              className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${
                selectTab === "24 Hour"
                  ? "text-[#4543AE] bg-[#DEDEFA] font-semibold"
                  : "text-[#667085] font-medium bg-transparent"
              }`}
            >
              24 Hour
            </button>
          </div>
          <div className="flex w-full gap-6">
            <div className="w-[70%] rounded-lg border-[1px] border-[#E0E2E7] bg-[#FFFFFF]">
              <div className="flex justify-between items-center px-5 h-[76px]">
                <p className="text-[#333843] text-lg font-medium font-inter">
                  Top Selling Menu
                </p>
                <button className="h-10 border-[1px] border-[#E0E2E7] rounded-lg flex justify-center items-center gap-2 text-[#667085] text-sm font-medium font-inter bg-[#FFFFFF] px-4">
                  <HiOutlineAdjustmentsHorizontal className="text-[20px]" />
                  <span>Filters</span>
                </button>
              </div>
              <Table className="bg-[#FFFFFF]">
                <TableHeader className="bg-[#F9F9FC] h-[56px]">
                  <TableRow>
                    <TableHead className="w-[120px] text-[#333843] text-sm font-medium font-inter">
                      Product
                    </TableHead>
                    <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                      Sales
                    </TableHead>
                    <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                      Amount
                    </TableHead>
                    <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                      Price
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuData.length > 0 &&
                    menuData.map((data) => (
                      <TableRow key={data.data}>
                        <TableCell className="flex items-center gap-2">
                          <img
                            src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="w-11 h-11 rounded-lg"
                          />
                          <p className="text-[#333843] text-sm font-medium font-sans">
                            {data.product.name}
                          </p>
                        </TableCell>
                        <TableCell className="text-[#667085] text-sm font-medium font-sans">
                          {data.sales}
                        </TableCell>
                        <TableCell className="text-[#667085] text-sm font-medium font-sans">
                          ${data.amount}
                        </TableCell>
                        <TableCell className="text-[#667085] text-sm font-medium font-inter">
                          {data.price}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <RecentReviews />
          </div>
        </div>
        {isUpdateBannerModalOpen && (
          <UpdateBannerModal
            open={isUpdateBannerModalOpen}
            setOpen={setIsUpdateBannerModalOpen}
          />
        )}
        {isUpdateLogoModalOpen && (
          <UpdateLogoModal
            open={isUpdateLogoModalOpen}
            setOpen={setIsUpdateLogoModalOpen}
          />
        )}
      </section>
    </AdminWrapper>
  );
};

export default RestaurantDashborad;
