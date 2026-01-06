import DataNotFound from "@/components/DataNotFound";
import Spinner from "@/components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import DeliveryPartner from "./DeliveryPartner";
import { useParams } from "react-router-dom";

const AssignDeliveryPartnerModal = ({
  isModalOpen,
  setIsModalOpen,
  getDetails,
}) => {
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const params = useParams();

  const { res, fetchData, isLoading } = useGetApiReq();

  const getPartnersInZoneByOrder = () => {
    fetchData(`/zones/get-partners-in-zone-by-order/${params.orderId}`, {
      reportCrash: true,
      screenName: "ORDER_ZONE_PARTNERS_GET",
    });
  };

  useEffect(() => {
    getPartnersInZoneByOrder();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getPartnersInZoneByOrder res", res);
      setDeliveryPartners(res?.data?.partners);
    }
  }, [res]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Delivery Partners</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {deliveryPartners.map((deliveryPartner) => (
            <DeliveryPartner
              key={deliveryPartner?._id}
              id={deliveryPartner?.partnerId}
              partnerId={deliveryPartner?._id}
              distanceFromRestaurant={deliveryPartner?.distanceFromRestaurant}
              name={deliveryPartner?.name}
              getDetails={getDetails}
              setIsModalOpen={setIsModalOpen}
            />
          ))}

          {isLoading && <Spinner />}
          {!isLoading && deliveryPartners.length === 0 && (
            <DataNotFound name="Delivery Partners" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDeliveryPartnerModal;
