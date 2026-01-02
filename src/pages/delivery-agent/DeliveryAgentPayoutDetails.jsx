import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { Metric } from "@/components/delivery-agent/Metric";
import useGetApiReq from "@/hooks/useGetApiReq";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import PayoutTable from "./PayoutTable";

const DeliveryAgentPayoutDetails = () => {
  const navigate = useNavigate();
  const { deliveryAgentId } = useParams();

  const [earnings, setEarnings] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getDeliveryPartnerEarnings = () => {
    fetchData(`/payout/get-earnings/DELIVERY_PARTNER/${deliveryAgentId}`);
  };

  useEffect(() => {
    // getDeliveryPartnerPayoutDetails();
    getDeliveryPartnerEarnings();
  }, [deliveryAgentId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getDeliveryPartnerPayoutDetails res", res?.data);
      setEarnings(res?.data?.earnings);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
        >
          <ArrowLeftIcon className="text-2xl" />
          <h1 className="text-2xl font-semibold text-left">Earning</h1>
        </button>
        {isLoading ? (
          <div className="grid grid-cols-3 bg-white rounded-md gap-4 p-4 mt-6">
            <div className="aspect-video rounded-md bg-muted animate-pulse" />
            <div className="aspect-video rounded-md bg-muted animate-pulse" />
            <div className="aspect-video rounded-md bg-muted animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-3 bg-white rounded-md gap-4 p-4 mt-6">
            <Metric label="Total Earned" value={earnings?.totalEarned || 0} />
            <Metric label="Balance" value={earnings?.balance || 0} />
            <Metric
              label="Total Paid Out"
              value={earnings?.totalPaidOut || 0}
            />
          </div>
        )}

        <PayoutTable getDeliveryPartnerEarnings={getDeliveryPartnerEarnings} />
      </div>
    </AdminWrapper>
  );
};

export default DeliveryAgentPayoutDetails;
