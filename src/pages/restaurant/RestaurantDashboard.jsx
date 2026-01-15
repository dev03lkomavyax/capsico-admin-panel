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
            <RecentReviews />
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
