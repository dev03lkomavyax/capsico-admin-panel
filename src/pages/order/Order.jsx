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
import Capsico from '@/components/order/Capsico'
import Quickly from '@/components/order/Quickly'
import ReactPaginate from 'react-paginate';

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
  const [totalPage, setTotalPage] = useState('16')

  const pageCount = 16


  return (
    <div className='flex flex-col gap-6 w-full h-full py-8 px-12 bg-[#f9f9f9]'>
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
        <Capsico selectOrderTab={selectOrderTab} setSelectOrderTab={setSelectOrderTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} capsicoOrderData={capsicoOrderData} />
      }
      {selectTab === 'quickly' &&
        <Quickly selectOrderTab={selectOrderTab} setSelectOrderTab={setSelectOrderTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} quicklyOrderData={quicklyOrderData} />
      }
      <ReactPaginate
      pageCount={pageCount}
      onPageChange={()=> setTotalPage(totalPage)}
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

export default Order