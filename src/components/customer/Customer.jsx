/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import AlertModal from "../AlertModal";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";

const Customer = ({ item, getAllCustomer }) => {
  const navigate = useNavigate();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/customer/${item._id}`);
  };

  const handleRemove = () => {
    setIsAlertModalOpen(true);
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteCustomer = () => {
    fetchData(`/admin/delete-customer?customerId=${item?._id}`);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("customer res", res);
      getAllCustomer();
    }
  }, [res]);

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
            <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs whitespace-nowrap font-normal font-sans">
          {item?.customUserId || "N/A"}
        </TableCell>
        <TableCell className="text-[#1D1929] capitalize text-xs font-bold font-sans">
          {item?.name || "N/A"}
        </TableCell>
        <TableCell className="text-[#1D1929] capitalize text-xs font-bold font-sans">
          {item?.otp || "No OTP"}
        </TableCell>
        <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
          {item?.createdAt ? format(new Date(item.createdAt), "dd/MM/yyyy"):"N/A"}
        </TableCell>
        <TableCell className="text-[#1D1929] text-[12px] whitespace-nowrap font-normal font-roboto">
          {item?.addresses?.[0]
            ? `${item?.addresses?.[0]?.addressLine}, ${item?.addresses?.[0]?.city}, ${item?.addresses?.[0]?.state}, ${item?.addresses?.[0]?.pinCode}`
            : "N/A"}
        </TableCell>
        <TableCell className="text-[#667085] text-[10px] font-semibold whitespace-nowrap font-inter">
          {item?.totalSpent ? `Rs. ${item.totalSpent}` : "N/A"}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-bold font-sans">
          {item?.lastOrder?.orderNumber || "N/A"}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
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
          header="Delete Customer"
          description="Are you sure you want to delete this Customer? This action cannot be undone."
          disabled={isLoading}
          onConfirm={deleteCustomer}
        />
      )}
    </>
  );
};

export default Customer;
