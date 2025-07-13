import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import SubCategoryEditModel from "./SubCategoryEditModel";
import AlertModal from "../AlertModal";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { useParams } from "react-router-dom";

const SubCategory = ({
  subcategory,
  handleSubcategoryClick,
  categoryId,
  getCategories,
}) => {
  const [isOpenSubCategoryModel, setIsOpenSubCategoryModel] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const params = useParams();

  const handleSubCategoryEdit = (e) => {
    e.stopPropagation();
    setIsOpenSubCategoryModel(true);
  };

  const handleSubCategoryDelete = (e) => {
    e.stopPropagation();
    setIsAlertModalOpen(true);
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteSubCategoroy = () => {
    fetchData(
      `/admin/delete-subCategory/${params?.restaurantId}?subCategoryId=${subcategory?.id}`
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      getCategories();
      handleSubcategoryClick("");
    }
  }, [res]);

  return (
    <div
      onClick={() => handleSubcategoryClick(subcategory?.id)}
      key={subcategory.id}
      className={cn(
        "w-full group cursor-pointer flex items-center justify-between pl-9 pr-5 py-4 border-b-2 group hover:bg-[#F7FAFF]",
        categoryId === subcategory?.id && "bg-[#e6edfb]"
      )}
    >
      <h3 className="seven-color class-base1">
        {subcategory.name} ({subcategory?.itemCount})
      </h3>

      <div className="hidden items-center gap-8 group-hover:flex">
        <div className="hidden group-hover:flex gap-4">
          <FiEdit2
            onClick={handleSubCategoryEdit}
            className="seven-color text-lg cursor-pointer"
          />
          <BiTrash
            onClick={handleSubCategoryDelete}
            className="text-[#E4626F] text-xl cursor-pointer"
          />
        </div>
      </div>
      {isOpenSubCategoryModel && (
        <SubCategoryEditModel
          subcategoryId={subcategory?.id}
          isOpenSubCategoryModel={isOpenSubCategoryModel}
          setIsOpenSubCategoryModel={setIsOpenSubCategoryModel}
          getCategories={getCategories}
          subCategory={subcategory}
        />
      )}

      {isAlertModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          header="Delete Subcategory"
          description="Are you sure you want to delete this subcategory?"
          onConfirm={deleteSubCategoroy}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default SubCategory;
