import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "react-router-dom";
import { statusStyles } from "@/constants/statusStyles";
import { format } from "date-fns";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AlertModal from "../AlertModal";

const status = "Available Now";
// const status = "Not Available"

const DeliveryAgentComp = ({ agent, getAllDeliveryAgent }) => {
  const navigate = useNavigate();

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/delivery-agent/${agent?._id}`);
  };

  const handleRemove = () => {
    setIsAlertModalOpen(true);
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteDeliveryAgent = () => {
    fetchData(`/admin/delete-delivery-agent?deliveryAgentId=${agent?._id}`);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("delete delivery agent res", res);
      getAllDeliveryAgent();
    }
  }, [res, getAllDeliveryAgent]);

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
          {agent?._id}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-bold font-sans">
          {agent?.personalInfo?.name}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
          {agent?.address?.city}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">
          <div
            className={`${
              statusStyles[agent?.accountStatus?.currentStatus].bg
            } ${
              statusStyles[agent?.accountStatus?.currentStatus].text
            } w-24 flex justify-center capitalize items-center h-[24px] text-[10px] font-normal font-sans rounded-[10px]`}
          >
            {agent?.accountStatus?.currentStatus}
          </div>
        </TableCell>
        <TableCell className="text-[#667085] text-xs font-semibold font-inter">
          {agent.createdAt && format(new Date(agent.createdAt), "MMM dd, yyyy")}
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
          header="Delete Delivery Agent"
          description="Are you sure you want to delete this Delivery Agent? This action cannot be undone."
          disabled={isLoading}
          onConfirm={deleteDeliveryAgent}
        />
      )}
    </>
  );
};

export default DeliveryAgentComp;
