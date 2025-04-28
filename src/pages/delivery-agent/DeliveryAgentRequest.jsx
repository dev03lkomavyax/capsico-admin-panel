import AdminWrapper from "@/components/admin-wrapper/AdminWrapper"
import ReactPagination from "@/components/pagination/ReactPagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"

const data = [
    {
        restaurantID: "1264903",
        restaurantName: "Piyush",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    },
    {
        restaurantID: "1264903",
        restaurantName: "Adiyaman",
        registerdDate: `March ${21, 2020}`,
        location: "Naimish Sharay Dham"
    }
]

const DeliveryAgentRequest = () => {
    const [applicationRequestList, setApplicationRequestList] = useState(data)
    const [searchQuery, setSearchQuery] = useState('')
    const [totalPage, setTotalPage] = useState(16)
    const [page, setPage] = useState(1)

    const navigate = useNavigate()

    const handleValueChange = (value) => {
        if (value === 'remove') {

        } else if (value === 'detail') {
            navigate('/admin/restaurant/dashboard')
        }
    }
    return (
        <AdminWrapper>
            <section className='w-full min-h-screen'>
                <div className='flex justify-start items-center mb-6'>
                    <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
                    <h2 className='text-[#000000] text-xl font-medium font-roboto'>Application</h2>
                </div>
                <div className="w-full flex justify-end mb-6">
                    <Link to={'/admin/add-delivery-partner'} className="flex justify-end items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        <Plus size={18} />
                        Add Delivery Partner
                    </Link>
                </div>
                <div>
                    <div className='flex justify-between items-center w-full mb-4'>
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
                                        <SelectItem value="apple">Yesterday</SelectItem>
                                        <SelectItem value="banana">Tommarrow</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Table className='bg-[#FFFFFF] rounded-lg mb-6'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Delivery agent ID</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Partner Name</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Registered Date</TableHead>
                                <TableHead className="w-[200px] text-[#ABABAB] text-xs font-normal font-roboto">Location</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicationRequestList?.length > 0 && applicationRequestList?.map((deliveryPartner, index) => (
                                <TableRow key={index}>
                                    <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
                                    <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{deliveryPartner?.restaurantID}</TableCell>
                                    <TableCell onClick={()=>navigate(`/admin/delivery-agent-request/${index}`)} className="text-[#1D1929] cursor-pointer text-xs font-bold font-sans">{deliveryPartner?.restaurantName}</TableCell>
                                    <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{deliveryPartner?.registerdDate}</TableCell>
                                    <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">{deliveryPartner?.location}</TableCell>
                                    <TableCell className='flex justify-center gap-10'>
                                        <button className="bg-[#D02C2C] px-4 py-[6px] rounded-[10px] text-[#FFFFFF] text-xs font-semibold font-sans">Reject</button>
                                        <button className="bg-[#4B9A57] px-4 py-[6px] rounded-[10px] text-[#FFFFFF] text-xs font-semibold font-sans">Approve</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ReactPagination totalPage={totalPage} setPage={setPage} />
                </div>
            </section>
        </AdminWrapper>
    )
}

export default DeliveryAgentRequest