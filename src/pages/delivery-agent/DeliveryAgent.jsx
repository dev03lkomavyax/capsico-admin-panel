import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { IoIosArrowBack } from 'react-icons/io'
import ReactPaginate from 'react-paginate'
import ReactPagination from '@/components/pagination/ReactPagination'
import DeliveryAgentComp from '@/components/delivery-agent/DeliveryAgentComp'
import { ChevronsUpDown } from 'lucide-react'


const DeliveryAgent = () => {
    const [customerData, setCustomerData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(5)
    const [status, setStatus] = useState("All");
    const [dateFilter, setDateFilter] = useState("Today");

    return (
        <div className='flex flex-col gap-6 w-full h-full py-8 px-12 bg-[#f9f9f9]'>
            <section className='flex justify-between items-center w-full'>
                <div className='flex justify-start items-center -ml-4'>
                    <BsSearch className='relative left-8 text-[#1D1929]' />
                    <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto' />
                </div>
                <div className='flex justify-between items-center w-[230px]'>
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
            </section>
            <div>
                <Table className='bg-[#FFFFFF]'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-10'><Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' /></TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                                <div className='flex gap-1 items-center'>
                                    Agent ID
                                    <ChevronsUpDown className="opacity-50 w-4 h-4 text-[#1D1929]" />
                                </div>
                            </TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Delivery Agent Name</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Location</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                                <div className='flex gap-1 items-center'>
                                    Status
                                    <ChevronsUpDown className="opacity-50 w-4 h-4 text-[#1D1929]" />
                                </div>
                            </TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">
                                <div className='flex gap-1 items-center'>
                                    Joined Date
                                    <ChevronsUpDown className="opacity-50 w-4 h-4 text-[#1D1929]" />
                                </div>
                            </TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array(10).fill("*").map((_, i) => (
                            <DeliveryAgentComp
                                key={i}
                            />
                        ))}
                    </TableBody>
                </Table>

            </div>
            <ReactPagination
                setPage={setPage}
                totalPage={pageCount}
            />
        </div>
    )
}

export default DeliveryAgent