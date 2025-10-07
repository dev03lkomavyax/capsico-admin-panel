import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  income: {
    label: "Income",
    color: "#2f4cdd",
  },
  expense: {
    label: "Expense",
    color: "#b519ec",
  },
};

const LeftChart = ({ revenueGraph = [], range = "yearly" }) => {
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
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // transform backend data depending on range
  const chartData = revenueGraph.map((item) => {
    if (range === "today") {
      
      return {
        label: `${item._id.hour}:00`,
        income: item.income,
        expense: item.expense,
      };
    } else if (range === "weekly") {
      return {
        label: daysOfWeek[item._id.day - 1],
        income: item.income,
        expense: item.expense,
      };
    } else if (range === "monthly") {
      return {
        label: `Week ${item._id.week}`,
        income: item.income,
        expense: item.expense,
      };
    } else if (range === "yearly") {
      return {
        label: months[item._id.month - 1],
        income: item.income,
        expense: item.expense,
      };
    }
    return item;
  });

  return (
    <ChartContainer className="mt-10" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          // keep month short for yearly, else keep as-is
          tickFormatter={(value) =>
            range === "yearly" ? value.slice(0, 3) : value
          }
        />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-income)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-income)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-expense)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-expense)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="income"
          type="monotone"
          fill="url(#fillIncome)"
          stroke="var(--color-income)"
          // stackId="a"
        />
        <Area
          dataKey="expense"
          type="monotone"
          fill="url(#fillExpense)"
          stroke="var(--color-expense)"
          // stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default LeftChart;
