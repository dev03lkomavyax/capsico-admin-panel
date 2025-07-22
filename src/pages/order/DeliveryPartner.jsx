import { Button } from "@/components/ui/button";
import usePostApiReq from "@/hooks/usePostApiReq";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function DeliveryPartner({ name, id, partnerId, getDetails, setIsModalOpen }) {
  const { res, fetchData, isLoading } = usePostApiReq();
  const params = useParams();

  const assignDeliveryAgent = () => {
    fetchData(`/test/assign-order`, { orderId: params?.orderId, partnerId });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("assign deliveryAgent res", res?.data);
      getDetails();
      setIsModalOpen(false);
    }
  }, [res]);

  return (
    <div className="flex justify-between gap-5">
      <p className="w-32">{id}</p>
      <h3 className="flex-1 text-lg font-medium font-roboto">{name}</h3>
      <Button onClick={assignDeliveryAgent} className="w-20">
        Assign
      </Button>
    </div>
  );
}

export default DeliveryPartner;
