import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import PayoutRules from "@/components/delivery-agent/PayoutRules";
import PayoutSummary from "@/components/delivery-agent/PayoutSummary";
import RecentPayouts from "@/components/delivery-agent/RecentPayouts";
import useGetApiReq from "@/hooks/useGetApiReq";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const DeliveryAgentPayout = () => {
  const navigate = useNavigate();
  const { deliveryAgentId } = useParams();

  const [payout, setPayout] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getDeliveryPartnerPayoutDetails = () => {
    fetchData(`/admin/payout/info/${deliveryAgentId}`);
  };

  useEffect(() => {
    getDeliveryPartnerPayoutDetails();
  }, [deliveryAgentId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getDeliveryPartnerPayoutDetails res", res?.data);
      setPayout(res?.data?.data);
    }
  }, [res]);

  if (isLoading) {
    return (
      <AdminWrapper>
        <div className="space-y-6">
          <div className="h-8 w-40 rounded-md bg-muted animate-pulse" />
          <div className="h-40 rounded-md bg-muted animate-pulse" />
          <div className="h-56 rounded-md bg-muted animate-pulse" />
        </div>
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
        >
          <IoIosArrowBack className="text-2xl" />
          <div>
            <h1 className="text-2xl font-semibold text-left">Weekly Payouts</h1>
            <p className="text-sm text-muted-foreground">
              Track your earnings, rules, and recent payouts.
            </p>
          </div>
        </button>

        <div className="space-y-6 mt-5">
          {/* <header className="flex items-center justify-between"></header> */}

          <PayoutSummary data={payout} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PayoutRules rules={payout.rules} />
            <RecentPayouts items={payout.recentPayouts} />
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default DeliveryAgentPayout;
