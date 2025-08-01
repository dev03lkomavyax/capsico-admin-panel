import useGetApiReq from "@/hooks/useGetApiReq";
import { getSocket } from "@/socket";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ReactPagination from "../pagination/ReactPagination";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import SingleOrder from "./SingleOrder";
import { LIMIT } from "@/constants/constants";
import Spinner from "../Spinner";
import DataNotFound from "../DataNotFound";
import OrderStatusCount from "./OrderStatusCount";

const Capsico = ({ setCapsicoOrderNo }) => {
  const socket = getSocket();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [selectOrderTab, setSelectOrderTab] = useState("allOrder");
  const [capsicoOrderData, setCapsicoOrderData] = useState([]);
  const [filterByDate, setFilterByDate] = useState("today");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    socket.emit("subscribe_all_orders");
  }, []);

  socket.on("active_orders", (response) => {
    console.log("active_orders response: ", response);
  });

  const handleOnClick = (tab) => {
    setSelectOrderTab(tab);
    navigate(`/admin/order/capsico/${tab}`);
  };

  const { res, fetchData, isLoading } = useGetApiReq();

  const getAllOrder = () => {
    fetchData(
      `/admin/get-all-orders?searchQuery=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${filterByDate}&status=${
        status === "all" ? "" : status
      }`
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
      setOrders(pagination?.total || 0);
      setCapsicoOrderNo(pagination?.total || 0);
      setTotalPage(pagination?.totalPages || 0);
      setPage(pagination?.page);
    }
  }, [res]);

  return (
    <>
      <OrderStatusCount handleOnClick={handleOnClick} />
      <section className="flex justify-between gap-5 items-center w-full">
        <div className="flex justify-start items-center -ml-4">
          <BsSearch className="relative left-8 text-[#1D1929]" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select value={status} onValueChange={(value) => setStatus(value)}>
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
                <SelectItem value="delivery_issue">Delivery Issue</SelectItem>
                <SelectItem value="PREPARING">PREPARING</SelectItem>
                <SelectItem value="READY">
                  Ready
                </SelectItem>
                <SelectItem
                  value="DELIVERYPARTNER_ACCEPTED"
                >
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
      </section>
      <div className="bg-[#FFFFFF]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                {
                  <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
                }
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Order ID
              </TableHead>
              {/* <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Order
              </TableHead> */}
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Customer
              </TableHead>
              <TableHead className="w-[120px] text-[#ABABAB] text-xs font-normal font-roboto">
                Status
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Created Date
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Restaurant name
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Price
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {capsicoOrderData?.length > 0 &&
              capsicoOrderData?.map((data) => (
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
      </div>
      <ReactPagination totalPage={totalPage} setPage={setPage} />
    </>
  );
};

export default Capsico;
