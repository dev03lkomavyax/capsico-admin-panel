import adminDash1 from '@/assets/admin-dash-1.png'
import adminDash2 from '@/assets/admin-dash-2.png'
import adminDash3 from '@/assets/admin-dash-3.png'
import adminDash4 from '@/assets/admin-dash-4.png'

import graphRed from '@/assets/graph-red.png'
import graphGreen from '@/assets/graph-green.png'
import bar1 from '@/assets/bar-1.png'
import bar2 from '@/assets/bar-2.png'
import Infocard from '@/components/admin/Infocard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from 'react'
import LeftChart from '@/components/admin/LeftChart'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MdArrowForwardIos } from 'react-icons/md'
import RightChart from '@/components/admin/RightChart'
import { Progress } from '@/components/ui/progress'

const AdminDashBoard = () => {
    const [dayFilter, setDayFilter] = useState("Today");
    const [dayFilter2, setDayFilter2] = useState("Today");

    return (
        <section className='px-16 py-10 w-full bg-[#F5F7FA]'>
            <h1 className='font-inter text-2xl font-bold text-[#353535]'>Dashboard</h1>
            <p className='text-sm text-[#4F4F4F] font-inter font-semibold'>Welcome to capsico Admin!</p>
            <div className="grid grid-cols-4 gap-6 mt-10">
                <Infocard
                    img={adminDash1}
                    value="126k"
                    label="Total Revenue"
                    trendIcon={graphRed}
                    percentage="26% (30 days)"
                />

                <Infocard
                    img={adminDash2}
                    value="56"
                    label="Total signups"
                    trendIcon={graphGreen}
                    percentage="4% (30 days)"
                />

                <Infocard
                    img={adminDash3}
                    value="279"
                    label="Total Orders"
                    trendIcon={graphGreen}
                    percentage="4% (30 days)"
                />

                <Infocard
                    img={adminDash4}
                    value="65"
                    label="Total Customers"
                    trendIcon={graphGreen}
                    percentage="4% (30 days)"
                />
            </div>

            <div className="grid grid-cols-2 gap-10 mt-10">
                <div className="bg-[#FEFEFE] p-6 py-8 rounded-md">
                    <div className='flex justify-between gap-5 items-center'>
                        <div>
                            <h2 className='font-inter text-lg font-semibold text-[#494949]'>Revenue</h2>
                            <p className='text-[#B7BBBE] font-inter font-semibold text-xs'>Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                        <Select value={dayFilter} onValueChange={(value) => setDayFilter(value)}>
                            <SelectTrigger className="flex justify-between w-36 bg-[#f6f6fb] items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-none rounded-sm">
                                <SelectValue placeholder="Today" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectContent>
                                    <SelectItem value="Today">Today</SelectItem>
                                    <SelectItem value="Yesterday">Yesterday</SelectItem>
                                    <SelectItem value="thisMonth">This Month</SelectItem>
                                </SelectContent>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='grid grid-cols-4 mt-5'>
                        <div className='flex gap-2 items-center'>
                            <div className="w-5 h-5 rounded bg-[#2f4cdd]"></div>
                            <p className='font-inter text-xs text-[#767676]'>Income</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className="w-5 h-5 rounded bg-[#b519ec]"></div>
                            <p className='font-inter text-xs text-[#767676]'>Expense</p>
                        </div>
                        <div className='flex gap-2 items-end'>
                            <div>
                                <p className='font-inter text-[10px] text-[#C1C4C7]'>Income</p>
                                <img src={bar1} alt="bar1" />
                            </div>
                            <p className='font-inter text-lg text-[#373737] font-semibold'>$126,000</p>
                        </div>
                        <div className='flex gap-2 items-end'>
                            <div>
                                <p className='font-inter text-[10px] text-[#C1C4C7]'>Expense</p>
                                <img src={bar2} alt="bar2" />
                            </div>
                            <p className='font-inter text-lg text-[#373737] font-semibold'>$126,000</p>
                        </div>
                    </div>

                    <LeftChart />
                </div>
                <div className="bg-[#FEFEFE] p-6 py-8 rounded-md">
                    <div className='flex justify-between gap-5 items-center'>
                        <div>
                            <h2 className='font-inter text-lg font-semibold text-[#494949]'>Orders Summary</h2>
                            <p className='text-[#B7BBBE] font-inter font-semibold text-xs'>Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                        <Tabs value={dayFilter2} onValueChange={(value) => setDayFilter2(value)} className="w-[270px]">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="Monthly">Monthly</TabsTrigger>
                                <TabsTrigger value="Weekly">Weekly</TabsTrigger>
                                <TabsTrigger value="Today">Today</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="bg-[#e9fff0] px-10 flex justify-between items-center py-5 mt-8">
                        <div className='flex gap-3 items-center'>
                            <div className="bg-[#2AC055] w-20 h-10 rounded-lg text-xl font-inter font-semibold flex justify-center items-center text-[#BFECCB]">25</div>
                            <p className='text-[#4E5650] font-inter font-semibold'>New Orders</p>
                            <div className="w-3 h-3 rounded-full ml-2 bg-[#2AC055]"></div>
                        </div>
                        <button className='flex gap-2 items-center'>
                            <span className='font-inter font-semibold text-[#738DE3]'>Manage orders</span>
                            <MdArrowForwardIos className='text-[#738DE3]' />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-8">
                        <div className='border rounded-lg p-5'>
                            <h2 className='font-inter font-semibold text-3xl text-[#616A72] mt-2'>25</h2>
                            <p className='font-inter text-lg text-[#B5B9BC]'>On Delivery</p>
                        </div>
                        <div className='border rounded-lg p-5'>
                            <h2 className='font-inter font-semibold text-3xl text-[#616A72] mt-2'>60</h2>
                            <p className='font-inter text-lg text-[#B5B9BC]'>Delivered</p>
                        </div>
                        <div className='border rounded-lg p-5'>
                            <h2 className='font-inter font-semibold text-3xl text-[#616A72] mt-2'>7</h2>
                            <p className='font-inter text-lg text-[#B5B9BC]'>Canceled</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-[40%_58%] items-center gap-[2%] mt-10'>
                        <RightChart />
                        <div className='flex flex-col gap-6'>
                            <div className="grid grid-cols-[20%_60%_10%] items-center gap-2">
                                <p className='font-inter text-sm text-[#8A9097]'>On Delivery (15%)</p>
                                <Progress className="w-full h-3" indicatorClassName="bg-[#fe6d4c]" value={25} />
                                <p className='font-inter font-semibold text-xs text-[#B1B5B8]'>25</p>
                            </div>
                            <div className="grid grid-cols-[20%_60%_10%] items-center gap-2">
                                <p className='font-inter text-sm text-[#8A9097]'>Delivered (15%)</p>
                                <Progress className="w-full h-3" indicatorClassName="bg-[#2bc154]" value={60} />
                                <p className='font-inter font-semibold text-xs text-[#B1B5B8]'>60</p>
                            </div>
                            <div className="grid grid-cols-[20%_60%_10%] items-center gap-2">
                                <p className='font-inter text-sm text-[#8A9097]'>Canceled (15%)</p>
                                <Progress className="w-full h-3" indicatorClassName="bg-[#3f4953]" value={7} />
                                <p className='font-inter font-semibold text-xs text-[#B1B5B8]'>7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminDashBoard