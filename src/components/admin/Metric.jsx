import React, { useEffect, useState } from "react";
import { TfiInfoAlt } from "react-icons/tfi";
import MetricLi from "./MetricLi";
import useGetApiReq from "@/hooks/useGetApiReq";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { MdCalendarMonth } from "react-icons/md";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const marketing = [
  {
    title: "Sales from Promotion",
    week1: "₹0",
    week2: "₹0",
  },
  {
    title: "Sales from Offers",
    week1: "₹0",
    week2: "₹0",
  },
];

const userFunnel = [
  {
    title: "Overall Impressions",
    week1: "0",
    week2: "173",
  },
  {
    title: "Impressions to menu",
    week1: "",
    week2: "2.9%",
  },
  {
    title: "Menu to Chekout",
    week1: "",
    week2: "",
  },
  {
    title: "New users",
    week1: "",
    week2: "",
  },
];

const userExperience = [
  {
    title: "Average Rating",
    week1: "0",
    week2: "0",
  },
  {
    title: "Unsatisfied Orders",
    week1: "",
    week2: "",
  },
  {
    title: "",
    week1: "₹0",
    week2: "₹0",
  },
  {
    title: "",
    week1: "",
    week2: "61.6%",
  },
  {
    title: "",
    week1: "",
    week2: "",
  },
];

const Metric = () => {
  const [filterType, setFilterType] = useState("today");
  const [metrics, setMetrics] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isStartDate, setIsStartDate] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);

  const handleDateSelect = (value) => {
    setStartDate(value);
    setIsStartDate(false);
  };
  const handleDateSelect1 = (value) => {
    setEndDate(value);
    setIsEndDate(false);
  };

  const { res, fetchData, isLoading } = useGetApiReq();

  const getMetrics = () => {
    fetchData(
      `/admin/get-metrics?filterType=${filterType}&startDate=${startDate}&endDate=${endDate}`
    );
  };

  useEffect(() => {
    getMetrics();
  }, [filterType, startDate, endDate]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getMetrics res", res);
      const data = res?.data;
      setMetrics(data);
    }
  }, [res]);

  return (
    <div className="bg-white">
      <div className="grid  gap-4 px-5 py-3 border-b border-[#CED7DE]">
        <div className="flex justify-between items-center">
          <p className="text-2xl text-[#323F49] font-medium font-numans">
            Metric
          </p>
          <div className="flex gap-4">
            {filterType === "custom" && (
              <>
                <Popover open={isStartDate} onOpenChange={setIsStartDate}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full flex h-10 px-4 border-[#808080] gap-2 justify-start text-[#717171] max-med:px-3 max-med:h-[46px] max-med:rounded-lg",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <MdCalendarMonth className="text-[#838383] text-xl absolute top-[35%] right-[6.5%]" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span className="text-[#838383] text-base font-normal max-med:text-sm">
                          Select a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={handleDateSelect}
                      // disabled={(date) =>
                      //   date > new Date() || date < new Date("1900-01-01")
                      // }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover open={isEndDate} onOpenChange={setIsEndDate}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full flex h-10 px-4 border-[#808080] gap-2 justify-start text-[#717171] max-med:px-3 max-med:h-[46px] max-med:rounded-lg",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <MdCalendarMonth className="text-[#838383] text-xl absolute top-[35%] right-[6.5%]" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span className="text-[#838383] text-base font-normal max-med:text-sm">
                          Select a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={handleDateSelect1}
                      // disabled={(date) =>
                      //   date > new Date() || date < new Date("1900-01-01")
                      // }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </>
            )}
            
            <Select
              value={filterType}
              onValueChange={(value) => setFilterType(value)}
            >
              <SelectTrigger className="flex justify-between w-36 bg-[#f6f6fb] items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-none rounded-sm">
                <SelectValue placeholder="Today" />
              </SelectTrigger>
              <SelectContent>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* <p className="class-xl1 text-[#4A5E6D] py-4 px-5 font-semibold border-b border-[#CED7DE] font-numans">Overview</p>
      {overview.map((item, i) => (
        <MetricLi
          key={i}
          title={item.title}
          week1={item.week1}
          week2={item.week2}
        />
      ))} */}

      <p className="text-[#4A5E6D] text-xl font-medium font-inter py-4 px-5 border-b border-[#CED7DE]">
        User Experience
      </p>
      <div className="grid grid-cols-2 gap-2">
        <MetricLi title="Average Rating" value={metrics?.avgRating || 0} />
        <MetricLi
          title="Unsatisfied Orders"
          value={metrics?.unsatisfiedOrders || 0}
        />
        <MetricLi title="Lost sales" value={0} />
        <MetricLi
          title="Online Percentage"
          value={metrics?.onlinePercentage || 0}
        />
        <MetricLi
          title="Cooking time (In minutes)"
          value={metrics?.avgCookingTime || 0}
        />
      </div>

      <p className="text-[#4A5E6D] text-xl font-medium font-inter py-4 px-5 border-b border-[#CED7DE]">
        User Funnel
      </p>
      <div className="grid grid-cols-2 gap-2">
        {userFunnel.map((item, i) => (
          <MetricLi key={i} title={item.title} />
        ))}
      </div>

      <p className="text-[#4A5E6D] text-xl font-medium font-inter py-4 px-5 border-b border-[#CED7DE]">
        Marketing
      </p>
      <div className="grid grid-cols-2 gap-2">
        {marketing.map((item, i) => (
          <MetricLi
            key={i}
            title={item.title}
            week1={item.week1}
            week2={item.week2}
          />
        ))}
      </div>

      <div className="grid grid-cols-[310px_250px_200px_200px] gap-4 px-5 items-center py-4 border-b border-[#CED7DE]">
        <p className="class-xl1 text-[#4A5E6D] font-semibold font-numans">
          Latest Menu
        </p>
        <p className="text-[#4A5E6D] class-sm3">
          Select one outlet to view this
        </p>
      </div>
    </div>
  );
};

export default Metric;
