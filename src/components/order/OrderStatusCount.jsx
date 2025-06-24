import useGetApiReq from "@/hooks/useGetApiReq";
import { getOrderCountByStatus } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const OrderStatusCount = ({ handleOnClick, selectOrderTab }) => {
  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: res1,
    fetchData: fetchData1,
    isLoading: isLoading1,
  } = useGetApiReq();

  const [orderStatusCount, setOrderStatusCount] = useState({
    result: [],
    allOrders: 0,
    newOrders: 0,
  });

  const getOrderStatusCounts = () => {
    fetchData(`/admin/get-order-status-counts`);
  };

  useEffect(() => {
    getOrderStatusCounts();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getOrderStatusCounts res", res?.data);
      setOrderStatusCount({
        allOrders: res?.data?.totalOrders || 0,
        result: res?.data?.result || [],
      });
    }
  }, [res]);

  const getNewOrderCounts = () => {
    fetchData1(`/admin/get-todays-order-counts`);
  };

  useEffect(() => {
    getNewOrderCounts();
  }, []);

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      console.log("getNewOrderCounts res", res1?.data);
      const { confirmed, pending } = res1?.data?.data || {};
      setOrderStatusCount((prev) => ({
        ...prev,
        newOrders: confirmed + pending,
      }));
    }
  }, [res1]);


  return (
    <section className="flex justify-start items-center gap-5">
      <button
        onClick={() => handleOnClick("all")}
        className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${
          selectOrderTab === "allOrder" ? "bg-[#cfe0ff]" : "bg-[#E3EDFF]"
        }`}
      >
        All Order ({orderStatusCount?.allOrders})
      </button>
      <button
        onClick={() => handleOnClick("new")}
        className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${
          selectOrderTab === "newOrder" ? "bg-[#cfe0ff]" : "bg-[#E3EDFF]"
        }`}
      >
        New Order ({orderStatusCount.newOrders})
      </button>
      <button
        onClick={() => handleOnClick("prepared")}
        className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${
          selectOrderTab === "prepared" ? "bg-[#cfe0ff]" : "bg-[#E3EDFF]"
        }`}
      >
        Preparing (
        {getOrderCountByStatus(orderStatusCount?.result, "preparing")})
      </button>
      <button
        onClick={() => handleOnClick("completed")}
        className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${
          selectOrderTab === "completed" ? "bg-[#cfe0ff]" : "bg-[#E3EDFF]"
        }`}
      >
        Completed (
        {getOrderCountByStatus(orderStatusCount?.result, "delivered")})
      </button>
      <button
        onClick={() => handleOnClick("cancelled")}
        className={`max-w-[295px] w-full h-20 text-[#163AB0] text-xl font-medium font-roboto rounded-lg ${
          selectOrderTab === "cancelled" ? "bg-[#cfe0ff]" : "bg-[#E3EDFF]"
        }`}
      >
        Cancelled (
        {getOrderCountByStatus(orderStatusCount?.result, "cancelled")})
      </button>
    </section>
  );
};

export default OrderStatusCount;
