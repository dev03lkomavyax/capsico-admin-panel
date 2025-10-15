import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import ReactPagination from "@/components/pagination/ReactPagination";
import Spinner from "@/components/Spinner";
import CreateSpotlightModal from "@/components/spotlight/CreateSpotlightModal";
import SpotlightComp from "@/components/spotlight/SpotlightComp";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetApiReq from "@/hooks/useGetApiReq";
import { FilterIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DataNotFound from "@/components/DataNotFound";

const Spotlight = () => {
  const [isCreateSpotlightModalOpen, setIsCreateSpotlightModalOpen] =
    useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [spotlights, setSpotlights] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  // ======= Filter States =======
  const [cityName, setCityName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [isActive, setIsActive] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();
  const { res: fetchRestaurantsRes, fetchData: fetchRestaurants } =
    useGetApiReq();

  useEffect(() => {
    fetchRestaurants(`/admin/get-all-restaurants`);
  }, []);

  useEffect(() => {
    if (
      fetchRestaurantsRes?.status === 200 ||
      fetchRestaurantsRes?.status === 201
    ) {
      setRestaurants(fetchRestaurantsRes?.data?.restaurants || []);
    }
  }, [fetchRestaurantsRes]);

  const getSpotlights = () => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (cityName) params.append("cityName", cityName);
    if (restaurantId) params.append("restaurantId", restaurantId);
    if (isActive) params.append("isActive", isActive);

    fetchData(`/spotlight/getAllSpotlights?${params.toString()}`);
  };

  useEffect(() => {
    getSpotlights();
  }, [page, cityName, restaurantId, isActive]);

  useEffect(() => {
    if (res?.status === 200 && res?.data?.data?.spotlights) {
      setSpotlights(res.data.data.spotlights);
      setTotalPage(res.data.pagination?.totalPages || 1);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        {/* ======= Header ======= */}
        <div className="flex justify-between items-center gap-5">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Spotlight
          </h2>
          <Button className="px-4 w-auto" variant="capsico" asChild>
            <Link to="/admin/spotlight/create">
              <PlusIcon className="mr-1 h-4 w-4" />
              Add Spotlight
            </Link>
          </Button>
        </div>

        {/* ======= Filters ======= */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border p-4 rounded-lg bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </div>

          {/* City Name Filter */}
          {/* <Input
            placeholder="Filter by City"
            value={cityName}
            onChange={(e) => {
              setCityName(e.target.value);
              setPage(1);
            }}
            className="w-[180px]"
          /> */}

          <Select onValueChange={setRestaurantId} value={restaurantId}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Select a restaurant" />
            </SelectTrigger>

            <SelectContent>
              {restaurants.map((restaurant) => (
                <SelectItem
                  key={restaurant?._id}
                  value={restaurant?._id}
                  className="capitalize"
                >
                  {restaurant.name}
                </SelectItem>
              ))}
              {restaurants.length === 0 && <DataNotFound name="Restaurants" />}
            </SelectContent>
          </Select>

          <Select
            value={isActive}
            onValueChange={(value) => {
              setIsActive(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="all">All</SelectItem> */}
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCityName("");
              setRestaurantId("");
              setIsActive("");
              setPage(1);
            }}
          >
            Reset Filters
          </Button>
        </div>

        {/* ======= Table ======= */}
        <div className="mt-10">
          <Table className="w-full border shadow-sm bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead>Spotlight Items</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : spotlights.length > 0 ? (
                spotlights.map((spotlight) => (
                  <SpotlightComp key={spotlight._id} spotlight={spotlight} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No spotlights found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* ======= Pagination ======= */}
          <div className="mt-6">
            <ReactPagination totalPage={totalPage} setPage={setPage} />
          </div>
        </div>

        {/* ======= Create Modal (if used) ======= */}
        {isCreateSpotlightModalOpen && (
          <CreateSpotlightModal
            open={isCreateSpotlightModalOpen}
            setOpen={setIsCreateSpotlightModalOpen}
            getSpotlights={() =>
              fetchData(`/spotlight/getAllSpotlights?page=${page}`)
            }
          />
        )}
      </div>
    </AdminWrapper>
  );
};

export default Spotlight;
