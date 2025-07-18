import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";

const OfferDetails = ({ coupon }) => {
  const [couponsDetails, setCouponDetails] = useState("");
  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: statusRes,
    fetchData: fetchStatusData,
    isLoading: isStatusLoading,
  } = useGetApiReq();

  const getCouponDetails = () => {
    fetchData(`/admin/coupons-details/${coupon.id}`);
  };

  useEffect(() => {
    getCouponDetails();
  }, [coupon]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("get coupons details res", res);
      setCouponDetails(res?.data?.data);
    }
  }, [res]);

  const handleStatusChange = () => {
    fetchStatusData(
      `/admin/coupons-toggle-status/${coupon.id}?status=${
        couponsDetails.status === "Active" ? "inactive" : "active"
      }`
    );
  };

  useEffect(() => {
    if (statusRes?.status === 200 || statusRes?.status === 201) {
      console.log("get statusRes res", statusRes);
      getCouponDetails();
    }
  }, [statusRes]);

  const { completedOrders, discountGiven, effectiveDiscount, netSales } =
    couponsDetails.metrics || {};
  const { fundingSource, validity } = couponsDetails.details || {};
  const { starts, ends } = couponsDetails.duration || {};

  return (
    <div className="bg-white rounded-xl">
      <div className="p-4 bg-[#1AA6F1] flex justify-between rounded-xl">
        <div>
          <h2 className="text-white font-numans font-bold text-2xl">
            {fundingSource}
          </h2>
          <p className="text-white class-sm5 mt-1">
            Begins on {starts}, Ends on {ends}
          </p>
        </div>
        <div className="flex gap-1">
          {/* <div style={{ backgroundImage: `url(${greenBadge})` }} className="text-white w-24 bg-no-repeat bg-center py-1 px-5 text-center flex flex-col items-center justify-center">
                        <div className="text-[11px] font-medium leading-3">new users only</div>
                    </div> */}
          <button className="class-xl6 text-white px-2">
            {couponsDetails?.status}
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-5 justify-center">
          <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
            <p className="text-center text-3xl primary-color">
              {completedOrders?.formatted}
            </p>
            <p className="text-center primary-color mt-2">
              Completed <br /> Orders
            </p>
          </div>
          <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
            <p className="text-center text-3xl primary-color">
              {discountGiven?.formatted}
            </p>
            <p className="text-center primary-color mt-2">
              Discount <br /> given
            </p>
          </div>
          <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
            <p className="text-center text-3xl primary-color">
              {effectiveDiscount?.formatted}
            </p>
            <p className="text-center primary-color mt-2">
              Effective <br /> discount
            </p>
          </div>
          <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
            <p className="text-center text-3xl primary-color">
              {netSales?.formatted}
            </p>
            <p className="text-center primary-color mt-5">Net sales</p>
          </div>
        </div>

        <p className="text-[#637D92] class-base1 mt-5">
          {couponsDetails?.title}
        </p>
        <p className="text-black font-semibold mt-5">{couponsDetails?.code}</p>
        <p className="text-[#637D92] class-base1 mt-5">{coupon?.description}</p>
        <p className="text-[#637D92] class-base1 mt-5">Offer Details:</p>

        {coupon?.terms.length > 0 && (
          <ul className="mt-3">
            {coupon?.terms.map((term, i) => (
              <li key={i} className="ml-5 class-base1 text-[#637D92]">
                {term}
              </li>
            ))}
            <li className="ml-5 class-base1 text-[#637D92]">
              Validity {validity}
            </li>
          </ul>
        )}
        <Button
          onClick={handleStatusChange}
          className={`w-full ${
            couponsDetails.status === "Active"
              ? "bg-[#E4626F] hover:bg-[#e85362]"
              : "bg-[#26f271] hover:bg-[#28d668]"
          } class-base1 mt-4 h-[51px] mb-5`}
        >
          {couponsDetails.status === "Active"
            ? "Deactivate Offer"
            : "Activate Offer"}
        </Button>
      </div>
    </div>
  );
};

export default OfferDetails;
