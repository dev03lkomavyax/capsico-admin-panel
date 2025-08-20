import { useNavigate } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TableCell, TableRow } from "../ui/table";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { Button } from "../ui/button";
import AlertModal from "../AlertModal";

const SingleOrder = ({ data, getAllOrder }) => {
  const navigate = useNavigate();

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/order/${data?._id}`);
  };

  const handleRemove = () => {
    setIsAlertModalOpen(true);
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteOrder = () => {
    fetchData(`/admin/delete-order?orderId=${data?._id}`);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("order delete res", res);
      getAllOrder();
    }
  }, [res]);

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          {
            <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
          }
        </TableCell>
        {/* <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
        {data?._id}
      </TableCell> */}
        <TableCell className="text-[#1D1929] text-xs font-bold font-roboto">
          {data?.orderNumber}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
          {data?.user?.name}
        </TableCell>
        <TableCell>
          <div
            className={`${
              (data?.status === "confirmed" && "text-[#1619ac] bg-[#b9cbed]") ||
              (data?.status === "pending" && "text-[#000] bg-[#eed94e]") ||
              (data?.status === "preparing" && "text-[#AC9D16] bg-[#FAFDD4]") ||
              (data?.status === "delivered" && "text-[#4FAC16] bg-[#DCFDD4]") ||
              (data?.status === "cancelled" && "text-[#AC1616] bg-[#FDD4D4]") ||
              (data?.status === "rejected" && "text-[#AC1616] bg-[#FDD4D4]") ||
              "text-blue-600 bg-blue-100"
            }  flex justify-center whitespace-nowrap capitalize items-center h-[24px] text-[10px] font-normal font-sans rounded-[10px]`}
          >
            {data.status.split("_").join(" ")}
          </div>
        </TableCell>
        <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
          {data?.createdAt &&
            format(new Date(data.createdAt), "MMM dd, yyyy")}
        </TableCell>
        <TableCell className="text-[#667085] text-[9px] font-normal font-inter">
          {data.restaurant?.name}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-bold font-sans">
          {data?.amounts?.total}
        </TableCell>
                <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
    {data?.orderTiming || "N/A"}
  </TableCell>


        
        <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
          <div className="flex gap-2 items-center">
            <Button onClick={handleEdit} size="xs" variant="capsico">
              View detail
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
          header="Delete Order"
          description="Are you sure you want to delete this Order? This action cannot be undone."
          disabled={isLoading}
          onConfirm={deleteOrder}
        />
      )}
    </>
  );
};

export default SingleOrder;
