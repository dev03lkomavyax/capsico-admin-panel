import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import DataNotFound from "../DataNotFound";
import ReactPagination from "../pagination/ReactPagination";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import Offer from "./Offer";
import { readCookie } from "@/utils/readCookie";

const AllOffers = () => {
  const [offers, setOffers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantID, setRestaurantID] = useState("");
  const [offerType, setOfferType] = useState("");
  const [scope, setScope] = useState("");
  const [status, setStatus] = useState("");

  const resetFilters = () => {
    setRestaurantID(restaurants[0]?._id || ""); // reset to first restaurant
    setOfferType(""); // reset offer type
    setScope(""); // reset scope
    setStatus(""); // reset status
    setPage(1); // reset page
  };

  const { res, fetchData, isLoading } = useGetApiReq();
  const userInfo = readCookie("userInfo");

  const {
    res: fetchRestaurantsRes,
    fetchData: fetchRestaurants,
    isLoading: isRestaurantsLoading,
  } = useGetApiReq();

  const getRestaurants = () => {
    fetchRestaurants(`/admin/get-all-restaurants?cityId=${userInfo.city || ""}`);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    if (
      fetchRestaurantsRes?.status === 200 ||
      fetchRestaurantsRes?.status === 201
    ) {
      console.log("fetchRestaurantsRes", fetchRestaurantsRes);
      let restaurants = fetchRestaurantsRes?.data?.restaurants;
      setRestaurants(restaurants || []);
      setRestaurantID(restaurants[0]._id);
    }
  }, [fetchRestaurantsRes]);

  const getOffers = () => {
    let url = `/offers/get-offers?restaurantId=${restaurantID}&page=${page}&limit=${LIMIT}`;

    if (offerType) url += `&offerType=${offerType}`;
    if (scope) url += `&scope=${scope}`;
    if (status !== "") url += `&isActive=${status}`;

    fetchData(url);
  };

  useEffect(() => {
    restaurantID && getOffers();
  }, [page, restaurantID, offerType, scope, status]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("offers res", res);
      setOffers(res?.data?.data?.offers || []);
      setTotalPage(res?.data?.data?.pagination?.totalPages);
      setPage(res?.data?.data?.pagination?.currentPage);
    }
  }, [res]);

  return (
    <div className="max-w-6xl">
      <div className="flex justify-end items-center gap-4 mt-5">
        <Select onValueChange={(value) => setStatus(value)} value={status}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="all">All</SelectItem> */}
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setOfferType(value)}
          value={offerType}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select Offer Type" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="all">All</SelectItem> */}
            <SelectItem value="flatOff">Flat Off</SelectItem>
            <SelectItem value="percentageDiscount">
              Percentage Discount
            </SelectItem>
            <SelectItem value="bogoOffers">Buy One Get One</SelectItem>
            <SelectItem value="comboDeals">Combo Deals</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setScope(value)} value={scope}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select Scope" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="all">All</SelectItem> */}
            <SelectItem value="global">Global</SelectItem>
            <SelectItem value="categorywise">Category-wise</SelectItem>
            <SelectItem value="itemwise">Item-wise</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setRestaurantID(value)}
          value={restaurantID}
          key={restaurantID}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select Restaurant" />
          </SelectTrigger>
          <SelectContent>
            {restaurants.map((restaurant) => (
              <SelectItem key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </SelectItem>
            ))}
            {restaurants.length === 0 && <p>No restaurants found</p>}
          </SelectContent>
        </Select>
        <Button className="w-auto px-4" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      {restaurantID ? (
        <div className="bg-white mt-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Offer Code</TableHead>
                <TableHead className="whitespace-nowrap">Name</TableHead>
                <TableHead className="whitespace-nowrap">Description</TableHead>
                <TableHead className="whitespace-nowrap">Type</TableHead>
                <TableHead className="whitespace-nowrap">Scope</TableHead>
                <TableHead className="whitespace-nowrap">Active</TableHead>
                <TableHead className="whitespace-nowrap">Start Date</TableHead>
                <TableHead className="whitespace-nowrap">End Date</TableHead>
                <TableHead className="whitespace-nowrap">Priority</TableHead>
                <TableHead className="whitespace-nowrap">Max Usage</TableHead>
                <TableHead className="whitespace-nowrap">
                  Max Usage/User
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Current Usage
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Min Order Value
                </TableHead>
                <TableHead className="whitespace-nowrap">Combo Items</TableHead>
                <TableHead className="whitespace-nowrap">Combo Price</TableHead>
                <TableHead className="whitespace-nowrap">Bogo Config</TableHead>
                <TableHead className="whitespace-nowrap">
                  Display Settings
                </TableHead>
                {/* <TableHead>Restaurant</TableHead> */}
                <TableHead className="whitespace-nowrap">
                  Applicable Categories
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Applicable Items
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <Offer key={offer.id} offer={offer} getOffers={getOffers} />
              ))}
            </TableBody>
          </Table>

          {offers.length === 0 && <DataNotFound name="Offers" />}

          <ReactPagination totalPage={totalPage} setPage={setPage} />
        </div>
      ) : (
        <div className="flex justify-center mt-10 items-center text-center">
          Select Restaurant to see offers.
        </div>
      )}
    </div>
  );
};

export default AllOffers;
