import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import ReactPagination from '../pagination/ReactPagination'

const data = [
    {
        vendorID: "1264903",
        vendorName: "PIYUsh",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        vendorID: "1264903",
        vendorName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        vendorID: "1264903",
        vendorName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        vendorID: "1264903",
        vendorName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        vendorID: "1264903",
        vendorName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        vendorID: "1264903",
        vendorName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        vendorID: "1264903",
        vendorName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        vendorID: "1264903",
        vendorName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    }
]

const Quickly = () => {
    const [applicationRequestList, setApplicationRequestList] = useState(data)
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
            <Table className='bg-[#FFFFFF] rounded-lg mb-6'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Vendor ID</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Vendor Name</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Registered Date</TableHead>
                        <TableHead className="w-[200px] text-[#ABABAB] text-xs font-normal font-roboto">Location</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicationRequestList.length > 0 && applicationRequestList.filter(data => data.vendorName.toLowerCase().includes(searchQuery.toLowerCase())).map((data) => (
                        <TableRow key={data.data}>
                            <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data.vendorID}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data.vendorName}</TableCell>
                            <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{data.registerdDate}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">{data.location}</TableCell>
                            <TableCell className='flex gap-10'>
                                <button className="bg-[#D02C2C] px-4 py-[6px] rounded-[10px] text-[#FFFFFF] text-xs font-semibold font-sans">Reject</button>
                                <button className="bg-[#4B9A57] px-4 py-[6px] rounded-[10px] text-[#FFFFFF] text-xs font-semibold font-sans">Approve</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ReactPagination totalPage={totalPage} setPage={setPage} />
        </div>
    )
}

export default Quickly