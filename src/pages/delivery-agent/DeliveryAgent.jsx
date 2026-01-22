import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { Checkbox } from "@/components/ui/checkbox";
import { IoIosArrowBack } from "react-icons/io";
import ReactPaginate from "react-paginate";
import ReactPagination from "@/components/pagination/ReactPagination";
import DeliveryAgentComp from "@/components/delivery-agent/DeliveryAgentComp";
import { ChevronsUpDown, Plus } from "lucide-react";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import useGetApiReq from "@/hooks/useGetApiReq";
import { LIMIT } from "@/constants/constants";
import Spinner from "@/components/Spinner";
import DataNotFound from "@/components/DataNotFound";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { readCookie } from "@/utils/readCookie";

const DeliveryAgent = () => {
  const [deliveryAgentData, setDeliveryAgentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const navigate = useNavigate();
  const userInfo = readCookie("userInfo")

  const { res, fetchData, isLoading } = useGetApiReq();

  const getAllDeliveryAgent = () => {
    fetchData(
      `/admin/get-all-deliveryPartners?searchQuery=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${dateFilter}&status=${
        status === "all" ? "" : status
      }&cityId=${userInfo.city}`,
      {
        reportCrash: true,
        screenName: "DELIVERY_EXECUTIVE_GET",
      }
    );
  };

  useEffect(() => {
    getAllDeliveryAgent();
  }, [searchQuery, page, dateFilter, status]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("deliveryAgent res", res?.data);
      setDeliveryAgentData(res?.data?.data);
      const { pagination } = res?.data || {};
      // setRestaurantList(restaurants);
      setPageCount(pagination?.totalPages);
      setPage(pagination?.page);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <section className="flex flex-col gap-6 w-full h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Delivery Agents
          </h2>
          <Button asChild className="w-auto px-4">
            <Link to={"/admin/delivery-agent/add"}>
              <Plus />
              Add
            </Link>
          </Button>
        </div>
        <section className="flex justify-between items-center w-full">
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
          <div className="flex justify-between items-center w-[230px]">
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="hold">Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={dateFilter}
              onValueChange={(value) => setDateFilter(value)}
            >
              <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        <div className="bg-[#FFFFFF]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
                </TableHead>
                <TableHead className="w-[100px] whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  <div className="flex gap-1 items-center">
                    Agent ID
                    <ChevronsUpDown className="opacity-50 w-4 h-4 text-[#1D1929]" />
                  </div>
                </TableHead>
                <TableHead className="w-[100px] whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Delivery Agent Name
                </TableHead>
                <TableHead className="whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  OTP
                </TableHead>
                <TableHead className="w-[100px] whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Location
                </TableHead>
                <TableHead className="w-[100px] whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  <div className="flex gap-1 items-center">
                    Status
                    <ChevronsUpDown className="opacity-50 w-4 h-4 text-[#1D1929]" />
                  </div>
                </TableHead>
                <TableHead className="w-[100px] whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  <div className="flex gap-1 items-center">
                    Joined Date
                    <ChevronsUpDown className="opacity-50 w-4 h-4 text-[#1D1929]" />
                  </div>
                </TableHead>
                <TableHead className="w-[100px] whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {Array(10).fill("*").map((_, i) => (
                                <DeliveryAgentComp
                                    key={i}
                                />
                            ))} */}
              {deliveryAgentData.length > 0 &&
                deliveryAgentData.map((agent, index) => (
                  <DeliveryAgentComp
                    key={index}
                    agent={agent}
                    getAllDeliveryAgent={getAllDeliveryAgent}
                  />
                ))}
            </TableBody>
          </Table>

          {isLoading && <Spinner />}
          {deliveryAgentData.length === 0 && !isLoading && (
            <DataNotFound name="Delivery Agents" />
          )}
        </div>
        <ReactPagination setPage={setPage} totalPage={pageCount} />
      </section>
    </AdminWrapper>
  );
};

export default DeliveryAgent;
