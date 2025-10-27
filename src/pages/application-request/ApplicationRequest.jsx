import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import Capsico from "@/components/application-request/Capsico";
import DeliveryPartnerRequestes from "@/components/application-request/delivery-partner/DeliveryPartnerRequestes";
import Quickly from "@/components/application-request/Quickly";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const ApplicationRequest = () => {
  const navigate = useNavigate();
  const [selectTab, setSelectTab] = useState("capsico");
  const [capsicoReqNos, setCapsicoReqNos] = useState(0);

  return (
    <AdminWrapper>
      <section className="w-full min-h-screen">
        <div className="flex justify-start items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Application
          </h2>
        </div>
        <div className="flex justify-between">
          <section className="flex justify-start items-center mb-8">
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
                {capsicoReqNos}
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
            <button
              onClick={() => setSelectTab("delivery-partner")}
              className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${
                selectTab === "delivery-partner"
                  ? "border-[#003CFF]"
                  : "border-transparent"
              }`}
            >
              <h6 className="text-[#1D1929] text-sm font-semibold font-roboto">
                Delivery Partners
              </h6>
            </button>
          </section>
          {/* {selectTab === "capsico" && (
            <Button
              className="bg-blue-600 w-40 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
              onClick={() =>
                navigate("/admin/application-request/add-restaurant")
              }
            >
              <Plus className="w-4 h-4" />
              Add Restaurant
            </Button>
          )}
          {selectTab === "quickly" && (
            <Button className="bg-blue-600 w-40 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
              <Plus className="w-4 h-4" />
              Add Vendor
            </Button>
          )} */}
        </div>
        {selectTab === "capsico" && (
          <Capsico setCapsicoReqNos={setCapsicoReqNos} />
        )}
        {selectTab === "quickly" && <Quickly />}
        {selectTab === "delivery-partner" && <DeliveryPartnerRequestes />}
      </section>
    </AdminWrapper>
  );
};

export default ApplicationRequest;
