import AlertModal from "@/components/AlertModal";
import CategoryEditModel from "@/components/menu/CategoryEditModel";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import usePutApiReq from "@/hooks/usePutApiReq";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategorySoldOutDurationHoursModal from "./CategorySoldOutDurationHoursModal";
import Food from "./Food";

const Category = ({ category, getCategories }) => {
  const [isOpenCategoryModel, setIsOpenCategoryModel] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isOn, setIsOn] = useState(!category?.isCategoryToggleSoldOut);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const { res, fetchData, isLoading } = usePutApiReq();

  const toggleFoodAvailability = (value) => {
    console.log("value: ", value);
    if (!value) {
      setIsModalOpen(true);
      return;
    }
    setIsOn(value);
    fetchData(
      `/restaurant/restaurants/${params?.restaurantId}/update-category/${
        category?.id || category?._id
      }`,
      { isCategoryToggleSoldOut: !value }
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("toggleFoodAvailability res", res);
      setIsOn(res?.data?.data?.isAvailable);
      getCategories();
    }
  }, [res]);

  const {
    res: deleteRes,
    fetchData: deleteItem,
    isLoading: isDeleteItemLoading,
  } = useDeleteApiReq();

  const deleteMenuItem = () => {
    deleteItem(
      `/restaurant/delete-category/${category?.id}?restaurantId=${params?.restaurantId}`
    );
  };

  useEffect(() => {
    if (deleteRes?.status === 200 || deleteRes?.status === 201) {
      getCategories();
      setIsAlertModalOpen(false);
    }
  }, [deleteRes]);

  return (
    <>
      <AccordionItem
        value={category.name}
        className="border border-[#E5E7EB] dark:border-gray-700 rounded-xl bg-white dark:bg-background-dark/50"
      >
        <div className="relative">
          <div className="absolute right-12 top-2.5 flex gap-1">
            <div className="flex gap-2 items-center">
              {category.soldOutDurationHours ? (
                <p className="text-xs mr-5">
                  Will come in stock after {category?.soldOutDurationHours}{" "}
                  hours
                </p>
              ) : null}
            </div>
            <Switch
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
              checked={isOn}
              onCheckedChange={(value) => toggleFoodAvailability(value)}
            />
            {/* <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setIsOpenCategoryModel(true)}
                    className="size-8"
                  >
                    <EditIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Update category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-8"
                  >
                    <TrashIcon className="text-destructive size-4 cursor-pointer" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete category</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </div>
          <AccordionTrigger className="flex items-center justify-between px-4 w-full py-3">
            <div className="flex items-center gap-4 flex-1">
              <p className="text-lg font-bold text-[#333333] dark:text-white">
                {category.name}
              </p>
              <span className="text-sm text-[#6B7280] dark:text-gray-400">
                ({category?.foodItems?.length} items)
              </span>
            </div>
            <div className="flex items-center gap-4 justify-end pr-3">
              <div className="flex items-center">
                {/* <span className="text-sm font-medium text-[#6B7280] dark:text-gray-400 mr-2">
                    In Stock (All)
                    </span> */}
                {/* <Switch
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
                    defaultChecked
                    /> */}
              </div>
              {/* <ChevronDown
                  size={20}
                  className="text-[#6B7280] dark:text-gray-400 transition-transform data-[state=open]:rotate-180"
                  /> */}
            </div>
          </AccordionTrigger>
          {/* test */}
        </div>

        <AccordionContent>
          {category?.foodItems?.length === 0 ? (
            <div className="p-6 text-center border-t border-[#E5E7EB] dark:border-gray-700">
              <p className="text-[#6B7280] dark:text-gray-400 text-sm">
                No {category.name.toLowerCase()} items have been added yet.
                Click “Add Item” to get started.
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#E5E7EB] dark:divide-gray-700">
              {category?.foodItems?.map((item, index) => (
                <Food key={index} item={item} getCategories={getCategories} />
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>

      {isOpenCategoryModel && (
        <CategoryEditModel
          isOpenCategoryModel={isOpenCategoryModel}
          setIsOpenCategoryModel={setIsOpenCategoryModel}
          getCategories={getCategories}
          category={category}
        />
      )}

      {isAlertModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          header="Delete Category"
          description="Are you sure you want to delete this category?"
          onConfirm={deleteMenuItem}
          disabled={isDeleteItemLoading}
        />
      )}

      {isModalOpen && (
        <CategorySoldOutDurationHoursModal
          isModal={isModalOpen}
          setIsModal={setIsModalOpen}
          isOn={isOn}
          categoryId={category?._id}
          getCategories={getCategories}
        />
      )}
    </>
  );
};

export default Category;
