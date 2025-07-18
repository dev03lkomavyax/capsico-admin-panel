import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataNotFound from "@/components/DataNotFound";
import SingleOrder from "@/components/restaurant/SingleOrder";
import Spinner from "@/components/Spinner";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { ChevronLeftIcon } from "lucide-react";
import ReactPagination from "@/components/pagination/ReactPagination";

const RecentOrders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [filterByDate, setFilterByDate] = useState("today");
  const [capsicoOrderData, setCapsicoOrderData] = useState([]);
  const [status, setStatus] = useState("all");
  const params = useParams();

  const { res, fetchData, isLoading } = useGetApiReq();

  const getAllOrder = () => {
    fetchData(
      `/admin/get-all-orders?searchQuery=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${filterByDate}&restaurantId=${
        params?.restaurantId
      }&status=${status === "all" ? "" : status}`
    );
  };

  useEffect(() => {
    getAllOrder();
  }, [page, searchQuery, filterByDate, status]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("order res", res?.data);
      setCapsicoOrderData(res?.data?.data);
      const { pagination } = res?.data || {};
      setTotalPage(pagination?.totalPages || 0);
      setPage(pagination?.page);
    }
  }, [res]);
  return (
    <AdminWrapper>
      <div className="w-full rounded-lg border-[1px] border-[#E0E2E7] bg-[#FFFFFF]">
        <div className="flex justify-between items-center px-5 h-[76px]">
          <div
            onClick={() => navigate(-1)}
            className="flex justify-start items-center cursor-pointer"
          >
            <ChevronLeftIcon />
            <p className="text-[#333843] text-lg font-medium font-inter flex items-center gap-2">
              Recent Orders
              {/* <span className="text-[#0D894F] text-sm font-semibold font-inter bg-[#E7F4EE] py-1 px-3 rounded-full">
              +2 Orders
            </span> */}
            </p>
          </div>
          <div className="flex justify-start items-center gap-4">
            {/* <button className="h-10 border-[1px] border-[#E0E2E7] rounded-lg flex justify-center items-center gap-2 text-[#667085] text-sm font-medium font-inter bg-[#FFFFFF] px-4">
            <HiOutlineAdjustmentsHorizontal className="text-[20px]" />
            <span>Filters</span>
          </button> */}
            <div className="flex items-center gap-4">
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger className="h-10 w-44 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready_for_pickup">
                      Ready for Pickup
                    </SelectItem>
                    <SelectItem value="picked_up">Picked Up</SelectItem>
                    <SelectItem value="out_for_delivery">
                      Out for Delivery
                    </SelectItem>
                    <SelectItem value="arriving">Arriving</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="delivery_issue">
                      Delivery Issue
                    </SelectItem>
                    <SelectItem value="PREPARING">PREPARING</SelectItem>
                    <SelectItem value="READY">Ready</SelectItem>
                    <SelectItem value="DELIVERYPARTNER_ACCEPTED">
                      Delivery Partner Accepted
                    </SelectItem>
                    <SelectItem value="reached_delivery_location">
                      Reached Delivery Location
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={filterByDate}
                onValueChange={(value) => setFilterByDate(value)}
              >
                <SelectTrigger className="h-10 text-[#1D1929] w-32 text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="bg-[#FFFFFF]">
          <Table>
            <TableHeader className="bg-[#F9F9FC] h-[56px]">
              <TableRow>
                <TableHead className="w-10">
                  {
                    <Checkbox className="border-2 border-[#858D9D] bg-[#FFFFFF] w-5 h-5" />
                  }
                </TableHead>
                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                  Order Id
                </TableHead>
                <TableHead className="w-[120px] text-[#333843] text-sm font-medium font-inter">
                  Product
                </TableHead>
                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                  Date
                </TableHead>
                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                  Customer
                </TableHead>
                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                  Total
                </TableHead>
                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                  Payment
                </TableHead>
                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                  Status
                </TableHead>
                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {capsicoOrderData.length > 0 &&
                capsicoOrderData.map((data) => (
                  <SingleOrder
                    key={data?._id}
                    data={data}
                    getAllOrder={getAllOrder}
                  />
                ))}
            </TableBody>
          </Table>
          {isLoading && <Spinner />}
          {capsicoOrderData.length === 0 && !isLoading && (
            <DataNotFound name="Orders" />
          )}
          <ReactPagination setPage={setPage} totalPage={totalPage} />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default RecentOrders;
