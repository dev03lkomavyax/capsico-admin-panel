import AlertModal from "@/components/AlertModal";
import NonVegIcon from "@/components/customIcons/NonVegIcon";
import VegIcon from "@/components/customIcons/VegIcon";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import { EditIcon, ImageOffIcon, Star, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SoldOutDurationHoursModal from "./SoldOutDurationHoursModal";

const Food = ({ item, getCategories }) => {
  const [isOn, setIsOn] = useState(item.isAvailable);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isRecommended, setIsRecommended] = useState(item.isRecommended);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { res, fetchData, isLoading } = usePostApiReq();
  const navigate = useNavigate();
  const params = useParams();

  // useEffect(() => {
  //   if(!isOn){
  //     toast.error("This item is currently unavailable");
  //   }
  // }, [isOn]);

  const {
    res: deleteRes,
    fetchData: deleteItem,
    isLoading: isDeleteItemLoading,
  } = useDeleteApiReq();

  const deleteMenuItem = () => {
    deleteItem(
      `/admin/delete-menu-item/${params?.restaurantId}?menuItemId=${item?.id}`
    );
  };

  useEffect(() => {
    if (deleteRes?.status === 200 || deleteRes?.status === 201) {
      getCategories();
      setIsAlertModalOpen(false);
    }
  }, [deleteRes]);

  const {
    res: recommendRes,
    fetchData: recommend,
    isLoading: isDeleteRecommendLoading,
  } = useGetApiReq();

  const handleRecommend = () => {
    setIsRecommended((prev) => !prev);
    recommend(
      `/restaurant/toggle-recommend/${item?.id}?restaurantId=${params?.restaurantId}`
    );
  };

  useEffect(() => {
    if (recommendRes?.status === 200 || recommendRes?.status === 201) {
      getCategories();
    }
  }, [recommendRes]);

  const toggleFoodAvailability = (value) => {
    console.log("value: ", value);
    if (!value) {
      setIsModalOpen(true);
      return
    }
    setIsOn(value);
    fetchData(
      `/admin/food-availability/${item?.id}?restaurantId=${params?.restaurantId}`,
      { isAvailable : value }
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("toggleFoodAvailability res", res);
      setIsOn(res?.data?.data?.isAvailable);
    }
  }, [res]);

  const handleUpdate = () => {
    navigate(`/admin/restaurant/${params?.restaurantId}/updateMenu`, {
      state: {
        restaurantId: params?.restaurantId,
        foodItem: item,
      },
    });
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-background-dark/80 ${
        !isOn ? "opacity-60" : ""
      }`}
    >
      {/* Item Image */}
      {item.image ? (
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 flex-shrink-0"
          style={{ backgroundImage: `url(${item.image})` }}
        ></div>
      ) : (
        <div className="size-16 bg-muted-foreground/30 aspect-square rounded-lg flex items-center justify-center">
          <ImageOffIcon />
        </div>
      )}

      {/* Item Details */}
      <div className="flex-grow">
        {item?.veg ? <VegIcon /> : <NonVegIcon />}
        <p className="font-bold text-[#333333] dark:text-white">{item.name}</p>
        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          ₹{item.price.toFixed(2)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {item.soldOutDurationHours ? <p className="text-sm">Will come in stock after {item?.soldOutDurationHours} hours</p>:null}
        {/* {isRecommended && ( */}
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-2 ${
            isRecommended
              ? "bg-primary/10 text-primary"
              : "text-[#6B7280] hover:text-primary hover:bg-primary/10"
          }`}
          onClick={handleRecommend}
          disabled={isDeleteRecommendLoading}
        >
          <Star size={16} className={isRecommended ? "fill-current" : ""} />
          {isRecommended ? "Recommended" : "Recommend"}
        </Button>
        {/* )} */}

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsAlertModalOpen(true)}
                className="size-8"
              >
                <TrashIcon className="text-destructive size-4 cursor-pointer" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete menu item</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                size="icon"
                variant="outline"
                onClick={handleUpdate}
                className="size-8"
              >
                <EditIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Update menu item</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <div>
          <span className="text-muted-foreground text-sm">
            If not sure send "0"
          </span> */}
        {/* <div className="flex gap-2 items-center px-3 py-1 border rounded-3xl"> */}
        {/* <Input
              className="w-16 h-9"
              type="number"
              value={soldOutDurationHours}
              min={0}
              placeholder="Hours"
              onChange={(e) => setSoldOutDurationHours(e.target.value)}
            /> */}
        <Switch
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
          checked={isOn}
          onCheckedChange={(value) => toggleFoodAvailability(value)}
        />
        {/* </div> */}
        {/* </div> */}
      </div>

      {isAlertModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          header="Delete Menu Item"
          description="Are you sure you want to delete this menu item?"
          onConfirm={deleteMenuItem}
          disabled={isDeleteItemLoading}
        />
      )}

      {isModalOpen && (
        <SoldOutDurationHoursModal
          isModal={isModalOpen}
          setIsModal={setIsModalOpen}
          isOn={isOn}
          itemId={item?.id}
          getCategories={getCategories}
        />
      )}
    </div>
  );
};

export default Food;
