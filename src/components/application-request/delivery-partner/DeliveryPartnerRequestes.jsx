import { Input } from "@/components/ui/input";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import DataNotFound from "@/components/DataNotFound";
import ReactPagination from "@/components/pagination/ReactPagination";
import DeliveryPartnerReq from "./DeliveryPartnerReq";
import DeliveryReqSkeleton from "./DeliveryReqSkeleton";

const DeliveryPartnerRequestes = ({ setCapsicoReqNos = () => {} }) => {
  const [deliveryPartnerRequests, setDeliveryPartnerRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [filterByDate, setFilterByDate] = useState("today");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getRestaurantRequests = () => {
    fetchData(
      `/admin/get-unapproved-delivery-partner?search=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${filterByDate}`
    );
  };

  useEffect(() => {
    getRestaurantRequests();
  }, [searchQuery, page, filterByDate]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("delivery partner reqs res", res?.data);
      setDeliveryPartnerRequests(res?.data?.data);
      setTotalPage(res?.data?.pagination?.totalPages);
      setPage(res?.data?.pagination?.page);
    }
  }, [res]);

  return (
    <div>
      {/* <div className="flex justify-between items-center w-full mb-4">
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
        <div className="flex items-center">
          <Select
            value={filterByDate}
            onValueChange={(value) => setFilterByDate(value)}
          >
            <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
              <SelectValue placeholder="Today" />
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
      </div> */}
      <div className="bg-white rounded-lg mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                {
                  <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
                }
              </TableHead>
              <TableHead className="w-24 text-[#ABABAB] text-xs font-normal font-roboto">
                Delivery ID
              </TableHead>
              <TableHead className=" w-60 text-[#ABABAB] text-xs font-normal font-roboto">
                Name
              </TableHead>
              <TableHead className=" w-60 text-[#ABABAB] text-xs font-normal font-roboto">
                Email
              </TableHead>
              <TableHead className=" w-60 text-[#ABABAB] text-xs font-normal font-roboto">
                Phone
              </TableHead>
              <TableHead className="w-[100px] whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                Registered Date
              </TableHead>
              <TableHead className="w-60 text-[#ABABAB] text-xs font-normal font-roboto">
                Location
              </TableHead>
              <TableHead className="w-60 text-[#ABABAB] text-xs font-normal font-roboto">
                Status
              </TableHead>
              <TableHead className="w-20 text-[#ABABAB] text-xs font-normal font-roboto">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryPartnerRequests?.map((req) => (
              <DeliveryPartnerReq
                key={req._id}
                req={req}
                refetch={getRestaurantRequests}
              />
            ))}

            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <DeliveryReqSkeleton key={i} />
              ))}
          </TableBody>
        </Table>

        {deliveryPartnerRequests?.length === 0 && !isLoading && (
          <DataNotFound name="Restaurant Requests" />
        )}
      </div>

      <ReactPagination totalPage={totalPage} setPage={setPage} />
    </div>
  );
};

export default DeliveryPartnerRequestes;
