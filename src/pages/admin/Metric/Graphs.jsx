import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState, useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { fillMissingBuckets } from "./utils";
import { readCookie } from "@/utils/readCookie";

/* =======================
   CONSTANTS
======================= */

const GREEN = "#16a34a"; // tailwind green-600

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatLabel = (label, range) => {
  if (range === "today") return `${label}:00`;
  if (range === "month") return `Week ${label}`;
  if (range === "year") return months[label - 1];
  return label;
};

const getXAxisLabel = (range) => {
  if (range === "today") return "Hour of Day";
  if (range === "month") return "Week";
  if (range === "year") return "Month";
  return "";
};

const getYAxisLabel = (title) => {
  if (title.includes("Order")) return "Number of Orders";
  if (title.includes("Revenue")) return "Amount (₹)";
  if (title.includes("Earning")) return "Amount (₹)";
  if (title.includes("Average")) return "Amount (₹)";
  return "";
};


/* =======================
   REUSABLE SWITCH
======================= */

const ChartSwitch = ({ value, onToggle }) => (
  <button onClick={onToggle} className="text-sm text-green-600 hover:underline">
    {value === "bar" ? "Switch to Line" : "Switch to Bar"}
  </button>
);

/* =======================
   MAIN COMPONENT
======================= */

const Graphs = () => {
  const [range, setRange] = useState("today");
  const [graphs, setGraphs] = useState({});
  const [chartType, setChartType] = useState({
    totalOrders: "bar",
    revenue: "line",
    averageOrderValue: "line",
    commission: "line",
    onTimeDelivery: "line",
  });
  const userInfo = readCookie("userInfo");

  const toggleChart = (key) => {
    setChartType((prev) => ({
      ...prev,
      [key]: prev[key] === "bar" ? "line" : "bar",
    }));
  };

  const { res, fetchData, isLoading } = useGetApiReq();

  useEffect(() => {
    fetchData(
      `/admin/dashboard-graphs?range=${range}&cityId=${userInfo.city || ""}`,
    );
  }, [range]);

  useEffect(() => {
    if (res?.status === 200) {
      console.log("res", res);

      setGraphs(res.data.graphs || {});
    }
  }, [res]);

  const transformGraphData = (data = [], range, valueKey = "value") => {
    const filled = fillMissingBuckets(data, range, valueKey);
    return filled.map((item) => ({
      ...item,
      label: formatLabel(item.label, range),
    }));
  };

  const transformedGraphs = useMemo(
    () => ({
      totalOrders: transformGraphData(graphs.totalOrders, range),
      revenue: transformGraphData(graphs.revenue, range),
      averageOrderValue: transformGraphData(graphs.averageOrderValue, range),
      commission: transformGraphData(graphs.commission, range),
      onTimeDelivery: transformGraphData(
        graphs.onTimeDelivery,
        range,
        "onTimePercentage",
      ),
      cityPerformance: graphs.cityPerformance || [],
    }),
    [graphs, range],
  );

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {/* TOTAL ORDERS */}
        <MetricCard
          title="Total Orders"
          data={transformedGraphs.totalOrders}
          chartKey="totalOrders"
          chartType={chartType}
          toggleChart={toggleChart}
          isLoading={isLoading}
          range={range}
        />

        {/* REVENUE */}
        <MetricCard
          title="Revenue"
          data={transformedGraphs.revenue}
          chartKey="revenue"
          chartType={chartType}
          toggleChart={toggleChart}
          isLoading={isLoading}
          range={range}
        />

        {/* AVG ORDER VALUE */}
        <MetricCard
          title="Average Order Value"
          data={transformedGraphs.averageOrderValue}
          chartKey="averageOrderValue"
          chartType={chartType}
          toggleChart={toggleChart}
          isLoading={isLoading}
          range={range}
        />

        {/* COMMISSION */}
        <MetricCard
          title="Commission"
          data={transformedGraphs.commission}
          chartKey="commission"
          chartType={chartType}
          toggleChart={toggleChart}
          isLoading={isLoading}
          range={range}
        />

        {/* ON-TIME DELIVERY */}
        <MetricCard
          title="On-time Delivery %"
          data={transformedGraphs.onTimeDelivery}
          chartKey="onTimeDelivery"
          chartType={chartType}
          toggleChart={toggleChart}
          isLoading={isLoading}
          valueKey="onTimePercentage"
          yDomain={[0, 100]}
          range={range}
          //   colSpan
        />

        {/* CITY PERFORMANCE */}
        <Card className="rounded-2xl col-span-2">
          <CardHeader>
            <CardTitle>City Performance</CardTitle>
          </CardHeader>

          <CardContent className="h-[340px]">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transformedGraphs.cityPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    angle={-30}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis
                    allowDecimals={false}
                    tickFormatter={(value) => Math.round(value)}
                  />

                  <Tooltip />

                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill={GREEN}>
                    {transformedGraphs.cityPerformance.map((entry, index) => {
                      let color = "#ef4444"; // red
                      if (entry.value > 400)
                        color = "#22c55e"; // green
                      else if (entry.value > 300) color = "#eab308"; // yellow

                      return <Cell key={index} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/* =======================
   REUSABLE METRIC CARD
======================= */

const MetricCard = ({
  title,
  data,
  chartKey,
  chartType,
  toggleChart,
  isLoading,
  valueKey = "value",
  yDomain,
  colSpan,
}) => (
  <Card className={`rounded-2xl ${colSpan ? "col-span-2" : "col-span-2"}`}>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>{title}</CardTitle>
      <ChartSwitch
        value={chartType[chartKey]}
        onToggle={() => toggleChart(chartKey)}
      />
    </CardHeader>

    <CardContent className="h-[300px]">
      {!isLoading && (
        <ResponsiveContainer width="100%" height="100%">
          {chartType[chartKey] === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="label" /> */}
              <XAxis
                dataKey="label"
                interval={0} // 👈 force show all labels
                angle={-30} // 👈 rotate
                textAnchor="end"
                height={70}
              />

              <YAxis domain={yDomain} />
              <Tooltip />
              <Bar dataKey={valueKey} fill={GREEN} />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="label" /> */}
              <XAxis
                dataKey="label"
                interval={0} // 👈 force show all labels
                angle={-30} // 👈 rotate
                textAnchor="end"
                height={70}
              />

              <YAxis domain={yDomain} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={valueKey}
                stroke={GREEN}
                strokeWidth={2}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      )}
    </CardContent>
  </Card>
);

export default Graphs;
