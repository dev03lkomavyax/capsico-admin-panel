import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import { IoIosArrowBack } from 'react-icons/io'

const data = [
    {
        orderID: "1264903",
        order: "TV 14 Inch Gede",
        customer: "Vivek",
        status: "Complete",
        createdDate: `March ${21, 2020}`,
        restaurantName: "Adiyaman Hotel",
        price: "$19.09",
    },
    {
        orderID: "1264903",
        order: "TV 14 Inch Gede",
        customer: "Piyush",
        status: "Cancelled",
        createdDate: `March ${21, 2020}`,
        restaurantName: "Adiyaman Hotel",
        price: "$19.09",
    },
    {
        orderID: "1264903",
        order: "TV 14 Inch Gede",
        customer: "Aditya",
        status: "Preparing",
        createdDate: `March ${21, 2020}`,
        restaurantName: "Adiyaman Hotel",
        price: "$19.09",
    },
    {
        orderID: "1264903",
        order: "TV 14 Inch Gede",
        customer: "Nakoyame Japan",
        status: "New",
        createdDate: `March ${21, 2020}`,
        restaurantName: "Adiyaman Hotel",
        price: "$19.09",
    },
]

const StatusList = () => {

    const [capsicoOrderData, setCapsicoOrderData] = useState(data)
    const [selectTab, setSelectTab] = useState('capsico')
    const [searchQuery, setSearchQuery] = useState('')
    return (
        <div className='flex flex-col gap-6 w-full h-full py-8 px-12 bg-[#f9f9f9]'>
            <div className='-mb-4'>
                <div className="flex items-center gap-1">
                    <IoIosArrowBack className='text-2xl' />
                    <span className='text-[#000000] font-roboto text-xl font-medium'>Completed order </span>
                </div>
                <span className='text-sm text-[#5F5F5F] font-roboto'>Orders/orders details</span>
            </div>
            <section className='flex justify-start items-center'>
                <button onClick={() => setSelectTab('capsico')} className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${selectTab === 'capsico' ? 'border-[#003CFF]' : 'border-transparent'}`}>
                    <h6 className='text-[#1D1929] text-sm font-semibold font-roboto'>Capsico</h6>
                    <p className='text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#FF6F03] w-[22px] h-[22px] rounded-[7px]'>20</p>
                </button>
                <button onClick={() => setSelectTab('quickly')} className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${selectTab === 'quickly' ? 'border-[#003CFF]' : 'border-transparent'}`}>
                    <h6 className='text-[#1D1929] text-sm font-semibold font-roboto'>Quickly</h6>
                    <p className='text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#ABABAB] w-[22px] h-[22px] rounded-[7px]'>48</p>
                </button>
            </section>
            <section className='flex justify-between items-center w-full'>
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
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </section>
            <div>
                <Table className='bg-[#FFFFFF]'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">ID Order</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Order</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Customer</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Status</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Created Date</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Restaurant name</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Price</TableHead>
                            <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {capsicoOrderData.length > 0 && capsicoOrderData.filter(data => data.customer.toLowerCase().includes(searchQuery.toLowerCase())).map((data) => (
                            <TableRow key={data.data}>
                                <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data.orderID}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-bold font-roboto">{data.order}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data.customer}</TableCell>
                                <TableCell>
                                    <div className={`${data.status === 'New' && 'text-[#1619ac] bg-[#b9cbed]' || data.status === 'Preparing' && 'text-[#AC9D16] bg-[#FAFDD4]' || data.status === 'Complete' && 'text-[#4FAC16] bg-[#DCFDD4]' || data.status === 'Cancelled' && 'text-[#AC1616] bg-[#FDD4D4]'} w-[76px] flex justify-center items-center h-[24px] text-[10px] font-normal font-sans rounded-[10px]`}>{data.status}</div>
                                </TableCell>
                                <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{data.createdDate}</TableCell>
                                <TableCell className="text-[#667085] text-[9px] font-normal font-inter">{data.restaurantName}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data.price}</TableCell>
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
            </div>
        </div>
    )
}

export default StatusList