import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import React from "react";
import UpdateGlobalCommissionCard from "../restaurant/UpdateGlobalCommissionModal";
import UpdateGlobalGSTCard from "../restaurant/UpdateGlobalGSTModal";
import PlatformFeeCard from "../order/PlatformFeeModal";

const Globals = () => {
  return (
    <AdminWrapper>
      <div>
        <h1 className="font-inter text-2xl font-bold text-[#353535]">
          Globals
        </h1>
        <p>Set Global settings for the platform</p>

        <div className="grid grid-cols-2 gap-5 mt-5">
          <UpdateGlobalCommissionCard />
          <PlatformFeeCard />
          <UpdateGlobalGSTCard />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default Globals;
