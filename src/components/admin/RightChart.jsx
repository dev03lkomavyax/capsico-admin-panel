import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { Pie, PieChart } from "recharts"
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 107, fill: "var(--color-firefox)" },
]
const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
}

const RightChart = () => {
    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] mt-10"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                />
            </PieChart>
        </ChartContainer>
    )
}

export default RightChart