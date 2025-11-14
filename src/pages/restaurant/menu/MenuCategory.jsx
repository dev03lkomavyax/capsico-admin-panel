import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Star,
  Plus,
  ChevronDown,
  Search,
  Edit2Icon,
  DeleteIcon,
  EditIcon,
  TrashIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Food from "./Food";
import SubCategoryEditModel from "@/components/menu/SubCategoryEditModel";
import CategoryEditModel from "@/components/menu/CategoryEditModel";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Spinner from "@/components/Spinner";
import Category from "./Category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCategoryModal from "@/components/menu/EditCategoryModal";
import EditSubCategoryModal from "@/components/menu/EditSubCategoryModal";

export default function MenuSection({ categories = [], getData, isLoading }) {
  const [isOpenCategoryModel, setIsOpenCategoryModel] = useState(false);
  const [isOpenSubCategoryModel, setIsOpenSubCategoryModel] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isEditSubCategoryModalOpen, setIsEditSubCategoryModalOpen] =
    useState(false);

  const navigate = useNavigate();
  const params = useParams();

  console.log("categories", categories);

  const handleAdd = () => {
    navigate(`/admin/restaurant/${params?.restaurantId}/addmenu`, {
      state: {
        restaurantId: params?.restaurantId,
      },
    });
  };

  const handleCategoryAdd = () => {
    setIsOpenCategoryModel((prev) => !prev);
  };

  const handleSubcategoryAdd = () => {
    setIsOpenSubCategoryModel((prev) => !prev);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex justify-start items-center"
          >
            <MdKeyboardArrowLeft className="text-[#000000] text-3xl" />

            <h1 className="text-3xl font-black text-[#333333] dark:text-white leading-tight tracking-tight">
              Menu
            </h1>
          </button>
          <p className="text-base font-normal text-[#6B7280] dark:text-gray-400">
            Manage your restaurant&apos;s menu items and categories.
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            variant="capsico"
            className="flex items-center gap-2 w-auto px-4"
            onClick={handleAdd}
          >
            <Plus size={18} />
            Add Item
          </Button>
          <Button
            variant="capsico"
            className="flex items-center gap-2 w-auto px-4"
            onClick={handleCategoryAdd}
          >
            <Plus size={18} />
            Add Category
          </Button>
          <Button
            variant="capsico"
            className="flex items-center gap-2 w-auto px-4"
            onClick={handleSubcategoryAdd}
          >
            <Plus size={18} />
            Add Sub Category
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="size-10 p-0">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsEditCategoryModalOpen(true)}
              >
                Edit Category
              </DropdownMenuItem>
              <DropdownMenuItem>Delete Category</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsEditSubCategoryModalOpen(true)}
              >
                Edit Subcategory
              </DropdownMenuItem>
              <DropdownMenuItem>Delete Subcategory</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-grow min-w-[300px] max-w-lg">
          {/* <div className="flex w-full h-12 rounded-lg border border-[#E5E7EB] dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-center px-3 text-[#6B7280] dark:text-gray-400 bg-white dark:bg-background-dark/50 border-r border-[#E5E7EB] dark:border-gray-700">
              <Search size={18} />
            </div>
            <Input
              placeholder="Search for a dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-full border-0 focus-visible:ring-0 focus-visible:outline-none placeholder:text-[#6B7280] dark:placeholder:text-gray-400 text-base"
            />
          </div> */}
        </div>

        {/* Tabs / Segmented Buttons */}
        {/* <div className="flex h-10 items-center rounded-lg bg-[#F7F9FC] dark:bg-background-dark/80 p-1 border border-[#E5E7EB] dark:border-gray-700">
          {["All Items", "Out of Stock"].map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-4 h-full rounded-md text-sm font-medium ${
                filter === label
                  ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                  : "text-[#6B7280] dark:text-gray-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div> */}
      </div>

      {!isLoading && categories.length === 0 && (
        <div className="flex justify-center text-muted-foreground">
          No menu found. Create menu by adding food items, category.
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center text-muted-foreground mt-40">
          <div>
            <Spinner /> Loading menu...
          </div>
        </div>
      )}

      {/* Categories Accordion */}
      <Accordion type="multiple" className="flex flex-col gap-4">
        {categories?.map((category) => (
          <Category
            key={category.id}
            category={category}
            getCategories={getData}
          />
        ))}
      </Accordion>

      {isOpenCategoryModel && (
        <CategoryEditModel
          isOpenCategoryModel={isOpenCategoryModel}
          setIsOpenCategoryModel={setIsOpenCategoryModel}
          getCategories={getData}
        />
      )}

      {isEditCategoryModalOpen && (
        <EditCategoryModal
          isOpenCategoryModel={isEditCategoryModalOpen}
          setIsOpenCategoryModel={setIsEditCategoryModalOpen}
          getDataFun={getData}
        />
      )}

      {isEditSubCategoryModalOpen && (
        <EditSubCategoryModal
          isOpenCategoryModel={isEditSubCategoryModalOpen}
          setIsOpenCategoryModel={setIsEditSubCategoryModalOpen}
          getDataFun={getData}
        />
      )}

      {isOpenSubCategoryModel && (
        <SubCategoryEditModel
          isOpenSubCategoryModel={isOpenSubCategoryModel}
          setIsOpenSubCategoryModel={setIsOpenSubCategoryModel}
          // categoryId={categoryId}
          getCategories={getData}
        />
      )}
    </div>
  );
}
