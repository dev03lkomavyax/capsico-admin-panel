import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { Metric } from "@/components/delivery-agent/Metric";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PayoutTable from "../delivery-agent/PayoutTable";

const RestaurantPayout = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  const [earnings, setEarnings] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getDeliveryPartnerEarnings = () => {
    fetchData(`/payout/get-earnings/MERCHANT/${restaurantId}`);
  };

  useEffect(() => {
    // getDeliveryPartnerPayoutDetails();
    getDeliveryPartnerEarnings();
  }, [restaurantId]);

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
          <Button className="w-auto px-4" variant="capsico">
            <Link
              to={`/admin/restaurant/${restaurantId}/payout/earnings-history`}
            >
              Earnings History
            </Link>
          </Button>
        </div>
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

        <PayoutTable
          getDeliveryPartnerEarnings={getDeliveryPartnerEarnings}
          recipientId={restaurantId}
          type="MERCHANT"
        />
      </div>
    </AdminWrapper>
  );
};

export default RestaurantPayout;
