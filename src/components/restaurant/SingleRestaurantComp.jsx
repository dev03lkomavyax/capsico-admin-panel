import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TableCell, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const SingleRestaurantComp = ({ data }) => {
    const navigate = useNavigate();

    const handleValueChange = (value) => {
        if (value === 'remove') { }
        else if (value === 'detail') {
            navigate(`/admin/restaurant/${data?.id}/dashboard`)
        }
    }

    return (
        <TableRow>
            <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data?.id}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data?.name}</TableCell>
            <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{data?.createdAt && format(data?.createdAt, 'MMMM yyyy')}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">{`${data?.location?.address}, ${data?.location?.city}, ${data?.location?.state}, ${data?.location?.pinCode}`}</TableCell>
            <TableCell className="text-[#000000] text-xs font-semibold font-inter">₹0</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-semibold font-inter">₹0</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">
                <span className={`${data?.status === "PENDING" && "text-[#FFC107]"} ${data?.status === "APPROVED" && "text-[#28A745]"} ${data?.status === "REJECTED" && "text-[#DC3545]"} ${data?.status === "SUSPENDED" && "text-[#6C757D]"}`}>{data?.status}</span>
            </TableCell>
            <TableCell className="text-[#003CFF] text-xs font-semibold font-sans">
                <Select onValueChange={handleValueChange}>
                    <SelectTrigger className="flex justify-between items-center w-[120px] h-[30px] text-[#003CFF] text-sm font-semibold font-sans border-[#E9E9EA] border-[1px] rounded-[10px]">
                        <SelectValue placeholder="Action" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {/* <SelectLabel>Fruits</SelectLabel> */}
                            <SelectItem className='text-[#003CFF] text-sm font-semibold font-sans' value="remove">Remove</SelectItem>
                            <SelectItem className='text-[#003CFF] text-sm font-semibold font-sans' value="detail">View detail</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </TableCell>
        </TableRow>
    )
}

export default SingleRestaurantComp