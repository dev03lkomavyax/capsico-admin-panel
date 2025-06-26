import React, { useEffect, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetApiReq from "@/hooks/useGetApiReq";
import { LIMIT } from "@/constants/constants";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import ReactPagination from "../pagination/ReactPagination";
import SingleOrder from "./SingleOrder";

const RecentOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [filterByDate, setFilterByDate] = useState("today");
  const [selectOrderTab, setSelectOrderTab] = useState("allOrder");
  const [capsicoOrderData, setCapsicoOrderData] = useState([]);
  const [status, setStatus] = useState("all");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getAllOrder = () => {
    fetchData(
      `/admin/get-all-orders?searchQuery=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${"all"}&status=${
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
      setTotalPage(pagination?.totalPages || 0);
      setPage(pagination?.page);
    }
  }, [res]);
  return (
    <div className="w-full rounded-lg border-[1px] border-[#E0E2E7] bg-[#FFFFFF]">
      <div className="flex justify-between items-center px-5 h-[76px]">
        <div className="flex justify-start items-center">
          <p className="text-[#333843] text-lg font-medium font-inter flex items-center gap-2">
            Recent Orders
            <span className="text-[#0D894F] text-sm font-semibold font-inter bg-[#E7F4EE] py-1 px-3 rounded-full">
              +2 Orders
            </span>
          </p>
        </div>
        <div className="flex justify-start items-center gap-4">
          <button className="h-10 border-[1px] border-[#E0E2E7] rounded-lg flex justify-center items-center gap-2 text-[#667085] text-sm font-medium font-inter bg-[#FFFFFF] px-4">
            <HiOutlineAdjustmentsHorizontal className="text-[20px]" />
            <span>Filters</span>
          </button>
          <button className="h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD]">
            See More
          </button>
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
        {/* <ReactPagination setPage={setPage} totalPage={totalPage} /> */}
      </div>
    </div>
  );
};

export default RecentOrders;
