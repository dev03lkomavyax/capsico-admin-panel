import pocket from "@/assets/3dicons.png";
import useGetApiReq from "@/hooks/useGetApiReq";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PayoutBasicDetailsCard = () => {
  const { deliveryAgentId } = useParams();
  const [earnings, setEarnings] = useState("");
  const [previousTransaction, setPreviousTransaction] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getDeliveryPartnerEarnings = () => {
    fetchData(`/payout/get-earnings/DELIVERY_PARTNER/${deliveryAgentId}`);
  };

  useEffect(() => {
    getDeliveryPartnerEarnings();
  }, [deliveryAgentId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getDeliveryPartnerPayoutDetails res", res?.data);
      setEarnings(res?.data?.earnings);

      setPreviousTransaction(res?.data?.previousTransactions?.[0]);
    }
  }, [res]);
  return (
    <div
      // onClick={() =>
      //   navigate("/admin/delivery-agent/123/available-balance")
      // }
      className="flex flex-col cursor-pointer justify-between rounded-lg bg-[#7FADFF]"
    >
      <div className="px-10 py-6 flex justify-between items-center">
        <div>
          <span className="font-inter font-medium text-white">
            Available Balance
          </span>
          <h2 className="text-white font-inter font-bold text-4xl mt-2">
            ₹ {earnings?.balance || 0}
          </h2>
        </div>
        <img className="w-24" src={pocket} alt="pocket" />
      </div>
      {previousTransaction && (
        <div className="py-4 px-6 bg-[#A8C7FF] rounded-b-lg flex justify-between items-end">
          <div>
            <p className="font-inter text-[#707070]">Previous transaction</p>
            <p className="font-inter text-[#707070]">
              {format(new Date(previousTransaction?.createdAt), "dd MMM, yyyy")}
            </p>
          </div>
          <p className="font-inter text-[#FF0000] font-semibold">
            Rs {previousTransaction?.amount || 0}
          </p>
        </div>
      )}
    </div>
  );
};

export default PayoutBasicDetailsCard;
