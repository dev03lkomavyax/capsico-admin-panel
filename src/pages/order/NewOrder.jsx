import AdminWrapper from '@/components/admin-wrapper/AdminWrapper'
import Order from '@/components/order/Order'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'

const NewOrder = () => {
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

    const [capsicoOrderData, setCapsicoOrderData] = useState(data)
    const [selectTab, setSelectTab] = useState('capsico')
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <AdminWrapper>
            <section className='flex flex-col gap-6 w-full h-full'>
                <div className='-mb-4'>
                    <div className="flex items-center gap-1">
                        <IoIosArrowBack className='text-2xl' />
                        <span className='text-[#000000] font-roboto text-xl font-medium'>New Order</span>
                    </div>
                    <span className='text-sm text-[#5F5F5F] font-roboto'>Orders/New order</span>
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
                                {/* <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Status</TableHead> */}
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Created Date</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Restaurant name</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Price</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Assign agent</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {capsicoOrderData.length > 0 && capsicoOrderData.filter(data => data.customer.toLowerCase().includes(searchQuery.toLowerCase())).map((data) => (
                                <Order
                                    key={data.data}
                                    data={data}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </AdminWrapper>
    )
}

export default NewOrder