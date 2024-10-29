import NegativeReviewsChart from "@/components/reviews/NegativeReviewsChart"
import PositiveReviewsChart from "@/components/reviews/PositiveReviewsChart"
import Review from "@/components/reviews/Review"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { IoIosArrowBack } from 'react-icons/io'

const Reviews = () => {
    const [selected, setSelected] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState("All");
    const [dateFilter, setDateFilter] = useState("Today");
    const [ratingSort, setRatingSort] = useState("latest");

    return (
        <div className='bg-[#F5F7FA] p-10'>
            <div className='flex gap-2 items-center'>
                <IoIosArrowBack className='text-3xl' />
                <h1 className='text-xl font-medium font-roboto'>Reviews</h1>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-5">
                <PositiveReviewsChart />
                <NegativeReviewsChart />
            </div>

            <div className="flex justify-between items-center mt-10">
                <div className='flex justify-start items-center relative'>
                    <BsSearch className='absolute left-5 text-[#1D1929]' />
                    <Input type="search" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto' />
                </div>
                <div className="flex items-center gap-5">
                    <Select value={status} onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                            <SelectValue placeholder="Today" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={dateFilter} onValueChange={(value) => setDateFilter(value)}>
                        <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                            <SelectValue placeholder="Today" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Today">Today</SelectItem>
                            <SelectItem value="Yesterday">Yesterday</SelectItem>
                            <SelectItem value="thisMonth">This Month</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="bg-white py-4 px-8 mt-4">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-2xl text-[#2E2E2E] font-roboto font-medium">Others review</h2>
                        <p className="font-inter text-sm text-[#5A5A5A]">Here is customer review about restaurants</p>
                    </div>
                    <Select value={ratingSort} onValueChange={(value) => setRatingSort(value)}>
                        <SelectTrigger className="flex justify-between bg-[#f6f6fb] items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                            <SelectValue placeholder="Today" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-6 py-10">
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>
        </div>
    )
}

export default Reviews