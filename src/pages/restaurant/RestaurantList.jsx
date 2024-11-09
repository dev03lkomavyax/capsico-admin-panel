import ReactPagination from '@/components/pagination/ReactPagination'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'

const data = [
    {
        restaurantID: "1264903",
        restaurantName: "PIYUsh",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham",
        totalSale: "$19.09",
        lastSale: "$19.09"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham",
        totalSale: "$19.09",
        lastSale: "$19.09"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham",
        totalSale: "$19.09",
        lastSale: "$19.09"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham",
        totalSale: "$19.09",
        lastSale: "$19.09"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham",
        totalSale: "$19.09",
        lastSale: "$19.09"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham",
        totalSale: "$19.09",
        lastSale: "$19.09"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham",
        totalSale: "$19.09",
        lastSale: "$19.09"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman Hotel",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham",
        totalSale: "$19.09",
        lastSale: "$19.09"
    },
]

const RestaurantList = () => {

    const [restaurantList, setRestaurantList] = useState(data)
    const [searchQuery, setSearchQuery] = useState('')

    const navigate = useNavigate()

    const handleValueChange = (value) => {
        if (value === 'remove') {
            
        } else if (value === 'detail') {
            navigate('/admin/restaurant/dashboard')
        }
    }

    const[totalPage, setTotalPage] = useState(16)
    const [page, setPage] = useState(1)

    return (
        <section className='border-[1px] bg-[#E0E2E7] px-16 py-10 w-full min-h-screen'>
            <div className='flex justify-start items-center mb-8'>
                <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
                <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurant List</h2>
            </div>
            <div className='flex justify-between items-center w-full mb-2'>
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
            </div>
            <Table className='bg-[#FFFFFF] rounded-lg mb-6'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Restaurant ID</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Restaurant Name</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Registered Date</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Location</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Total Sale</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Last sale</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {restaurantList.length > 0 && restaurantList.filter(data => data.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())).map((data) => (
                        <TableRow key={data.data}>
                            <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data.restaurantID}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data.restaurantName}</TableCell>
                            <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{data.registerdDate}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">{data.location}</TableCell>
                            <TableCell className="text-[#000000] text-[10px] font-semibold font-inter">{data.totalSale}</TableCell>
                            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data.lastSale}</TableCell>
                            <TableCell className="text-[#003CFF] text-xs font-semibold font-sans">
                                <Select onValueChange={handleValueChange}>
                                    <SelectTrigger className="flex justify-between items-center w-[120px] h-[30px] text-[#003CFF] text-sm font-semibold font-sans border-[#E9E9EA] border-[1px] rounded-[10px]">
                                        <SelectValue placeholder="Action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>Fruits</SelectLabel> */}
                                            <SelectItem className='text-[#003CFF] text-sm font-semibold font-sans' value="remove">Remove</SelectItem>
                                            <SelectItem className='text-[#003CFF] text-sm font-semibold font-sans' value="detail">View detail</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ReactPagination totalPage={totalPage} setPage={setPage} />
        </section>
    )
}

export default RestaurantList