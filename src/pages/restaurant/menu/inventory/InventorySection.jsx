import Spinner from "@/components/Spinner";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Category from "../Category";

const InventorySection = ({ categories = [], getData, isLoading }) => {
  const navigate = useNavigate();

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
              Manage Inventory
            </h1>
          </button>
          {/* <p className="text-base font-normal text-[#6B7280] dark:text-gray-400">
            Manage your restaurant&apos;s menu items and categories.
          </p> */}
        </div>
      </header>

      {!isLoading && categories.length === 0 && (
        <div className="flex justify-center text-muted-foreground">
          No menu found. Create menu by adding food items, category.
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center text-muted-foreground mt-40">
          <div>
            <Spinner /> Loading inventory...
          </div>
        </div>
      )}

      {/* Categories Accordion */}
      {!isLoading && (
        <Accordion type="multiple" className="flex flex-col gap-4">
          {categories?.map((category) => (
            <Category
              key={category.id}
              category={category}
              getCategories={getData}
              showActions={false}
            />
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default InventorySection;
