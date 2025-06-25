import { Button } from "@/components/ui/button";
import { format } from "date-fns";
// import greenBadge from "@/assets/green-badge.png"

const OfferDetails = ({ offerActiveTab, setOfferActiveTab, coupon }) => {
  return (
    <div className="bg-white rounded-xl">
      <div className="p-4 bg-[#1AA6F1] flex justify-between rounded-xl">
        <div>
          <h2 className="text-white font-numans font-bold text-2xl">
            {coupon?.discountType === "fixed" &&
              `Get a flat ₹${coupon?.discountValue} off on your order!`}
            {coupon?.discountType === "percentage" &&
              `Get a flat ${coupon?.discountValue}% off on your order up to ₹${coupon?.maxDiscount}!`}
            {coupon?.discountType === "buyOneGetOne" && `Buy 1 and Get 1 free!`}
          </h2>
          <p className="text-white class-sm5 mt-1">
            Begins on{" "}
            {coupon?.startDate &&
              format(new Date(coupon?.startDate), "dd/MM/yyyy")}
            , Ends on{" "}
            {coupon?.startDate &&
              format(new Date(coupon?.endDate), "dd/MM/yyyy")}
          </p>
        </div>
        <div className="flex gap-1">
          {/* <div style={{ backgroundImage: `url(${greenBadge})` }} className="text-white w-24 bg-no-repeat bg-center py-1 px-5 text-center flex flex-col items-center justify-center">
                        <div className="text-[11px] font-medium leading-3">new users only</div>
                    </div> */}
          <button className="class-xl6 text-white px-2">
            {coupon?.isActive ? "Active" : "Inactive"}
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-5 justify-center">
          <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
            <p className="text-center text-3xl primary-color">₹0</p>
            <p className="text-center primary-color mt-2">
              Completed <br /> Orders
            </p>
          </div>
          <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
            <p className="text-center text-3xl primary-color">₹0</p>
            <p className="text-center primary-color mt-2">
              Discount <br /> given
            </p>
          </div>
          <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
            <p className="text-center text-3xl primary-color">0%</p>
            <p className="text-center primary-color mt-2">
              Effective <br /> discount
            </p>
          </div>
          <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
            <p className="text-center text-3xl primary-color">₹0</p>
            <p className="text-center primary-color mt-5">Net sales</p>
          </div>
        </div>

        <h4 className="mt-5 text-[#637D92] class-base1">
          Coupon Name: {coupon?.name}
        </h4>
        <h4 className="mt-5 text-[#637D92] class-base1">
          Coupon Code: {coupon?.code}
        </h4>

        <p className="text-[#637D92] class-base1 mt-5">{coupon?.description}</p>
        <p className="text-[#637D92] class-base1 mt-5">Offer Details:</p>
        <ul className="mt-3">
          <li className="ml-5 class-base1 text-[#637D92] capitalize">
            Applicable for: {coupon?.applicableOn}
          </li>
          <li className="ml-5 class-base1 text-[#637D92]">
            Minimum order value: ₹{coupon?.minOrderValue}
          </li>
          <li className="ml-5 class-base1 text-[#637D92]">
            Valid at: <span className="capitalize">{coupon?.restaurantId?.name}</span>,{" "}
            {coupon?.restaurantId?.address?.addressLine},{" "}
            {coupon?.restaurantId?.address?.city},{" "}
          </li>
          <li className="ml-5 class-base1 text-[#637D92]">
            Offer sharing: 100% of the discount value is funded by you
          </li>
          <li className="ml-5 class-base1 text-[#637D92]">Created: Offline</li>
        </ul>
        <Button
          onClick={() => setOfferActiveTab(!offerActiveTab)}
          variant="destructive"
          className="w-full bg-[#E4626F] hover:bg-[#e85362] class-base1 mt-4 h-[51px] mb-5"
        >
          {offerActiveTab ? "Activate Offer" : "Deactivate Offer"}
        </Button>
      </div>
    </div>
  );
};

export default OfferDetails;
