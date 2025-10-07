import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import SubCategoryEditModel from "./SubCategoryEditModel";
import AlertModal from "../AlertModal";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { useParams } from "react-router-dom";

// const SubCategory = ({
//   subcategory,
//   handleSubcategoryClick,
//   categoryId,
//   getCategories,
// }) => {
//   const [isOpenSubCategoryModel, setIsOpenSubCategoryModel] = useState(false);
//   const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
//   const params = useParams();

//   const handleSubCategoryEdit = (e) => {
//     e.stopPropagation();
//     setIsOpenSubCategoryModel(true);
//   };

//   const handleSubCategoryDelete = (e) => {
//     e.stopPropagation();
//     setIsAlertModalOpen(true);
//   };

//   const { res, fetchData, isLoading } = useDeleteApiReq();

//   const deleteSubCategoroy = () => {
//     fetchData(
//       `/admin/delete-subCategory/${params?.restaurantId}?subCategoryId=${subcategory?.id}`
//     );
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       getCategories();
//       handleSubcategoryClick("");
//     }
//   }, [res]);

//   return (
//     <div
//       className={cn(
//         "w-full group flex items-center justify-between pl-9 pr-5 py-4 border-b-2 group hover:bg-[#F7FAFF]",
//         categoryId === subcategory?.id && "bg-[#e6edfb]"
//       )}
//     >
//       <h3
//         onClick={() =>
//           handleSubcategoryClick(subcategory?.id, subcategory?.isActive)
//         }
//         className={cn(
//           "text-[#000000] font-medium font-inter",
//           !subcategory?.isActive && "opacity-50",
//           subcategory?.isActive && "hover:text-blue-600 cursor-pointer"
//         )}
//       >
//         {subcategory.name} ({subcategory?.itemCount})
//       </h3>

//       <div className="hidden items-center gap-8 group-hover:flex">
//         <div className="hidden group-hover:flex gap-4">
//           <FiEdit2
//             onClick={handleSubCategoryEdit}
//             className="seven-color text-lg cursor-pointer"
//           />
//           <BiTrash
//             onClick={handleSubCategoryDelete}
//             className="text-[#E4626F] text-xl cursor-pointer"
//           />
//         </div>
//       </div>
//       {isOpenSubCategoryModel && (
//         <SubCategoryEditModel
//           subcategoryId={subcategory?.id}
//           isOpenSubCategoryModel={isOpenSubCategoryModel}
//           setIsOpenSubCategoryModel={setIsOpenSubCategoryModel}
//           getCategories={getCategories}
//           subCategory={subcategory}
//         />
//       )}

//       {isAlertModalOpen && (
//         <AlertModal
//           isAlertModalOpen={isAlertModalOpen}
//           setIsAlertModalOpen={setIsAlertModalOpen}
//           header="Delete Subcategory"
//           description="Are you sure you want to delete this subcategory?"
//           onConfirm={deleteSubCategoroy}
//           disabled={isLoading}
//         />
//       )}
//     </div>
//   );
// };

// export default SubCategory;

const SubCategory = ({
  subcategory,
  handleSubcategoryClick,
  categoryId,
  getCategories,
}) => {
  const [isOpenSubCategoryModel, setIsOpenSubCategoryModel] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
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

  const deleteSubCategory = () => {
    // Updated to use restaurant endpoint
    fetchData(
      `/restaurant/delete-subcategory/${params?.restaurantId}?subcategoryId=${subcategory?.id}`
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      getCategories();
      handleSubcategoryClick("");
    }
  }, [res]);

  const handleClick = () => {
    if (subcategory?.isActive) {
      setIsSelected(true);
      handleSubcategoryClick(subcategory?.id, subcategory?.isActive);
    }
  };

  return (
    <div
      className={cn(
        "w-full group flex items-center justify-between pl-9 pr-5 py-4 border-b-2 group hover:bg-[#F7FAFF]",
        isSelected && "bg-[#e6edfb]"
      )}
    >
      <h3
        onClick={handleClick}
        className={cn(
          "text-[#000000] font-medium font-inter",
          !subcategory?.isActive && "opacity-50",
          subcategory?.isActive && "hover:text-blue-600 cursor-pointer"
        )}
      >
        {subcategory.name} ({subcategory?.itemCount || 0})
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
          onConfirm={deleteSubCategory}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default SubCategory;
