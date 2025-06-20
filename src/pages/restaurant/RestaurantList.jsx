import AdminWrapper from '@/components/admin-wrapper/AdminWrapper'
import DataNotFound from '@/components/DataNotFound'
import ReactPagination from '@/components/pagination/ReactPagination'
import SingleRestaurantComp from '@/components/restaurant/SingleRestaurantComp'
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DEBOUNCE_DELAY } from '@/constants/constants'
import useGetApiReq from '@/hooks/useGetApiReq'
import { Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const RestaurantList = () => {
    const { res, fetchData, isLoading } = useGetApiReq();

    const [restaurantList, setRestaurantList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [status, setStatus] = useState("all")
    const [filterByDate, setFilterByDate] = useState("today")

    const navigate = useNavigate()

    const getAllRestaurant = useCallback(() => {
        fetchData(`/admin/get-restaurants?page=${page}&search=${searchQuery}&status=${status === "all" ? "" : status}&&dateFilter=${filterByDate}`);
    }, [page, searchQuery, status, filterByDate]);

    useEffect(() => {
        let handler;
        if (searchQuery) {
            handler = setTimeout(() => {
                getAllRestaurant();
            }, DEBOUNCE_DELAY);
        }

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        if (!searchQuery) {
            getAllRestaurant();
        }
    }, [page, status, searchQuery, filterByDate]);

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("restaurant res", res);
            const { restaurants, pagination } = res?.data?.data;
            setRestaurantList(restaurants);
            setTotalPage(pagination?.totalPages);
            setPage(pagination?.page);
        }
    }, [res])

    return (
        <AdminWrapper>
            <section className='bg-[#F5F7FA] px-0 py-0 w-full min-h-screen'>
                <div className="flex justify-between items-center mb-8">
                    <div className='flex justify-start items-center'>
                        {/* <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' /> */}
                        <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurants</h2>
                    </div>
                    <Button
                        className="bg-blue-600 w-40 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                        onClick={() => navigate("/admin/restaurant/add-restaurant")}
                    >
                        <Plus className="w-4 h-4" />
                        Add Restaurant
                    </Button>
                </div>

                <div className='flex justify-between items-center w-full mb-4'>
                    <div className='flex justify-start items-center -ml-4'>
                        <BsSearch className='relative left-8 text-[#1D1929]' />
                        <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto' />
                    </div>
                    <div className='flex justify-between items-center gap-4'>
                        <Select onValueChange={setStatus} value={status}>
                            <SelectTrigger className="flex justify-between items-center h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="APPROVED">Approved</SelectItem>
                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select value={filterByDate} onValueChange={(value) => setFilterByDate(value)}>
                            <SelectTrigger className="flex justify-between items-center w-auto h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="week">This Week</SelectItem>
                                    <SelectItem value="month">This Month</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='bg-[#FFFFFF] rounded-lg mb-6'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Restaurant ID</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Restaurant Name</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Registered Date</TableHead>
                                <TableHead className="w-[200px] text-[#ABABAB] text-xs font-normal font-roboto">Location</TableHead>
                                <TableHead className="w-[60px] text-[#ABABAB] text-xs font-normal font-roboto">Total Sale</TableHead>
                                <TableHead className="w-[60px] text-[#ABABAB] text-xs font-normal font-roboto">Last sale</TableHead>
                                <TableHead className="w-20 text-[#ABABAB] text-xs font-normal font-roboto">Status</TableHead>
                                <TableHead className="w-[100px] text-[#ABABAB] text-xs font-normal font-roboto">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restaurantList.length > 0 && restaurantList.map((data) => (
                                <SingleRestaurantComp
                                    key={data.id}
                                    data={data}
                                    getAllRestaurant={getAllRestaurant}
                                />
                            ))}
                        </TableBody>
                    </Table>

                    {restaurantList.length === 0 && isLoading &&
                        <Spinner />
                    }

                    {restaurantList.length === 0 && !isLoading &&
                        <DataNotFound name="Restaurant" />
                    }
                </div>

                <ReactPagination totalPage={totalPage} setPage={setPage} />
            </section>
        </AdminWrapper>
    )
}

export default RestaurantList