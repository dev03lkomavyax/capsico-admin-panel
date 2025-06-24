import vegicon from '@/assets/vegicon.png';
import VegIcon from '../customIcons/VegIcon';
import EggIcon from '../customIcons/EggIcon';
import NonVegIcon from '../customIcons/NonVegIcon';

const OrderItem = ({ capsico, items }) => {
    return (
        <>
            {
                items?.length > 0 && items.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_80px_1fr] gap-5"
                      >
                        <div className="flex items-center gap-3">
                          {item?.foodId?.FoodType === "veg" && <VegIcon />}
                          {item?.foodId?.FoodType === "Non-veg" && <NonVegIcon />}
                          {item?.foodId?.FoodType === "Egg" && <EggIcon />}
                          <h3 className="text-sm font-dmSans font-medium text-[#515151]">
                            {item?.name}
                          </h3>
                        </div>
                        <h3 className="font-inter text-sm font-medium text-[#515151]">
                          {item?.quantity}
                        </h3>
                        <h3 className="font-inter text-sm font-medium text-[#515151] text-center">
                          ₹{item?.itemTotal}
                        </h3>
                      </div>
                    );
                })
            }
        </>
    )
}

export default OrderItem