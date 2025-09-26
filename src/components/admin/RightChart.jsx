import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
const chartConfig = {
    visitors: {
    label: "Visitors",
  },
  onDelivery: {
      label: "On Delivery",
      color: "#fe6d4c",
    },
    delivered: {
        label: "Delivered",
        color: "#2bc154",
    },
    canceled: {
        label: "Canceled",
        color: "#3f4953",
    },
};

const RightChart = ({ onDelivery, delivered, cancelled }) => {
    const chartData = [
      { orderStatus: "onDelivery", visitors: onDelivery, fill: "#fe6d4c" },
      { orderStatus: "delivered", visitors: delivered, fill: "#2bc154" },
      { orderStatus: "canceled", visitors: cancelled, fill: "#3f4953" },
    ];
    return (
        <ChartContainer
      config={chartConfig}
      className="aspect-square w-full h-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="orderStatus"
          innerRadius={60}
        />
      </PieChart>
    </ChartContainer>
  );
};

export default RightChart;
