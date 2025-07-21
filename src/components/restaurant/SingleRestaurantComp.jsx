/* eslint-disable react/prop-types */
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TableCell, TableRow } from '@/components/ui/table'
import useDeleteApiReq from '@/hooks/useDeleteApiReq'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import AlertModal from '../AlertModal'

const SingleRestaurantComp = ({ data, getAllRestaurant }) => {
    const navigate = useNavigate();
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);


    const handleEdit = () => {
        navigate(`/admin/restaurant/${data?.id}/dashboard`)
    }

    const handleRemove = () => {
        setIsAlertModalOpen(true);
    }

    const { res, fetchData, isLoading } = useDeleteApiReq();

    const deleteRestaurant = () => {
        fetchData(`/admin/delete-restaurant?restaurantId=${data?.id}`);
    };

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("restaurant delete res", res);
            getAllRestaurant();
        }
    }, [res]);

    return (
      <>
        <TableRow>
          <TableCell className="w-10">
              <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
          </TableCell>
          <TableCell className="text-[#1D1929] text-xs whitespace-nowrap font-normal font-sans">
            {data?.customRestaurantId || "N/A"}
          </TableCell>
          <TableCell className="text-[#1D1929] text-xs font-bold font-sans w-60">
            {data?.name}
          </TableCell>
          <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
            {data?.createdAt && format(data?.createdAt, "MMMM yyyy")}
          </TableCell>
          <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">{`${data?.location?.address}, ${data?.location?.city}, ${data?.location?.state}, ${data?.location?.pinCode}`}</TableCell>
          <TableCell className="text-[#000000] text-xs font-semibold font-inter">
            {data?.sales?.total ? `₹${data?.sales?.total}` : "N/A"}
          </TableCell>
          <TableCell className="text-[#1D1929] text-xs font-semibold font-inter">
            {data?.sales?.last ? `₹${data?.sales?.last}` : "N/A"}
          </TableCell>
          <TableCell className="text-[#1D1929] text-xs font-bold font-sans">
            <span
              className={`${data?.status === "PENDING" && "text-[#FFC107]"} ${
                data?.status === "APPROVED" && "text-[#28A745]"
              } ${data?.status === "REJECTED" && "text-[#DC3545]"} ${
                data?.status === "SUSPENDED" && "text-[#6C757D]"
              }`}
            >
              {data?.status}
            </span>
          </TableCell>
          <TableCell className="font-sans">
            <div className="flex gap-2 items-center">
              <Button onClick={handleEdit} size="xs" variant="capsico">
                View
              </Button>
              <Button onClick={handleRemove} size="xs" variant="destructive">
                Remove
              </Button>
            </div>
          </TableCell>
        </TableRow>

        {isAlertModalOpen && (
          <AlertModal
            isAlertModalOpen={isAlertModalOpen}
            setIsAlertModalOpen={setIsAlertModalOpen}
            header="Delete Restaurant"
            description="Are you sure you want to delete this restaurant? This action cannot be undone."
            disabled={isLoading}
            onConfirm={deleteRestaurant}
          />
        )}
      </>
    );
}

export default SingleRestaurantComp