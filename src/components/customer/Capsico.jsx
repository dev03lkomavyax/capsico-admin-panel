import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import ReactPagination from '../pagination/ReactPagination'

const data = [
    {
        customerID: "1264903",
        customerName: "Vivek",
        joinedDate: `March ${21, 2020}`,
        Location: "Adiyaman Hotel",
        totalSpent: "$19.09",
        lastOrder: "$19.09",
    },
    {
        customerID: "1264903",
        customerName: "Aditya",
        joinedDate: `March ${21, 2020}`,
        Location: "Adiyaman Hotel",
        totalSpent: "$19.09",
        lastOrder: "$19.09",
    },
    {
        customerID: "1264903",
        customerName: "Piyush",
        joinedDate: `March ${21, 2020}`,
        Location: "Adiyaman Hotel",
        totalSpent: "$19.09",
        lastOrder: "$19.09",
    },
    {
        customerID: "1264903",
        customerName: "Aditya",
        joinedDate: `March ${21, 2020}`,
        Location: "Adiyaman Hotel",
        totalSpent: "$19.09",
        lastOrder: "$19.09",
    },
]

const Capsico = () => {
    const [customerData, setCustomerData] = useState(data)
    const [searchQuery, setSearchQuery] = useState('')
    const [totalPage, setTotalPage] = useState(16)
    const [page, setPage] = useState(1)

    return (
        <div>
            <div className='flex justify-between items-center w-full mb-4'>
                <div className='flex justify-start items-center -ml-4'>
                    <BsSearch className='relative left-8 text-[#1D1929]' />
                    <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto' />
                </div>
                <div className='flex justify-between items-center w-[230px]'>
                    <Select>
                        <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">All</SelectItem>
                                <SelectItem value="newOrder">New Order</SelectItem>
                                <SelectItem value="preparedry">Prepared</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                            <SelectValue placeholder="Today" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Yesterday</SelectItem>
                                <SelectItem value="banana">Tommarrow</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Table className='bg-[#FFFFFF]'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Customer ID</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Customer Name</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Joined Date</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Location</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Total spent</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Last order</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customerData.length > 0 && customerData.filter(data => data.customerName.toLowerCase().includes(searchQuery.toLowerCase())).map((data) => (
                        <TableRow key={data.data}>
                            <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data.customerID}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data.customerName}</TableCell>
                            <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{data.joinedDate}</TableCell>
                            <TableCell className="text-[#1D1929] text-[12px] font-normal font-roboto">{data.Location}</TableCell>
                            <TableCell className="text-[#667085] text-[10px] font-semibold font-inter">{data.totalSpent}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data.lastOrder}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
                                <Select>
                                    <SelectTrigger className="flex justify-between items-center w-[120px] h-[30px] text-[#003CFF] text-sm font-semibold font-sans border-[#E9E9EA] border-[1px] rounded-[10px]">
                                        <SelectValue placeholder="Action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>Fruits</SelectLabel> */}
                                            <SelectItem value="remove">Remove</SelectItem>
                                            <SelectItem value="detail">View detail</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ReactPagination totalPage={totalPage} setPage={setPage} />
        </div>
    )
}

export default Capsico