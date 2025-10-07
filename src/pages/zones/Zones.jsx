import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useGetApiReq from "@/hooks/useGetApiReq";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { FaPlus } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Zone from "@/components/zones/Zone";
import Spinner from "@/components/Spinner";
import DataNotFound from "@/components/DataNotFound";
import ReactPagination from "@/components/pagination/ReactPagination";

const Zones = () => {
  const [zones, setZones] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [filterCity, setFilterCity] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getZones = () => {
    fetchData(
      `/zones/get-all?page=${page}&type=${
        filterType === "all" ? "" : filterType
      }`
    );
  };

  useEffect(() => {
    getZones();
  }, [page, filterType]);

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
            <Button asChild className="w-auto px-4" variant="capsico">
              <Link to="/admin/zones/create">
                <FaPlus />
                Create Zone
              </Link>
            </Button>

            <Select value={filterType} onValueChange={(v) => setFilterType(v)}>
              <SelectTrigger className="min-w-[140px]">
                <SelectValue placeholder="Filter: Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
              </SelectContent>
            </Select>
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
