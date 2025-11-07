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
import { Star, Plus, ChevronDown, Search } from "lucide-react";

export default function MenuSection({ categories }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Items");

  console.log("categories", categories);
  

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-[#333333] dark:text-white leading-tight tracking-tight">
            Menu
          </h1>
          <p className="text-base font-normal text-[#6B7280] dark:text-gray-400">
            Manage your restaurant's menu items and categories.
          </p>
        </div>
        <Button
          variant="capsico"
          className="flex items-center gap-2 w-auto px-4"
        >
          <Plus size={18} />
          Add Item
        </Button>
      </header>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-grow min-w-[300px] max-w-lg">
          <div className="flex w-full h-12 rounded-lg border border-[#E5E7EB] dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-center px-3 text-[#6B7280] dark:text-gray-400 bg-white dark:bg-background-dark/50 border-r border-[#E5E7EB] dark:border-gray-700">
              <Search size={18} />
            </div>
            <Input
              placeholder="Search for a dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-full border-0 focus-visible:ring-0 focus-visible:outline-none placeholder:text-[#6B7280] dark:placeholder:text-gray-400 text-base"
            />
          </div>
        </div>

        {/* Tabs / Segmented Buttons */}
        <div className="flex h-10 items-center rounded-lg bg-[#F7F9FC] dark:bg-background-dark/80 p-1 border border-[#E5E7EB] dark:border-gray-700">
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
        </div>
      </div>

      {/* Categories Accordion */}
      <Accordion type="multiple" className="flex flex-col gap-4">
        {categories?.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.name}
            className="border border-[#E5E7EB] dark:border-gray-700 rounded-xl bg-white dark:bg-background-dark/50"
          >
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
                  <Switch
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
                    defaultChecked
                  />
                </div>
                {/* <ChevronDown
                  size={20}
                  className="text-[#6B7280] dark:text-gray-400 transition-transform data-[state=open]:rotate-180"
                /> */}
              </div>
            </AccordionTrigger>

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
                  {category?.foodItems?.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-background-dark/80 ${
                        !item.isAvailable ? "opacity-60" : ""
                      }`}
                    >
                      {/* Item Image */}
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 flex-shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>

                      {/* Item Details */}
                      <div className="flex-grow">
                        <p className="font-bold text-[#333333] dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-[#6B7280] dark:text-gray-400">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center gap-2 ${
                            item.isRecommended
                              ? "bg-primary/10 text-primary"
                              : "text-[#6B7280] hover:text-primary hover:bg-primary/10"
                          }`}
                        >
                          <Star
                            size={16}
                            className={item.isRecommended ? "fill-current" : ""}
                          />
                          {item.isRecommended ? "Recommended" : "Recommend"}
                        </Button>
                        <Switch
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
                          defaultChecked={item.isAvailable}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
