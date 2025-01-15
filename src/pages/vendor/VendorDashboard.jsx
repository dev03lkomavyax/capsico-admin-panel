import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { BiCheckShield } from "react-icons/bi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RiQrScan2Line } from "react-icons/ri";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { SalesChart } from '@/components/restaurant/SalesChart';
import ReactStars from 'react-stars';
import SalesChart2 from '@/components/restaurant/SalesChart2';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';

const data = [
    {
        orderID: "1264903",
        product: {
            image: "",
            name: "ABCD name"
        },
        date: "1 min ago",
        customer: {
            name: "Vivek",
            email: "vivek8793@gmail.com"
        },
        total: "121.00",
        payment: "Mastercard",
        status: "Processing"
    },
    {
        orderID: "1264903",
        product: {
            image: "",
            name: "ABCD name"
        },
        date: "22 min ago",
        customer: {
            name: "Vivek",
            email: "vivek8793@gmail.com"
        },
        total: "121.00",
        payment: "Visa",
        status: "Preparing"
    },
    {
        orderID: "1264903",
        product: {
            image: "",
            name: "ABCD name"
        },
        date: "2 days ago",
        customer: {
            name: "Vivek",
            email: "vivek8793@gmail.com"
        },
        total: "121.00",
        payment: "Paypall",
        status: "Delivered"
    },
    {
        orderID: "1264903",
        product: {
            image: "",
            name: "ABCD name"
        },
        date: "5 days ago",
        customer: {
            name: "Vivek",
            email: "vivek8793@gmail.com"
        },
        total: "121.00",
        payment: "Paypall",
        status: "Cancelled"
    },
]

const data2 = [
    {
        product: {
            image: "",
            name: "ABCD name"
        },
        sales: "2345",
        amount: "121.00",
        price: "Paypall"
    },
    {
        product: {
            image: "",
            name: "ABCD name"
        },
        sales: "2345",
        amount: "121.00",
        price: "Paypall"
    },
    {
        product: {
            image: "",
            name: "ABCD name"
        },
        sales: "2345",
        amount: "121.00",
        price: "Paypall"
    },
    {
        product: {
            image: "",
            name: "ABCD name"
        },
        sales: "2345",
        amount: "121.00",
        price: "Paypall"
    },
]

const reviews = [
    {
        image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Ervin Smitham",
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.",
        date: " July 13, 2023"
    },
    {
        image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Ervin Smitham",
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor.",
        date: " July 13, 2023"
    }
]

function VendorDashboard() {
    const [selectTab, setselectTab] = useState('All Time')
    const [menuData, setMenuData] = useState(data2)
    const [reveiwData, setReveiwData] = useState(reviews)
    const [capsicoOrderData, setCapsicoOrderData] = useState(data)

    const navigate = useNavigate()
    return (
        <AdminWrapper>
            <section className='w-full'>
                <div className='flex justify-between items-center mb-8'>
                    <div className='flex justify-start items-center'>
                        <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                        <h2 className='text-[#000000] text-xl font-medium font-roboto'>Vendor</h2>
                    </div>
                    <button onClick={() => navigate('/admin/vendor/edit-profile')} className='h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD] flex items-center gap-2'>Edit Profile</button>
                </div>
                <div className='flex justify-between items-center gap-6 w-full mb-8'>
                    <button onClick={() => navigate('/admin/vendor/revenue')} className='bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1'>
                        <div className='flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#EFEFFD] bg-[#DEDEFA]'>
                            <BiCheckShield className='text-[#5C59E8] text-2xl' />
                        </div>
                        <div>
                            <p className='text-[#667085] text-base text-start font-medium font-inter mb-2'>Total Revenue</p>
                            <p className='text-[#333843] text-2xl font-medium font-inter flex items-center gap-2'>$75,500<span className='text-[#0D894F] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full'>+10%</span></p>
                        </div>
                    </button>
                    <button onClick={() => navigate('/admin/vendor/revenue')} className='bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1'>
                        <div className='flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#E7F4EE] bg-[#CFE7DC]'>
                            <PiShoppingCartSimple className='text-[#0D894F] text-2xl' />
                        </div>
                        <div>
                            <p className='text-[#667085] text-base text-start font-medium font-inter mb-2'>Total Sales</p>
                            <p className='text-[#333843] text-2xl font-medium font-inter flex items-center gap-2'>31,500<span className='text-[#0D894F] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full'>+15%</span></p>
                        </div>
                    </button>
                    <button onClick={() => navigate('/admin/vendor/products')} className='bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1'>
                        <div className='flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#FEEDEC] bg-[#FCDAD7]'>
                            <RiQrScan2Line className='text-[#F04438] text-2xl' />
                        </div>
                        <div>
                            <p className='text-[#667085] text-base text-start font-medium font-inter mb-2'>Product</p>
                            <p className='text-[#333843] text-2xl font-medium font-inter flex items-center gap-2'>247<span className='text-[#667085] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full'>0%</span></p>
                        </div>
                    </button>
                    <button onClick={() => navigate('/admin/vendor/revenue')} className='bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1'>
                        <div className='flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#FDF1E8] bg-[#FAE1CF]'>
                            <BiCheckShield className='text-[#E46A11] text-2xl' />
                        </div>
                        <div>
                            <p className='text-[#667085] text-base text-start font-medium font-inter mb-2'>Total Order</p>
                            <p className='text-[#333843] text-2xl font-medium font-inter flex items-center gap-2'>303<span className='text-[#F04438] text-xs font-semibold font-inter bg-[#FEEDEC] py-[2px] px-[6px] rounded-full'>-25%</span></p>
                        </div>
                    </button>
                </div>
                <div className='flex w-full gap-8'>
                    <SalesChart />
                    <SalesChart2 />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='border-[1px] border-[#E0E2E7] rounded-lg p-1 w-fit bg-[#FFFFFF]'>
                        <button onClick={() => setselectTab('All Time')} className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${selectTab === 'All Time' ? 'text-[#4543AE] bg-[#DEDEFA] font-semibold' : 'text-[#667085] font-medium bg-transparent'}`}>All Time</button>
                        <button onClick={() => setselectTab('12 Months')} className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${selectTab === '12 Months' ? 'text-[#4543AE] bg-[#DEDEFA] font-semibold' : 'text-[#667085] font-medium bg-transparent'}`}>12 Months</button>
                        <button onClick={() => setselectTab('30 Days')} className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${selectTab === '30 Days' ? 'text-[#4543AE] bg-[#DEDEFA] font-semibold' : 'text-[#667085] font-medium bg-transparent'}`}>30 Days</button>
                        <button onClick={() => setselectTab('7 Days')} className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${selectTab === '7 Days' ? 'text-[#4543AE] bg-[#DEDEFA] font-semibold' : 'text-[#667085] font-medium bg-transparent'}`}>7 Days</button>
                        <button onClick={() => setselectTab('24 Hour')} className={`text-sm font-inter rounded-lg px-3 py-[6px] w-fit ${selectTab === '24 Hour' ? 'text-[#4543AE] bg-[#DEDEFA] font-semibold' : 'text-[#667085] font-medium bg-transparent'}`}>24 Hour</button>
                    </div>
                    <div className='flex w-full gap-6'>
                        <div className='w-[70%] rounded-lg border-[1px] border-[#E0E2E7] bg-[#FFFFFF]'>
                            <div className='flex justify-between items-center px-5 h-[76px]'>
                                <p className='text-[#333843] text-lg font-medium font-inter'>Top Selling Product</p>
                                <button className="h-10 border-[1px] border-[#E0E2E7] rounded-lg flex justify-center items-center gap-2 text-[#667085] text-sm font-medium font-inter bg-[#FFFFFF] px-4"><HiOutlineAdjustmentsHorizontal className='text-[20px]' /><span>Filters</span></button>
                            </div>
                            <Table className='bg-[#FFFFFF]'>
                                <TableHeader className='bg-[#F9F9FC] h-[56px]'>
                                    <TableRow>
                                        <TableHead className="w-[120px] text-[#333843] text-sm font-medium font-inter">Product</TableHead>
                                        <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Sales</TableHead>
                                        <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Amount</TableHead>
                                        <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {menuData.length > 0 && menuData.map((data) => (
                                        <TableRow key={data.data}>
                                            <TableCell className='flex items-center gap-2'>
                                                <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-11 h-11 rounded-lg' />
                                                <p className="text-[#333843] text-sm font-medium font-sans">{data.product.name}</p>
                                            </TableCell>
                                            <TableCell className="text-[#667085] text-sm font-medium font-sans">{data.sales}</TableCell>
                                            <TableCell className="text-[#667085] text-sm font-medium font-sans">${data.amount}</TableCell>
                                            <TableCell className="text-[#667085] text-sm font-medium font-inter">{data.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className='w-[30%] border-[1px] border-[#E0E2E7] rounded-lg p-6 bg-[#FFFFFF] space-y-4'>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-[#333843] text-lg font-medium font-inter'>Recent Reviews</p>
                                <button onClick={() => navigate('/admin/vendor/reviews')} className='h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD]'>See More</button>
                            </div>
                            <div className='flex flex-col gap-6'>
                                {reveiwData.map((e, i) => {
                                    return (
                                        <div key={i} className='border-[1px] border-[#CFCFCF] rounded-lg p-6 flex flex-col justify-between gap-4'>
                                            <div className='flex gap-2'>
                                                <img src={e.image} alt={e.image} className='w-10 h-10 rounded-[20px]' />
                                                <div>
                                                    <h4 className='text-[#000000] text-base font-medium font-inter'>{e.name}</h4>
                                                    <ReactStars className='text-[#535353] text-sm font-normal font-inter' edit={false} value={e.rating} />
                                                </div>
                                            </div>
                                            <p className='text-[#535353] text-sm font-normal font-inter leading-[24px]'>{e.description}</p>
                                            <p className='text-[#9B9B9B] text-sm font-normal font-inter'>{e.date}</p>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full rounded-lg border-[1px] border-[#E0E2E7] bg-[#FFFFFF]'>
                    <div className='flex justify-between items-center px-5 h-[76px]'>
                        <div className='flex justify-start items-center'>
                            <p className='text-[#333843] text-lg font-medium font-inter flex items-center gap-2'>Recent Orders<span className='text-[#0D894F] text-sm font-semibold font-inter bg-[#E7F4EE] py-1 px-3 rounded-full'>+2 Orders</span></p>
                        </div>
                        <div className='flex justify-start items-center gap-4'>
                            <button className="h-10 border-[1px] border-[#E0E2E7] rounded-lg flex justify-center items-center gap-2 text-[#667085] text-sm font-medium font-inter bg-[#FFFFFF] px-4"><HiOutlineAdjustmentsHorizontal className='text-[20px]' /><span>Filters</span></button>
                            <button className='h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD]'>See More</button>
                        </div>
                    </div>
                    <Table className='bg-[#FFFFFF]'>
                        <TableHeader className='bg-[#F9F9FC] h-[56px]'>
                            <TableRow>
                                <TableHead className='w-10'>{<Checkbox className='border-2 border-[#858D9D] bg-[#FFFFFF] w-5 h-5' />}</TableHead>
                                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">ID Order</TableHead>
                                <TableHead className="w-[120px] text-[#333843] text-sm font-medium font-inter">Product</TableHead>
                                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Date</TableHead>
                                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Customer</TableHead>
                                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Total</TableHead>
                                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Payment</TableHead>
                                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Status</TableHead>
                                <TableHead className="w-[100px] text-[#333843] text-sm font-medium font-inter">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {capsicoOrderData.length > 0 && capsicoOrderData.map((data) => (
                                <TableRow key={data.data}>
                                    <TableCell className='w-10'>{<Checkbox className='border-2 border-[#858D9D] bg-[#FFFFFF] w-5 h-5' />}</TableCell>
                                    <TableCell className="text-[#5C59E8] text-sm font-semibold font-sans">#{data.orderID}</TableCell>
                                    <TableCell className='flex items-center gap-2'>
                                        <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-11 h-11 rounded-lg' />
                                        <p className="text-[#333843] text-sm font-medium font-sans">{data.product.name}</p>
                                    </TableCell>
                                    <TableCell className="text-[#667085] text-sm font-medium font-sans">{data.date}</TableCell>
                                    {/* <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data.customer.name}</TableCell> */}
                                    <TableCell>
                                        <p className="text-[#333843] text-sm font-medium font-sans mb-1">{data.customer.name}</p>
                                        <p className="text-[#667085] text-xs font-normal font-sans">{data.customer.email}</p>
                                    </TableCell>
                                    <TableCell className="text-[#667085] text-sm font-medium font-sans">${data.total}</TableCell>
                                    <TableCell className="text-[#667085] text-sm font-medium font-inter">{data.payment}</TableCell>
                                    <TableCell>
                                        <div className={`${data.status === 'Processing' && 'text-[#E46A11] bg-[#FDF1E8]' || data.status === 'Preparing' && 'text-[#B6A92E] bg-[#FAFDD4]' || data.status === 'Delivered' && 'text-[#0D894F] bg-[#E7F4EE]' || data.status === 'Cancelled' && 'text-[#F04438] bg-[#FEEDEC]'} px-3 w-fit flex justify-center items-center h-7 text-sm font-semibold font-inter rounded-full`}>{data.status}</div>
                                    </TableCell>
                                    <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
                                        <Select>
                                            <SelectTrigger className="flex justify-between items-center w-[120px] h-[30px] text-[#003CFF] text-sm font-semibold font-sans border-[#E9E9EA] border-[1px] rounded-[10px]">
                                                <SelectValue placeholder="Action" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
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
            </section>
        </AdminWrapper>
    )
}

export default VendorDashboard