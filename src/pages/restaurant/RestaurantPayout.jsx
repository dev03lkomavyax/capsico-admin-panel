import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { Metric } from "@/components/delivery-agent/Metric";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import { ArrowLeftIcon, FileOutputIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PayoutTable from "../delivery-agent/PayoutTable";
import EarningTable from "./earning/EarningTable";
import ExportRestaurantPayout from "./earning/ExportRestaurantPayout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DatePicker from "@/components/DatePicker";
import toast from "react-hot-toast";
import { readCookie } from "@/utils/readCookie";

const RestaurantPayout = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  const [earnings, setEarnings] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [range, setRange] = useState("Monthly");
  const [period, setPeriod] = useState(null);

  // Optional (for Custom)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const userInfo = readCookie("userInfo");

  const handleExort = () => {
    setIsModalOpen(true);
  };

  const { res, fetchData, isLoading } = useGetApiReq();

  const getRestaurantEarnings = () => {
    if (range === "Custom" && (!startDate || !endDate)) {
      toast.error("Please select both start and end dates");
      return;
    }

    const params = new URLSearchParams({
      range,
      ...(range === "Custom" && {
        startDate,
        endDate,
      }),
      cityId: userInfo.city || "",
    });

    fetchData(
      `/payout/get-earnings/MERCHANT/${restaurantId}?${params.toString()}`,
    );
  };

  useEffect(() => {
    getRestaurantEarnings();
  }, [restaurantId, range, startDate, endDate]);

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
                <Button
                  className="w-auto px-4"
                  variant="capsico"
                  onClick={handleExort}
                >
                  <FileOutputIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex gap-2 mt-4">
          {["Daily", "Weekly", "Monthly", "Custom"].map((r) => (
            <Button
              key={r}
              variant={range === r ? "capsico" : "outline"}
              size="sm"
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}

          {range === "Custom" && (
            <div className="flex gap-3 max-w-md">
              <DatePicker
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setEndDate(null); // reset end date if start changes
                }}
                placeholder="From date"
              />

              <DatePicker
                value={endDate}
                onChange={setEndDate}
                placeholder="To date"
                disabled={(date) => date > new Date()}
              />
            </div>
          )}
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
            <Metric
              label="Balance"
              value={earnings?.balance?.toFixed(2) || 0}
            />
            <Metric
              label="Total Paid Out"
              value={earnings?.totalPaidOut || 0}
            />
          </div>
        )}

        <EarningTable />

        <PayoutTable
          getDeliveryPartnerEarnings={getRestaurantEarnings}
          recipientId={restaurantId}
          type="MERCHANT"
        />

        {isModalOpen && (
          <ExportRestaurantPayout
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </AdminWrapper>
  );
};

export default RestaurantPayout;
