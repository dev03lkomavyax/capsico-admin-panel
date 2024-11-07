import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import { useNavigate } from 'react-router-dom'

const Quickly = ({ selectOrderTab, setSelectOrderTab, searchQuery, setSearchQuery, quicklyOrderData }) => {

  const navigate = useNavigate()
  return (
    <>
      <section className='flex justify-start items-center gap-5'>
        <button onClick={() => setSelectOrderTab('allOrder')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'allOrder' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>All Order ({quicklyOrderData.length})</button>
        <button onClick={() => setSelectOrderTab('newOrder')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'newOrder' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>New Order (20)</button>
        <button onClick={() => setSelectOrderTab('packed')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'packed' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Packed (10)</button>
        <button onClick={() => {setSelectOrderTab('completed'), navigate('status')}} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'completed' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Completed (20)</button>
        <button onClick={() => setSelectOrderTab('cancelled')} className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${selectOrderTab === 'cancelled' ? 'bg-[#cfe0ff]' : 'bg-[#E3EDFF]'}`}>Cancelled (3)</button>
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
          <TableHeader>
            <TableRow>
              <TableHead className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">ID Order</TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Order</TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Customer</TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Status</TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Created Date</TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Vendor name</TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Price</TableHead>
              <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quicklyOrderData.length > 0 && quicklyOrderData.map((data) => (
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
    </>
  )
}

export default Quickly
