import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import DataNotFound from "../DataNotFound";
import ReactPagination from "../pagination/ReactPagination";
import Spinner from "../Spinner";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import Customer from "./Customer";

const Capsico = ({ setCapsicoCustomers }) => {
  const [customerData, setCustomerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [filterByDate, setFilterByDate] = useState("all");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getAllCustomer = () => {
    fetchData(
      `/admin/get-all-customers?searchQuery=${searchQuery}&page=${page}&limit=${LIMIT}&dateFilter=${filterByDate}`
    );
  };

  useEffect(() => {
    getAllCustomer();
  }, [searchQuery, page, filterByDate]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("customer res", res?.data);
      setCustomerData(res?.data?.data);
      setTotalPage(res?.data?.pagination?.totalPages);
      setPage(res?.data?.pagination?.page);
      setCapsicoCustomers(res?.data?.pagination?.total);
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

        <Select
          value={filterByDate}
          onValueChange={(value) => setFilterByDate(value)}
        >
          <SelectTrigger className="flex justify-between items-center w-auto h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
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
      <div className="bg-[#FFFFFF] rounded-lg mb-6">
        <Table className="bg-[#FFFFFF]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                {
                  <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
                }
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Customer ID
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Customer Name
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                OTP
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Joined Date
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Location
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Total spent
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Last order
              </TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerData?.length > 0 &&
              customerData?.map((item) => (
                <Customer
                  key={item?._id}
                  item={item}
                  getAllCustomer={getAllCustomer}
                />
              ))}
          </TableBody>
        </Table>

        {isLoading && <Spinner />}
        {customerData.length === 0 && !isLoading && (
          <DataNotFound name="Customers" />
        )}
      </div>

      <ReactPagination totalPage={totalPage} setPage={setPage} />
    </div>
  );
};

export default Capsico;
