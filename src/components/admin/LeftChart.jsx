import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const HOURS = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}:00`,
  income: 0,
  expense: 0,
}));

const WEEK_DAYS = daysOfWeek.map((day) => ({
  label: day,
  income: 0,
  expense: 0,
}));

const YEAR_MONTHS = months.map((m) => ({
  label: m,
  income: 0,
  expense: 0,
}));

const LeftChart = ({ revenueGraph = [], range = "yearly" }) => {
  const baseData = useMemo(() => {
    return revenueGraph.map((item) => {
      if (range === "today") {
        return {
          label: `${item._id.hour}:00`,
          income: item.income,
          expense: item.expense,
        };
      }

      if (range === "weekly") {
        return {
          label: daysOfWeek[item._id.day - 1],
          income: item.income,
          expense: item.expense,
        };
      }

      if (range === "monthly") {
        return {
          label: `Week ${item._id.week}`,
          income: item.income,
          expense: item.expense,
        };
      }

      if (range === "yearly") {
        return {
          label: months[item._id.month - 1],
          income: item.income,
          expense: item.expense,
        };
      }

      return item;
    });
  }, [revenueGraph, range]);

  const weeklyData = useMemo(() => {
    if (range !== "weekly") return null;

    const dayMap = new Map();

    baseData.forEach((item) => {
      dayMap.set(item.label, {
        income: item.income,
        expense: item.expense,
      });
    });

    return WEEK_DAYS.map((d) => ({
      label: d.label,
      income: dayMap.get(d.label)?.income ?? 0,
      expense: dayMap.get(d.label)?.expense ?? 0,
    }));
  }, [baseData, range]);

  const yearlyData = useMemo(() => {
    if (range !== "yearly") return null;

    const monthMap = new Map();

    baseData.forEach((item) => {
      monthMap.set(item.label, {
        income: item.income,
        expense: item.expense,
      });
    });

    return YEAR_MONTHS.map((m) => ({
      label: m.label,
      income: monthMap.get(m.label)?.income ?? 0,
      expense: monthMap.get(m.label)?.expense ?? 0,
    }));
  }, [baseData, range]);

  const chartData = useMemo(() => {
    if (range === "today") {
      const hourMap = new Map();
      baseData.forEach((item) => {
        hourMap.set(item.label, {
          income: item.income,
          expense: item.expense,
        });
      });

      return HOURS.map((h) => ({
        label: h.label,
        income: hourMap.get(h.label)?.income ?? 0,
        expense: hourMap.get(h.label)?.expense ?? 0,
      }));
    }

    if (range === "weekly") return weeklyData;
    if (range === "yearly") return yearlyData;

    return baseData; // monthly
  }, [range, baseData, weeklyData, yearlyData]);

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
