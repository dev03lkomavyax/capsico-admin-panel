import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
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
import SingleRestaurantReq from "./SingleRestaurantReq";
import { LIMIT } from "@/constants/constants";
import SingleRestaurantReqSkeleton from "./SingleRestaurantReqSkeleton";
import DataNotFound from "../DataNotFound";

const Capsico = ({ setCapsicoReqNos }) => {
  const [restaurantRequests, setRestaurantRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [filterByDate, setFilterByDate] = useState("today");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getRestaurantRequests = () => {
    fetchData(
      `/admin/get-unapproved-restaurants?search=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${filterByDate}`
    );
  };

  useEffect(() => {
    getRestaurantRequests();
  }, [searchQuery, page, filterByDate]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("restaurant reqs res", res?.data);
      setRestaurantRequests(res?.data?.restaurants);
      setTotalPage(res?.data?.pagination?.totalPages);
      setCapsicoReqNos(res?.data?.pagination?.total || 0);
      setPage(res?.data?.pagination?.page);
    }
  }, [res]);

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-4">
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
          {/* <Select>
            <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">All</SelectItem>
                <SelectItem value="newOrder">New Order</SelectItem>
                <SelectItem value="preparedry">Prepared</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
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
      </div>
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
                Restaurant ID
              </TableHead>
              <TableHead className=" w-60 text-[#ABABAB] text-xs font-normal font-roboto">
                Restaurant Name
              </TableHead>
              <TableHead className="w-[100px] whitespace-nowrap text-[#ABABAB] text-xs font-normal font-roboto">
                Registered Date
              </TableHead>
              <TableHead className="w-60 text-[#ABABAB] text-xs font-normal font-roboto">
                Location
              </TableHead>
              <TableHead className="w-20 text-[#ABABAB] text-xs font-normal font-roboto">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurantRequests?.map((req) => (
              <SingleRestaurantReq
                key={req._id}
                req={req}
                getRestaurantRequests={getRestaurantRequests}
              />
            ))}

            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <SingleRestaurantReqSkeleton key={i} />
              ))}
          </TableBody>
        </Table>

        {restaurantRequests?.length === 0 && !isLoading && (
          <DataNotFound name="Restaurant Requests" />
        )}
      </div>

      <ReactPagination totalPage={totalPage} setPage={setPage} />
    </div>
  );
};

export default Capsico;
