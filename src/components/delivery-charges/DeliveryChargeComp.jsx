/* eslint-disable react/prop-types */
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { TableCell, TableRow } from "../ui/table";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";

const DeliveryChargeComp = ({ deliveryCharge, getDeliveryCharges }) => {
  const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { res, fetchData } = usePatchApiReq();
  const {
    res: deleteRes,
    fetchData: deleteCharge,
    isLoading: isDeleteChargeLoading,
  } = useDeleteApiReq();

  console.log("deliveryCharge", deliveryCharge);

  const {
    city,
    baseCharge,
    isActive: status,
    perKmCharge,
    pincodes,
    modifiers,
  } = deliveryCharge || {};

  const [isActive, setIsActive] = useState(status || false);

  const handleRemove = () => {
    setIsAlertDeleteModalOpen(true);
  };

  const handleUpdate = () => {
    navigate(`/admin/delivery-charges/update`, { state: { deliveryCharge } });
  };

  const toggleStatus = () => {
    setIsActive((prev) => !prev);
    fetchData(`/delivery-charges/${deliveryCharge?._id}/status`, {
      isActive: !isActive,
    });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("toggleStatus res", res);
    }
  }, [res]);

  const deleteChargeFun = () => {
    deleteCharge(`/delivery-charges/delete/${deliveryCharge?._id}`);
  };

  useEffect(() => {
    if (deleteRes?.status === 200 || deleteRes?.status === 201) {
      console.log("deleteRes res", res);
      getDeliveryCharges();
    }
  }, [deleteRes]);

  return (
    <>
      <TableRow>
        {/* <TableCell className="w-10">
          <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
        </TableCell> */}
        <TableCell>{city}</TableCell>
        <TableCell>{pincodes.join(", ")}</TableCell>
        <TableCell>₹{baseCharge}</TableCell>
        <TableCell>₹{perKmCharge}</TableCell>
        <TableCell>₹{modifiers?.timeOfDay?.day}</TableCell>
        <TableCell>₹{modifiers?.timeOfDay?.night}</TableCell>
        <TableCell>₹{modifiers?.weather.rain}</TableCell>
        <TableCell>₹{modifiers?.weather.extreme}</TableCell>
        <TableCell>
          {modifiers?.demandSurge?.enabled
            ? `✅ ${modifiers?.demandSurge?.multiplier}x`
            : "❌ No"}
        </TableCell>
        <TableCell>
          <div className="space-y-2">
            <p className="text-sm">{isActive ? "Active" : "Inactive"}</p>
            <Switch
              checked={isActive}
              onCheckedChange={toggleStatus}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
            />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex gap-2 items-center">
            <Button onClick={handleUpdate} variant="update" size="icon">
              <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
              {/* Edit */}
            </Button>
            <Button onClick={handleRemove} variant="delete" size="icon">
              <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
              {/* Delete */}
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isAlertDeleteModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertDeleteModalOpen}
          setIsAlertModalOpen={setIsAlertDeleteModalOpen}
          header="Delete Delivery Charge"
          description="Are you sure you want to delete this delivery charge? This action cannot be undone."
          disabled={isDeleteChargeLoading}
          onConfirm={deleteChargeFun}
        />
      )}
    </>
  );
};

export default DeliveryChargeComp;
