import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import Capsico from "@/components/order/Capsico";
import Quickly from "@/components/order/Quickly";
import { useState } from "react";

const data = [
  {
    orderID: "1264903",
    order: "TV 14 Inch Gede",
    customer: "Vivek",
    status: "Complete",
    createdDate: `March ${(21, 2020)}`,
    restaurantName: "Adiyaman Hotel",
    price: "$19.09",
  },
  {
    orderID: "1264903",
    order: "TV 14 Inch Gede",
    customer: "Piyush",
    status: "Cancelled",
    createdDate: `March ${(21, 2020)}`,
    restaurantName: "Adiyaman Hotel",
    price: "$19.09",
  },
  {
    orderID: "1264903",
    order: "TV 14 Inch Gede",
    customer: "Aditya",
    status: "Preparing",
    createdDate: `March ${(21, 2020)}`,
    restaurantName: "Adiyaman Hotel",
    price: "$19.09",
  },
  {
    orderID: "1264903",
    order: "TV 14 Inch Gede",
    customer: "Nakoyame Japan",
    status: "New",
    createdDate: `March ${(21, 2020)}`,
    restaurantName: "Adiyaman Hotel",
    price: "$19.09",
  },
];

const Order = () => {
  const [selectTab, setSelectTab] = useState("capsico");
  const [quicklyOrderData, setQuicklyOrderData] = useState(data);
  const [capsicoOrderNo, setCapsicoOrderNo] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectValue, setselectValue] = useState("All");
  const [totalPage, setTotalPage] = useState("16");

  const pageCount = 16;

  return (
    <AdminWrapper>
      <div className="flex flex-col gap-6 w-full h-full py-8 px-12r">
        <section className="flex justify-start items-center">
          <button
            onClick={() => setSelectTab("capsico")}
            className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${
              selectTab === "capsico"
                ? "border-[#003CFF]"
                : "border-transparent"
            }`}
          >
            <h6 className="text-[#1D1929] text-sm font-semibold font-roboto">
              Capsico
            </h6>
            <p className="text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#FF6F03] w-[22px] h-[22px] rounded-[7px]">
              {capsicoOrderNo}
            </p>
          </button>
          <button
            onClick={() => setSelectTab("quickly")}
            className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${
              selectTab === "quickly"
                ? "border-[#003CFF]"
                : "border-transparent"
            }`}
          >
            <h6 className="text-[#1D1929] text-sm font-semibold font-roboto">
              Quickly
            </h6>
            <p className="text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#ABABAB] w-[22px] h-[22px] rounded-[7px]">
              48
            </p>
          </button>
        </section>
        {selectTab === "capsico" && (
          <Capsico setCapsicoOrderNo={setCapsicoOrderNo} />
        )}
        {selectTab === "quickly" && (
          <Quickly
            selectOrderTab={""}
            setSelectOrderTab={() => {}}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            quicklyOrderData={quicklyOrderData}
          />
        )}
      </div>
    </AdminWrapper>
  );
};

export default Order;
