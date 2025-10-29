import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { IoIosArrowBack } from "react-icons/io";
import AdminWrapper from "../admin-wrapper/AdminWrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import SingleOrder from "./SingleOrder";
import Spinner from "../Spinner";
import DataNotFound from "../DataNotFound";
import ReactPagination from "../pagination/ReactPagination";

const StatusList = () => {
    const [capsicoOrderData, setCapsicoOrderData] = useState([]);
    const [selectTab, setSelectTab] = useState("capsico");
    const [searchQuery, setSearchQuery] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [filterByDate, setFilterByDate] = useState("today");

    const { res, fetchData, isLoading } = useGetApiReq();

    const getAllOrder = () => {
        const statusValue = params?.status;
        let status = "";

        if (statusValue === "prepared") {
            status = "preparing";
        } else if (statusValue === "completed") {
            status = "delivered";
        } else if (statusValue === "cancelled") {
            status = "cancelled";
        } else if (statusValue === "new") {
            status = "new";
        }

        fetchData(
            `/admin/get-all-orders?searchQuery=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${filterByDate}&status=${status}`
        );
    };

    useEffect(() => {
        getAllOrder();
    }, [page, searchQuery, filterByDate, params?.status]);

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
        <section className="flex flex-col gap-6 w-full h-full">
          <div className="-mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1"
            >
              <IoIosArrowBack className="text-2xl" />
              <span className="text-[#000000] font-roboto text-xl font-medium capitalize">
                {params?.status} order{" "}
              </span>
            </button>
          </div>
          <section className="flex justify-start items-center">
            <button
              onClick={() => setSelectTab("capsico")}
              className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${
                selectTab === "capsico"
                  ? "border-[#003CFF]"
                  : "border-transparent"
              }`}
            >
              <h6 className="text-[#1D1929] text-sm font-semibold font-roboto">
                Capsico
              </h6>
              <p className="text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#FF6F03] w-[22px] h-[22px] rounded-[7px]">
                20
              </p>
            </button>
            <button
              onClick={() => setSelectTab("quickly")}
              className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${
                selectTab === "quickly"
                  ? "border-[#003CFF]"
                  : "border-transparent"
              }`}
            >
              <h6 className="text-[#1D1929] text-sm font-semibold font-roboto">
                Quickly
              </h6>
              <p className="text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#ABABAB] w-[22px] h-[22px] rounded-[7px]">
                48
              </p>
            </button>
          </section>
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
                  <TableHead>Timing</TableHead>
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
                    Order Timing
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
        </section>
      </AdminWrapper>
    );
};

export default StatusList;
