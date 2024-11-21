import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const data = [
    {
        id: "1264903",
        fullName: "Saul Kessler",
        position: "Marketing Head",
        emailAddress: "Cornell.Willms@hotmail.com",
        mobileNumber: "961-794-8752",
    },
    {
        id: "1264903",
        fullName: "Kessler",
        position: "Head",
        emailAddress: "Cornell.Willms@hotmail.com",
        mobileNumber: "961-794-8752",
    },
    {
        id: "1264903",
        fullName: "Saul",
        position: "Head",
        emailAddress: "head@hotmail.com",
        mobileNumber: "961-794-8752",
    },
    {
        id: "1264903",
        fullName: "PIYUsh",
        position: "Marketing",
        emailAddress: "Cornell@hotmail.com",
        mobileNumber: "961-794-8752",
    },
    {
        id: "1264903",
        fullName: "PIYUsh",
        position: "Marketing",
        emailAddress: "Willms@hotmail.com",
        mobileNumber: "961-794-8752",
    },
    {
        id: "1264903",
        fullName: "PIYUsh",
        position: `March ${21, 2020}`,
        emailAddress: "Cornell.Willms@hotmail.com",
        mobileNumber: "961-794-8752",
    },
]

const SubAdminList = () => {
    
    const [subAdminList, setSubAdminList] = useState(data)

    const navigate = useNavigate()

    const handleValueChange = (value) => {
        if (value === 'remove') {

        } else if (value === 'detail') {
            navigate('/admin/restaurant/dashboard')
        }
    }
    return (
        <section className='border-[1px] bg-[#F5F7FA] px-16 py-10 w-full min-h-screen'>
            <div className='flex justify-between items-center mb-8'>
                <div className='flex justify-start items-center'>
                    <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                    <h2 className='text-[#000000] text-xl font-medium font-roboto'>Sub Admin List</h2>
                </div>
                <div className='flex justify-start items-center gap-4'>
                    <button onClick={() => navigate('/admin/add-subadmin')} className='h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD] flex items-center gap-2'><span className='text-xl'>+</span> Add sub Admin</button>
                </div>
            </div>
            <Table className='bg-[#FFFFFF] rounded-lg mb-6'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">ID</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Full Name</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Position</TableHead>
                        <TableHead className="w-[200px] text-[#ABABAB] text-xs font-normal font-roboto">Email Address</TableHead>
                        <TableHead className="w-[60px] text-[#ABABAB] text-xs font-normal font-roboto">Mobile Number</TableHead>
                        <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subAdminList.length > 0 && subAdminList.map((e, i) => (
                        <TableRow key={i} onClick={()=> navigate('/admin/edit-subadmin')}>
                            <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
                            <TableCell className="text-[#252525] text-sm font-medium font-roboto">{e.id}</TableCell>
                            <TableCell className="text-[#252525] text-sm font-medium font-roboto">{e.fullName}</TableCell>
                            <TableCell className="text-[#252525] text-sm font-medium font-roboto">{e.position}</TableCell>
                            <TableCell className="text-[#252525] text-sm font-medium font-roboto">{e.emailAddress}</TableCell>
                            <TableCell className="text-[#252525] text-sm font-medium font-roboto">{e.mobileNumber}</TableCell>
                            <TableCell>
                                <Select onValueChange={handleValueChange}>
                                    <SelectTrigger className="flex justify-between items-center w-[120px] h-[30px] text-[#252525] text-sm font-medium font-roboto border-[#E9E9EA] border-[1px] rounded-[10px]">
                                        <SelectValue placeholder="Action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem className='text-[#252525] text-sm font-medium font-roboto' value="remove">Remove</SelectItem>
                                            <SelectItem className='text-[#252525] text-sm font-medium font-roboto' value="detail">View detail</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='border-[#1AA6F1] flex items-center w-fit'>
                <button className='text-[#1AA6F1] text-sm font-normal font-inter bg-[#FFFFFF] h-12 rounded-s-lg px-5'>Metric</button>
                <button className='text-[#FFFFFF] text-sm font-normal font-inter bg-[#4A5E6D] h-12 rounded-e-lg px-5'>Overview</button>
            </div>
        </section>
    )
}

export default SubAdminList