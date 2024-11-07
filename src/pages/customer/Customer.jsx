import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { IoIosArrowBack } from 'react-icons/io'
import ReactPaginate from 'react-paginate'

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

const Customer = () => {
    const [customerData, setCustomerData] = useState(data)
    const [selectTab, setSelectTab] = useState('capsico')
    const [searchQuery, setSearchQuery] = useState('')
    const [totalPage, setTotalPage] = useState('16')

    const pageCount = 16
    return (
        <div className='flex flex-col gap-6 w-full h-full py-8 px-12 bg-[#f9f9f9]'>
            <div className=''>
                <div className="flex items-center gap-1">
                    <IoIosArrowBack className='text-2xl' />
                    <span className='text-[#000000] font-roboto text-xl font-medium'>General Customer </span>
                </div>
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

            </div>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={() => setTotalPage(totalPage)}
                containerClassName="flex justify-center items-center space-x-4 mx-auto"
                pageClassName="px-2 py-1 cursor-pointer"
                pageLinkClassName="text-[#ABABAB] font-normal font-sans"
                activeClassName="text-[#003CFF] font-semibold font-sans"
                previousClassName="text-[#1D1929] text-2xl cursor-pointer"
                nextClassName="text-[#1D1929] text-2xl cursor-pointer"
                previousLabel="&#8249;"
                nextLabel="&#8250;"
                breakLabel="..."
                breakClassName="text-gray-400 px-2"
                disabledClassName="text-gray-300 cursor-not-allowed"
            />
        </div>
    )
}

export default Customer