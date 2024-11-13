import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { Pie, PieChart } from "recharts"
const chartData = [
    { orderStatus: "onDelivery", visitors: 275, fill: "#fe6d4c" },
    { orderStatus: "delivered", visitors: 200, fill: "#2bc154" },
    { orderStatus: "canceled", visitors: 107, fill: "#3f4953" },
]
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
}

const RightChart = () => {
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
    )
}

export default RightChart