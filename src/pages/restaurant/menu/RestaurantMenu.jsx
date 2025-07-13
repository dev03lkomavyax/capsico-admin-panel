import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import AddOnGroups from "@/components/menu/AddOnGroups";
import CategoryEditModel from "@/components/menu/CategoryEditModel";
import ItemComp from "@/components/menu/ItemComp";
import ManageInventory from "@/components/menu/ManageInventory";
import Product from "@/components/menu/Product";
import SubCategoryEditModel from "@/components/menu/SubCategoryEditModel";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaArrowRight, FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

function RestaurantMenu() {
  const navigate = useNavigate();
  const [isActiveTab, setIsActiveTab] = useState("editor");
  const [isOpenCategoryModel, setIsOpenCategoryModel] = useState(false);
  const [isOpenSubCategoryModel, setIsOpenSubCategoryModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddonGroupsModalOpen, setIsAddonGroupsModalOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [foodItemsInfo, setFoodItemsInfo] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();
  const params = useParams();

  const getCategories = () => {
    fetchData(
      `/admin/get-categories/${params?.restaurantId}?searchQuery=${searchQuery}`
    );
  };

  useEffect(() => {
    getCategories();
  }, [searchQuery]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("get category res", res);
      setAllCategories(res?.data?.data);
    }
  }, [res]);

  const {
    res: foodItemRes,
    fetchData: fetchFoodItemData,
    isLoading: isFoodItemLoading,
  } = useGetApiReq();

  const getFoodItems = () => {
    fetchFoodItemData(
      `/admin/category/${categoryId}/food?restaurantId=${params?.restaurantId}`
    );
  };

  useEffect(() => {
    categoryId && getFoodItems();
  }, [categoryId]);

  useEffect(() => {
    if (foodItemRes?.status === 200 || foodItemRes?.status === 201) {
      console.log("get food items res", foodItemRes);
      // setFoodItems(res?.data?.data);
      const { categoryInfo, itemsByCategory, totalItems } =
        foodItemRes?.data?.data;

      setFoodItemsInfo({
        categoryInfo,
        totalItems,
        itemsByCategory: itemsByCategory[categoryInfo.name],
      });
    }
  }, [foodItemRes]);

  return (
    <AdminWrapper>
      <div className="w-full px-4">
        <div className="flex justify-start items-center gap-5 mt-5">
          <button
            onClick={() => setIsActiveTab("editor")}
            className={`${
              isActiveTab === "editor"
                ? "text-[#4A67FF] border-b-[#4A67FF]"
                : "text-[#000000] border-b-transparent"
            }  border-b-2 pb-4 px-5 text-xl font-semibold font-inter`}
          >
            Menu editor
          </button>
          <button
            onClick={() => setIsActiveTab("inventory")}
            className={`${
              isActiveTab === "inventory"
                ? "text-[#4A67FF] border-b-[#4A67FF]"
                : "text-[#000000] border-b-transparent"
            } border-b-2 pb-4 px-5 text-xl font-semibold font-inter`}
          >
            Manage inventory
          </button>
        </div>
        {isActiveTab === "editor" && (
          <>
            <div className="flex justify-start items-center -ml-4 mt-5">
              <BsSearch className="relative left-8 text-[#1D1929]" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[475px] bg-[#FFFFFF] pl-12 placeholder:text-[#1D1929] text-sm font-normal font-roboto"
              />
            </div>
            <div className="w-full rounded-lg overflow-hidden h-[500px] flex items-start border border-[#CED7DE] my-5">
              <div className="left-section relative w-1/3 h-full rounded-tl-lg bg-white border-r border-r-[#CED7DE]">
                <h3 className=" class-base5 p-5 bg-[#F2F4F7] border-b border-b-[#CED7DE]">
                  Categories
                </h3>
                <button
                  className="flex w-full items-center gap-3 px-5 py-4 border-b"
                  onClick={() => setIsOpenCategoryModel(true)}
                >
                  <FaPlus className="primary-color" />
                  <span className="class-base1 primary-color">
                    Add Category
                  </span>
                </button>
                <div className="overflow-y-auto h-full pb-[180px]">
                  {allCategories?.map((category) => (
                    <ItemComp
                      key={category?.id}
                      categoryId={categoryId}
                      setCategoryId={setCategoryId}
                      category={category}
                      getCategories={getCategories}
                      show={true}
                    />
                  ))}

                  {allCategories.length === 0 && isLoading && <Spinner />}

                  {allCategories.length === 0 && !isLoading && (
                    <DataNotFound name="Categories" />
                  )}
                </div>
                <button
                  onClick={() => setIsAddonGroupsModalOpen(true)}
                  className="primary-color mt-auto bg-white shadow-3xl absolute bottom-0 flex w-full justify-between items-center left-0 p-4"
                >
                  Go to Add Ons
                  <FaArrowRight className="primary-color" />
                </button>
              </div>
              {categoryId && (
                <div className="right-section relative w-2/3 bg-white overflow-y-auto h-full">
                  <div className="sticky top-0 bg-white">
                    {foodItemsInfo && (
                      <h3 className=" class-base5 p-5 bg-[#F2F4F7] border-b border-b-[#CED7DE]">
                        {foodItemsInfo?.categoryInfo?.name} (
                        {foodItemsInfo?.totalItems})
                      </h3>
                    )}
                    <button
                      className="flex w-full items-center gap-3 p-5 border-b"
                      onClick={() =>
                        navigate(
                          `/admin/restaurant/${params?.restaurantId}/${categoryId}/addmenu`,
                          {
                            state: { restaurantId: params?.restaurantId },
                          }
                        )
                      }
                    >
                      <FaPlus className="primary-color" />
                      <span className="class-base1 primary-color">
                        Add New Item
                      </span>
                    </button>
                  </div>
                  <div className="">
                    {foodItemsInfo?.itemsByCategory?.map((foodItem, index) => (
                      <Product
                        key={index}
                        foodItem={foodItem}
                        getFoodItems={getFoodItems}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {isOpenCategoryModel && (
              <CategoryEditModel
                isOpenCategoryModel={isOpenCategoryModel}
                setIsOpenCategoryModel={setIsOpenCategoryModel}
                getCategories={getCategories}
              />
            )}

            {isOpenSubCategoryModel && (
              <SubCategoryEditModel
                isOpenSubCategoryModel={isOpenSubCategoryModel}
                setIsOpenSubCategoryModel={setIsOpenSubCategoryModel}
              />
            )}

            {isAddonGroupsModalOpen && (
              <AddOnGroups
                isAddonGroupsModalOpen={isAddonGroupsModalOpen}
                setIsAddonGroupsModalOpen={setIsAddonGroupsModalOpen}
              />
            )}
          </>
        )}

        {isActiveTab === "inventory" && (
          <ManageInventory
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allCategories={allCategories}
          />
        )}
      </div>
    </AdminWrapper>
  );
}

export default RestaurantMenu;
