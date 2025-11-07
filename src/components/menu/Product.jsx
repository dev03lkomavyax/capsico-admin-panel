// import outletIcon from "@/assets/outlet.png"
import { BiTrash } from "react-icons/bi";
import VegIcon from "../customIcons/VegIcon";
import NonVegIcon from "../customIcons/NonVegIcon";
import AlertModal from "../AlertModal";
import { useEffect, useState } from "react";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon } from "lucide-react";


const Product = ({
  foodItem,
  getFoodItems,
  selectedSubCategoryId,
  categoryId,
}) => {
  const { name, price, isAvailable, veg } = foodItem;
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  console.log("foodItem", foodItem);

  const handleUpdate = () => {
    console.log(
      "in handleUpdate function",
      `/admin/restaurant/${params?.restaurantId}/${selectedSubCategoryId}/updateMenu`
    );
    
    navigate(
      `/admin/restaurant/${params?.restaurantId}/${selectedSubCategoryId}/updateMenu`,
      {
        state: {
          restaurantId: params?.restaurantId,
          subcategoryId: selectedSubCategoryId,
          categoryId,
          foodItem,
        },
      }
    );
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteMenuItem = () => {
    fetchData(
      `/admin/delete-menu-item/${params?.restaurantId}?menuItemId=${foodItem?.id}`
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      getFoodItems();
    }
  }, [res]);

  return (
    <div className="px-5 py-3 flex justify-between items-center group gap-2 border-b hover:bg-[#F7FAFF] cursor-pointer">
      <div className="flex gap-3 items-center">
        <img className="w-20 rounded" src={`${foodItem?.image}`} alt="item" />
        <div className="">
          {veg ? <VegIcon /> : <NonVegIcon />}
          {/* <EggIcon /> */}
          <h3 className="text-[#686868] text-base font-semibold font-inter mt-2">
            {name}
          </h3>
          <p className="class-base1">₹{price}</p>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <EditIcon className="hidden group-hover:block size-5" onClick={handleUpdate} />
        <BiTrash
          onClick={() => setIsAlertModalOpen(true)}
          className="text-[#E4626F] text-xl cursor-pointer hidden group-hover:block"
        />
      </div>

      {isAlertModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          header="Delete Menu Item"
          description="Are you sure you want to delete this menu item?"
          onConfirm={deleteMenuItem}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default Product;
