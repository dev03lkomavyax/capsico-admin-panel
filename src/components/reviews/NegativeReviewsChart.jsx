import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useState } from 'react'
import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer } from '../ui/chart'

const negativeReviewsChartConfig = {
    desktop: {
        label: "Desktop",
        color: "#eaa2a2",
    },
    mobile: {
        label: "Mobile",
        color: "#CB1717",
    },
}

const chartData = [
    { month: "Mon", desktop: 186, mobile: 80 },
    { month: "Tue", desktop: 305, mobile: 200 },
    { month: "Wed", desktop: 237, mobile: 120 },
    { month: "Thu", desktop: 73, mobile: 190 },
    { month: "Fri", desktop: 209, mobile: 130 },
    { month: "Sat", desktop: 214, mobile: 140 },
    { month: "Sun", desktop: 214, mobile: 140 },
]

const NegativeReviewsChart = () => {
    const [selected, setSelected] = useState("");

    return (
        <div className='bg-white rounded-lg p-6'>
            <div className="flex justify-between">
                <h2 className="text-xl font-roboto font-medium">Negative Reviews</h2>
                <Select value={selected} onValueChange={(value) => setSelected(value)}>
                    <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                        <SelectValue placeholder="Today" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Today">Today</SelectItem>
                        <SelectItem value="Yesterday">Yesterday</SelectItem>
                        <SelectItem value="thisMonth">This Month</SelectItem>
                    </SelectContent>
                </Select>
                {/* <Popover open={isOpen} onOpenChange={()=> {
                            selected === "" && setIsOpen(true)
                        }} >
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover> */}
            </div>
            <ChartContainer config={negativeReviewsChartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}

export default NegativeReviewsChart