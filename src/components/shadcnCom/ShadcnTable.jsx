import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

const ShadcnTable = () => {
    return (
        <Table className='bg-[#FFFFFF]'>
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
    )
}

export default ShadcnTable