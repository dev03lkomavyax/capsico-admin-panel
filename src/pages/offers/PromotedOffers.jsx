import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataNotFound from "@/components/DataNotFound";
import ReactPagination from "@/components/pagination/ReactPagination";
import PromotedOfferComp from "@/components/offers/PromotedOfferComp";
import useGetApiReq from "@/hooks/useGetApiReq";
import { LIMIT } from "@/constants/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PromotedOffers = () => {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [promotionCategory, setPromotionCategory] = useState("all");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [sortBy, setSortBy] = useState("priorityLevel");
  const [sortOrder, setSortOrder] = useState("asc");

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
      }
    }, [fetchCitiesRes]);

  const getOffers = () => {
    const query = new URLSearchParams({
      promotionCategory,
      // priorityLevel: priorityLevel === "all" ? "" : priorityLevel,
      city:city.toLocaleLowerCase(),
      // sortBy,
      // sortOrder,
      page,
      limit: LIMIT,
    }).toString();
    let url = `/offers/admin/promoted?${query}`;

    //  if (offerType) url += `&offerType=${offerType}`;
    //  if (scope) url += `&scope=${scope}`;
    //  if (status !== "") url += `&isActive=${status}`;

    fetchData(url);
  };

  const onReset = () => {
    setPromotionCategory("all");
    setPriorityLevel("");
    setCity("");
    setSortBy("priorityLevel");
    setSortOrder("asc");
    setPage(1);
  }

  useEffect(() => {
    getOffers();
  }, [promotionCategory, priorityLevel, city, sortBy, sortOrder, page]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("offers res", res);
      setOffers(res?.data?.data?.offers || []);
      setTotalPage(res?.data?.data?.pagination?.pages);
      // setPage(res?.data?.data?.pagination?.currentPage);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex gap-3 mb-6 items-end justify-between">
          <Link to="/admin/offers" className="inline-flex gap-1 items-center">
            <ChevronLeft />
            <h2 className="text-[#111928] text-xl font-semibold font-inter">
              Promoted offers
            </h2>
          </Link>
          <div className="flex flex-wrap gap-3 items-end">
            {/* Promotion Category */}
            <div>
              <label className="text-sm text-gray-600">Promotion Type</label>
              <Select
                value={promotionCategory}
                onValueChange={setPromotionCategory}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {/* <SelectItem value="none">None</SelectItem> */}
                  <SelectItem value="megaSale">Mega Sale</SelectItem>
                  <SelectItem value="topRated">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Level */}
            {/* <div>
            <label className="text-sm text-gray-600">Priority</label>
            <Select value={priorityLevel} onValueChange={setPriorityLevel}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

            {/* City (only for superAdmin) */}
            <div>
              <label className="text-sm text-gray-600">City</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="all">All</SelectItem> */}
                  {cities.map((city) => (
                    <SelectItem
                      key={city?._id}
                      value={city?.city}
                      className="capitalize"
                    >
                      {city.city}
                    </SelectItem>
                  ))}
                  {cities.length === 0 && <DataNotFound name="Cities" />}
                </SelectContent>
              </Select>
              {/* <Input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-[150px]"
            /> */}
            </div>

            {/* Sort By */}
            {/* <div>
            <label className="text-sm text-gray-600">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priorityLevel">Priority Level</SelectItem>
                <SelectItem value="promotedAt">Promoted Date</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

            {/* Sort Order */}
            {/* <div>
            <label className="text-sm text-gray-600">Order</label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

            {/* Refresh Button */}
            <Button className="w-auto px-4" variant="capsico" onClick={onReset}>
              Reset
            </Button>
          </div>
        </div>

        <div className="bg-white mt-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offer Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Promotion Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                {/* <TableHead>Days Left</TableHead>
                <TableHead>Usage</TableHead> */}
                {/* <TableHead>Promoted By</TableHead> */}
                {/* <TableHead className="text-right">Actions</TableHead> */}
              </TableRow>
            </TableHeader>

            <TableBody>
              {offers.map((offer) => (
                <PromotedOfferComp key={offer.id} offer={offer} />
              ))}
            </TableBody>
          </Table>

          {offers.length === 0 && <DataNotFound name="Offers" />}

          <ReactPagination totalPage={totalPage} setPage={setPage} />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default PromotedOffers;
