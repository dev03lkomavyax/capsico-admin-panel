import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { Metric } from "@/components/delivery-agent/Metric";
import useGetApiReq from "@/hooks/useGetApiReq";
import { ArrowLeftIcon, FileOutputIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import PayoutTable from "./PayoutTable";
import { Button } from "@/components/ui/button";
import EarningTable from "./earning/EarningTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ExportDeliveryAgentPayout from "./earning/ExportDeliveryAgentPayout";

const DeliveryAgentPayoutDetails = () => {
  const navigate = useNavigate();
  const { deliveryAgentId } = useParams();

  const [earnings, setEarnings] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExort = () => {
    setIsModalOpen(true);
  };

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
        <div className="flex justify-between items-center gap-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1"
          >
            <ArrowLeftIcon className="text-2xl" />
            <h1 className="text-2xl font-semibold text-left">Earning</h1>
          </button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-auto px-4" variant="capsico" onClick={handleExort}>
                  <FileOutputIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-3 bg-white rounded-md gap-4 p-4 mt-6 h-24">
            <div className="rounded-md bg-muted animate-pulse h-full" />
            <div className="rounded-md bg-muted animate-pulse h-full" />
            <div className="rounded-md bg-muted animate-pulse h-full" />
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

        <EarningTable />

        <PayoutTable getDeliveryPartnerEarnings={getDeliveryPartnerEarnings} />

        {isModalOpen && (
          <ExportDeliveryAgentPayout
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </AdminWrapper>
  );
};

export default DeliveryAgentPayoutDetails;
