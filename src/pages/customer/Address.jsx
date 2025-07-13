import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  EllipsisVertical,
  EllipsisVerticalIcon,
  Trash,
} from "lucide-react";
import AlertModal from "@/components/AlertModal";
import AddAddress from "./AddAddressModal";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";

const Address = ({ address, index, getCustomerDetails }) => {
  const [isDeleteAlertModal, setIsDeleteAlertModal] = useState(false);
  const [isUpdateAddressModalOpen, setIsUpdateAddressModalOpen] =
    useState(false);
  // /delete-address/:id

  const formatFullAddress = (address) => {
    const parts = [
      address.addressLine,
      address.city,
      address.state,
      address.pinCode,
      "India",
    ].filter(Boolean);

    return parts.join(", ");
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteAddress = () => {
    fetchData(`/admin/delete-address/${address?._id}`);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      getCustomerDetails?.();
      setIsUpdateAddressModalOpen(false);
    }
  }, [res]);

  return (
    <div className="text-muted-foreground flex justify-between gap-1">
      {/* <span>{index + 1}. </span>
      <span>{`${address?.addressLine}, ${address?.city}, ${address?.state}, ${address?.pinCode}`}</span> */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <span className="text-gray-500 font-medium mt-0.5">
              {index + 1}.
            </span>
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">
                {formatFullAddress(address)}
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Coordinates: {address.lat.toFixed(4)}, {address.lng.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="flex justify-start">
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-50">
          <DropdownMenuItem onClick={() => setIsDeleteAlertModal(true)}>
            <Trash className="text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsUpdateAddressModalOpen(true)}>
            <Edit />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isDeleteAlertModal && (
        <AlertModal
          isAlertModalOpen={isDeleteAlertModal}
          setIsAlertModalOpen={setIsDeleteAlertModal}
          header="Delete Address"
          description="Are you sure you want to delete this address?"
          onConfirm={deleteAddress}
          disabled={isLoading}
        />
      )}
      {isUpdateAddressModalOpen && (
        <AddAddress
          isModalOpen={isUpdateAddressModalOpen}
          setIsModalOpen={setIsUpdateAddressModalOpen}
          onSuccess={getCustomerDetails}
          address={address}
        />
      )}
    </div>
  );
};
export default Address;
