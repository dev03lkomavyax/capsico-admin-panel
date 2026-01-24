import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import Infocard from "@/components/admin/Infocard";
import { Skeleton } from "@/components/ui/skeleton";
import useGetApiReq from "@/hooks/useGetApiReq";
import {
  BadgePercentIcon,
  Building2Icon,
  ClipboardCheckIcon,
  ClockIcon,
  IndianRupeeIcon,
  StoreIcon,
  TrendingUpIcon,
  TruckIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Graphs from "./Graphs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataNotFound from "@/components/DataNotFound";
import { Button } from "@/components/ui/button";
import { readCookie } from "@/utils/readCookie";

const Metric = () => {
  const [statsData, setStatsData] = useState("");
  const [cities, setCities] = useState([]);

  const userInfo = readCookie("userInfo");

  const [city, setCity] = useState(userInfo?.city || "");

  const handleReset = () => {
    setCity("");
  };

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

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

  const revenueGraphRange = "yearly";
  const range = "monthly";

  useEffect(() => {
    fetchData(
      `/admin/dashboard-summary?range=${range}&revenueGraphRange=${revenueGraphRange}&cityId=${city}`,
    );
  }, [revenueGraphRange, range, city]);

  useEffect(() => {
    if (res?.status === 200) {
      // console.log("getStats res", res);
      setStatsData(res.data.data);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between gap-5 items-center">
          <h1 className="font-inter text-2xl font-bold text-[#353535]">
            Metrics
          </h1>
          <div className="flex gap-5 items-center">
            <Select
              disabled={userInfo?.role === "subAdmin" || isCitiesLoading}
              onValueChange={setCity}
              value={city}
            >
              <SelectTrigger className="w-40">
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

        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-4 rounded-md bg-white">
                  <div className="flex gap-4 items-center justify-between">
                    <Skeleton className="w-[60%] h-8" />
                    <Skeleton className="w-[20%] h-8" />
                  </div>
                  <Skeleton className="w-[90%] h-8 mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <Infocard
                label="Total Orders Today"
                value={statsData?.totalOrdersToday || 0}
                icon={ClipboardCheckIcon}
              />

              <Infocard
                label="Revenue (Today)"
                value={formatter.format(statsData?.revenueToday || 0)}
                icon={IndianRupeeIcon}
              />

              <Infocard
                label="Average Order Value"
                value={formatter.format(statsData?.averageOrderValue || 0)}
                icon={TrendingUpIcon}
              />

              <Infocard
                label="Commission Earned"
                value={formatter.format(statsData?.commissionEarnedToday || 0)}
                icon={BadgePercentIcon}
              />

              <Infocard
                label="Active Restaurants"
                value={statsData?.activeRestaurants || 0}
                icon={StoreIcon}
              />

              <Infocard
                label="Active Delivery Partners"
                value={statsData?.activeDeliveryPartners || 0}
                icon={TruckIcon}
              />

              <Infocard
                label="On-time Delivery %"
                value={`${statsData?.onTimeDeliveryPercentage || 0}%`}
                icon={ClockIcon}
              />

              <Infocard
                label="City Count"
                value={statsData?.cityCount || 0}
                icon={Building2Icon}
              />
            </div>
          )}
        </div>

        <div className="mt-10">
          <Graphs />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default Metric;
