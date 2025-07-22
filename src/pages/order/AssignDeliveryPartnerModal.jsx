import DataNotFound from "@/components/DataNotFound";
import Spinner from "@/components/Spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LIMIT } from "@/constants/constants";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import DeliveryPartner from "./DeliveryPartner";

const AssignDeliveryPartnerModal = ({
  isModalOpen,
  setIsModalOpen,
  getDetails,
}) => {
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getAllDeliveryAgent = () => {
    fetchData(`/admin/get-all-deliveryPartners?page=${page}&limit=${LIMIT}`);
  };

  useEffect(() => {
    getAllDeliveryAgent();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("deliveryAgent res", res?.data);
      setDeliveryPartners(res?.data?.data);
      const { pagination } = res?.data || {};
      setPageCount(pagination?.totalPages);
      setPage(pagination?.page);
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
              name={deliveryPartner?.personalInfo?.name}
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
