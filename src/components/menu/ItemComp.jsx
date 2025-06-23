import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
// import CategoryEditModel from '../models/CategoryEditModel'
// import SubCategoryEditModel from '../models/SubCategoryEditModel'
import { BiTrash } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import SubCategoryEditModel from "./SubCategoryEditModel";
import { cn } from "@/lib/utils";
import SubCategory from "./SubCategory";
import CategoryEditModel from "./CategoryEditModel";
import { useParams } from "react-router-dom";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import AlertModal from "../AlertModal";

const ItemComp = ({
  category,
  getCategories,
  categoryId,
  setCategoryId = () => {},
}) => {
  const { name, id, subcategories, itemCount } = category;

  const [isOpenb, setIsOpenb] = useState(false);

  const [isOpenCategoryModel, setIsOpenCategoryModel] = useState(false);
  const [isOpenSubCategoryModel, setIsOpenSubCategoryModel] = useState(false);

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const params = useParams();

  const handleCategoryEdit = (e) => {
    e.stopPropagation();
    setIsOpenCategoryModel(true);
  };

  const handleCategoryDelete = (e) => {
    e.stopPropagation();
    setIsAlertModalOpen(true);
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteCategoroy = () => {
    fetchData(
      `/admin/delete-category/${params?.restaurantId}?categoryId=${id}`
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      getCategories();
      setCategoryId("");
    }
  }, [res, getCategories]);

  const haddleSubCategory = () => {
    setIsOpenSubCategoryModel(true);
  };

  const handleClick = () => {
    setIsOpenb(!isOpenb);
    setCategoryId(id);
  };

  const handleSubcategoryClick = (value) => {
    // setIsOpenb(!isOpenb);
    setCategoryId(value);
  };

  return (
    <div>
      {/* #F2F4F7 */}
      <div
        onClick={handleClick}
        className={`w-full flex items-center hover:bg-[#e6edfb] justify-between border-b-2 p-5 py-3 group cursor-pointer ${
          categoryId === category?.id && "bg-[#e6edfb]"
        }`}
      >
        <h3 className="text-[#000000] font-medium font-inter">
          {name} ({itemCount})
        </h3>
        <div className="flex items-center gap-8">
          <div className="hidden group-hover:flex gap-4">
            <FiEdit2
              onClick={handleCategoryEdit}
              className="seven-color text-lg cursor-pointer"
            />
            <BiTrash
              onClick={handleCategoryDelete}
              className="text-[#E4626F] text-xl cursor-pointer"
            />
          </div>
          <IoIosArrowDown
            className={`seven-color text-xl cursor-pointer transform transition-transform duration-200 ${
              isOpenb && "rotate-180 duration-200"
            }`}
          />
        </div>
      </div>

      {isOpenb && (
        <div className="flex flex-col">
          {subcategories?.map((subcategory) => {
            return (
              <SubCategory
                key={subcategory.id}
                categoryId={categoryId}
                subcategory={subcategory}
                handleSubcategoryClick={handleSubcategoryClick}
                getCategories={getCategories}
              />
            );
          })}

          <button
            className="flex w-full items-center gap-3 px-5 py-3 pl-10 border-b"
            onClick={haddleSubCategory}
          >
            <FiPlusCircle className="primary-color text-lg" />
            <span className="class-base1 primary-color">Add SubCategory</span>
          </button>
        </div>
      )}

      {isOpenCategoryModel && (
        <CategoryEditModel
          isOpenCategoryModel={isOpenCategoryModel}
          setIsOpenCategoryModel={setIsOpenCategoryModel}
          getCategories={getCategories}
          category={category}
        />
      )}

      {isOpenSubCategoryModel && (
        <SubCategoryEditModel
          id={id}
          isOpenSubCategoryModel={isOpenSubCategoryModel}
          setIsOpenSubCategoryModel={setIsOpenSubCategoryModel}
          getCategories={getCategories}
        />
      )}

      {isAlertModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          header="Delete Category"
          description="Are you sure you want to delete this category?"
          onConfirm={deleteCategoroy}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default ItemComp;
