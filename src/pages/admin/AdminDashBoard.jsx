import adminDash2 from "@/assets/admin-dash-2.png";
import adminDash3 from "@/assets/admin-dash-3.png";
import adminDash4 from "@/assets/admin-dash-4.png";

import bar1 from "@/assets/bar-1.png";
import bar2 from "@/assets/bar-2.png";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import Infocard from "@/components/admin/Infocard";
import LeftChart from "@/components/admin/LeftChart";
import RightChart from "@/components/admin/RightChart";
import DataNotFound from "@/components/DataNotFound";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const [dayFilter, setDayFilter] = useState("today");
  const [dayFilter2, setDayFilter2] = useState("today");
  const [statsData, setStatsData] = useState("");
  const [statsData1, setStatsData1] = useState("");
  const [cities, setCities] = useState([]);
  const [totlaIncome, setTotlaIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const navigate = useNavigate();
  const [city, setCity] = useState("");

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

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  // socket.on("connection", (socket) => {
  //   console.log("connection", socket);
  // });

  const {
    res: res1,
    fetchData: fetchData1,
    isLoading: isLoading1,
  } = useGetApiReq();

  const getStats = () => {
    fetchData1(
      `/admin/get-stats?range=${dayFilter2}&revenueGraphRange=${dayFilter}&cityId=${city}`
    );
  };

  useEffect(() => {
    getStats();
  }, [dayFilter, dayFilter2,city]);

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      console.log("getStats res1", res1);
      const data = res1?.data.data;
      setStatsData1(data || "");

      const incomeSum = data?.revenueGraph.reduce(
        (acc, item) => acc + item.income,
        0
      );
      const expenseSum = data?.revenueGraph.reduce(
        (acc, item) => acc + item.expense,
        0
      );

      setTotlaIncome(incomeSum.toFixed());
      setTotalExpense(expenseSum.toFixed());
    }
  }, [res1]);

  const revenueGraphRange = "yearly";
  const range = "monthly";

  useEffect(() => {
    fetchData(
      `/admin/dashboard-summary?range=${range}&revenueGraphRange=${revenueGraphRange}&cityId=${city}`
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
      <section className="px-0 py-0 w-full">
        <div className="flex gap-5 justify-between items-center">
          <div>
            <h1 className="font-inter text-2xl font-bold text-[#353535]">
              Dashboard
            </h1>
            <p className="text-sm text-[#4F4F4F] font-inter font-semibold">
              Welcome to capsico Admin!
            </p>
          </div>
          <Select onValueChange={setCity} value={city}>
            <SelectTrigger className="w-auto" disabled={isCitiesLoading}>
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
        </div>

        <div className="grid hidden grid-cols-5 gap-6 mt-10">
          <Infocard
            value={formatter.format(statsData?.revenue?.total || 0)}
            label="Total Revenue"
            navigate={() => navigate("/admin/dashboard/reporting")}
            icon={IndianRupeeIcon}
          />

          <Infocard
            img={adminDash2}
            value={formatter.format(statsData?.signups?.total || 0)}
            label="Total signups"
          />

          <Infocard
            img={adminDash3}
            value={formatter.format(statsData?.orders?.total || 0)}
            label="Total Orders"
          />

          <Infocard
            img={adminDash4}
            value={formatter.format(statsData?.customers?.total || 0)}
            label="Total Customers"
          />
          <Infocard
            value={formatter.format(statsData?.totalCommission || 0)}
            label="Total Commission"
            icon={BadgePercentIcon}
          />
        </div>

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
              navigate={() => navigate("/admin/dashboard/reporting")}
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

        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="bg-[#FEFEFE] p-6 py-8 rounded-md">
            <div className="flex justify-between gap-5 items-center">
              <div>
                <h2 className="font-inter text-lg font-semibold text-[#494949]">
                  Revenue
                </h2>
                {/* <p className="text-[#B7BBBE] font-inter font-semibold text-xs">
                  Lorem ipsum dolor sit amet, consectetur
                </p> */}
              </div>
              <Select
                value={dayFilter}
                onValueChange={(value) => setDayFilter(value)}
              >
                <SelectTrigger className="flex justify-between w-36 bg-[#f6f6fb] items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-none rounded-sm">
                  <SelectValue placeholder="Today" />
                </SelectTrigger>
                <SelectContent>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 mt-5">
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 rounded bg-[#2f4cdd]"></div>
                <p className="font-inter text-xs text-[#767676]">Income</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 rounded bg-[#b519ec]"></div>
                <p className="font-inter text-xs text-[#767676]">Expense</p>
              </div>
              <div className="flex gap-2 items-end">
                <div>
                  <p className="font-inter text-[10px] text-[#C1C4C7]">
                    Income
                  </p>
                  <img src={bar1} alt="bar1" />
                </div>
                <p className="font-inter text-lg text-[#373737] font-semibold">
                  ₹{formatter.format(totlaIncome || 0)}
                </p>
              </div>
              <div className="flex gap-2 items-end">
                <div>
                  <p className="font-inter text-[10px] text-[#C1C4C7]">
                    Expense
                  </p>
                  <img src={bar2} alt="bar2" />
                </div>
                <p className="font-inter text-lg text-[#373737] font-semibold">
                  ₹{formatter.format(totalExpense || 0)}
                </p>
              </div>
            </div>

            <LeftChart
              range={dayFilter}
              revenueGraph={statsData1?.revenueGraph}
            />
          </div>
          <div className="bg-[#FEFEFE] p-6 py-8 rounded-md">
            <div className="flex justify-between gap-5 items-center">
              <div>
                <h2 className="font-inter text-lg font-semibold text-[#494949]">
                  Orders Summary
                </h2>
                {/* <p className="text-[#B7BBBE] font-inter font-semibold text-xs">
                  Lorem ipsum dolor sit amet, consectetur
                </p> */}
              </div>
              <Tabs
                value={dayFilter2}
                onValueChange={(value) => setDayFilter2(value)}
                className="w-[270px]"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="today">Today</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="bg-[#e9fff0] px-10 flex justify-between items-center py-5 mt-8">
              <div className="flex gap-3 items-center">
                <div className="bg-[#2AC055] w-20 h-10 rounded-lg text-xl font-inter font-semibold flex justify-center items-center text-[#BFECCB]">
                  {formatter.format(statsData1?.ordersSummary?.newOrders || 0)}
                </div>
                <p className="text-[#4E5650] font-inter font-semibold">
                  New Orders
                </p>
                <div className="w-3 h-3 rounded-full ml-2 bg-[#2AC055]"></div>
              </div>
              <button className="flex gap-2 items-center">
                <span className="font-inter font-semibold text-[#738DE3]">
                  Manage orders
                </span>
                <MdArrowForwardIos className="text-[#738DE3]" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="border rounded-lg p-5">
                <h2 className="font-inter font-semibold text-3xl text-[#616A72] mt-2">
                  {formatter.format(statsData1?.ordersSummary?.onDelivery || 0)}
                </h2>
                <p className="font-inter text-lg text-[#B5B9BC]">On Delivery</p>
              </div>
              <div className="border rounded-lg p-5">
                <h2 className="font-inter font-semibold text-3xl text-[#616A72] mt-2">
                  {formatter.format(statsData1?.ordersSummary?.delivered || 0)}
                </h2>
                <p className="font-inter text-lg text-[#B5B9BC]">Delivered</p>
              </div>
              <div className="border rounded-lg p-5">
                <h2 className="font-inter font-semibold text-3xl text-[#616A72] mt-2">
                  {formatter.format(statsData1?.ordersSummary?.cancelled || 0)}
                </h2>
                <p className="font-inter text-lg text-[#B5B9BC]">Canceled</p>
              </div>
            </div>
            <div className="grid grid-cols-[40%_58%] items-center gap-[2%] mt-10">
              <RightChart
                onDelivery={statsData1?.ordersSummary?.onDelivery}
                delivered={statsData1?.ordersSummary?.delivered}
                cancelled={statsData1?.ordersSummary?.cancelled}
              />
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-[20%_60%_10%] items-center gap-2">
                  <p className="font-inter text-sm text-[#8A9097]">
                    On Delivery ({statsData1?.ordersSummary?.onDeliveryPercent}
                    %)
                  </p>
                  <Progress
                    className="w-full h-3"
                    indicatorClassName="bg-[#fe6d4c]"
                    value={statsData1?.ordersSummary?.onDelivery || 0}
                  />
                  <p className="font-inter font-semibold text-xs text-[#B1B5B8]">
                    {statsData1?.ordersSummary?.onDelivery || 0}
                  </p>
                </div>
                <div className="grid grid-cols-[20%_60%_10%] items-center gap-2">
                  <p className="font-inter text-sm text-[#8A9097]">
                    Delivered ({statsData1?.ordersSummary?.deliveredPercent}%)
                  </p>
                  <Progress
                    className="w-full h-3"
                    indicatorClassName="bg-[#2bc154]"
                    value={statsData1?.ordersSummary?.delivered || 0}
                  />
                  <p className="font-inter font-semibold text-xs text-[#B1B5B8]">
                    {statsData1?.ordersSummary?.delivered || 0}
                  </p>
                </div>
                <div className="grid grid-cols-[20%_60%_10%] items-center gap-2">
                  <p className="font-inter text-sm text-[#8A9097]">
                    Canceled ({statsData1?.ordersSummary?.cancelledPercent}%)
                  </p>
                  <Progress
                    className="w-full h-3"
                    indicatorClassName="bg-[#3f4953]"
                    value={statsData1?.ordersSummary?.cancelled || 0}
                  />
                  <p className="font-inter font-semibold text-xs text-[#B1B5B8]">
                    {statsData1?.ordersSummary?.cancelled || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminWrapper>
  );
};

export default AdminDashBoard;
