import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiPlus, FiUpload } from "react-icons/fi";
import Variants from "@/components/restaurant/Variants";
import ServingInfo from "@/components/restaurant/ServingInfo";
import MapAddOn from "@/components/restaurant/MapAddOn";
import AdditionalDetails from "@/components/restaurant/AdditionalDetails";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import useGetApiReq from "@/hooks/useGetApiReq";
import { updateMultiplePreview } from "@/utils/updatePreview";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addItemSchema } from "@/schema/restaurantSchema";
import { Label } from "@/components/ui/label";
import usePostApiReq from "@/hooks/usePostApiReq";
import CreateVariantModel from "@/components/menu/CreateVariantModel";
import MapAddOnModel from "@/components/menu/MapAddOnModel";
import AddCustomizationModal from "@/components/menu/AddCustomizationModal";
import AddCustomizationCategoryModal from "@/components/menu/AddCustomizationCategoryModal";
import VegIcon from "@/components/customIcons/VegIcon";
import NonVegIcon from "@/components/customIcons/NonVegIcon";
import EggIcon from "@/components/customIcons/EggIcon";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import DataNotFound from "@/components/DataNotFound";
import AvailabilityForFoodItem from "@/components/menu/AvailabilityForFoodItem";
import MenuTagSelector from "./menuTagSelector";



const UpdateMenu = () => {
  const navigate = useNavigate();
  const [isItemImageUploadModalOpen, setIsItemImageUploadModalOpen] =
    useState(false);
  const [isVariant, setIsVariant] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isMapAddons, setIsMapAddons] = useState(false);
  const [isMapAddonsModalOpen, setIsMapAddonsModalOpen] = useState(false);
  const [isAdditionalDetails, setIsAdditionalDetails] = useState(false);
  const [isServingInfo, setIsServingInfo] = useState(false);
  const [isCustomization, setIsCustomization] = useState(false);
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] =
    useState(false);
  const [isCreateVariantModalOpen, setIsCreateVariantModalOpen] =
    useState(false);
  const [isAddCustomizationModalOpen, setIsAddCustomizationModalOpen] =
    useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [availabilityForFoodItem, setAvailabilityForFoodItem] = useState(false);

  // Enhanced state management for tags and addons
  const [availableTags, setAvailableTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [addons, setAddons] = useState([]);
  const [addonGroups, setAddonGroups] = useState([]);
  const [menuTags, setMenuTags] = useState([]);
  const [isTagsLoading, setIsTagsLoading] = useState(false);
  const [showAddonForm, setShowAddonForm] = useState(false);
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: "",
    isAvailable: true,
    isVeg: true,
    isDefault: false,
    tags: [],
  });

  const params = useParams();
  const { state } = useLocation();

  console.log("state", state);
  const foodItem = state.foodItem;
  

  const form = useForm({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      subCategory: foodItem.subcategoryId || "",
      itemName: foodItem.name || "",
      itemDescription: foodItem.description || "",
      packagingCharges: foodItem.preparationTime || "",
      basePrice: foodItem.price || "",
      itemImage: "",
      itemImagePreview: "",
      cuisine: "",
      foodType: "",
      numberOfPeople: "",
      dishSize: "",
      preparationTime: "",
      restaurant: "",
      tags: [],
      variations: [],
      addOns: [],
      customizations: [],
      timingType: "sameAsRestaurant",
      openingTime: "",
      closingTime: "",
      days: [],
    },
  });

  const { register, control, watch, setValue, getValues } = form;
//   console.log("getValues", getValues());

  // useEffect(() => {
  //   setValue("subCategory", state.subcategoryId);
  // }, [state.subcategoryId]);
  const subCategory = watch("subCategory");

  useEffect(() => {
    if (subCategory) {
      navigate(
        `/admin/restaurant/${params?.restaurantId}/${subCategory}/updateMenu`,
        {
          state: {
            restaurantId: params?.restaurantId,
            subcategoryId: subCategory,
            categoryId: state.categoryId,
            foodItem: state.foodItem,
          },
        }
      );
    }
  }, [subCategory]);
  
  

  const restaurantRef = register("restaurant");
  const itemImageRef = register("itemImage");
  const restaurant = watch("restaurant");
  const itemImage = watch("itemImage");
  const [subCategories, setSubCategories] = useState([]);

  const {
    res: subcategoriesRes,
    fetchData: getSubcategories,
    isLoading: isSubcategoriesLoading,
  } = useGetApiReq();

  const getSubcategoriesFun = () => {
    getSubcategories(
      `/restaurant/${params?.restaurantId}/getSubCatByCat/${state?.categoryId}`
    );
  };

  useEffect(() => {
    getSubcategoriesFun();
  }, [state?.categoryId]);

  useEffect(() => {
    if (subcategoriesRes?.status === 200 || subcategoriesRes?.status === 201) {
      console.log("subcategoriesRes", subcategoriesRes);
      setSubCategories(subcategoriesRes?.data?.data?.subcategories);
    }
  }, [subcategoriesRes]);

  // Enhanced Tag fetching
  const fetchAllTags = async () => {
    try {
      setIsTagsLoading(true);
      console.log("🔄 Fetching all tags...");

      const [menuTagsRes, addonTagsRes] = await Promise.all([
        fetch("/capsicoTag/for-menu", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch("/capsicoTag/for-addon", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      const [menuTagsData, addonTagsData] = await Promise.all([
        menuTagsRes.json(),
        addonTagsRes.json(),
      ]);

      console.log("📋 Menu tags response:", menuTagsData);
      console.log("📋 Addon tags response:", addonTagsData);

      const menuTags = menuTagsData.data || [];
      const addonTags = addonTagsData.data || [];

      setAvailableTags(Array.isArray(addonTags) ? addonTags : []);

      const combinedTags = [
        ...(Array.isArray(menuTags) ? menuTags : []),
        ...(Array.isArray(addonTags) ? addonTags : []),
      ];

      setAllTags(combinedTags);
    } catch (error) {
      console.error("❌ Error fetching tags:", error);
    } finally {
      setIsTagsLoading(false);
    }
  };

  const handleMenuTagsChange = (tags) => {
    setMenuTags(tags);
    setValue("tags", tags);
  };

  const handleTagsChange = (selectedTagIdsOrObjs = []) => {
    const tagObjects = selectedTagIdsOrObjs.map((t) => {
      if (t && typeof t === "object" && t.id) {
        const flatId = typeof t.id === "object" ? t.id.id : t.id;
        return { id: flatId, name: t.name, color: t.color };
      }
      const tagId = String(t);
      const found =
        availableTags.find((x) => (x.id || x._id)?.toString() === tagId) ||
        allTags.find((x) => (x.id || x._id)?.toString() === tagId);
      return found
        ? {
            id: found.id || found._id,
            name: found.displayName || found.name,
            color: found.color,
          }
        : { id: tagId, name: "Tag" };
    });
    setNewAddon((prev) => ({ ...prev, tags: tagObjects }));
  };

  const handleInputChange = (field, value) => {
    setNewAddon((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAddon = () => {
    if (!newAddon.name.trim() || !newAddon.price) {
      alert("Please fill in addon name and price");
      return;
    }

    const addon = {
      id: Date.now().toString(),
      name: newAddon.name.trim(),
      price: parseFloat(newAddon.price),
      isAvailable: newAddon.isAvailable,
      isVeg: newAddon.isVeg,
      tags: newAddon.tags,
      isDefault: newAddon.isDefault,
    };

    const updatedAddons = [...addons, addon];
    setAddons(updatedAddons);
    setValue("addOns", updatedAddons);

    setNewAddon({
      name: "",
      price: "",
      isAvailable: true,
      isVeg: true,
      isDefault: false,
      tags: [],
    });
    setShowAddonForm(false);
  };

  const handleRemoveAddon = (addonId) => {
    const updatedAddons = addons.filter((addon) => addon.id !== addonId);
    setAddons(updatedAddons);
    setValue("addOns", updatedAddons);
  };

  const getTagName = (tagData) => {
    if (tagData && typeof tagData === "object") return tagData.name || "Tag";
    const tagId = String(tagData);
    const found =
      availableTags.find((t) => t.id?.toString() === tagId) ||
      allTags.find((t) => t.id?.toString() === tagId);
    return found ? found.name || found.displayName : "Tag";
  };

  const getTagColor = (tagData) => {
    let tagId = null;
    if (tagData && typeof tagData === "object") {
      tagId = typeof tagData.id === "object" ? tagData.id.id : tagData.id;
    } else {
      tagId = String(tagData);
    }

    const found =
      availableTags.find(
        (t) => (t.id || t._id)?.toString() === String(tagId)
      ) || allTags.find((t) => (t.id || t._id)?.toString() === String(tagId));

    return found?.color || "#6b7280";
  };

  const displayExistingAddons = () => {
    const existingAddons = getValues("addOns") || [];

    if (!Array.isArray(existingAddons) || existingAddons.length === 0) {
      return null;
    }

    return (
      <div className="mb-6">
        <h4 className="font-inter text-[#969696] font-semibold mb-3">
          Existing Addons:
        </h4>
        <div className="space-y-3">
          {existingAddons.map((addon, index) => (
            <div
              key={addon.id || addon._id || index}
              className="bg-gray-50 p-4 rounded-lg border"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-lg">{addon.name}</h5>
                    <span className="text-lg font-bold text-green-600">
                      ₹{addon.price}
                    </span>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          addon.isVeg
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {addon.isVeg ? "Veg" : "Non-Veg"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          addon.isAvailable
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {addon.isAvailable ? "Available" : "Unavailable"}
                      </span>
                      {addon.isDefault && (
                        <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  {addon.tags &&
                    Array.isArray(addon.tags) &&
                    addon.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {addon.tags.map((tagData, tagIndex) => {
                          const tagName = getTagName(tagData);
                          const tagColor = getTagColor(tagData);
                          const tagId =
                            typeof tagData === "object" ? tagData.id : tagData;

                          return (
                            <span
                              key={tagId || tagIndex}
                              style={{ backgroundColor: tagColor }}
                              className="text-white px-2 py-1 rounded-full text-xs font-medium"
                              title={`Tag: ${tagName} (ID: ${tagId})`}
                            >
                              {tagName}
                            </span>
                          );
                        })}
                      </div>
                    )}
                </div>

                <button
                  onClick={() => handleRemoveAddon(addon.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    updateMultiplePreview(restaurant, "restaurantPreview", setValue);
    updateMultiplePreview(itemImage, "itemImagePreview", setValue);
  }, [form, restaurant, itemImage, setValue]);

  useEffect(() => {
    if (isMapAddons) {
      fetchAllTags();
      const existingAddons = getValues("addOns") || [];
      setAddons(existingAddons);
    }
  }, [isMapAddons, getValues]);

  const handleCustomization = (index) => {
    setCurrentIndex(index);
    setIsAddCustomizationModalOpen(true);
  };

  const { res, fetchData, isLoading } = useGetApiReq();

  const getCuisines = () => {
    fetchData("/admin/get-cuisines");
  };

  useEffect(() => {
    getCuisines();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("get cuisines res", res);
      setCuisines(res?.data?.data?.cuisines);
    }
  }, [res]);

  const {
    res: addItemRes,
    fetchData: fetchAddItemData,
    isLoading: isAddItemLoading,
  } = usePostApiReq();

  // Updated onSubmit with latest API implementation
  const onSubmit = (data) => {
    console.log("🚀 Starting form submission...");
    console.log("📋 Form data:", data);
    console.log("🏪 Restaurant ID:", state?.restaurantId);
    console.log("📂 Subcategory ID:", state?.subcategoryId);
    console.log("📂 Category ID:", state?.categoryId);

    const availableTimings = {
      sameAsRestaurant: data.timingType === "sameAsRestaurant",
      start: data.openingTime,
      end: data.closingTime,
      days: data.days,
    };

    const modifiedCustomizations = getValues("customizations")?.map(
      (customization) => {
        return {
          name: customization.categoryName,
          type: customization.customizationType,
          options: customization.customizationOptions,
        };
      }
    );

    // Enhanced addons with tags
    const modifiedAddOns = getValues("addOns")?.map((addon) => {
      return {
        id: addon.id,
        name: addon.name,
        price: addon.price,
        isAvailable: addon.isAvailable,
        isVeg: addon.isVeg,
        tags: addon.tags || [],
        isDefault: addon.isDefault,
      };
    });

    console.log("📦 Prepared data:", {
      availableTimings,
      modifiedCustomizations: modifiedCustomizations?.length || 0,
      modifiedAddOns: modifiedAddOns?.length || 0,
      menuTags: menuTags?.length || 0,
      subcategoryId: state?.subcategoryId,
      categoryId: state?.categoryId,
    });

    // Create FormData for restaurant endpoint
    const formData = new FormData();
    formData.append("name", data.itemName);
    formData.append("description", data.itemDescription);
    formData.append("price", data.basePrice);
    formData.append("FoodType", data.foodType);
    formData.append("cuisine", data.cuisine);
    formData.append("preparationTime", data.preparationTime);

    // Use subcategoryId for the new API structure
    formData.append(
      "subcategoryId",
      state?.subcategoryId || params?.subcategoryId
    );
    formData.append("categoryId", state?.categoryId || params?.categoryId);

    formData.append("availableTimings", JSON.stringify(availableTimings));
    formData.append("tags", JSON.stringify(menuTags));
    formData.append("variations", JSON.stringify(getValues("variations")));
    formData.append("addOns", JSON.stringify(modifiedAddOns));
    formData.append("customizations", JSON.stringify(modifiedCustomizations));

    // Add images with field name "images" (matching multer config)
    Array.from(data.itemImage).forEach((image) => {
      formData.append("images", image);
    });

    console.log("📦 FormData created, making API call...");

    // Use restaurant endpoint for adding menu items
    fetchAddItemData(
      `/restaurant/add-menu-item/${state?.restaurantId}`,
      formData
    );
  };

  useEffect(() => {
    if (addItemRes?.status === 200 || addItemRes?.status === 201) {
      console.log("✅ Menu item added successfully:", addItemRes);
      navigate(`/admin/restaurant/${state?.restaurantId}/menu`);
    } else if (addItemRes?.status === 403) {
      console.error("❌ 403 Forbidden - Authentication failed");
      alert("Access denied. Please check your login status.");
    } else if (addItemRes?.status === 401) {
      console.error("❌ 401 Unauthorized - Token expired");
      alert("Session expired. Please log in again.");
    } else if (addItemRes?.status && addItemRes.status >= 400) {
      console.error("❌ API Error:", addItemRes);
      alert(`Error: ${addItemRes?.data?.message || "Failed to add menu item"}`);
    }
  }, [addItemRes]);

  return (
    <AdminWrapper>
      <section className="px-0 py-0 w-full h-full min-h-screen">
        <div className="flex justify-start items-center mb-4">
          <MdKeyboardArrowLeft
            onClick={() =>
              navigate(`/admin/restaurant/${state.restaurantId}/menu`)
            }
            className="text-[#000000] text-4xl cursor-pointer"
          />
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Restaurant
          </h2>
        </div>
        <div className="bg-[#FFFFFF]">
          <div className="px-10 bg-[#FFFFFF] border-b-[1px] border-b-[#CDCDCD]">
            <h1 className="text-[#000000] text-2xl font-semibold font-inter py-8">
              Update Item Details
            </h1>
          </div>
          <div className="mb-4 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div>
                  {/* Basic Details Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5">
                      <h3 className="text-[#000000] text-xl font-semibold font-inter">
                        Basic Details
                      </h3>

                      <FormField
                        control={control}
                        name="subCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sub Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Sub Category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subCategories.map((subCategory) => (
                                  <SelectItem
                                    key={subCategory.subCategoryId}
                                    value={subCategory.subCategoryId}
                                  >
                                    {subCategory.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Item Name */}
                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="itemName"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Item Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Dish Name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Item Description */}
                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="itemDescription"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Item Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  className="resize-none"
                                  placeholder="Add a detailed description explaining the dish"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Food Type */}
                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="foodType"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Food Type</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex"
                                >
                                  <FormItem className="flex items-center space-y-0">
                                    <FormControl className="hidden">
                                      <RadioGroupItem value="veg" />
                                    </FormControl>
                                    <FormLabel
                                      className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${
                                        getValues("foodType") === "veg" &&
                                        "bg-[#EDF4FF] border border-[#3579F0]"
                                      }`}
                                    >
                                      <VegIcon />
                                      <p
                                        className={`text-black group-hover:text-[#3579F0] ${
                                          getValues("foodType") === "veg" &&
                                          "text-[#3579F0]"
                                        }`}
                                      >
                                        Veg
                                      </p>
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-y-0">
                                    <FormControl className="hidden">
                                      <RadioGroupItem value="non-veg" />
                                    </FormControl>
                                    <FormLabel
                                      className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${
                                        getValues("foodType") === "non-veg" &&
                                        "bg-[#EDF4FF] border border-[#3579F0]"
                                      }`}
                                    >
                                      <NonVegIcon />
                                      <p
                                        className={`text-black group-hover:text-[#3579F0] ${
                                          getValues("foodType") === "non-veg" &&
                                          "text-[#3579F0]"
                                        }`}
                                      >
                                        Non-Veg
                                      </p>
                                    </FormLabel>
                                  </FormItem>
                                  {/* <FormItem className="flex items-center space-y-0">
                                    <FormControl className="hidden">
                                      <RadioGroupItem value="Egg" />
                                    </FormControl>
                                    <FormLabel
                                      className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${
                                        getValues("foodType") === "Egg" &&
                                        "bg-[#EDF4FF] border border-[#3579F0]"
                                      }`}
                                    >
                                      <EggIcon />
                                      <p
                                        className={`text-black group-hover:text-[#3579F0] ${
                                          getValues("foodType") === "Egg" &&
                                          "text-[#3579F0]"
                                        }`}
                                      >
                                        Egg
                                      </p>
                                    </FormLabel>
                                  </FormItem> */}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Preparation Time */}
                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="preparationTime"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Preparation Time</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Preparation Time (in minutes)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Item Photos */}
                      <div className="mt-5">
                        <Label>Item Photos</Label>
                        <FormField
                          control={control}
                          name="itemImage"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel className="cursor-pointer left-0 w-full h-full top-0">
                                <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">
                                  Change
                                </span>
                                {!watch("itemImagePreview") && (
                                  <div className="border-2 mt-2 flex flex-col bg-[#F7FAFF] items-center justify-center primary-color w-40 h-40 rounded-md px-5 py-4">
                                    <FiUpload size={25} />
                                    <p className="font-semibold text-center primary-color text-sm mt-2">
                                      Upload
                                    </p>
                                  </div>
                                )}
                                {watch("itemImagePreview")?.length > 0 && (
                                  <div className="flex gap-4 flex-wrap mt-5">
                                    {watch("itemImagePreview").map(
                                      (image, index) => (
                                        <img
                                          key={index}
                                          className="w-40"
                                          src={image}
                                          alt={`Preview ${index + 1}`}
                                        />
                                      )
                                    )}
                                  </div>
                                )}
                              </FormLabel>
                              <FormControl className="hidden">
                                <Input
                                  multiple={true}
                                  type="file"
                                  {...itemImageRef}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Item Pricing Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5">
                      <h2 className="class-lg6 text-black">Item Pricing</h2>

                      <div className="bg-[#F7FAFF] py-4 px-6 rounded-lg mt-2">
                        <h2 className="class-base6 text-black">
                          Customers trust brands with fair pricing
                        </h2>
                        <p className="class-sm2 text-[#757575]">
                          Keep same prices across menus offered for online
                          ordering.
                        </p>
                      </div>

                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="basePrice"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Base price</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter Base price of dish"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="packagingCharges"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Packaging charges</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter packaging charges"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="bg-[#F7FAFF] py-3 px-6 rounded-lg mt-5">
                        <h2 className="class-base6 text-black">
                          Please make sure that your offline and online prices
                          match
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Variants Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div
                        onClick={() => setIsVariant(!isVariant)}
                        className="cursor-pointer pb-6"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Variants</h3>
                          {isVariant ? (
                            <FaMinus className="text-black" size={20} />
                          ) : (
                            <FaPlus className="text-black" size={20} />
                          )}
                        </div>
                        <p>
                          You can offer variations of a item, such as size/
                          base/ crust, etc. When customers place an order, they
                          must choose at least one from the defined variants.
                        </p>
                      </div>
                      {isVariant && (
                        <>
                          <button
                            onClick={() => setIsVariantModalOpen(true)}
                            type="button"
                            className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md"
                          >
                            <FaPlus className="text-base" />
                            <p className="font-semibold text-lg">
                              Create new Variant
                            </p>
                          </button>
                          {watch("variations").length > 0 && (
                            <div className="mt-5">
                              <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
                                <h4 className="font-inter text-[#969696] font-semibold">
                                  Variant Name
                                </h4>
                                <h4 className="font-inter text-[#969696] font-semibold">
                                  Price (In Rs)
                                </h4>
                              </div>
                              {watch("variations")?.map((variation, i) => (
                                <div
                                  key={i}
                                  className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2"
                                >
                                  <h4 className="font-inter text-[#969696] font-semibold">
                                    {variation?.name}
                                  </h4>
                                  <h4 className="font-inter text-[#969696] font-semibold">
                                    Rs {variation?.price}
                                  </h4>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Menu Tags Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5">
                      <h3 className="text-[#000000] text-xl font-semibold font-inter mb-4">
                        Menu Tags
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Add tags to help categorize and highlight your menu
                        items
                      </p>

                      <MenuTagSelector
                        selectedTags={menuTags}
                        onTagsChange={handleMenuTagsChange}
                        tagType="menu"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Map Addons Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div
                        onClick={() => setIsMapAddons(!isMapAddons)}
                        className="cursor-pointer pb-6"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Map Addons</h3>
                          {isMapAddons ? (
                            <FaMinus className="text-black" size={20} />
                          ) : (
                            <FaPlus className="text-black" size={20} />
                          )}
                        </div>
                        <p>
                          Add-ons enhance the customer experience by offering
                          extra choices like toppings or desserts.
                        </p>
                      </div>
                      {isMapAddons && (
                        <div className="space-y-6">
                          {displayExistingAddons()}

                          {/* Enhanced Addons Display */}
                          {addons.length > 0 && (
                            <div>
                              <h4 className="font-inter text-[#969696] font-semibold mb-3">
                                Current Addons:
                              </h4>
                              <div className="space-y-3">
                                {addons.map((addon) => (
                                  <div
                                    key={addon.id}
                                    className="bg-gray-50 p-4 rounded-lg border"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                          <h5 className="font-semibold text-lg">
                                            {addon.name}
                                          </h5>
                                          <span className="text-lg font-bold text-green-600">
                                            ₹{addon.price}
                                          </span>
                                          <div className="flex gap-2">
                                            <span
                                              className={`px-2 py-1 rounded-full text-xs ${
                                                addon.isVeg
                                                  ? "bg-green-100 text-green-700"
                                                  : "bg-red-100 text-red-700"
                                              }`}
                                            >
                                              {addon.isVeg ? "Veg" : "Non-Veg"}
                                            </span>
                                            <span
                                              className={`px-2 py-1 rounded-full text-xs ${
                                                addon.isAvailable
                                                  ? "bg-blue-100 text-blue-700"
                                                  : "bg-gray-100 text-gray-700"
                                              }`}
                                            >
                                              {addon.isAvailable
                                                ? "Available"
                                                : "Unavailable"}
                                            </span>
                                            {addon.isDefault && (
                                              <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                                                Default
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Tags display with proper names */}
                                        {addon.tags &&
                                          addon.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-2">
                                              {addon.tags.map(
                                                (tagData, tagIndex) => {
                                                  const tagName =
                                                    getTagName(tagData);
                                                  const tagColor =
                                                    getTagColor(tagData);
                                                  const tagId =
                                                    typeof tagData === "object"
                                                      ? tagData.id
                                                      : tagData;

                                                  return (
                                                    <span
                                                      key={tagId || tagIndex}
                                                      style={{
                                                        backgroundColor:
                                                          tagColor,
                                                      }}
                                                      className="text-white px-2 py-1 rounded-full text-xs font-medium"
                                                    >
                                                      {tagName}
                                                    </span>
                                                  );
                                                }
                                              )}
                                            </div>
                                          )}
                                      </div>

                                      <button
                                        onClick={() =>
                                          handleRemoveAddon(addon.id)
                                        }
                                        className="text-red-500 hover:text-red-700 ml-4"
                                      >
                                        <FaTimes size={16} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Add New Addon Form */}
                          {showAddonForm && (
                            <div className="bg-white border-2 border-dashed border-[#4A67FF] rounded-lg p-6 space-y-4">
                              <h4 className="font-inter text-[#4A67FF] font-semibold text-lg mb-4">
                                Add New Addon
                              </h4>

                              {/* Addon Name */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  value={newAddon.name}
                                  onChange={(e) =>
                                    handleInputChange("name", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
                                  placeholder="e.g., Extra Paneer"
                                />
                              </div>

                              {/* Addon Price */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Price (₹)
                                </label>
                                <input
                                  type="number"
                                  value={newAddon.price}
                                  onChange={(e) =>
                                    handleInputChange("price", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
                                  placeholder="50"
                                  min="0"
                                  step="0.01"
                                />
                              </div>

                              {/* Checkboxes */}
                              <div className="flex gap-6">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={newAddon.isAvailable}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "isAvailable",
                                        e.target.checked
                                      )
                                    }
                                    className="mr-2"
                                  />
                                  Available
                                </label>

                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={newAddon.isVeg}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "isVeg",
                                        e.target.checked
                                      )
                                    }
                                    className="mr-2"
                                  />
                                  Vegetarian
                                </label>

                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={newAddon.isDefault}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "isDefault",
                                        e.target.checked
                                      )
                                    }
                                    className="mr-2"
                                  />
                                  Set as Default
                                </label>
                              </div>

                              {/* Tags Section */}
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Tags
                                </label>

                                {/* Show currently selected tags */}
                                {newAddon.tags && newAddon.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 rounded">
                                    <span className="text-xs text-gray-600">
                                      Selected:
                                    </span>
                                    {newAddon.tags.map((tagObj, index) => (
                                      <span
                                        key={tagObj.id || index}
                                        style={{
                                          backgroundColor: getTagColor(tagObj),
                                        }}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-medium"
                                      >
                                        {tagObj.name}
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            const updatedTags =
                                              newAddon.tags.filter(
                                                (_, i) => i !== index
                                              );
                                            setNewAddon((prev) => ({
                                              ...prev,
                                              tags: updatedTags,
                                            }));
                                          }}
                                          className="hover:bg-black/20 rounded-full p-0.5 ml-1"
                                        >
                                          <FaTimes size={10} />
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {/* MenuTagSelector */}
                                <MenuTagSelector
                                  selectedTags={newAddon.tags.map(
                                    (tag) => tag.id
                                  )}
                                  onTagsChange={handleTagsChange}
                                  tagType="addon"
                                  className="w-full"
                                />
                              </div>

                              {/* Form Actions */}
                              <div className="flex gap-3 pt-4">
                                <button
                                  type="button"
                                  onClick={handleAddAddon}
                                  className="bg-[#4A67FF] text-white px-6 py-2 rounded-md hover:bg-[#3651E6] flex-1"
                                >
                                  Add Addon
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowAddonForm(false);
                                    setNewAddon({
                                      name: "",
                                      price: "",
                                      isAvailable: true,
                                      isVeg: true,
                                      isDefault: false,
                                      tags: [],
                                    });
                                  }}
                                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Create Addon Buttons */}
                          <button
                            onClick={() => setIsMapAddonsModalOpen(true)}
                            type="button"
                            className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF] mb-4"
                          >
                            <FaPlus className="text-base" />
                            <p className="font-semibold text-lg">
                              Create new Add on group (Modal)
                            </p>
                          </button>

                          {!showAddonForm && (
                            <button
                              type="button"
                              className="bg-[#F8F9FC] text-[#4A67FF] p-4 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF]"
                              onClick={() => setShowAddonForm(true)}
                            >
                              <FaPlus className="text-base" />
                              <p className="font-semibold text-lg">
                                Create new Add on with Tags
                              </p>
                            </button>
                          )}

                          {/* Display Current Addons in List Format */}
                          {watch("addOns").length > 0 && (
                            <div className="mt-5">
                              <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
                                <h4 className="font-inter text-[#969696] font-semibold">
                                  AddOn Name
                                </h4>
                                <h4 className="font-inter text-[#969696] font-semibold">
                                  Price (In Rs)
                                </h4>
                              </div>
                              {watch("addOns")?.map((addon, i) => (
                                <div
                                  key={i}
                                  className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2"
                                >
                                  <h4 className="font-inter text-[#969696] font-semibold">
                                    {addon?.name}
                                  </h4>
                                  <h4 className="font-inter text-[#969696] font-semibold">
                                    Rs {addon?.price}
                                  </h4>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Details Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div
                        onClick={() =>
                          setIsAdditionalDetails(!isAdditionalDetails)
                        }
                        className="cursor-pointer pb-6"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">
                            Additional Details
                          </h3>
                          {isAdditionalDetails ? (
                            <FaMinus className="text-black" size={20} />
                          ) : (
                            <FaPlus className="text-black" size={20} />
                          )}
                        </div>
                        <p>Add Cuisine</p>
                      </div>
                      {isAdditionalDetails && (
                        <div className="border border-[#A8A8A8] p-5 w-full rounded-md">
                          <h3 className="text-black class-lg6">Cuisine</h3>

                          {cuisines.length === 0 && isLoading && <Spinner />}

                          {cuisines.length === 0 && !isLoading && (
                            <DataNotFound name="Cuisines" />
                          )}

                          {cuisines.length > 0 && (
                            <div className="flex items-center gap-2">
                              <FormField
                                control={control}
                                name="cuisine"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-wrap gap-3"
                                      >
                                        {cuisines?.map((cuisine) => (
                                          <FormItem
                                            key={cuisine?._id}
                                            className="flex items-center space-y-0"
                                          >
                                            <FormControl className="hidden">
                                              <RadioGroupItem
                                                value={cuisine?._id}
                                              />
                                            </FormControl>
                                            <FormLabel
                                              className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${
                                                getValues("cuisine") ===
                                                  cuisine?._id &&
                                                "bg-[#EDF4FF] border border-[#3579F0]"
                                              }`}
                                            >
                                              <p>{cuisine?.name}</p>
                                            </FormLabel>
                                          </FormItem>
                                        ))}
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Serving Info Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div
                        onClick={() => setIsServingInfo(!isServingInfo)}
                        className="cursor-pointer pb-6"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Serving Info</h3>
                          {isServingInfo ? (
                            <FaMinus className="text-black" size={20} />
                          ) : (
                            <FaPlus className="text-black" size={20} />
                          )}
                        </div>
                        <p>Add serving sizes to improve customer experience.</p>
                      </div>
                      {isServingInfo && (
                        <div className="grid grid-cols-2 items-center gap-2 w-full">
                          <FormField
                            control={control}
                            name="numberOfPeople"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of people</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Select appropriate serving info"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name="dishSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Dish size</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter quantity"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customization Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div
                        onClick={() => setIsCustomization(!isCustomization)}
                        className="cursor-pointer pb-6"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">
                            Customization
                          </h3>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              onClick={() => setIsCustomizationModalOpen(true)}
                              variant="outline"
                              className="flex gap-1 px-5 items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]"
                            >
                              <FaPlus />
                              Add More
                            </Button>
                            {isCustomization ? (
                              <FaMinus className="text-black" size={20} />
                            ) : (
                              <FaPlus className="text-black" size={20} />
                            )}
                          </div>
                        </div>
                        <p>Customization for category</p>
                      </div>
                      {isCustomization && (
                        <div className="w-full flex flex-col gap-4">
                          {watch("customizations")?.map((customization, i) => (
                            <div key={i} className="w-full">
                              <div className="flex justify-between items-center gap-4">
                                <h3 className="font-inter text-lg text-[#969696] font-semibold">
                                  {customization?.categoryName}
                                </h3>
                                <Button
                                  type="button"
                                  onClick={() => handleCustomization(i)}
                                  variant="outline"
                                  className="flex gap-1 w-[200px] items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]"
                                >
                                  <FaPlus />
                                  Add Customization
                                </Button>
                              </div>
                              {customization?.customizationOptions &&
                                customization?.customizationOptions.length >
                                  0 && (
                                  <div className="px-4">
                                    <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
                                      <h4 className="font-inter text-[#969696] font-semibold">
                                        Customization Name
                                      </h4>
                                      <h4 className="font-inter text-[#969696] font-semibold">
                                        Price (In Rs)
                                      </h4>
                                    </div>
                                    {customization?.customizationOptions?.map(
                                      (option, i) => (
                                        <div
                                          key={i}
                                          className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2"
                                        >
                                          <h4 className="font-inter text-[#969696] font-semibold">
                                            {option?.name}
                                          </h4>
                                          <h4 className="font-inter text-[#969696] font-semibold">
                                            Rs {option?.price}
                                          </h4>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Availability for Food Item Section */}
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div
                        onClick={() =>
                          setAvailabilityForFoodItem(!availabilityForFoodItem)
                        }
                        className="cursor-pointer pb-6"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">
                            Availability for food item
                          </h3>
                          {availabilityForFoodItem ? (
                            <FaMinus className="text-black" size={20} />
                          ) : (
                            <FaPlus className="text-black" size={20} />
                          )}
                        </div>
                        <p>
                          Availability for <b>food item</b>
                        </p>
                      </div>
                      {availabilityForFoodItem && (
                        <AvailabilityForFoodItem form={form} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Submit Buttons */}
                <div className="flex gap-5 bg-[#FFFFFF] w-full p-4">
                  <button
                    type="button"
                    className="h-[68px] w-full text-[#F97474] text-xl font-semibold font-inter bg-[#FFFFFF] rounded-lg border-[1px] border-[#256FEF]"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isAddItemLoading}
                    className="h-[68px] w-full text-[#FFFFFF] text-xl font-semibold font-inter bg-[#256FEF] rounded-lg border-[1px] border-[#256FEF] disabled:opacity-50"
                  >
                    {isAddItemLoading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </Form>
          </div>

          {/* Modal Components */}
          {isVariantModalOpen && (
            <CreateVariantModel
              isVariantModalOpen={isVariantModalOpen}
              setIsVariantModalOpen={setIsVariantModalOpen}
              setValue={setValue}
              getValues={getValues}
            />
          )}

          {isMapAddonsModalOpen && (
            <MapAddOnModel
              isMapAddonsModalOpen={isMapAddonsModalOpen}
              setIsMapAddonsModalOpen={setIsMapAddonsModalOpen}
              setValue={setValue}
              getValues={getValues}
            />
          )}

          {isAddCustomizationModalOpen && (
            <AddCustomizationModal
              isAddCustomizationModalOpen={isAddCustomizationModalOpen}
              setIsAddCustomizationModalOpen={setIsAddCustomizationModalOpen}
              currentIndex={currentIndex}
              setValue1={setValue}
              getValues1={getValues}
            />
          )}

          {isCustomizationModalOpen && (
            <AddCustomizationCategoryModal
              isCustomizationModalOpen={isCustomizationModalOpen}
              setIsCustomizationModalOpen={setIsCustomizationModalOpen}
              setValue={setValue}
              getValues={getValues}
            />
          )}
        </div>
      </section>
    </AdminWrapper>
  );
};

export default UpdateMenu;
