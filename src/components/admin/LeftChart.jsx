import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
const chartData = [
    { month: "January", desktop: 18, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 37, mobile: 120 },
    { month: "April", desktop: 123, mobile: 190 },
    { month: "May", desktop: 50, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
    { month: "July", desktop: 30, mobile: 90 },
    { month: "August", desktop: 24, mobile: 70 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2f4cdd",
    },
    mobile: {
        label: "Mobile",
        color: "#b519ec",
    },
}

const LeftChart = () => {
    return (
        <ChartContainer className="mt-10" config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-desktop)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-desktop)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <Area
                    dataKey="mobile"
                    type="natural"
                    fill="url(#fillMobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                />
                <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>

    )
}

export default LeftChart