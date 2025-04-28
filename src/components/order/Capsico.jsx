import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import { useNavigate } from 'react-router-dom'
import useGetApiReq from '@/hooks/useGetApiReq'
import { getSocket } from '@/socket'
import { readCookie } from '@/utils/readCookie'
import { format } from 'date-fns'

const Capsico = ({ selectOrderTab, setSelectOrderTab, searchQuery, setSearchQuery, capsicoOrderData, setCapsicoOrderData }) => {
    const socket = getSocket();
    const navigate = useNavigate()
    const adminInfo = readCookie("userInfo")
    const [socketActiveOrders, setSocketActiveOrders] = useState([])

    useEffect(() => {
        socket.emit("subscribe_all_orders")
    }, [])

    socket.on('active_orders', (response) => {
        console.log("active_orders response: ", response);
        setSocketActiveOrders(response?.orders)
    });

    const handleOnClick = (tab) => {
        setSelectOrderTab(tab);
        navigate(`/admin/order/capsico/${tab}`);
    }

    const handleOnChange = (value, orderId) => {
        if (value === 'remove') {

        }
        else {
            navigate(`/admin/order/${orderId}`)
        }
    }

    const { res, fetchData, isLoading } = useGetApiReq();

    const getAllOrder = () => {
        fetchData(`/admin/get-all-orders`)
    }

    useEffect(() => {
        getAllOrder();
    }, []);

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("order res", res?.data);
            setCapsicoOrderData(res?.data?.data);
            // const { restaurants, pagination } = res?.data?.data;
            // setRestaurantList(restaurants);
            // setTotalPage(pagination?.totalPages);
            // setPage(pagination?.page);
        }
    }, [res])

    return (
        <>
            <section className='flex justify-start items-center gap-5'>
                <button onClick={() => handleOnClick("all")} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'allOrder' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>All Order ({capsicoOrderData.length})</button>
                <button onClick={() => handleOnClick("new")} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'newOrder' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>New Order (20)</button>
                <button onClick={() => handleOnClick("prepared")} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'prepared' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Prepared (10)</button>
                <button onClick={() => handleOnClick("completed")} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'completed' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Completed (20)</button>
                <button onClick={() => handleOnClick("cancelled")} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'cancelled' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Cancelled (3)</button>
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
                        {socketActiveOrders?.length > 0 && socketActiveOrders?.map((activeOrder, index) => (
                            <TableRow key={activeOrder?.id}>
                                <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{activeOrder?.id}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-bold font-roboto">{activeOrder?.orderNumber}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{activeOrder?.customer?.name}</TableCell>
                                <TableCell>
                                    <div className={`${activeOrder?.status === 'New' && 'text-[#1619ac] bg-[#b9cbed]' || activeOrder?.status === 'Preparing' && 'text-[#AC9D16] bg-[#FAFDD4]' || activeOrder?.status === 'Complete' && 'text-[#4FAC16] bg-[#DCFDD4]' || activeOrder?.status === 'Cancelled' && 'text-[#AC1616] bg-[#FDD4D4]'} w-[76px] flex justify-center items-center h-[24px] text-[10px] font-normal font-sans rounded-[10px]`}>{activeOrder?.status}</div>
                                </TableCell>
                                <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{activeOrder?.timing && format(new Date(activeOrder?.timing?.orderedAt), "dd MMM yyyy")}</TableCell>
                                <TableCell className="text-[#667085] text-[9px] font-normal font-inter">{activeOrder?.restaurant?.name}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-bold font-sans whitespace-nowrap">₹ {activeOrder?.amounts?.total}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
                                    <Select onValueChange={(value) => handleOnChange(value, activeOrder?.id)}>
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
                        {capsicoOrderData?.length > 0 && capsicoOrderData?.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data?._id}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-bold font-roboto">{data?.orderNumber}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data?.customer}</TableCell>
                                <TableCell>
                                    <div className={`${data?.status === 'New' && 'text-[#1619ac] bg-[#b9cbed]' || data?.status === 'Preparing' && 'text-[#AC9D16] bg-[#FAFDD4]' || data?.status === 'Complete' && 'text-[#4FAC16] bg-[#DCFDD4]' || data?.status === 'Cancelled' && 'text-[#AC1616] bg-[#FDD4D4]'} w-[76px] flex justify-center items-center h-[24px] text-[10px] font-normal font-sans rounded-[10px]`}>{data?.status}</div>
                                </TableCell>
                                <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{data?.timing && format(new Date(data?.timing?.orderedAt), "dd MMM yyyy")}</TableCell>
                                <TableCell className="text-[#667085] text-[9px] font-normal font-inter">{data?.restaurantName}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-bold font-sans whitespace-nowrap">₹ {data?.amounts?.total}</TableCell>
                                <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
                                    <Select onValueChange={(value) => handleOnChange(value, data?._id)}>
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
        </>
    )
}

export default Capsico