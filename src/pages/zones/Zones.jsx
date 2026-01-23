import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import ReactPagination from "@/components/pagination/ReactPagination";
import Spinner from "@/components/Spinner";
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
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Zone from "@/components/zones/Zone";
import useGetApiReq from "@/hooks/useGetApiReq";
import { readCookie } from "@/utils/readCookie";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Zones = () => {
  const userInfo = readCookie("userInfo")
  const [zones, setZones] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [filterCity, setFilterCity] = useState(userInfo?.city || "");
  const [cities, setCities] = useState([]);

  console.log("userInfo", userInfo);
  

  const { res, fetchData, isLoading } = useGetApiReq();
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
      setFilterCity(userInfo?.city || "")
    }
  }, [fetchCitiesRes]);

  const getZones = () => {
    fetchData(
      `/zones/get-all?page=${page}&type=${
        filterType === "all" ? "" : filterType
      }&cityId=${filterCity === "all" ? "" : filterCity}`
    );
  };

  useEffect(() => {
    getZones();
  }, [page, filterType, filterCity]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      setZones(res?.data?.data);
      setTotalPage(res?.data?.pagination?.totalPages);
      console.log("getZones res", res);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Zones
          </h2>
          <div className="flex gap-5 items-center">
            <Select disabled={userInfo?.role === "subAdmin"} onValueChange={(v) => setFilterCity(v)} value={filterCity}>
              <SelectTrigger disabled={isCitiesLoading}>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cities.length > 0 && (
                    <>
                      {cities.map((city) => (
                        <SelectItem
                          key={city?._id}
                          value={city?._id}
                          className="capitalize"
                        >
                          {city.city}
                        </SelectItem>
                      ))}
                      <SelectItem value="all">All</SelectItem>
                    </>
                  )}
                  {cities.length === 0 && <DataNotFound name="Cities" />}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button asChild className="w-auto px-4" variant="capsico">
              <Link to="/admin/zones/create">
                <FaPlus />
                Create Zone
              </Link>
            </Button>

            {/* <Select value={filterType} onValueChange={(v) => setFilterType(v)}>
              <SelectTrigger className="min-w-[140px]">
                <SelectValue placeholder="Filter: Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </div>
        <div className="bg-white">
          <Table className="w-full rounded-xl shadow-sm bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Center (lng, lat)</TableHead>
                <TableHead>Radius (km)</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {zones?.length > 0 &&
                zones.map((zone, idx) => (
                  <Zone zone={zone} key={zone._id} getZones={getZones} />
                ))}
            </TableBody>
          </Table>

          {isLoading && <Spinner />}
          {!isLoading && zones.length === 0 && <DataNotFound name="Zones" />}

          <ReactPagination totalPage={totalPage} setPage={setPage} />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default Zones;
