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
import { FaPlus } from "react-icons/fa6";
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
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [foodItemsInfo, setFoodItemsInfo] = useState("");

  console.log("foodItemsInfo", foodItemsInfo);
  

  const { res, fetchData, isLoading } = useGetApiReq();
  const params = useParams();

 
const getCategories = () => {
  console.log("🔄 Fetching categories for restaurant:", params?.restaurantId);
  console.log("🔍 Search query:", searchQuery);
  
  const url = `/restaurant/get-categories?restaurantId=${params?.restaurantId}&searchQuery=${searchQuery}`;
  console.log("🔍 Full API URL:", url);
  
  fetchData(url);
};

  useEffect(() => {
    getCategories();
  }, [searchQuery]);

  // Enhanced debug logging
 useEffect(() => {
  console.log("📋 Categories API Response:", res);
  if (res?.status === 200 || res?.status === 201) {
    console.log("✅ Full response data:", res?.data);
    console.log("🔍 Response structure:", {
      success: res?.data?.success,
      message: res?.data?.message,
      dataKeys: Object.keys(res?.data?.data || {}),
      categoriesLength: res?.data?.data?.categories?.length,
      pagination: res?.data?.pagination
    });
    
    const categories = res?.data?.data?.categories || [];
    console.log("✅ Extracted categories:", categories);
    console.log("✅ Number of categories:", categories.length);
    
    // If empty, let's see if there are categories but in wrong format
    if (categories.length === 0) {
      console.log("⚠️ No categories found for restaurant:", params?.restaurantId);
      console.log("🔍 Full data object:", res?.data?.data);
    }
    
    setAllCategories(categories);
  }
}, [res]);

  // For fetching menu items by subcategory
  const {
    res: foodItemRes,
    fetchData: fetchFoodItemData,
    isLoading: isFoodItemLoading,
  } = useGetApiReq();

  const getFoodItems = () => {
    if (selectedSubCategoryId) {
      console.log(" Fetching menu items for subcategory:", selectedSubCategoryId);
      fetchFoodItemData(
        `/admin/category/${selectedSubCategoryId}/food?restaurantId=${params?.restaurantId}`
      );
    }
  };

  useEffect(() => {
    getFoodItems();
  }, [selectedSubCategoryId]);

  // useEffect(() => {
  //   getFoodItems();
  // }, []);

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

  // Handle subcategory click from ItemComp
  const handleSubcategoryClick = (subcategoryId, isActive) => {
    console.log("🔄 Subcategory clicked:", subcategoryId, "Active:", isActive);
    if (isActive) {
      setSelectedSubCategoryId(subcategoryId);
      // setCategoryId(subcategoryId);
    }
  };

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
                <h3 className="class-base5 p-5 bg-[#F2F4F7] border-b border-b-[#CED7DE]">
                  Categories
                </h3>
                
                <button
                  className="flex w-full items-center gap-3 px-5 py-4 border-b"
                  onClick={() => setIsOpenCategoryModel(true)}
                >
                  <FaPlus className="primary-color" />
                  <span className="class-base1 primary-color">Add Category</span>
                </button>
                
                <div className="overflow-y-auto h-full pb-[180px]">
                  {isLoading ? (
                    <div className="flex justify-center items-center p-8">
                      <Spinner />
                    </div>
                  ) : allCategories?.length > 0 ? (
                    allCategories.map((category) => (
                      <ItemComp
                        key={category?.id}
                        categoryId={categoryId}
                        setCategoryId={setCategoryId}
                        category={category}
                        getCategories={getCategories}
                        handleSubcategoryClick={handleSubcategoryClick}
                        show={true}
                      />
                    ))
                  ) : (
                    <DataNotFound name="Categories" />
                  )}
                </div>
              </div>

              {selectedSubCategoryId && (
                <div className="right-section relative w-2/3 bg-white overflow-y-auto h-full">
                  <div className="sticky top-0 bg-white">
                    {foodItemsInfo && (
                      <h3 className="class-base5 p-5 bg-[#F2F4F7] border-b border-b-[#CED7DE]">
                        {foodItemsInfo?.categoryInfo?.name} ({foodItemsInfo?.totalItems})
                      </h3>
                    )}
                    
                    <button
                      className="flex w-full items-center gap-3 p-5 border-b"
                      onClick={() =>
                        navigate(
                          `/admin/restaurant/${params?.restaurantId}/${selectedSubCategoryId}/addmenu`,
                          {
                            state: { 
                              restaurantId: params?.restaurantId,
                              subcategoryId: selectedSubCategoryId,
                              categoryId: foodItemsInfo?.categoryInfo?.parentCategoryId 
                            },
                          }
                        )
                      }
                    >
                      <FaPlus className="primary-color" />
                      <span className="class-base1 primary-color">Add New Item</span>
                    </button>
                  </div>
                  
                  <div className="">
                    {isFoodItemLoading ? (
                      <div className="flex justify-center items-center p-8">
                        <Spinner />
                      </div>
                    ) : foodItemsInfo?.itemsByCategory?.length > 0 ? (
                      foodItemsInfo.itemsByCategory.map((foodItem, index) => (
                        <Product
                          key={foodItem.id || index}
                          foodItem={foodItem}
                          getFoodItems={getFoodItems}
                        />
                      ))
                    ) : (
                      <DataNotFound name="Items" />
                    )}
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
                categoryId={categoryId}
                getCategories={getCategories}
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
