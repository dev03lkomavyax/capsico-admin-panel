import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { SingleEarning } from "./SingleEarning";
import ReactPagination from "@/components/pagination/ReactPagination";

const GlobalEarning = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [earnings, setEarnings] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { res, fetchData, isLoading } = useGetApiReq();

  const handleReset = () => {
    setCity("");
  };

  const {
    res: fetchCitiesRes,
    fetchData: fetchCities,
    isLoading: isCitiesLoading,
  } = useGetApiReq();

  const getCities = () => {
    fetchCities("/availableCities/get-all");
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (fetchCitiesRes?.status === 200 || fetchCitiesRes?.status === 201) {
      console.log("fetchCitiesRes", fetchCitiesRes);
      setCities(fetchCitiesRes?.data?.cities || []);
    }
  }, [fetchCitiesRes]);

  const getEarnings = () => {
    fetchData(`/payout/admin/earnings?cityId=${city}`);
  };

  useEffect(() => {
    getEarnings();
  }, [city]);

  useEffect(() => {
    if (res?.status === 200) {
      console.log("earnings res", res);
      setEarnings(res.data.data);
      setPageCount(res.data?.pagination?.totalPages || 1);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex gap-5 items-center justify-between">
          <h1 className="font-inter text-2xl font-bold text-[#353535]">
            Earnings
          </h1>
          <div className="flex gap-5 items-center">
            <Select onValueChange={setCity} value={city}>
              <SelectTrigger className="w-40" disabled={isCitiesLoading}>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cities.map((city) => (
                    <SelectItem
                      key={city?._id}
                      value={city?._id}
                      className="capitalize"
                    >
                      {city.city}
                    </SelectItem>
                  ))}
                  {cities.length === 0 && <DataNotFound name="Cities" />}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="w-auto px-4" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>

        <div className="bg-white mt-10 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SR No.</TableHead>
                <TableHead>Restaurant Info</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <SingleEarning.Skeleton />
              ) : earnings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>No records found</TableCell>
                </TableRow>
              ) : (
                earnings.map((earning, index) => (
                  <SingleEarning
                    key={earning._id}
                    earning={earning}
                    index={index}
                  />
                ))
              )}
            </TableBody>
          </Table>

          <ReactPagination setPage={setPage} totalPage={pageCount} />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default GlobalEarning;
