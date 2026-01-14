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
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
// import { useNavigate, useParams } from "react-router-dom";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Stats from "./Stats";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UpdateCustomCommissionModal from "./UpdateCustomCommissionModal";
import UpdateRestaurantGSTModal from "./UpdateRestaurantGSTModal";
import UpdateCustomRestaurantCommissionModal from "./UpdateCustomRestaurantCommissionModal";

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
  const [isAddCommissionModalOpen, setIsAddCommissionModalOpen] =
    useState(false);
  const [isAddCommissionGstModalOpen, setIsAddCommissionGstModalOpen] =
    useState(false);
  const [isUpdateGstModalOpen, setIsUpdateGstModalOpen] = useState(false);

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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="capsico">
                      <MenuIcon className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Restaurant Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Payout Info */}
                    <DropdownMenuItem asChild>
                      <Link
                        to={`/admin/restaurant/${params.restaurantId}/payout`}
                      >
                        Payout Info
                      </Link>
                    </DropdownMenuItem>

                    {/* Update Logo */}
                    <DropdownMenuItem
                      onClick={() => setIsUpdateLogoModalOpen(true)}
                    >
                      Add / Update Logo
                    </DropdownMenuItem>

                    {/* Update Banner */}
                    <DropdownMenuItem
                      onClick={() => setIsUpdateBannerModalOpen(true)}
                    >
                      Add / Update Banner
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Edit Profile */}
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(`/admin/restaurant/edit-profile`, {
                          state: { restaurantId: params?.restaurantId },
                        })
                      }
                    >
                      Edit Profile
                    </DropdownMenuItem>

                    {/* Inventory */}
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          `/admin/restaurant/${params?.restaurantId}/inventory`
                        )
                      }
                    >
                      Manage Inventory
                    </DropdownMenuItem>

                    {/* Add Menu */}
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          `/admin/restaurant/${params?.restaurantId}/menu`
                        )
                      }
                    >
                      Add Menu
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsAddCommissionModalOpen(true)}
                    >
                      Update Custom/Restaurant Commission
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsUpdateGstModalOpen(true)}
                    >
                      Update Custom/Restaurant GST
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsAddCommissionGstModalOpen(true)}
                    >
                      Update Commission Gst
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restaurant Actions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* <div className="flex items-center gap-4">
            <Button className="w-auto px-4">
              <Link to={`/admin/restaurant/${params.restaurantId}/payout`}>
                Payout Info
              </Link>
            </Button>
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
                navigate(`/admin/restaurant/${params?.restaurantId}/inventory`)
              }
              className="h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD] flex items-center gap-2"
            >
              Manage Inventory
            </Button>
            <Button
              onClick={() =>
                navigate(`/admin/restaurant/${params?.restaurantId}/menu`)
              }
              className="h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD] flex items-center gap-2"
            >
              <span className="text-xl">+</span> Add Menu
            </Button>
          </div> */}
        </div>
        <RecentOrders />
        <Stats />
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

        {isUpdateGstModalOpen && (
          <UpdateRestaurantGSTModal
            open={isUpdateGstModalOpen}
            onOpenChange={() => setIsUpdateGstModalOpen((prev) => !prev)}
          />
        )}

        {isAddCommissionModalOpen && (
          <UpdateCustomCommissionModal
            open={isAddCommissionModalOpen}
            setOpen={setIsAddCommissionModalOpen}
          />
        )}

        {isAddCommissionGstModalOpen && (
          <UpdateCustomRestaurantCommissionModal
            open={isAddCommissionGstModalOpen}
            setOpen={setIsAddCommissionGstModalOpen}
          />
        )}

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
