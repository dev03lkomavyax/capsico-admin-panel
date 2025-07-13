import React, { useState } from "react";
import Address from "./Address";
import DataNotFound from "@/components/DataNotFound";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import AddAddress from "./AddAddressModal";

const Addresses = ({ addresses, isLoading, getCustomerDetails }) => {
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  return (
    <div className="bg-white p-5 rounded-md max-h-[270px] overflow-y-auto shrink">
      <div className="flex gap-4 justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Address</h2>
        <Button
          onClick={() => setIsAddAddressModalOpen(true)}
          variant="capsico"
          className="w-32 rounded-md h-8"
        >
          Add Address
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {addresses?.map((address, index) => (
          <Address
            getCustomerDetails={getCustomerDetails}
            index={index}
            address={address}
          />
        ))}
      </div>

      {addresses.length === 0 && <DataNotFound name="Addresses" />}
      {isLoading && <Spinner />}

      {isAddAddressModalOpen && (
        <AddAddress
          isModalOpen={isAddAddressModalOpen}
          setIsModalOpen={setIsAddAddressModalOpen}
          onSuccess={getCustomerDetails}
        />
      )}
    </div>
  );
};
export default Addresses;
