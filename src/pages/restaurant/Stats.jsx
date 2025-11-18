import useGetApiReq from "@/hooks/useGetApiReq";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BiCheckShield } from "react-icons/bi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RiQrScan2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const Stats = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [statsData, setStatsData] = useState("");

  const { res, fetchData,firstading } = useGetApiReq();

  const getAllOrder = () => {
    fetchData(
      `/admin/restaurant/dashboard-summary?restaurantId=${params?.restaurantId}`
    );
  };

  useEffect(() => {
    getAllOrder();
  }, [params?.restaurantId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("stats res", res?.data);
        setStatsData(res?.data?.data);
    }
  }, [res]);

  return (
    <div className="flex justify-between items-center gap-6 w-full mb-8">
      <button
        onClick={() => navigate("/admin/restaurant/revenue")}
        className="bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1"
      >
        <div className="flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#EFEFFD] bg-[#DEDEFA]">
          <BiCheckShield className="text-[#5C59E8] text-2xl" />
        </div>
        <div>
          <p className="text-[#667085] text-base font-medium font-inter mb-2 text-start">
            Total Revenue
          </p>
          <p className="text-[#333843] text-2xl font-medium font-inter flex items-center gap-2">
            $75,500
            <span className="text-[#0D894F] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full">
              +10%
            </span>
          </p>
        </div>
      </button>
      <button
        onClick={() => navigate("/admin/restaurant/menu")}
        className="bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1"
      >
        <div className="flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#E7F4EE] bg-[#CFE7DC]">
          <PiShoppingCartSimple className="text-[#0D894F] text-2xl" />
        </div>
        <div>
          <p className="text-[#667085] text-base font-medium font-inter mb-2 text-start">
            Total Sales
          </p>
          <p className="text-[#333843] text-2xl font-medium font-inter flex items-center gap-2">
            31,500
            <span className="text-[#0D894F] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full">
              +15%
            </span>
          </p>
        </div>
      </button>
      <button
        onClick={() => navigate("/admin/restaurant/menu")}
        className="bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1"
      >
        <div className="flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#FEEDEC] bg-[#FCDAD7]">
          <RiQrScan2Line className="text-[#F04438] text-2xl" />
        </div>
        <div>
          <p className="text-[#667085] text-base font-medium font-inter mb-2 text-start">
            Menu
          </p>
          <p className="text-[#333843] text-2xl font-medium font-inter flex items-center gap-2">
            247
            <span className="text-[#667085] text-xs font-semibold font-inter bg-[#E7F4EE] py-[2px] px-[6px] rounded-full">
              0%
            </span>
          </p>
        </div>
      </button>
      <button
        onClick={() => navigate("/admin/restaurant/menu")}
        className="bg-[#FFFFFF] flex flex-col items-start gap-4 w-full border-[1px] border-[#E0E2E7] rounded-lg p-5 shadow-custom1"
      >
        <div className="flex justify-center items-center h-10 w-10 rounded-full border-4 border-[#FDF1E8] bg-[#FAE1CF]">
          <BiCheckShield className="text-[#E46A11] text-2xl" />
        </div>
        <div>
          <p className="text-[#667085] text-base font-medium font-inter mb-2 text-start">
            Total Order
          </p>
          <p className="text-[#333843] text-2xl font-medium font-inter flex items-center gap-2">
            {statsData?.totalOrders || 0}
            <span
              className={cn(
                "text-xs font-semibold font-inter py-[2px] px-[6px] rounded-full",
                statsData?.orderGrowth.includes("-")
                  ? "text-[#F04438] bg-[#FEEDEC]"
                  : "text-[#0D894F] bg-[#E7F4EE]"
              )}
            >
              {statsData?.orderGrowth || "0%"}
            </span>
          </p>
        </div>
      </button>
    </div>
  );
};

export default Stats;
