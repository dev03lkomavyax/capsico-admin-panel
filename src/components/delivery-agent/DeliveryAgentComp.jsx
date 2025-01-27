import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TableCell, TableRow } from '@/components/ui/table'
import { Checkbox } from '../ui/checkbox'
import { useNavigate } from 'react-router-dom'

const status = "Available Now"
// const status = "Not Available"

const DeliveryAgentComp = ({index, agent}) => {
    const navigate = useNavigate();

    const handleValueChange = (value, deliveryPartnerId) => {
        console.log("value: ", value);

        if (value === 'remove') {
            return;
        } else if (value === 'detail') {
            navigate(`/admin/delivery-agent/${deliveryPartnerId}`)
        }
    }

    return (
        <TableRow key={index}>
            <TableCell className='w-10'>
                <Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />
            </TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{agent?._id}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{agent?.personalInfo?.name}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{agent?.address?.city}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">
                <div className={`${status === 'Available Now' ? 'text-[#3465BD] bg-[#D3E2FF]' : 'text-[#3A3A3A] bg-[#F0F0F0]'} w-24 flex justify-center items-center h-[24px] text-[10px] font-normal font-sans rounded-[10px]`}>{agent?.accountStatus?.currentStatus}</div>
            </TableCell>
            <TableCell className="text-[#667085] text-xs font-semibold font-inter">March 21, 2020 00.28</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
                <Select onValueChange={(value) => handleValueChange(value, agent?._id)}>
                    <SelectTrigger className="flex justify-between items-center w-[100px] h-[30px] text-[#003CFF] text-sm font-semibold font-sans border-[#E9E9EA] border-[1px] rounded-[10px]">
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
    )
}

export default DeliveryAgentComp