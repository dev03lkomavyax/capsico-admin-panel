import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import { BsSearch } from "react-icons/bs";
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

const Order = () => {
  const [selectTab, setSelectTab] = useState('capsico')
  const [selectOrderTab, setSelectOrderTab] = useState('allOrder')
  const [capsicoOrderData, setCapsicoOrderData] = useState(data)
  const [quicklyOrderData, setQuicklyOrderData] = useState(data)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectValue, setselectValue] = useState('All')


  return (
    <div className='flex flex-col gap-6 border-[red] border-2 w-full h-full py-8 px-12 bg-[#f9f9f9]'>
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
      {selectTab === 'capsico' &&
        <>
          <section className='flex justify-start items-center gap-5'>
            <button onClick={() => setSelectOrderTab('allOrder')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'allOrder' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>All Order ({capsicoOrderData.length})</button>
            <button onClick={() => setSelectOrderTab('newOrder')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'newOrder' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>New Order (20)</button>
            <button onClick={() => setSelectOrderTab('prepared')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'prepared' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Prepared (10)</button>
            <button onClick={() => setSelectOrderTab('completed')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'completed' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Completed (20)</button>
            <button onClick={() => setSelectOrderTab('cancelled')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'cancelled' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Cancelled (3)</button>
          </section>
          <section className='flex justify-between items-center w-full'>
            <div className='flex justify-start items-center'>
              <BsSearch className='relative left-8 text-[#1D1929]' />
              <Input type="email" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto' />
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
              <TableCaption>A list of your recent datas.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-10'>{<Checkbox className='disabled' />}</TableHead>
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
                    <TableCell className='w-10'>{<Checkbox />}</TableCell>
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
                        <SelectTrigger className="flex justify-between items-center w-[90px] h-[30px] text-[#003CFF] text-sm font-semibold font-sans border-[#E9E9EA] border-[1px] rounded-[10px]">
                          <SelectValue placeholder="Action" />
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>}
      {selectTab === 'quickly' &&
        <>
          <section className='flex justify-start items-center gap-5'>
            <button onClick={() => setSelectOrderTab('allOrder')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'allOrder' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>All Order ({quicklyOrderData.length})</button>
            <button onClick={() => setSelectOrderTab('newOrder')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'newOrder' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>New Order (20)</button>
            <button onClick={() => setSelectOrderTab('prepared')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'prepared' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Prepared (10)</button>
            <button onClick={() => setSelectOrderTab('completed')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'completed' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Completed (20)</button>
            <button onClick={() => setSelectOrderTab('cancelled')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'cancelled' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Cancelled (3)</button>
          </section>
          <section className='flex justify-between items-center w-full'>
            <Input type="email" placeholder="Search" className='max-w-[425px] w-full bg-[#FFFFFF]' />
            <div className='flex justify-between items-center w-[230px]'>
              <Select>
                <SelectTrigger className="flex justify-between items-center w-[109px] h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                  <SelectValue placeholder="All" />
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
              <TableCaption>A list of your recent datas.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-10'>{<Checkbox className='disabled' />}</TableHead>
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
                {quicklyOrderData.length > 0 && quicklyOrderData.map((data) => (
                  <TableRow key={data.data}>
                    <TableCell className='w-10'>{<Checkbox />}</TableCell>
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
                        <SelectTrigger className="flex justify-between items-center w-[90px] h-[30px] text-[#003CFF] text-sm font-semibold font-sans border-[#E9E9EA] border-[1px] rounded-[10px]">
                          <SelectValue placeholder="Action" />
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>}
    </div>
  )
}

export default Order