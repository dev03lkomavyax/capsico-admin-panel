import React, { useState } from 'react'
import { Bar, BarChart, XAxis } from "recharts"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { ChartContainer } from '../ui/chart'
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'

const positiveReviewsChartConfig = {
    desktop: {
        label: "Desktop",
        color: "#a1d0bb",
    },
    mobile: {
        label: "Mobile",
        color: "#148B55",
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

const PositiveReviewsChart = () => {
    const [selected, setSelected] = useState("Today");
    const [date, setDate] = useState();

    const onDateSelect = (value) => {
        setDate(value);
        // setSelected("Today");
    }

    return (
        <div className='bg-white rounded-lg p-6'>
            <div className="flex justify-between">
                <h2 className="text-xl font-roboto font-medium">Positive Reviews</h2>
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
                {/* <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="w-[150px] h-10 justify-between hover:bg-transparent text-[#1D1929] px-4 font-normal">
                            {(selected === "chooseDate" && date) ? <div className='line-clamp-1 w-[140px]'>{format(date, "PPP")}</div> : selected}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        {selected !== "chooseDate" && <div className='flex flex-col gap-2 w-full p-1'>
                            <label onClick={() => setSelected("Today")} className="relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer" value="Today">Today</label>
                            <label onClick={() => setSelected("Yesterday")} className="relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer" value="Yesterday">Yesterday</label>
                            <label onClick={() => setSelected("Tomorrow")} className="relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer" value="Tomorrow">Tomorrow</label>
                            <label onClick={() => setSelected("chooseDate")} className="relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer" value="chooseDate">Choose Date</label>
                        </div>}
                        {selected === "chooseDate" &&
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(value)=> onDateSelect(value)}
                                initialFocus
                            />}
                    </PopoverContent>
                </Popover> */}
            </div>
            <ChartContainer config={positiveReviewsChartConfig} className="min-h-[200px] w-full">
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

export default PositiveReviewsChart