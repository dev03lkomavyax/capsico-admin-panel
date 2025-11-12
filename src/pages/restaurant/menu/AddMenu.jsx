import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import NonVegIcon from "@/components/customIcons/NonVegIcon";
import VegIcon from "@/components/customIcons/VegIcon";
import DataNotFound from "@/components/DataNotFound";
import AddCustomizationCategoryModal from "@/components/menu/AddCustomizationCategoryModal";
import AddCustomizationModal from "@/components/menu/AddCustomizationModal";
import AvailabilityForFoodItem from "@/components/menu/AvailabilityForFoodItem";
import CreateVariantModel from "@/components/menu/CreateVariantModel";
import MapAddOnModel from "@/components/menu/MapAddOnModel";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import { addItemSchema } from "@/schema/restaurantSchema";
import { updateMultiplePreview } from "@/utils/updatePreview";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddonsManager from "./addons/AddonsManager";
import MenuTagSelector from "./menuTagSelector";

// const AddMenu = () => {
//   const navigate = useNavigate();
//   const [isItemImageUploadModalOpen, setIsItemImageUploadModalOpen] = useState(false);
//   const [isVariant, setIsVariant] = useState(false);
//   const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
//   const [isMapAddons, setIsMapAddons] = useState(false);
//   const [isMapAddonsModalOpen, setIsMapAddonsModalOpen] = useState(false);
//   const [isAdditionalDetails, setIsAdditionalDetails] = useState(false);
//   const [isServingInfo, setIsServingInfo] = useState(false);
//   const [isCustomization, setIsCustomization] = useState(false);
//   const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
//   const [isCreateVariantModalOpen, setIsCreateVariantModalOpen] = useState(false);
//   const [isAddCustomizationModalOpen, setIsAddCustomizationModalOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [cuisines, setCuisines] = useState([]);
//   const [availabilityForFoodItem, setAvailabilityForFoodItem] = useState(false);

//   // Enhanced addon state
//   const [availableTags, setAvailableTags] = useState([]);
//   const [addons, setAddons] = useState([]);
//   const [menuTags, setMenuTags] = useState([]);
//   const [isTagsLoading, setIsTagsLoading] = useState(false);
//   const [showAddonForm, setShowAddonForm] = useState(false);
//   const [newAddon, setNewAddon] = useState({
//     name: '',
//     price: '',
//     isAvailable: true,
//     isVeg: true,
//     isDefault: false,
//     tags: []
//   });

//   const params = useParams();

//   const form = useForm({
//     resolver: zodResolver(addItemSchema),
//     defaultValues: {
//       itemName: "",
//       itemImage: "",
//       itemImagePreview: "",
//       itemDescription: "",
//       cuisine: "",
//       foodType: "",
//       basePrice: "",
//       packagingCharges: "",
//       numberOfPeople: "",
//       dishSize: "",
//       preparationTime: "",
//       restaurant: "",
//       tags: [],
//       variations: [],
//       addOns: [],
//       customizations: [],
//       timingType: "sameAsRestaurant",
//       openingTime: "",
//       closingTime: "",
//       days: []
//     }
//   });

//   const { register, control, watch, setValue, getValues } = form;
//   const restaurantRef = register("restaurant");
//   const itemImageRef = register("itemImage");
//   const restaurant = watch("restaurant");
//   const itemImage = watch("itemImage");

//   // Fetch available tags from API
//   const fetchAvailableTags = async () => {
//     try {
//       setIsTagsLoading(true);
//       const response = await fetch('/capsicoTag/for-addon', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAvailableTags(data.menuTags || []);
//       }
//     } catch (error) {
//       console.error('Error fetching tags:', error);
//     } finally {
//       setIsTagsLoading(false);
//     }
//   };

//   const handleMenuTagsChange = (tags) => {
//     setMenuTags(tags);
//     setValue('tags', tags);
//   };

//   // Handle tag selection for addon
//   const handleTagSelect = (tag) => {
//     const isAlreadySelected = newAddon.tags.some(selectedTag => selectedTag === (tag.id || tag._id));

//     if (!isAlreadySelected) {
//       const updatedTags = [...newAddon.tags, tag.id || tag._id];
//       setNewAddon(prev => ({ ...prev, tags: updatedTags }));
//     }
//   };

//   // Handle tag removal from addon
//   const handleTagRemove = (tagId) => {
//     const updatedTags = newAddon.tags.filter(tag => tag !== tagId);
//     setNewAddon(prev => ({ ...prev, tags: updatedTags }));
//   };

//   // Handle form input changes
//   const handleInputChange = (field, value) => {
//     setNewAddon(prev => ({ ...prev, [field]: value }));
//   };

//   // Add new addon
//   const handleAddAddon = () => {
//     if (!newAddon.name.trim() || !newAddon.price) {
//       alert('Please fill in addon name and price');
//       return;
//     }

//     const addon = {
//       id: Date.now().toString(), // Generate temporary ID
//       name: newAddon.name.trim(),
//       price: parseFloat(newAddon.price),
//       isAvailable: newAddon.isAvailable,
//       isVeg: newAddon.isVeg,
//       tags: newAddon.tags,
//       isDefault: newAddon.isDefault
//     };

//     const updatedAddons = [...addons, addon];
//     setAddons(updatedAddons);
//     setValue('addOns', updatedAddons);

//     // Reset form
//     setNewAddon({
//       name: '',
//       price: '',
//       isAvailable: true,
//       isVeg: true,
//       isDefault: false,
//       tags: []
//     });
//     setShowAddonForm(false);
//   };

//   // Remove addon
//   const handleRemoveAddon = (addonId) => {
//     const updatedAddons = addons.filter(addon => addon.id !== addonId);
//     setAddons(updatedAddons);
//     setValue('addOns', updatedAddons);
//   };

//   // Get tag name by ID
//   // const getTagName = (tagId) => {
//   //   const tag = availableTags.find(t => (t.id || t._id) === tagId);
//   //   return tag ? tag.name : 'Unknown Tag';
//   // };

//   // // Get tag color by ID
//   // const getTagColor = (tagId) => {
//   //   const tag = availableTags.find(t => (t.id || t._id) === tagId);
//   //   return tag ? tag.color : '#666';
//   // };
// // ✅ FIXED: Better tag name resolution with fallback
// const getTagName = (tagId) => {
//   console.log('Looking for tag:', tagId, 'in:', availableTags);
//   const tag = availableTags.find(t => (t.id || t._id) === tagId);
//   if (tag) {
//     return tag.displayName || tag.name;
//   }
//   return `Tag Not Found`;  // Clean fallback message
// };

// const getTagColor = (tagId) => {
//   const tag = availableTags.find(t => (t.id || t._id) === tagId);
//   return tag ? tag.color : '#666';
// };

//   useEffect(() => {
//     updateMultiplePreview(restaurant, "restaurantPreview", setValue);
//     updateMultiplePreview(itemImage, "itemImagePreview", setValue);
//   }, [form, restaurant, itemImage, setValue]);

//   useEffect(() => {
//     if (isMapAddons) {
//       fetchAvailableTags();
//       // Initialize with existing addons if any
//       const existingAddons = getValues('addOns') || [];
//       setAddons(existingAddons);
//     }
//   }, [isMapAddons, getValues]);

//   const handleCustomization = (index) => {
//     setCurrentIndex(index);
//     setIsAddCustomizationModalOpen(true);
//   }

//   const { state } = useLocation();
//   const { res, fetchData, isLoading } = useGetApiReq();

//   const getCuisines = () => {
//     fetchData("/admin/get-cuisines");
//   }

//   useEffect(() => {
//     getCuisines();
//   }, [])

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("get cuisines res", res);
//       setCuisines(res?.data?.data?.cuisines);
//     }
//   }, [res])

//   const { res: addItemRes, fetchData: fetchAddItemData, isLoading: isAddItemLoading } = usePostApiReq();

//   const onSubmit = (data) => {
//     console.log("submit data", data);

//     const availableTimings = {
//       sameAsRestaurant: data.timingType === "sameAsRestaurant",
//       start: data.openingTime,
//       end: data.closingTime,
//       days: data.days,
//     }

//     const modifiedCustomizations = getValues("customizations")?.map((customization) => {
//       return {
//         name: customization.categoryName,
//         type: customization.customizationType,
//         options: customization.customizationOptions,
//       }
//     })

//     // Enhanced addons with tags
//     const modifiedAddOns = getValues("addOns")?.map((addon) => {
//       return {
//         id: addon.id,
//         name: addon.name,
//         price: addon.price,
//         isAvailable: addon.isAvailable,
//         isVeg: addon.isVeg,
//         tags: addon.tags || [],
//         isDefault: addon.isDefault
//       }
//     })

//     const formData = new FormData();
//     formData.append("name", data.itemName);
//     formData.append("description", data.itemDescription);
//     formData.append("price", data.basePrice);
//     formData.append("FoodType", data.foodType);
//     formData.append("cuisine", data.cuisine);
//     formData.append("preparationTime", data.preparationTime);
//     formData.append("categoryId", params?.categoryId);
//     formData.append("availableTimings", JSON.stringify(availableTimings));
//     formData.append("tags", JSON.stringify(menuTags));
//     formData.append("variations", JSON.stringify(getValues("variations")));
//     formData.append("addOns", JSON.stringify(modifiedAddOns));
//     formData.append("customizations", JSON.stringify(modifiedCustomizations));
//     Array.from(data.itemImage).forEach((image) => {
//       formData.append("images", image);
//     });
//     fetchAddItemData(`/admin/add-menu-item/${state?.restaurantId}`, formData);
//   }

//   useEffect(() => {
//     if (addItemRes?.status === 200 || addItemRes?.status === 201) {
//       console.log("add item res", addItemRes);
//       navigate(`/admin/restaurant/${state?.restaurantId}/menu`)
//     }
//   }, [addItemRes])

//   return (
//     <AdminWrapper>
//       <section className='px-0 py-0 w-full h-full min-h-screen'>
//         <div className='flex justify-start items-center mb-4'>
//           <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
//           <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurant </h2>
//         </div>
//         <div className='bg-[#FFFFFF]'>
//           <div className='px-10 bg-[#FFFFFF] border-b-[1px] border-b-[#CDCDCD]'>
//             <h1 className='text-[#000000] text-2xl font-semibold font-inter py-8'>Add Item Details</h1>
//           </div>
//           <div className='mb-4 py-4'>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//                 <div>
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h3 className='text-[#000000] text-xl font-semibold font-inter'>Basic Details</h3>
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="itemName"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Item Name</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="Enter Dish Name"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="itemDescription"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Item Description</FormLabel>
//                               <FormControl>
//                                 <Textarea className="resize-none" placeholder="Add a detailed description explaining the dish"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="foodType"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Food Type</FormLabel>
//                               <FormControl>
//                                 <RadioGroup
//                                   onValueChange={field.onChange}
//                                   defaultValue={field.value}
//                                   className="flex"
//                                 >
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="veg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <VegIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "veg" && "text-[#3579F0]"}`}>Veg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="Non-veg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "non-veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <NonVegIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "non-veg" && "text-[#3579F0]"}`}>Non-Veg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="Egg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "egg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <EggIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "egg" && "text-[#3579F0]"}`}>Egg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                 </RadioGroup>
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="preparationTime"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Preparation Time</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Preparation Time (in minutes)"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="mt-5">
//                         <Label>Item Photos</Label>
//                         <FormField
//                           control={control}
//                           name="itemImage"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel className="cursor-pointer left-0 w-full h-full top-0">
//                                 <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">Change</span>
//                                 {!watch("itemImagePreview") &&
//                                   <div className='border-2 mt-2 flex flex-col bg-[#F7FAFF] items-center justify-center primary-color w-40 h-40 rounded-md px-5 py-4'>
//                                     <FiUpload size={25} />
//                                     <p className='font-semibold text-center primary-color text-sm mt-2'>Upload</p>
//                                   </div>
//                                 }
//                                 {watch("itemImagePreview")?.length > 0 && (
//                                   <div className="flex gap-4 flex-wrap mt-5">
//                                     {watch("itemImagePreview").map((image, index) => (
//                                       <img key={index} className="w-40" src={image} alt={`Preview ${index + 1}`} />
//                                     ))}
//                                   </div>
//                                 )}
//                               </FormLabel>
//                               <FormControl className="hidden">
//                                 <Input multiple={true} type="file" {...itemImageRef} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h2 className="class-lg6 text-black">Item Pricing</h2>

//                       <div className="bg-[#F7FAFF] py-4 px-6 rounded-lg mt-2">
//                         <h2 className="class-base6 text-black">Customers trust brands with fair pricing</h2>
//                         <p className="class-sm2 text-[#757575]">Keep same prices across menus offered for online ordering.</p>
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="basePrice"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Base price</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Enter Base price of dish"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="packagingCharges"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Packaging charges</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Enter packaging charges"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="bg-[#F7FAFF] py-3 px-6 rounded-lg mt-5">
//                         <h2 className="class-base6 text-black">Please make sure that your offline and online prices match</h2>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="pb- border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsVariant(!isVariant)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Variants</h3>
//                           {isVariant ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>You can offer variations of a item, such as size/ base/ crust, etc. When customers place an order, they must choose at least one from the defined variants.</p>
//                       </div>
//                       {isVariant &&
//                         <>
//                           <button onClick={() => setIsVariantModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md">
//                             <FaPlus className="text-base" />
//                             <p className="font-semibold text-lg">Create new Variant</p>
//                           </button>
//                           {watch("variations").length > 0 &&
//                             <div className="mt-5">
//                               <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                 <h4 className="font-inter text-[#969696] font-semibold">Variant Name</h4>
//                                 <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                               </div>
//                               {watch("variations")?.map((variation, i) => (
//                                 <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                   <h4 className="font-inter text-[#969696] font-semibold">{variation?.name}</h4>
//                                   <h4 className="font-inter text-[#969696] font-semibold">Rs {variation?.price}</h4>
//                                 </div>))}
//                             </div>
//                           }
//                         </>
//                       }
//                     </div>

//                     {/* Tags Section */}
//                     <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                       <div className="p-5">
//                         <h3 className='text-[#000000] text-xl font-semibold font-inter mb-4'>Menu Tags</h3>
//                         <p className="text-gray-600 text-sm mb-4">
//                           Add tags to help categorize and highlight your menu items
//                         </p>

//                         <MenuTagSelector
//                           selectedTags={menuTags}
//                           onTagsChange={handleMenuTagsChange}
//                           tagType="menu"
//                           className="w-full"
//                         />
//                       </div>
//                     </div>

//                     {/* Enhanced Map Addons Section */}
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsMapAddons(!isMapAddons)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Map Addons</h3>
//                           {isMapAddons ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add-ons enhance the customer experience by offering extra choices like toppings or desserts.</p>
//                       </div>
//                       {isMapAddons &&
//                         <div className="space-y-6">
//                           {/* Existing Addons Display */}
//                           {addons.length > 0 && (
//                             <div>
//                               <h4 className="font-inter text-[#969696] font-semibold mb-3">Current Addons:</h4>
//                               <div className="space-y-3">
//                                 {addons.map((addon) => (
//                                   <div key={addon.id} className="bg-gray-50 p-4 rounded-lg border">
//                                     <div className="flex justify-between items-start">
//                                       <div className="flex-1">
//                                         <div className="flex items-center gap-3 mb-2">
//                                           <h5 className="font-semibold text-lg">{addon.name}</h5>
//                                           <span className="text-lg font-bold text-green-600">₹{addon.price}</span>
//                                           <div className="flex gap-2">
//                                             <span className={`px-2 py-1 rounded-full text-xs ${addon.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                                               {addon.isVeg ? 'Veg' : 'Non-Veg'}
//                                             </span>
//                                             <span className={`px-2 py-1 rounded-full text-xs ${addon.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
//                                               {addon.isAvailable ? 'Available' : 'Unavailable'}
//                                             </span>
//                                             {addon.isDefault && (
//                                               <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
//                                                 Default
//                                               </span>
//                                             )}
//                                           </div>
//                                         </div>

//                                         {/* Tags for addon */}
//                                       // ✅ ENHANCED: Tag display with proper names and colors
//                                         {addon.tags.map((tagId) => {
//                                           const tagName = getTagName(tagId);
//                                           const tagColor = getTagColor(tagId);

//                                           return (
//                                             <span
//                                               key={tagId}
//                                               style={{ backgroundColor: tagColor }}
//                                               className="text-white px-2 py-1 rounded-full text-xs font-medium"
//                                             >
//                                               {tagName}  {/* ✅ Now shows actual tag name instead of ObjectId */}
//                                             </span>
//                                           );
//                                         })}

//                                       </div>

//                                       <button
//                                         onClick={() => handleRemoveAddon(addon.id)}
//                                         className="text-red-500 hover:text-red-700 ml-4"
//                                       >
//                                         <FaTimes size={16} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* Add New Addon Form */}
//                           {showAddonForm && (
//                             <div className="bg-white border-2 border-dashed border-[#4A67FF] rounded-lg p-6 space-y-4">
//                               <h4 className="font-inter text-[#4A67FF] font-semibold text-lg mb-4">Add New Addon</h4>

//                               {/* Addon Name */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                                 <input
//                                   type="text"
//                                   value={newAddon.name}
//                                   onChange={(e) => handleInputChange('name', e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
//                                   placeholder="e.g., Extra Paneer"
//                                 />
//                               </div>

//                               {/* Addon Price */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
//                                 <input
//                                   type="number"
//                                   value={newAddon.price}
//                                   onChange={(e) => handleInputChange('price', e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
//                                   placeholder="50"
//                                   min="0"
//                                   step="0.01"
//                                 />
//                               </div>

//                               {/* Checkboxes */}
//                               <div className="flex gap-6">
//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isAvailable}
//                                     onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Available
//                                 </label>

//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isVeg}
//                                     onChange={(e) => handleInputChange('isVeg', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Vegetarian
//                                 </label>

//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isDefault}
//                                     onChange={(e) => handleInputChange('isDefault', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Set as Default
//                                 </label>
//                               </div>

//                               {/* REPLACED: Tags Section with MenuTagSelector */}

//                               <MenuTagSelector
//                                 selectedTags={newAddon.tags}
//                                 onTagsChange={(tags) => setNewAddon(prev => ({ ...prev, tags }))}
//                                 tagType="addon"
//                                 className="w-full"
//                               />

//                               {/* Form Actions */}
//                               <div className="flex gap-3 pt-4">
//                                 <button
//                                   type="button"
//                                   onClick={handleAddAddon}
//                                   className="bg-[#4A67FF] text-white px-6 py-2 rounded-md hover:bg-[#3651E6] flex-1"
//                                 >
//                                   Add Addon
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setShowAddonForm(false);
//                                     setNewAddon({
//                                       name: '',
//                                       price: '',
//                                       isAvailable: true,
//                                       isVeg: true,
//                                       isDefault: false,
//                                       tags: []
//                                     });
//                                   }}
//                                   className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           )}

//                           {/* Original Create Addon Button */}
//                           <button onClick={() => setIsMapAddonsModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF] mb-4">
//                             <FaPlus className="text-base" />
//                             <p className="font-semibold text-lg">Create new Add on group (Modal)</p>
//                           </button>

//                           {/* Enhanced Create Addon Button */}
//                           {!showAddonForm && (
//                             <button
//                               type="button"
//                               className="bg-[#F8F9FC] text-[#4A67FF] p-4 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF]"
//                               onClick={() => setShowAddonForm(true)}
//                             >
//                               <FaPlus className="text-base" />
//                               <p className="font-semibold text-lg">Create new Add on with Tags</p>
//                             </button>
//                           )}

//                           {/* Display Current Addons in List Format (Original Code) */}
//                           {watch("addOns").length > 0 && (
//                             <div className="mt-5">
//                               <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                 <h4 className="font-inter text-[#969696] font-semibold">AddOn Name</h4>
//                                 <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                               </div>
//                               {watch("addOns")?.map((addon, i) => (
//                                 <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                   <h4 className="font-inter text-[#969696] font-semibold">{addon?.name}</h4>
//                                   <h4 className="font-inter text-[#969696] font-semibold">Rs {addon?.price}</h4>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       }
//                     </div>

//                     {/* Rest of your existing sections remain unchanged */}
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsAdditionalDetails(!isAdditionalDetails)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Additional Details</h3>
//                           {isAdditionalDetails ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add Cuisine</p>
//                       </div>
//                       {isAdditionalDetails &&
//                         <div className="border border-[#A8A8A8] p-5 w-full rounded-md">
//                           <h3 className="text-black class-lg6">Cuisine</h3>

//                           {cuisines.length === 0 && isLoading &&
//                             <Spinner />
//                           }

//                           {cuisines.length === 0 && !isLoading &&
//                             <DataNotFound name="Cuisines" />
//                           }

//                           {cuisines.length > 0 &&
//                             <div className="flex items-center gap-2">
//                               <FormField
//                                 control={control}
//                                 name="cuisine"
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel></FormLabel>
//                                     <FormControl>
//                                       <RadioGroup
//                                         onValueChange={field.onChange}
//                                         defaultValue={field.value}
//                                         className="flex flex-wrap gap-3"
//                                       >
//                                         {cuisines?.map((cuisine) => (
//                                           <FormItem key={cuisine?._id} className="flex items-center space-y-0">
//                                             <FormControl className="hidden">
//                                               <RadioGroupItem value={cuisine?._id} />
//                                             </FormControl>
//                                             <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === cuisine?._id && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                               <p>{cuisine?.name}</p>
//                                             </FormLabel>
//                                           </FormItem>
//                                         ))}

//                                         <FormItem className="flex items-center space-y-0">
//                                           <FormControl className="hidden">
//                                             <RadioGroupItem value="Indian cuisine" />
//                                           </FormControl>
//                                           <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === "Indian cuisine" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                             <p>Indian cuisine</p>
//                                           </FormLabel>
//                                         </FormItem>
//                                         <FormItem className="flex items-center space-y-0">
//                                           <FormControl className="hidden">
//                                             <RadioGroupItem value="Jain" />
//                                           </FormControl>
//                                           <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === "Jain" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                             <p>Jain</p>
//                                           </FormLabel>
//                                         </FormItem>
//                                         <FormItem className="flex items-center space-y-0">
//                                           <FormControl className="hidden">
//                                             <RadioGroupItem value="Italian cuisine" />
//                                           </FormControl>
//                                           <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === "Italian cuisine" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                             <p>Italian cuisine</p>
//                                           </FormLabel>
//                                         </FormItem>
//                                         <FormItem className="flex items-center space-y-0">
//                                           <FormControl className="hidden">
//                                             <RadioGroupItem value="Vegan" />
//                                           </FormControl>
//                                           <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === "Vegan" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                             <p>Vegan</p>
//                                           </FormLabel>
//                                         </FormItem>
//                                       </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>
//                           }
//                         </div>
//                       }
//                     </div>

//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsServingInfo(!isServingInfo)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Serving Info</h3>
//                           {isServingInfo ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add serving sizes to improve customer experience.</p>
//                       </div>
//                       {isServingInfo &&
//                         <div className="grid grid-cols-2 items-center gap-2 w-full">
//                           <FormField
//                             control={control}
//                             name="numberOfPeople"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Number of people</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Select appropriate serving info"  {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={control}
//                             name="dishSize"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Dish size</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Enter quantity"  {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                       }
//                     </div>

//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsCustomization(!isCustomization)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Customization</h3>
//                           <div className="flex items-center gap-3">
//                             <Button type="button" onClick={() => setIsCustomizationModalOpen(true)} variant="outline" className="flex gap-1 px-5 items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
//                               <FaPlus />
//                               Add More
//                             </Button>
//                             {isCustomization ? <FaMinus className="text-black" size={20} />
//                               : <FaPlus className="text-black" size={20} />}
//                           </div>
//                         </div>
//                         <p>Customization for category</p>
//                       </div>
//                       {isCustomization &&
//                         <div className="w-full flex flex-col gap-4">
//                           {watch("customizations")?.map((customization, i) => (
//                             <div key={i} className="w-full">
//                               <div className="flex justify-between items-center gap-4">
//                                 <h3 className="font-inter text-lg text-[#969696] font-semibold">{customization?.categoryName}</h3>
//                                 <Button type="button" onClick={() => handleCustomization(i)} variant="outline" className="flex gap-1 w-[200px] items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
//                                   <FaPlus />
//                                   Add Customization
//                                 </Button>
//                               </div>
//                               {customization?.customizationOptions &&
//                                 customization?.customizationOptions.length > 0 &&
//                                 <div className="px-4">
//                                   <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                     <h4 className="font-inter text-[#969696] font-semibold">Customization Name</h4>
//                                     <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                                   </div>
//                                   {customization?.customizationOptions?.map((option, i) => (
//                                     <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                       <h4 className="font-inter text-[#969696] font-semibold">{option?.name}</h4>
//                                       <h4 className="font-inter text-[#969696] font-semibold">Rs {option?.price}</h4>
//                                     </div>))}
//                                 </div>}
//                             </div>
//                           ))}
//                         </div>
//                       }
//                     </div>

//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setAvailabilityForFoodItem(!availabilityForFoodItem)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Availability for food item</h3>
//                           {availabilityForFoodItem ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Availability for <b>food item</b></p>
//                       </div>

//                       {availabilityForFoodItem &&
//                         <AvailabilityForFoodItem form={form} />
//                       }
//                     </div>
//                   </div>
//                 </div>

//                 <div className='flex gap-5 bg-[#FFFFFF] w-full p-4'>
//                   <button type='button' className='h-[68px] w-full text-[#F97474] text-xl font-semibold font-inter bg-[#FFFFFF] rounded-lg border-[1px] border-[#256FEF]'>Discard</button>
//                   <button className='h-[68px] w-full text-[#FFFFFF] text-xl font-semibold font-inter bg-[#256FEF] rounded-lg border-[1px] border-[#256FEF]'>Save changes</button>
//                 </div>
//               </form>
//             </Form>
//           </div>

//           {isVariantModalOpen &&
//             <CreateVariantModel
//               isVariantModalOpen={isVariantModalOpen}
//               setIsVariantModalOpen={setIsVariantModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }

//           {isMapAddonsModalOpen &&
//             <MapAddOnModel
//               isMapAddonsModalOpen={isMapAddonsModalOpen}
//               setIsMapAddonsModalOpen={setIsMapAddonsModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }

//           {isAddCustomizationModalOpen &&
//             <AddCustomizationModal
//               isAddCustomizationModalOpen={isAddCustomizationModalOpen}
//               setIsAddCustomizationModalOpen={setIsAddCustomizationModalOpen}
//               currentIndex={currentIndex}
//               setValue1={setValue}
//               getValues1={getValues}
//             />
//           }

//           {isCustomizationModalOpen &&
//             <AddCustomizationCategoryModal
//               isCustomizationModalOpen={isCustomizationModalOpen}
//               setIsCustomizationModalOpen={setIsCustomizationModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }
//         </div>
//       </section>
//     </AdminWrapper>
//   )
// }

// export default AddMenu

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { MdKeyboardArrowLeft } from 'react-icons/md';
// import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
// import { FiUpload } from 'react-icons/fi';
// import AdminWrapper from '@/components/admin/AdminWrapper';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import MenuTagSelector from '@/components/MenuTagSelector';
// import CreateVariantModel from '@/components/admin/CreateVariantModel';
// import MapAddOnModel from '@/components/admin/MapAddOnModel';
// import AddCustomizationModal from '@/components/admin/AddCustomizationModal';
// import AddCustomizationCategoryModal from '@/components/admin/AddCustomizationCategoryModal';
// import AvailabilityForFoodItem from '@/components/admin/AvailabilityForFoodItem';
// import VegIcon from '@/components/icons/VegIcon';
// import NonVegIcon from '@/components/icons/NonVegIcon';
// import EggIcon from '@/components/icons/EggIcon';
// import Spinner from '@/components/ui/spinner';
// import DataNotFound from '@/components/admin/DataNotFound';
// import { updateMultiplePreview } from '@/utils/helperFunctions';
// import { addItemSchema } from '@/schema';
// import { useGetApiReq, usePostApiReq } from '@/hooks/useApiReq';

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
// import Spinner from "@/components/Spinner";
// import DataNotFound from "@/components/DataNotFound";
// import MenuTagSelector from "@/components/menu/MenuTagSelector";
// import CreateVariantModel from "@/components/menu/CreateVariantModel";
// import MapAddOnModel from "@/components/menu/MapAddOnModel";
// import AddCustomizationModal from "@/components/menu/AddCustomizationModal";
// import AddCustomizationCategoryModal from "@/components/menu/AddCustomizationCategoryModal";
// import AvailabilityForFoodItem from "@/components/menu/AvailabilityForFoodItem";
// import VegIcon from "@/components/icons/VegIcon";
// import NonVegIcon from "@/components/icons/NonVegIcon";
// import EggIcon from "@/components/icons/EggIcon";
// import useGetApiReq from "@/hooks/useGetApiReq";
// import usePostApiReq from "@/hooks/usePostApiReq";
// import { addItemSchema } from "@/schemas/addItemSchema";
// import { updateMultiplePreview } from "@/lib/utils";
// import {
//   FaPlus,
//   FaMinus,
//   FaTimes,
//   FiUpload,
//   MdKeyboardArrowLeft
// } from "react-icons/all";

const AddMenu = () => {
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
  const [index, setIndex] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
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
  const [groups, setGroups] = useState([]);

  const params = useParams();
  const { state } = useLocation();

  console.log("state", state);

  const form = useForm({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      subCategory: state.subcategoryId || "",
      itemName: "",
      isRecommended: false,
      itemImage: "",
      itemImagePreview: "",
      itemDescription: "",
      cuisine: "",
      foodType: "",
      basePrice: "",
      packagingCharges: "",
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
      variantGroupText: ""
    },
  });

  const { register, control, watch, setValue, getValues } = form;
  console.log("getValues", getValues());

  // useEffect(() => {
  //   setValue("subCategory", state.subcategoryId);
  // }, [state.subcategoryId]);
  const subCategory = watch("subCategory");
  const categoryId = watch("categoryId");

  // useEffect(() => {
  //   if (subCategory) {
  //     navigate(
  //       `/admin/restaurant/${params?.restaurantId}/${subCategory}/addmenu`,
  //       {
  //         state: {
  //           restaurantId: params?.restaurantId,
  //           subcategoryId: subCategory,
  //           categoryId: state.categoryId,
  //         },
  //       }
  //     );
  //   }
  // }, [subCategory]);

  const restaurantRef = register("restaurant");
  const itemImageRef = register("itemImage");
  const restaurant = watch("restaurant");
  const itemImage = watch("itemImage");
  const [subCategories, setSubCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const {
    res: subcategoriesRes,
    fetchData: getSubcategories,
    isLoading: isSubcategoriesLoading,
  } = useGetApiReq();

  const {
    res: getRes,
    fetchData: getData,
    isLoading: isGetLoading,
  } = useGetApiReq();

  const getCategories = () => {
    const url = `/restaurant/get-categories?restaurantId=${params?.restaurantId}`;
    getData(url);
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Enhanced debug logging
  useEffect(() => {
    if (getRes?.status === 200 || getRes?.status === 201) {
      console.log("✅ Full response data:", getRes?.data);

      const categories = getRes?.data?.data?.categories || [];
      console.log("✅ Extracted categories:", categories);
      const modifiedCategories = categories?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }));
      setAllCategories(modifiedCategories || []);
    }
  }, [getRes]);

  const getSubcategoriesFun = () => {
    getSubcategories(
      `/restaurant/${params?.restaurantId}/getSubCatByCat/${categoryId}`
    );
  };

  useEffect(() => {
    categoryId && getSubcategoriesFun();
  }, [categoryId]);

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

    // const modifiedCustomizations = getValues("customizations")?.map(
    //   (customization) => {
    //     return {
    //       name: customization.categoryName,
    //       type: customization.customizationType,
    //       addeddata: customization.customizationOptions,
    //     };
    //   }
    // );
    const customizations = getValues("customizations");
    const modifiedCustomizations = {
      categoryname: customizations[0].categoryName,
      customizationtype: customizations[0].customizationType,
      addeddata: customizations[0].customizationOptions,
    };

    // Enhanced addons with tags
    const addOnsArray = getValues("addOns");

    const modifiedAddOns = addOnsArray?.map((addon) => {
      return {
        id: addon.id,
        name: addon.name,
        price: addon.price,
        isAvailable: addon.isAvailable,
        isVeg: addon.isVeg,
        tags: addon.tags.map((item) => item.id) || [],
        isDefault: addon.isDefault,
      };
    });

    const addOns = [
      {
        groupName: "Extra Proteins",
        chooseMultiple: false,
        maxSelection: 1,
        adonsGroup: modifiedAddOns,
      },
    ];

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
    // discountedPrice
    formData.append("FoodType", data.foodType);
    // restaurantId
    formData.append("cuisine", data.cuisine);
    formData.append("preparationTime", data.preparationTime);
    formData.append("categoryId", categoryId);
    // isAvailable
    // menuTagIds
    // addonTagIds
    formData.append("addOns", JSON.stringify(groups));
    formData.append("variations", JSON.stringify(getValues("variations")));
    formData.append("customizations", JSON.stringify(modifiedCustomizations));
    formData.append("availableTimings", JSON.stringify(availableTimings));

    formData.append("menuTagIds", JSON.stringify(menuTags));

    formData.append("isRecommended", data.isRecommended);
    // Use subcategoryId for the new API structure
    formData.append("subcategoryId", subCategory);

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
              Add Item Details
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
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem className="mt-5">
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {allCategories?.map((category) => (
                                  <SelectItem
                                    key={category?.value}
                                    value={category?.value}
                                  >
                                    {category?.label}
                                  </SelectItem>
                                ))}

                                {allCategories.length === 0 && (
                                  <p>No categories found</p>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {categoryId && (
                        <FormField
                          control={control}
                          name="subCategory"
                          render={({ field }) => (
                            <FormItem className="mt-5">
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
                                  {subCategories.length === 0 && (
                                    <p>No subcategories found</p>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

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

                      <div className="wfull mt-5">
                        <FormField
                          control={form.control}
                          name="isRecommended"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between">
                              <FormLabel>Is Recommended?</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
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
                          <h3 className="text-black class-lg6">
                            Variants (Optional)
                          </h3>
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
                          <FormField
                            control={control}
                            name="variantGroupText"
                            render={({ field }) => (
                              <FormItem className="mb-5">
                                <FormLabel>Variant Group Text</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Variant Group Text"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <button
                            onClick={() => {
                              setIndex(() => null);
                              setIsVariantModalOpen(true);
                            }}
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
                              <div className="grid grid-cols-[60%_auto_auto_auto] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
                                <h4 className="font-inter font-semibold">
                                  Variant Name
                                </h4>
                                <h4 className="font-inter font-semibold">
                                  Price (In Rs)
                                </h4>
                                <h4 className="font-inter font-semibold">
                                  Default
                                </h4>
                                <h4 className="font-inter font-semibold">
                                  Actions
                                </h4>
                              </div>
                              {watch("variations")?.map((variation, i) => (
                                <div
                                  key={i}
                                  className="grid grid-cols-[60%_auto_auto_auto] gap-[2%] border-b border-[#DADADA] py-2"
                                >
                                  <h4 className="font-inter text-[#969696] font-semibold">
                                    {variation?.name}
                                  </h4>
                                  <h4 className="font-inter text-[#969696] font-semibold">
                                    Rs {variation?.price}
                                  </h4>
                                  <h4 className="font-inter text-[#969696] font-semibold">
                                    {variation?.isDefault ? "Yes" : "No"}
                                  </h4>
                                  <div className="font-inter text-[#969696] font-semibold">
                                    <Edit
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setIndex(() => i);
                                        setIsUpdate(() => true);
                                        setIsVariantModalOpen(() => true);
                                      }}
                                    />
                                  </div>
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
                      <div className="hidden">
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
                                                {addon.isVeg
                                                  ? "Veg"
                                                  : "Non-Veg"}
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
                                                      typeof tagData ===
                                                      "object"
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
                                  {newAddon.tags &&
                                    newAddon.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 rounded">
                                        <span className="text-xs text-gray-600">
                                          Selected:
                                        </span>
                                        {newAddon.tags.map((tagObj, index) => (
                                          <span
                                            key={tagObj.id || index}
                                            style={{
                                              backgroundColor:
                                                getTagColor(tagObj),
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
                      <AddonsManager groups={groups} setGroups={setGroups} />
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
                            <Button
                              type="button"
                              onClick={() => {
                                setValue("customizations", []);
                              }}
                            >
                              Clear Customization
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
              index={index}
              isUpdate={isUpdate}
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

export default AddMenu;

//recent best
// const AddMenu = () => {
//   const navigate = useNavigate();
//   const [isItemImageUploadModalOpen, setIsItemImageUploadModalOpen] = useState(false);
//   const [isVariant, setIsVariant] = useState(false);
//   const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
//   const [isMapAddons, setIsMapAddons] = useState(false);
//   const [isMapAddonsModalOpen, setIsMapAddonsModalOpen] = useState(false);
//   const [isAdditionalDetails, setIsAdditionalDetails] = useState(false);
//   const [isServingInfo, setIsServingInfo] = useState(false);
//   const [isCustomization, setIsCustomization] = useState(false);
//   const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
//   const [isCreateVariantModalOpen, setIsCreateVariantModalOpen] = useState(false);
//   const [isAddCustomizationModalOpen, setIsAddCustomizationModalOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [cuisines, setCuisines] = useState([]);
//   const [availabilityForFoodItem, setAvailabilityForFoodItem] = useState(false);

//   // 🔥 ENHANCED: Better state management for tags and addons
//   const [availableTags, setAvailableTags] = useState([]);
//   const [allTags, setAllTags] = useState([]);
//   const [addons, setAddons] = useState([]);
//   const [addonGroups, setAddonGroups] = useState([]);
//   const [menuTags, setMenuTags] = useState([]);
//   const [isTagsLoading, setIsTagsLoading] = useState(false);
//   const [showAddonForm, setShowAddonForm] = useState(false);
//   const [newAddon, setNewAddon] = useState({
//     name: '',
//     price: '',
//     isAvailable: true,
//     isVeg: true,
//     isDefault: false,
//     tags: []
//   });

//   const params = useParams();
//   const { state } = useLocation();

//   const form = useForm({
//     resolver: zodResolver(addItemSchema),
//     defaultValues: {
//       itemName: "",
//       itemImage: "",
//       itemImagePreview: "",
//       itemDescription: "",
//       cuisine: "",
//       foodType: "",
//       basePrice: "",
//       packagingCharges: "",
//       numberOfPeople: "",
//       dishSize: "",
//       preparationTime: "",
//       restaurant: "",
//       tags: [],
//       variations: [],
//       addOns: [],
//       customizations: [],
//       timingType: "sameAsRestaurant",
//       openingTime: "",
//       closingTime: "",
//       days: []
//     }
//   });

//   const { register, control, watch, setValue, getValues } = form;
//   const restaurantRef = register("restaurant");
//   const itemImageRef = register("itemImage");
//   const restaurant = watch("restaurant");
//   const itemImage = watch("itemImage");

//   // 🔥 ENHANCED: Tag fetching from reference code
//   const fetchAllTags = async () => {
//     try {
//       setIsTagsLoading(true);
//       console.log('🔄 Fetching all tags...');

//       const [menuTagsRes, addonTagsRes] = await Promise.all([
//         fetch('/capsicoTag/for-menu', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' }
//         }),
//         fetch('/capsicoTag/for-addon', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' }
//         })
//       ]);

//       const [menuTagsData, addonTagsData] = await Promise.all([
//         menuTagsRes.json(),
//         addonTagsRes.json()
//       ]);

//       console.log('📋 Menu tags response:', menuTagsData);
//       console.log('📋 Addon tags response:', addonTagsData);

//       const menuTags = menuTagsData.data || [];
//       const addonTags = addonTagsData.data || [];

//       setAvailableTags(Array.isArray(addonTags) ? addonTags : []);

//       const combinedTags = [
//         ...(Array.isArray(menuTags) ? menuTags : []),
//         ...(Array.isArray(addonTags) ? addonTags : [])
//       ];

//       setAllTags(combinedTags);

//     } catch (error) {
//       console.error('❌ Error fetching tags:', error);
//     } finally {
//       setIsTagsLoading(false);
//     }
//   };

//   const handleMenuTagsChange = (tags) => {
//     setMenuTags(tags);
//     setValue('tags', tags);
//   };

//   const handleTagsChange = (selectedTagIdsOrObjs = []) => {
//     const tagObjects = selectedTagIdsOrObjs.map((t) => {
//       if (t && typeof t === "object" && t.id) {
//         const flatId = typeof t.id === "object" ? t.id.id : t.id;
//         return { id: flatId, name: t.name, color: t.color };
//       }
//       const tagId = String(t);
//       const found =
//         availableTags.find(x => (x.id || x._id)?.toString() === tagId) ||
//         allTags.find(x => (x.id || x._id)?.toString() === tagId);
//       return found
//         ? { id: found.id || found._id, name: found.displayName || found.name, color: found.color }
//         : { id: tagId, name: "Tag" };
//     });
//     setNewAddon(prev => ({ ...prev, tags: tagObjects }));
//   };

//   const handleInputChange = (field, value) => {
//     setNewAddon(prev => ({ ...prev, [field]: value }));
//   };

//   const handleAddAddon = () => {
//     if (!newAddon.name.trim() || !newAddon.price) {
//       alert('Please fill in addon name and price');
//       return;
//     }

//     const addon = {
//       id: Date.now().toString(),
//       name: newAddon.name.trim(),
//       price: parseFloat(newAddon.price),
//       isAvailable: newAddon.isAvailable,
//       isVeg: newAddon.isVeg,
//       tags: newAddon.tags,
//       isDefault: newAddon.isDefault
//     };

//     const updatedAddons = [...addons, addon];
//     setAddons(updatedAddons);
//     setValue('addOns', updatedAddons);

//     setNewAddon({
//       name: '',
//       price: '',
//       isAvailable: true,
//       isVeg: true,
//       isDefault: false,
//       tags: []
//     });
//     setShowAddonForm(false);
//   };

//   const handleRemoveAddon = (addonId) => {
//     const updatedAddons = addons.filter(addon => addon.id !== addonId);
//     setAddons(updatedAddons);
//     setValue('addOns', updatedAddons);
//   };

//   const getTagName = (tagData) => {
//     if (tagData && typeof tagData === "object") return tagData.name || "Tag";
//     const tagId = String(tagData);
//     const found =
//       availableTags.find((t) => t.id?.toString() === tagId) ||
//       allTags.find((t) => t.id?.toString() === tagId);
//     return found ? (found.name || found.displayName) : "Tag";
//   };

//   const getTagColor = (tagData) => {
//     let tagId = null;
//     if (tagData && typeof tagData === "object") {
//       tagId = typeof tagData.id === "object" ? tagData.id.id : tagData.id;
//     } else {
//       tagId = String(tagData);
//     }

//     const found =
//       availableTags.find(t => (t.id || t._id)?.toString() === String(tagId)) ||
//       allTags.find(t => (t.id || t._id)?.toString() === String(tagId));

//     return found?.color || "#6b7280";
//   };

//   const displayExistingAddons = () => {
//     const existingAddons = getValues('addOns') || [];

//     if (!Array.isArray(existingAddons) || existingAddons.length === 0) {
//       return null;
//     }

//     return (
//       <div className="mb-6">
//         <h4 className="font-inter text-[#969696] font-semibold mb-3">Existing Addons:</h4>
//         <div className="space-y-3">
//           {existingAddons.map((addon, index) => (
//             <div key={addon.id || addon._id || index} className="bg-gray-50 p-4 rounded-lg border">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h5 className="font-semibold text-lg">{addon.name}</h5>
//                     <span className="text-lg font-bold text-green-600">₹{addon.price}</span>
//                     <div className="flex gap-2">
//                       <span className={`px-2 py-1 rounded-full text-xs ${addon.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                         {addon.isVeg ? 'Veg' : 'Non-Veg'}
//                       </span>
//                       <span className={`px-2 py-1 rounded-full text-xs ${addon.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
//                         {addon.isAvailable ? 'Available' : 'Unavailable'}
//                       </span>
//                       {addon.isDefault && (
//                         <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
//                           Default
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {addon.tags && Array.isArray(addon.tags) && addon.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-1 mb-2">
//                       {addon.tags.map((tagData, tagIndex) => {
//                         const tagName = getTagName(tagData);
//                         const tagColor = getTagColor(tagData);
//                         const tagId = typeof tagData === 'object' ? tagData.id : tagData;

//                         return (
//                           <span
//                             key={tagId || tagIndex}
//                             style={{ backgroundColor: tagColor }}
//                             className="text-white px-2 py-1 rounded-full text-xs font-medium"
//                             title={`Tag: ${tagName} (ID: ${tagId})`}
//                           >
//                             {tagName}
//                           </span>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => handleRemoveAddon(addon.id)}
//                   className="text-red-500 hover:text-red-700 ml-4"
//                 >
//                   <FaTimes size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     updateMultiplePreview(restaurant, "restaurantPreview", setValue);
//     updateMultiplePreview(itemImage, "itemImagePreview", setValue);
//   }, [form, restaurant, itemImage, setValue]);

//   useEffect(() => {
//     if (isMapAddons) {
//       fetchAllTags();
//       const existingAddons = getValues('addOns') || [];
//       setAddons(existingAddons);
//     }
//   }, [isMapAddons, getValues]);

//   const handleCustomization = (index) => {
//     setCurrentIndex(index);
//     setIsAddCustomizationModalOpen(true);
//   };

//   const { res, fetchData, isLoading } = useGetApiReq();

//   const getCuisines = () => {
//     fetchData("/admin/get-cuisines");
//   };

//   useEffect(() => {
//     getCuisines();
//   }, []);

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("get cuisines res", res);
//       setCuisines(res?.data?.data?.cuisines);
//     }
//   }, [res]);

//   const { res: addItemRes, fetchData: fetchAddItemData, isLoading: isAddItemLoading } = usePostApiReq();

//   // 🔥 OPTIMIZED: Taking the working onSubmit from reference with enhanced error handling
//   const onSubmit = (data) => {
//     console.log("🚀 Starting form submission...");
//     console.log("📋 Form data:", data);
//     console.log("🏪 Restaurant ID:", state?.restaurantId);

//     const availableTimings = {
//       sameAsRestaurant: data.timingType === "sameAsRestaurant",
//       start: data.openingTime,
//       end: data.closingTime,
//       days: data.days,
//     };

//     const modifiedCustomizations = getValues("customizations")?.map((customization) => {
//       return {
//         name: customization.categoryName,
//         type: customization.customizationType,
//         options: customization.customizationOptions,
//       };
//     });

//     // 🔥 Enhanced addons with tags from reference code
//     const modifiedAddOns = getValues("addOns")?.map((addon) => {
//       return {
//         id: addon.id,
//         name: addon.name,
//         price: addon.price,
//         isAvailable: addon.isAvailable,
//         isVeg: addon.isVeg,
//         tags: addon.tags || [],
//         isDefault: addon.isDefault
//       };
//     });

//     console.log('📦 Prepared data:', {
//       availableTimings,
//       modifiedCustomizations: modifiedCustomizations?.length || 0,
//       modifiedAddOns: modifiedAddOns?.length || 0,
//       menuTags: menuTags?.length || 0
//     });

//     // 🔥 Create FormData exactly like working reference
//     const formData = new FormData();
//     formData.append("name", data.itemName);
//     formData.append("description", data.itemDescription);
//     formData.append("price", data.basePrice);
//     formData.append("FoodType", data.foodType);
//     formData.append("cuisine", data.cuisine);
//     formData.append("preparationTime", data.preparationTime);
//     formData.append("categoryId", params?.categoryId);
//     formData.append("availableTimings", JSON.stringify(availableTimings));
//     formData.append("tags", JSON.stringify(menuTags));
//     formData.append("variations", JSON.stringify(getValues("variations")));
//     formData.append("addOns", JSON.stringify(modifiedAddOns));
//     formData.append("customizations", JSON.stringify(modifiedCustomizations));

//     // Add images with field name "images" (matching multer config)
//     Array.from(data.itemImage).forEach((image) => {
//       formData.append("images", image);
//     });

//     console.log('📦 FormData created, making API call...');

//     // 🔥 Use the working API call from reference code
//     fetchAddItemData(`/admin/add-menu-item/${state?.restaurantId}`, formData);
//   };

//   useEffect(() => {
//     if (addItemRes?.status === 200 || addItemRes?.status === 201) {
//       console.log("✅ Menu item added successfully:", addItemRes);
//       navigate(`/admin/restaurant/${state?.restaurantId}/menu`);
//     } else if (addItemRes?.status === 403) {
//       console.error("❌ 403 Forbidden - Authentication failed");
//       alert("Access denied. Please check your login status.");
//     } else if (addItemRes?.status === 401) {
//       console.error("❌ 401 Unauthorized - Token expired");
//       alert("Session expired. Please log in again.");
//     } else if (addItemRes?.status && addItemRes.status >= 400) {
//       console.error("❌ API Error:", addItemRes);
//       alert(`Error: ${addItemRes?.data?.message || 'Failed to add menu item'}`);
//     }
//   }, [addItemRes]);

//   return (
//     <AdminWrapper>
//       <section className='px-0 py-0 w-full h-full min-h-screen'>
//         <div className='flex justify-start items-center mb-4'>
//           <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
//           <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurant</h2>
//         </div>
//         <div className='bg-[#FFFFFF]'>
//           <div className='px-10 bg-[#FFFFFF] border-b-[1px] border-b-[#CDCDCD]'>
//             <h1 className='text-[#000000] text-2xl font-semibold font-inter py-8'>Add Item Details</h1>
//           </div>
//           <div className='mb-4 py-4'>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//                 <div>
//                   {/* Basic Details Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h3 className='text-[#000000] text-xl font-semibold font-inter'>Basic Details</h3>

//                       {/* Item Name */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="itemName"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Item Name</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="Enter Dish Name"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Item Description */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="itemDescription"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Item Description</FormLabel>
//                               <FormControl>
//                                 <Textarea className="resize-none" placeholder="Add a detailed description explaining the dish"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Food Type */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="foodType"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Food Type</FormLabel>
//                               <FormControl>
//                                 <RadioGroup
//                                   onValueChange={field.onChange}
//                                   defaultValue={field.value}
//                                   className="flex"
//                                 >
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="veg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <VegIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "veg" && "text-[#3579F0]"}`}>Veg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="non-veg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "non-veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <NonVegIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "non-veg" && "text-[#3579F0]"}`}>Non-Veg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="egg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "egg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <EggIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "egg" && "text-[#3579F0]"}`}>Egg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                 </RadioGroup>
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Preparation Time */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="preparationTime"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Preparation Time</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Preparation Time (in minutes)"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Item Photos */}
//                       <div className="mt-5">
//                         <Label>Item Photos</Label>
//                         <FormField
//                           control={control}
//                           name="itemImage"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel className="cursor-pointer left-0 w-full h-full top-0">
//                                 <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">Change</span>
//                                 {!watch("itemImagePreview") &&
//                                   <div className='border-2 mt-2 flex flex-col bg-[#F7FAFF] items-center justify-center primary-color w-40 h-40 rounded-md px-5 py-4'>
//                                     <FiUpload size={25} />
//                                     <p className='font-semibold text-center primary-color text-sm mt-2'>Upload</p>
//                                   </div>
//                                 }
//                                 {watch("itemImagePreview")?.length > 0 && (
//                                   <div className="flex gap-4 flex-wrap mt-5">
//                                     {watch("itemImagePreview").map((image, index) => (
//                                       <img key={index} className="w-40" src={image} alt={`Preview ${index + 1}`} />
//                                     ))}
//                                   </div>
//                                 )}
//                               </FormLabel>
//                               <FormControl className="hidden">
//                                 <Input multiple={true} type="file" {...itemImageRef} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Item Pricing Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h2 className="class-lg6 text-black">Item Pricing</h2>

//                       <div className="bg-[#F7FAFF] py-4 px-6 rounded-lg mt-2">
//                         <h2 className="class-base6 text-black">Customers trust brands with fair pricing</h2>
//                         <p className="class-sm2 text-[#757575]">Keep same prices across menus offered for online ordering.</p>
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="basePrice"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Base price</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Enter Base price of dish"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="packagingCharges"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Packaging charges</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Enter packaging charges"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="bg-[#F7FAFF] py-3 px-6 rounded-lg mt-5">
//                         <h2 className="class-base6 text-black">Please make sure that your offline and online prices match</h2>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Variants Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsVariant(!isVariant)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Variants</h3>
//                           {isVariant ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>You can offer variations of a item, such as size/ base/ crust, etc. When customers place an order, they must choose at least one from the defined variants.</p>
//                       </div>
//                       {isVariant &&
//                         <>
//                           <button onClick={() => setIsVariantModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md">
//                             <FaPlus className="text-base" />
//                             <p className="font-semibold text-lg">Create new Variant</p>
//                           </button>
//                           {watch("variations").length > 0 &&
//                             <div className="mt-5">
//                               <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                 <h4 className="font-inter text-[#969696] font-semibold">Variant Name</h4>
//                                 <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                               </div>
//                               {watch("variations")?.map((variation, i) => (
//                                 <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                   <h4 className="font-inter text-[#969696] font-semibold">{variation?.name}</h4>
//                                   <h4 className="font-inter text-[#969696] font-semibold">Rs {variation?.price}</h4>
//                                 </div>))}
//                             </div>
//                           }
//                         </>
//                       }
//                     </div>
//                   </div>

//                   {/* Menu Tags Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h3 className='text-[#000000] text-xl font-semibold font-inter mb-4'>Menu Tags</h3>
//                       <p className="text-gray-600 text-sm mb-4">
//                         Add tags to help categorize and highlight your menu items
//                       </p>

//                       <MenuTagSelector
//                         selectedTags={menuTags}
//                         onTagsChange={handleMenuTagsChange}
//                         tagType="menu"
//                         className="w-full"
//                       />
//                     </div>
//                   </div>

//                   {/* Map Addons Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsMapAddons(!isMapAddons)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Map Addons</h3>
//                           {isMapAddons ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add-ons enhance the customer experience by offering extra choices like toppings or desserts.</p>
//                       </div>
//                       {isMapAddons &&
//                         <div className="space-y-6">
//                           {displayExistingAddons()}

//                           {/* Enhanced Addons Display */}
//                           {addons.length > 0 && (
//                             <div>
//                               <h4 className="font-inter text-[#969696] font-semibold mb-3">Current Addons:</h4>
//                               <div className="space-y-3">
//                                 {addons.map((addon) => (
//                                   <div key={addon.id} className="bg-gray-50 p-4 rounded-lg border">
//                                     <div className="flex justify-between items-start">
//                                       <div className="flex-1">
//                                         <div className="flex items-center gap-3 mb-2">
//                                           <h5 className="font-semibold text-lg">{addon.name}</h5>
//                                           <span className="text-lg font-bold text-green-600">₹{addon.price}</span>
//                                           <div className="flex gap-2">
//                                             <span className={`px-2 py-1 rounded-full text-xs ${addon.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                                               {addon.isVeg ? 'Veg' : 'Non-Veg'}
//                                             </span>
//                                             <span className={`px-2 py-1 rounded-full text-xs ${addon.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
//                                               {addon.isAvailable ? 'Available' : 'Unavailable'}
//                                             </span>
//                                             {addon.isDefault && (
//                                               <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
//                                                 Default
//                                               </span>
//                                             )}
//                                           </div>
//                                         </div>

//                                         {/* Tags display with proper names */}
//                                         {addon.tags && addon.tags.length > 0 && (
//                                           <div className="flex flex-wrap gap-1 mb-2">
//                                             {addon.tags.map((tagData, tagIndex) => {
//                                               const tagName = getTagName(tagData);
//                                               const tagColor = getTagColor(tagData);
//                                               const tagId = typeof tagData === 'object' ? tagData.id : tagData;

//                                               return (
//                                                 <span
//                                                   key={tagId || tagIndex}
//                                                   style={{ backgroundColor: tagColor }}
//                                                   className="text-white px-2 py-1 rounded-full text-xs font-medium"
//                                                 >
//                                                   {tagName}
//                                                 </span>
//                                               );
//                                             })}
//                                           </div>
//                                         )}
//                                       </div>

//                                       <button
//                                         onClick={() => handleRemoveAddon(addon.id)}
//                                         className="text-red-500 hover:text-red-700 ml-4"
//                                       >
//                                         <FaTimes size={16} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* Add New Addon Form */}
//                           {showAddonForm && (
//                             <div className="bg-white border-2 border-dashed border-[#4A67FF] rounded-lg p-6 space-y-4">
//                               <h4 className="font-inter text-[#4A67FF] font-semibold text-lg mb-4">Add New Addon</h4>

//                               {/* Addon Name */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                                 <input
//                                   type="text"
//                                   value={newAddon.name}
//                                   onChange={(e) => handleInputChange('name', e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
//                                   placeholder="e.g., Extra Paneer"
//                                 />
//                               </div>

//                               {/* Addon Price */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
//                                 <input
//                                   type="number"
//                                   value={newAddon.price}
//                                   onChange={(e) => handleInputChange('price', e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
//                                   placeholder="50"
//                                   min="0"
//                                   step="0.01"
//                                 />
//                               </div>

//                               {/* Checkboxes */}
//                               <div className="flex gap-6">
//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isAvailable}
//                                     onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Available
//                                 </label>

//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isVeg}
//                                     onChange={(e) => handleInputChange('isVeg', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Vegetarian
//                                 </label>

//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isDefault}
//                                     onChange={(e) => handleInputChange('isDefault', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Set as Default
//                                 </label>
//                               </div>

//                               {/* Tags Section */}
//                               <div className="mt-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>

//                                 {/* Show currently selected tags */}
//                                 {newAddon.tags && newAddon.tags.length > 0 && (
//                                   <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 rounded">
//                                     <span className="text-xs text-gray-600">Selected:</span>
//                                     {newAddon.tags.map((tagObj, index) => (
//                                       <span
//                                         key={tagObj.id || index}
//                                         style={{ backgroundColor: getTagColor(tagObj) }}
//                                         className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-medium"
//                                       >
//                                         {tagObj.name}
//                                         <button
//                                           type="button"
//                                           onClick={(e) => {
//                                             e.preventDefault();
//                                             const updatedTags = newAddon.tags.filter((_, i) => i !== index);
//                                             setNewAddon(prev => ({ ...prev, tags: updatedTags }));
//                                           }}
//                                           className="hover:bg-black/20 rounded-full p-0.5 ml-1"
//                                         >
//                                           <FaTimes size={10} />
//                                         </button>
//                                       </span>
//                                     ))}
//                                   </div>
//                                 )}

//                                 {/* MenuTagSelector */}
//                                 <MenuTagSelector
//                                   selectedTags={newAddon.tags.map(tag => tag.id)}
//                                   onTagsChange={handleTagsChange}
//                                   tagType="addon"
//                                   className="w-full"
//                                 />
//                               </div>

//                               {/* Form Actions */}
//                               <div className="flex gap-3 pt-4">
//                                 <button
//                                   type="button"
//                                   onClick={handleAddAddon}
//                                   className="bg-[#4A67FF] text-white px-6 py-2 rounded-md hover:bg-[#3651E6] flex-1"
//                                 >
//                                   Add Addon
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setShowAddonForm(false);
//                                     setNewAddon({
//                                       name: '',
//                                       price: '',
//                                       isAvailable: true,
//                                       isVeg: true,
//                                       isDefault: false,
//                                       tags: []
//                                     });
//                                   }}
//                                   className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           )}

//                           {/* Create Addon Buttons */}
//                           <button onClick={() => setIsMapAddonsModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF] mb-4">
//                             <FaPlus className="text-base" />
//                             <p className="font-semibold text-lg">Create new Add on group (Modal)</p>
//                           </button>

//                           {!showAddonForm && (
//                             <button
//                               type="button"
//                               className="bg-[#F8F9FC] text-[#4A67FF] p-4 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF]"
//                               onClick={() => setShowAddonForm(true)}
//                             >
//                               <FaPlus className="text-base" />
//                               <p className="font-semibold text-lg">Create new Add on with Tags</p>
//                             </button>
//                           )}

//                           {/* Display Current Addons in List Format */}
//                           {watch("addOns").length > 0 && (
//                             <div className="mt-5">
//                               <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                 <h4 className="font-inter text-[#969696] font-semibold">AddOn Name</h4>
//                                 <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                               </div>
//                               {watch("addOns")?.map((addon, i) => (
//                                 <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                   <h4 className="font-inter text-[#969696] font-semibold">{addon?.name}</h4>
//                                   <h4 className="font-inter text-[#969696] font-semibold">Rs {addon?.price}</h4>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Additional Details Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsAdditionalDetails(!isAdditionalDetails)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Additional Details</h3>
//                           {isAdditionalDetails ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add Cuisine</p>
//                       </div>
//                       {isAdditionalDetails &&
//                         <div className="border border-[#A8A8A8] p-5 w-full rounded-md">
//                           <h3 className="text-black class-lg6">Cuisine</h3>

//                           {cuisines.length === 0 && isLoading &&
//                             <Spinner />
//                           }

//                           {cuisines.length === 0 && !isLoading &&
//                             <DataNotFound name="Cuisines" />
//                           }

//                           {cuisines.length > 0 &&
//                             <div className="flex items-center gap-2">
//                               <FormField
//                                 control={control}
//                                 name="cuisine"
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel></FormLabel>
//                                     <FormControl>
//                                       <RadioGroup
//                                         onValueChange={field.onChange}
//                                         defaultValue={field.value}
//                                         className="flex flex-wrap gap-3"
//                                       >
//                                         {cuisines?.map((cuisine) => (
//                                           <FormItem key={cuisine?._id} className="flex items-center space-y-0">
//                                             <FormControl className="hidden">
//                                               <RadioGroupItem value={cuisine?._id} />
//                                             </FormControl>
//                                             <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === cuisine?._id && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                               <p>{cuisine?.name}</p>
//                                             </FormLabel>
//                                           </FormItem>
//                                         ))}
//                                       </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>
//                           }
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Serving Info Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsServingInfo(!isServingInfo)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Serving Info</h3>
//                           {isServingInfo ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add serving sizes to improve customer experience.</p>
//                       </div>
//                       {isServingInfo &&
//                         <div className="grid grid-cols-2 items-center gap-2 w-full">
//                           <FormField
//                             control={control}
//                             name="numberOfPeople"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Number of people</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Select appropriate serving info"  {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={control}
//                             name="dishSize"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Dish size</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Enter quantity"  {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Customization Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsCustomization(!isCustomization)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Customization</h3>
//                           <div className="flex items-center gap-3">
//                             <Button type="button" onClick={() => setIsCustomizationModalOpen(true)} variant="outline" className="flex gap-1 px-5 items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
//                               <FaPlus />
//                               Add More
//                             </Button>
//                             {isCustomization ? <FaMinus className="text-black" size={20} />
//                               : <FaPlus className="text-black" size={20} />}
//                           </div>
//                         </div>
//                         <p>Customization for category</p>
//                       </div>
//                       {isCustomization &&
//                         <div className="w-full flex flex-col gap-4">
//                           {watch("customizations")?.map((customization, i) => (
//                             <div key={i} className="w-full">
//                               <div className="flex justify-between items-center gap-4">
//                                 <h3 className="font-inter text-lg text-[#969696] font-semibold">{customization?.categoryName}</h3>
//                                 <Button type="button" onClick={() => handleCustomization(i)} variant="outline" className="flex gap-1 w-[200px] items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
//                                   <FaPlus />
//                                   Add Customization
//                                 </Button>
//                               </div>
//                               {customization?.customizationOptions &&
//                                 customization?.customizationOptions.length > 0 &&
//                                 <div className="px-4">
//                                   <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                     <h4 className="font-inter text-[#969696] font-semibold">Customization Name</h4>
//                                     <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                                   </div>
//                                   {customization?.customizationOptions?.map((option, i) => (
//                                     <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                       <h4 className="font-inter text-[#969696] font-semibold">{option?.name}</h4>
//                                       <h4 className="font-inter text-[#969696] font-semibold">Rs {option?.price}</h4>
//                                     </div>))}
//                                 </div>}
//                             </div>
//                           ))}
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Availability for Food Item Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setAvailabilityForFoodItem(!availabilityForFoodItem)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Availability for food item</h3>
//                           {availabilityForFoodItem ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Availability for <b>food item</b></p>
//                       </div>
//                       {availabilityForFoodItem &&
//                         <AvailabilityForFoodItem form={form} />
//                       }
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Submit Buttons */}
//                 <div className='flex gap-5 bg-[#FFFFFF] w-full p-4'>
//                   <button type='button' className='h-[68px] w-full text-[#F97474] text-xl font-semibold font-inter bg-[#FFFFFF] rounded-lg border-[1px] border-[#256FEF]'>Discard</button>
//                   <button
//                     type="submit"
//                     disabled={isAddItemLoading}
//                     className='h-[68px] w-full text-[#FFFFFF] text-xl font-semibold font-inter bg-[#256FEF] rounded-lg border-[1px] border-[#256FEF] disabled:opacity-50'
//                   >
//                     {isAddItemLoading ? 'Saving...' : 'Save changes'}
//                   </button>
//                 </div>
//               </form>
//             </Form>
//           </div>

//           {/* Modal Components */}
//           {isVariantModalOpen &&
//             <CreateVariantModel
//               isVariantModalOpen={isVariantModalOpen}
//               setIsVariantModalOpen={setIsVariantModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }

//           {isMapAddonsModalOpen &&
//             <MapAddOnModel
//               isMapAddonsModalOpen={isMapAddonsModalOpen}
//               setIsMapAddonsModalOpen={setIsMapAddonsModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }

//           {isAddCustomizationModalOpen &&
//             <AddCustomizationModal
//               isAddCustomizationModalOpen={isAddCustomizationModalOpen}
//               setIsAddCustomizationModalOpen={setIsAddCustomizationModalOpen}
//               currentIndex={currentIndex}
//               setValue1={setValue}
//               getValues1={getValues}
//             />
//           }

//           {isCustomizationModalOpen &&
//             <AddCustomizationCategoryModal
//               isCustomizationModalOpen={isCustomizationModalOpen}
//               setIsCustomizationModalOpen={setIsCustomizationModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }
//         </div>
//       </section>
//     </AdminWrapper>
//   );
// };

// export default AddMenu;

//best code

// const AddMenu = () => {
//   const navigate = useNavigate();
//   const [isItemImageUploadModalOpen, setIsItemImageUploadModalOpen] = useState(false);
//   const [isVariant, setIsVariant] = useState(false);
//   const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
//   const [isMapAddons, setIsMapAddons] = useState(false);
//   const [isMapAddonsModalOpen, setIsMapAddonsModalOpen] = useState(false);
//   const [isAdditionalDetails, setIsAdditionalDetails] = useState(false);
//   const [isServingInfo, setIsServingInfo] = useState(false);
//   const [isCustomization, setIsCustomization] = useState(false);
//   const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
//   const [isCreateVariantModalOpen, setIsCreateVariantModalOpen] = useState(false);
//   const [isAddCustomizationModalOpen, setIsAddCustomizationModalOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [cuisines, setCuisines] = useState([]);
//   const [availabilityForFoodItem, setAvailabilityForFoodItem] = useState(false);

//   // 🔥 ENHANCED: Better state management for tags and addons
//   const [availableTags, setAvailableTags] = useState([]);
//   const [allTags, setAllTags] = useState([]);
//   const [addons, setAddons] = useState([]);
//   const [addonGroups, setAddonGroups] = useState([]);
//   const [menuTags, setMenuTags] = useState([]);
//   const [isTagsLoading, setIsTagsLoading] = useState(false);
//   const [showAddonForm, setShowAddonForm] = useState(false);
//   const [newAddon, setNewAddon] = useState({
//     name: '',
//     price: '',
//     isAvailable: true,
//     isVeg: true,
//     isDefault: false,
//     tags: []
//   });

//   const params = useParams();
//   const { state } = useLocation();

//   const form = useForm({
//     resolver: zodResolver(addItemSchema),
//     defaultValues: {
//       itemName: "",
//       itemImage: "",
//       itemImagePreview: "",
//       itemDescription: "",
//       cuisine: "",
//       foodType: "",
//       basePrice: "",
//       packagingCharges: "",
//       numberOfPeople: "",
//       dishSize: "",
//       preparationTime: "",
//       restaurant: "",
//       tags: [],
//       variations: [],
//       addOns: [],
//       customizations: [],
//       timingType: "sameAsRestaurant",
//       openingTime: "",
//       closingTime: "",
//       days: []
//     }
//   });

//   const { register, control, watch, setValue, getValues } = form;
//   const restaurantRef = register("restaurant");
//   const itemImageRef = register("itemImage");
//   const restaurant = watch("restaurant");
//   const itemImage = watch("itemImage");

//   // 🔥 ENHANCED: Tag fetching
//   const fetchAllTags = async () => {
//     try {
//       setIsTagsLoading(true);
//       console.log('🔄 Fetching all tags...');

//       const [menuTagsRes, addonTagsRes] = await Promise.all([
//         fetch('/capsicoTag/for-menu', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' }
//         }),
//         fetch('/capsicoTag/for-addon', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' }
//         })
//       ]);

//       const [menuTagsData, addonTagsData] = await Promise.all([
//         menuTagsRes.json(),
//         addonTagsRes.json()
//       ]);

//       console.log('📋 Menu tags response:', menuTagsData);
//       console.log('📋 Addon tags response:', addonTagsData);

//       const menuTags = menuTagsData.data || [];
//       const addonTags = addonTagsData.data || [];

//       setAvailableTags(Array.isArray(addonTags) ? addonTags : []);

//       const combinedTags = [
//         ...(Array.isArray(menuTags) ? menuTags : []),
//         ...(Array.isArray(addonTags) ? addonTags : [])
//       ];

//       setAllTags(combinedTags);

//     } catch (error) {
//       console.error('❌ Error fetching tags:', error);
//     } finally {
//       setIsTagsLoading(false);
//     }
//   };

//   const handleMenuTagsChange = (tags) => {
//     setMenuTags(tags);
//     setValue('tags', tags);
//   };

//   const handleTagsChange = (selectedTagIdsOrObjs = []) => {
//     const tagObjects = selectedTagIdsOrObjs.map((t) => {
//       if (t && typeof t === "object" && t.id) {
//         const flatId = typeof t.id === "object" ? t.id.id : t.id;
//         return { id: flatId, name: t.name, color: t.color };
//       }
//       const tagId = String(t);
//       const found =
//         availableTags.find(x => (x.id || x._id)?.toString() === tagId) ||
//         allTags.find(x => (x.id || x._id)?.toString() === tagId);
//       return found
//         ? { id: found.id || found._id, name: found.displayName || found.name, color: found.color }
//         : { id: tagId, name: "Tag" };
//     });
//     setNewAddon(prev => ({ ...prev, tags: tagObjects }));
//   };

//   const handleInputChange = (field, value) => {
//     setNewAddon(prev => ({ ...prev, [field]: value }));
//   };

//   const handleAddAddon = () => {
//     if (!newAddon.name.trim() || !newAddon.price) {
//       alert('Please fill in addon name and price');
//       return;
//     }

//     const addon = {
//       id: Date.now().toString(),
//       name: newAddon.name.trim(),
//       price: parseFloat(newAddon.price),
//       isAvailable: newAddon.isAvailable,
//       isVeg: newAddon.isVeg,
//       tags: newAddon.tags,
//       isDefault: newAddon.isDefault
//     };

//     const updatedAddons = [...addons, addon];
//     setAddons(updatedAddons);
//     setValue('addOns', updatedAddons);

//     setNewAddon({
//       name: '',
//       price: '',
//       isAvailable: true,
//       isVeg: true,
//       isDefault: false,
//       tags: []
//     });
//     setShowAddonForm(false);
//   };

//   const handleRemoveAddon = (addonId) => {
//     const updatedAddons = addons.filter(addon => addon.id !== addonId);
//     setAddons(updatedAddons);
//     setValue('addOns', updatedAddons);
//   };

//   const getTagName = (tagData) => {
//     if (tagData && typeof tagData === "object") return tagData.name || "Tag";
//     const tagId = String(tagData);
//     const found =
//       availableTags.find((t) => t.id?.toString() === tagId) ||
//       allTags.find((t) => t.id?.toString() === tagId);
//     return found ? (found.name || found.displayName) : "Tag";
//   };

//   const getTagColor = (tagData) => {
//     let tagId = null;
//     if (tagData && typeof tagData === "object") {
//       tagId = typeof tagData.id === "object" ? tagData.id.id : tagData.id;
//     } else {
//       tagId = String(tagData);
//     }

//     const found =
//       availableTags.find(t => (t.id || t._id)?.toString() === String(tagId)) ||
//       allTags.find(t => (t.id || t._id)?.toString() === String(tagId));

//     return found?.color || "#6b7280";
//   };

//   const displayExistingAddons = () => {
//     const existingAddons = getValues('addOns') || [];

//     if (!Array.isArray(existingAddons) || existingAddons.length === 0) {
//       return null;
//     }

//     return (
//       <div className="mb-6">
//         <h4 className="font-inter text-[#969696] font-semibold mb-3">Existing Addons:</h4>
//         <div className="space-y-3">
//           {existingAddons.map((addon, index) => (
//             <div key={addon.id || addon._id || index} className="bg-gray-50 p-4 rounded-lg border">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h5 className="font-semibold text-lg">{addon.name}</h5>
//                     <span className="text-lg font-bold text-green-600">₹{addon.price}</span>
//                     <div className="flex gap-2">
//                       <span className={`px-2 py-1 rounded-full text-xs ${addon.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                         {addon.isVeg ? 'Veg' : 'Non-Veg'}
//                       </span>
//                       <span className={`px-2 py-1 rounded-full text-xs ${addon.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
//                         {addon.isAvailable ? 'Available' : 'Unavailable'}
//                       </span>
//                       {addon.isDefault && (
//                         <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
//                           Default
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {addon.tags && Array.isArray(addon.tags) && addon.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-1 mb-2">
//                       {addon.tags.map((tagData, tagIndex) => {
//                         const tagName = getTagName(tagData);
//                         const tagColor = getTagColor(tagData);
//                         const tagId = typeof tagData === 'object' ? tagData.id : tagData;

//                         return (
//                           <span
//                             key={tagId || tagIndex}
//                             style={{ backgroundColor: tagColor }}
//                             className="text-white px-2 py-1 rounded-full text-xs font-medium"
//                             title={`Tag: ${tagName} (ID: ${tagId})`}
//                           >
//                             {tagName}
//                           </span>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => handleRemoveAddon(addon.id)}
//                   className="text-red-500 hover:text-red-700 ml-4"
//                 >
//                   <FaTimes size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     updateMultiplePreview(restaurant, "restaurantPreview", setValue);
//     updateMultiplePreview(itemImage, "itemImagePreview", setValue);
//   }, [form, restaurant, itemImage, setValue]);

//   useEffect(() => {
//     if (isMapAddons) {
//       fetchAllTags();
//       const existingAddons = getValues('addOns') || [];
//       setAddons(existingAddons);
//     }
//   }, [isMapAddons, getValues]);

//   const handleCustomization = (index) => {
//     setCurrentIndex(index);
//     setIsAddCustomizationModalOpen(true);
//   };

//   const { res, fetchData, isLoading } = useGetApiReq();

//   const getCuisines = () => {
//     fetchData("/admin/get-cuisines");
//   };

//   useEffect(() => {
//     getCuisines();
//   }, []);

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("get cuisines res", res);
//       setCuisines(res?.data?.data?.cuisines);
//     }
//   }, [res]);

//   const { res: addItemRes, fetchData: fetchAddItemData, isLoading: isAddItemLoading } = usePostApiReq();

//   // 🔥 COMPLETELY UPDATED: Enhanced onSubmit with authentication and debugging
//   const onSubmit = async (data) => {
//     console.log("🚀 Starting form submission...");
//     console.log("📋 Form data:", data);
//     console.log("🏪 Restaurant ID:", state?.restaurantId);

//     try {
//       // 🔥 STEP 1: Check authentication token
//       const token = localStorage.getItem('token') ||
//                     localStorage.getItem('authToken') ||
//                     localStorage.getItem('accessToken') ||
//                     sessionStorage.getItem('token') ||
//                     sessionStorage.getItem('authToken');

//       if (!token) {
//         alert('❌ No authentication token found. Please log in again.');
//         console.error('❌ Authentication token missing');
//         return;
//       }

//       console.log('✅ Token found:', token ? 'Yes' : 'No');
//       console.log('🔑 Token preview (first 20 chars):', token.substring(0, 20) + '...');

//       // 🔥 STEP 2: Prepare data structure
//       const availableTimings = {
//         sameAsRestaurant: data.timingType === "sameAsRestaurant",
//         start: data.openingTime,
//         end: data.closingTime,
//         days: data.days,
//       };

//       const modifiedCustomizations = getValues("customizations")?.map((customization) => {
//         return {
//           name: customization.categoryName,
//           type: customization.customizationType,
//           options: customization.customizationOptions,
//         };
//       });

//       // Enhanced addons with proper structure for backend
//       const modifiedAddOns = getValues("addOns")?.map((addon) => {
//         return {
//           id: addon.id,
//           name: addon.name,
//           price: addon.price,
//           isAvailable: addon.isAvailable,
//           isVeg: addon.isVeg,
//           tags: addon.tags || [],
//           isDefault: addon.isDefault
//         };
//       });

//       console.log('📦 Prepared data:', {
//         availableTimings,
//         modifiedCustomizations: modifiedCustomizations?.length || 0,
//         modifiedAddOns: modifiedAddOns?.length || 0,
//         menuTags: menuTags?.length || 0
//       });

//       // 🔥 STEP 3: Create FormData for multipart/form-data
//       const formData = new FormData();

//       // Add required text fields
//       formData.append("name", data.itemName || "");
//       formData.append("description", data.itemDescription || "");
//       formData.append("price", data.basePrice || "0");
//       formData.append("FoodType", data.foodType || "veg");
//       formData.append("cuisine", data.cuisine || "");
//       formData.append("preparationTime", data.preparationTime || "15");
//       formData.append("categoryId", params?.categoryId || "");

//       // Add complex objects as JSON strings
//       formData.append("availableTimings", JSON.stringify(availableTimings));
//       formData.append("tags", JSON.stringify(menuTags || []));
//       formData.append("variations", JSON.stringify(getValues("variations") || []));
//       formData.append("addOns", JSON.stringify(modifiedAddOns || []));
//       formData.append("customizations", JSON.stringify(modifiedCustomizations || []));

//       // Add images with proper field name "images" (matching multer config)
//       if (data.itemImage && data.itemImage.length > 0) {
//         const imageFiles = Array.from(data.itemImage);
//         console.log(`📸 Adding ${imageFiles.length} images:`, imageFiles.map(img => img.name));

//         imageFiles.forEach((image, index) => {
//           formData.append("images", image);
//           console.log(`  Image ${index + 1}: ${image.name} (${image.size} bytes)`);
//         });
//       } else {
//         console.warn('⚠️ No images provided');
//       }

//       // Debug FormData contents
//       console.log('📦 FormData entries:');
//       for (let pair of formData.entries()) {
//         if (pair[1] instanceof File) {
//           console.log(`  ${pair[0]}: File - ${pair[1].name} (${pair[1].size} bytes)`);
//         } else {
//           console.log(`  ${pair[0]}: ${typeof pair[1] === 'string' ? pair[1].substring(0, 100) : pair[1]}`);
//         }
//       }

//       // 🔥 STEP 4: Make API call with proper authentication
//       const apiUrl = `/admin/add-menu-item/${state?.restaurantId}`;
//       console.log('🌐 API URL:', apiUrl);
//       console.log('🔑 Using Bearer token authentication');

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           // ⚠️ IMPORTANT: Don't set Content-Type for FormData - browser sets it automatically with boundary
//         },
//         body: formData
//       });

//       console.log('📡 Response status:', response.status);
//       console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

//       // 🔥 STEP 5: Handle response with detailed error reporting
//       if (!response.ok) {
//         let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

//         try {
//           const errorData = await response.json();
//           console.error('❌ Server error response:', errorData);
//           errorMessage = errorData.message || errorData.error || errorMessage;
//         } catch (parseError) {
//           // If response is not JSON, get text
//           try {
//             const errorText = await response.text();
//             console.error('❌ Server error (text):', errorText);
//             errorMessage = errorText || errorMessage;
//           } catch (textError) {
//             console.error('❌ Could not parse error response:', textError);
//           }
//         }

//         // Handle specific status codes
//         if (response.status === 403) {
//           alert('❌ Access denied. Check your authentication token or permissions.');
//           console.error('🚫 403 Forbidden - Authentication/Authorization failed');
//         } else if (response.status === 401) {
//           alert('❌ Authentication expired. Please log in again.');
//           console.error('🚫 401 Unauthorized - Token expired or invalid');
//         } else if (response.status === 413) {
//           alert('❌ File too large. Please use smaller images.');
//           console.error('📦 413 Payload Too Large - File size exceeded');
//         } else {
//           alert(`❌ Error ${response.status}: ${errorMessage}`);
//           console.error(`❌ HTTP ${response.status}:`, errorMessage);
//         }
//         return;
//       }

//       // 🔥 STEP 6: Success handling
//       const result = await response.json();
//       console.log("✅ Success response:", result);

//       alert('✅ Menu item added successfully!');
//       navigate(`/admin/restaurant/${state?.restaurantId}/menu`);

//     } catch (error) {
//       console.error('💥 Network or parsing error:', error);

//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         alert('❌ Network error. Please check your internet connection.');
//       } else if (error.name === 'SyntaxError') {
//         alert('❌ Invalid server response. Please try again.');
//       } else {
//         alert(`❌ Unexpected error: ${error.message}`);
//       }
//     }
//   };

//   useEffect(() => {
//     if (addItemRes?.status === 200 || addItemRes?.status === 201) {
//       console.log("add item res", addItemRes);
//       navigate(`/admin/restaurant/${state?.restaurantId}/menu`);
//     }
//   }, [addItemRes]);

//   return (
//     <AdminWrapper>
//       <section className='px-0 py-0 w-full h-full min-h-screen'>
//         <div className='flex justify-start items-center mb-4'>
//           <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
//           <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurant</h2>
//         </div>
//         <div className='bg-[#FFFFFF]'>
//           <div className='px-10 bg-[#FFFFFF] border-b-[1px] border-b-[#CDCDCD]'>
//             <h1 className='text-[#000000] text-2xl font-semibold font-inter py-8'>Add Item Details</h1>
//           </div>
//           <div className='mb-4 py-4'>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//                 <div>
//                   {/* Basic Details Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h3 className='text-[#000000] text-xl font-semibold font-inter'>Basic Details</h3>

//                       {/* Item Name */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="itemName"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Item Name</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="Enter Dish Name"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Item Description */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="itemDescription"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Item Description</FormLabel>
//                               <FormControl>
//                                 <Textarea className="resize-none" placeholder="Add a detailed description explaining the dish"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Food Type */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="foodType"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Food Type</FormLabel>
//                               <FormControl>
//                                 <RadioGroup
//                                   onValueChange={field.onChange}
//                                   defaultValue={field.value}
//                                   className="flex"
//                                 >
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="veg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <VegIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "veg" && "text-[#3579F0]"}`}>Veg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="non-veg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "non-veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <NonVegIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "non-veg" && "text-[#3579F0]"}`}>Non-Veg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="egg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "egg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <EggIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "egg" && "text-[#3579F0]"}`}>Egg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                 </RadioGroup>
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Preparation Time */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="preparationTime"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Preparation Time</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Preparation Time (in minutes)"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Item Photos */}
//                       <div className="mt-5">
//                         <Label>Item Photos</Label>
//                         <FormField
//                           control={control}
//                           name="itemImage"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel className="cursor-pointer left-0 w-full h-full top-0">
//                                 <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">Change</span>
//                                 {!watch("itemImagePreview") &&
//                                   <div className='border-2 mt-2 flex flex-col bg-[#F7FAFF] items-center justify-center primary-color w-40 h-40 rounded-md px-5 py-4'>
//                                     <FiUpload size={25} />
//                                     <p className='font-semibold text-center primary-color text-sm mt-2'>Upload</p>
//                                   </div>
//                                 }
//                                 {watch("itemImagePreview")?.length > 0 && (
//                                   <div className="flex gap-4 flex-wrap mt-5">
//                                     {watch("itemImagePreview").map((image, index) => (
//                                       <img key={index} className="w-40" src={image} alt={`Preview ${index + 1}`} />
//                                     ))}
//                                   </div>
//                                 )}
//                               </FormLabel>
//                               <FormControl className="hidden">
//                                 <Input multiple={true} type="file" {...itemImageRef} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Item Pricing Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h2 className="class-lg6 text-black">Item Pricing</h2>

//                       <div className="bg-[#F7FAFF] py-4 px-6 rounded-lg mt-2">
//                         <h2 className="class-base6 text-black">Customers trust brands with fair pricing</h2>
//                         <p className="class-sm2 text-[#757575]">Keep same prices across menus offered for online ordering.</p>
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="basePrice"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Base price</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Enter Base price of dish"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="packagingCharges"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Packaging charges</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Enter packaging charges"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="bg-[#F7FAFF] py-3 px-6 rounded-lg mt-5">
//                         <h2 className="class-base6 text-black">Please make sure that your offline and online prices match</h2>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Variants Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsVariant(!isVariant)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Variants</h3>
//                           {isVariant ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>You can offer variations of a item, such as size/ base/ crust, etc. When customers place an order, they must choose at least one from the defined variants.</p>
//                       </div>
//                       {isVariant &&
//                         <>
//                           <button onClick={() => setIsVariantModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md">
//                             <FaPlus className="text-base" />
//                             <p className="font-semibold text-lg">Create new Variant</p>
//                           </button>
//                           {watch("variations").length > 0 &&
//                             <div className="mt-5">
//                               <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                 <h4 className="font-inter text-[#969696] font-semibold">Variant Name</h4>
//                                 <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                               </div>
//                               {watch("variations")?.map((variation, i) => (
//                                 <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                   <h4 className="font-inter text-[#969696] font-semibold">{variation?.name}</h4>
//                                   <h4 className="font-inter text-[#969696] font-semibold">Rs {variation?.price}</h4>
//                                 </div>))}
//                             </div>
//                           }
//                         </>
//                       }
//                     </div>
//                   </div>

//                   {/* Menu Tags Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h3 className='text-[#000000] text-xl font-semibold font-inter mb-4'>Menu Tags</h3>
//                       <p className="text-gray-600 text-sm mb-4">
//                         Add tags to help categorize and highlight your menu items
//                       </p>

//                       <MenuTagSelector
//                         selectedTags={menuTags}
//                         onTagsChange={handleMenuTagsChange}
//                         tagType="menu"
//                         className="w-full"
//                       />
//                     </div>
//                   </div>

//                   {/* Map Addons Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsMapAddons(!isMapAddons)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Map Addons</h3>
//                           {isMapAddons ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add-ons enhance the customer experience by offering extra choices like toppings or desserts.</p>
//                       </div>
//                       {isMapAddons &&
//                         <div className="space-y-6">
//                           {displayExistingAddons()}

//                           {/* Enhanced Addons Display */}
//                           {addons.length > 0 && (
//                             <div>
//                               <h4 className="font-inter text-[#969696] font-semibold mb-3">Current Addons:</h4>
//                               <div className="space-y-3">
//                                 {addons.map((addon) => (
//                                   <div key={addon.id} className="bg-gray-50 p-4 rounded-lg border">
//                                     <div className="flex justify-between items-start">
//                                       <div className="flex-1">
//                                         <div className="flex items-center gap-3 mb-2">
//                                           <h5 className="font-semibold text-lg">{addon.name}</h5>
//                                           <span className="text-lg font-bold text-green-600">₹{addon.price}</span>
//                                           <div className="flex gap-2">
//                                             <span className={`px-2 py-1 rounded-full text-xs ${addon.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                                               {addon.isVeg ? 'Veg' : 'Non-Veg'}
//                                             </span>
//                                             <span className={`px-2 py-1 rounded-full text-xs ${addon.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
//                                               {addon.isAvailable ? 'Available' : 'Unavailable'}
//                                             </span>
//                                             {addon.isDefault && (
//                                               <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
//                                                 Default
//                                               </span>
//                                             )}
//                                           </div>
//                                         </div>

//                                         {/* Tags display with proper names */}
//                                         {addon.tags && addon.tags.length > 0 && (
//                                           <div className="flex flex-wrap gap-1 mb-2">
//                                             {addon.tags.map((tagData, tagIndex) => {
//                                               const tagName = getTagName(tagData);
//                                               const tagColor = getTagColor(tagData);
//                                               const tagId = typeof tagData === 'object' ? tagData.id : tagData;

//                                               return (
//                                                 <span
//                                                   key={tagId || tagIndex}
//                                                   style={{ backgroundColor: tagColor }}
//                                                   className="text-white px-2 py-1 rounded-full text-xs font-medium"
//                                                 >
//                                                   {tagName}
//                                                 </span>
//                                               );
//                                             })}
//                                           </div>
//                                         )}
//                                       </div>

//                                       <button
//                                         onClick={() => handleRemoveAddon(addon.id)}
//                                         className="text-red-500 hover:text-red-700 ml-4"
//                                       >
//                                         <FaTimes size={16} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* Add New Addon Form */}
//                           {showAddonForm && (
//                             <div className="bg-white border-2 border-dashed border-[#4A67FF] rounded-lg p-6 space-y-4">
//                               <h4 className="font-inter text-[#4A67FF] font-semibold text-lg mb-4">Add New Addon</h4>

//                               {/* Addon Name */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                                 <input
//                                   type="text"
//                                   value={newAddon.name}
//                                   onChange={(e) => handleInputChange('name', e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
//                                   placeholder="e.g., Extra Paneer"
//                                 />
//                               </div>

//                               {/* Addon Price */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
//                                 <input
//                                   type="number"
//                                   value={newAddon.price}
//                                   onChange={(e) => handleInputChange('price', e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
//                                   placeholder="50"
//                                   min="0"
//                                   step="0.01"
//                                 />
//                               </div>

//                               {/* Checkboxes */}
//                               <div className="flex gap-6">
//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isAvailable}
//                                     onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Available
//                                 </label>

//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isVeg}
//                                     onChange={(e) => handleInputChange('isVeg', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Vegetarian
//                                 </label>

//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isDefault}
//                                     onChange={(e) => handleInputChange('isDefault', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Set as Default
//                                 </label>
//                               </div>

//                               {/* Tags Section */}
//                               <div className="mt-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>

//                                 {/* Show currently selected tags */}
//                                 {newAddon.tags && newAddon.tags.length > 0 && (
//                                   <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 rounded">
//                                     <span className="text-xs text-gray-600">Selected:</span>
//                                     {newAddon.tags.map((tagObj, index) => (
//                                       <span
//                                         key={tagObj.id || index}
//                                         style={{ backgroundColor: getTagColor(tagObj) }}
//                                         className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-medium"
//                                       >
//                                         {tagObj.name}
//                                         <button
//                                           type="button"
//                                           onClick={(e) => {
//                                             e.preventDefault();
//                                             const updatedTags = newAddon.tags.filter((_, i) => i !== index);
//                                             setNewAddon(prev => ({ ...prev, tags: updatedTags }));
//                                           }}
//                                           className="hover:bg-black/20 rounded-full p-0.5 ml-1"
//                                         >
//                                           <FaTimes size={10} />
//                                         </button>
//                                       </span>
//                                     ))}
//                                   </div>
//                                 )}

//                                 {/* MenuTagSelector */}
//                                 <MenuTagSelector
//                                   selectedTags={newAddon.tags.map(tag => tag.id)}
//                                   onTagsChange={handleTagsChange}
//                                   tagType="addon"
//                                   className="w-full"
//                                 />
//                               </div>

//                               {/* Form Actions */}
//                               <div className="flex gap-3 pt-4">
//                                 <button
//                                   type="button"
//                                   onClick={handleAddAddon}
//                                   className="bg-[#4A67FF] text-white px-6 py-2 rounded-md hover:bg-[#3651E6] flex-1"
//                                 >
//                                   Add Addon
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setShowAddonForm(false);
//                                     setNewAddon({
//                                       name: '',
//                                       price: '',
//                                       isAvailable: true,
//                                       isVeg: true,
//                                       isDefault: false,
//                                       tags: []
//                                     });
//                                   }}
//                                   className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           )}

//                           {/* Create Addon Buttons */}
//                           <button onClick={() => setIsMapAddonsModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF] mb-4">
//                             <FaPlus className="text-base" />
//                             <p className="font-semibold text-lg">Create new Add on group (Modal)</p>
//                           </button>

//                           {!showAddonForm && (
//                             <button
//                               type="button"
//                               className="bg-[#F8F9FC] text-[#4A67FF] p-4 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF]"
//                               onClick={() => setShowAddonForm(true)}
//                             >
//                               <FaPlus className="text-base" />
//                               <p className="font-semibold text-lg">Create new Add on with Tags</p>
//                             </button>
//                           )}

//                           {/* Display Current Addons in List Format */}
//                           {watch("addOns").length > 0 && (
//                             <div className="mt-5">
//                               <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                 <h4 className="font-inter text-[#969696] font-semibold">AddOn Name</h4>
//                                 <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                               </div>
//                               {watch("addOns")?.map((addon, i) => (
//                                 <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                   <h4 className="font-inter text-[#969696] font-semibold">{addon?.name}</h4>
//                                   <h4 className="font-inter text-[#969696] font-semibold">Rs {addon?.price}</h4>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Additional Details Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsAdditionalDetails(!isAdditionalDetails)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Additional Details</h3>
//                           {isAdditionalDetails ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add Cuisine</p>
//                       </div>
//                       {isAdditionalDetails &&
//                         <div className="border border-[#A8A8A8] p-5 w-full rounded-md">
//                           <h3 className="text-black class-lg6">Cuisine</h3>

//                           {cuisines.length === 0 && isLoading &&
//                             <Spinner />
//                           }

//                           {cuisines.length === 0 && !isLoading &&
//                             <DataNotFound name="Cuisines" />
//                           }

//                           {cuisines.length > 0 &&
//                             <div className="flex items-center gap-2">
//                               <FormField
//                                 control={control}
//                                 name="cuisine"
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel></FormLabel>
//                                     <FormControl>
//                                       <RadioGroup
//                                         onValueChange={field.onChange}
//                                         defaultValue={field.value}
//                                         className="flex flex-wrap gap-3"
//                                       >
//                                         {cuisines?.map((cuisine) => (
//                                           <FormItem key={cuisine?._id} className="flex items-center space-y-0">
//                                             <FormControl className="hidden">
//                                               <RadioGroupItem value={cuisine?._id} />
//                                             </FormControl>
//                                             <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === cuisine?._id && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                               <p>{cuisine?.name}</p>
//                                             </FormLabel>
//                                           </FormItem>
//                                         ))}
//                                       </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>
//                           }
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Serving Info Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsServingInfo(!isServingInfo)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Serving Info</h3>
//                           {isServingInfo ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add serving sizes to improve customer experience.</p>
//                       </div>
//                       {isServingInfo &&
//                         <div className="grid grid-cols-2 items-center gap-2 w-full">
//                           <FormField
//                             control={control}
//                             name="numberOfPeople"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Number of people</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Select appropriate serving info"  {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={control}
//                             name="dishSize"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Dish size</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Enter quantity"  {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Customization Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsCustomization(!isCustomization)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Customization</h3>
//                           <div className="flex items-center gap-3">
//                             <Button type="button" onClick={() => setIsCustomizationModalOpen(true)} variant="outline" className="flex gap-1 px-5 items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
//                               <FaPlus />
//                               Add More
//                             </Button>
//                             {isCustomization ? <FaMinus className="text-black" size={20} />
//                               : <FaPlus className="text-black" size={20} />}
//                           </div>
//                         </div>
//                         <p>Customization for category</p>
//                       </div>
//                       {isCustomization &&
//                         <div className="w-full flex flex-col gap-4">
//                           {watch("customizations")?.map((customization, i) => (
//                             <div key={i} className="w-full">
//                               <div className="flex justify-between items-center gap-4">
//                                 <h3 className="font-inter text-lg text-[#969696] font-semibold">{customization?.categoryName}</h3>
//                                 <Button type="button" onClick={() => handleCustomization(i)} variant="outline" className="flex gap-1 w-[200px] items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
//                                   <FaPlus />
//                                   Add Customization
//                                 </Button>
//                               </div>
//                               {customization?.customizationOptions &&
//                                 customization?.customizationOptions.length > 0 &&
//                                 <div className="px-4">
//                                   <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                     <h4 className="font-inter text-[#969696] font-semibold">Customization Name</h4>
//                                     <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                                   </div>
//                                   {customization?.customizationOptions?.map((option, i) => (
//                                     <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                       <h4 className="font-inter text-[#969696] font-semibold">{option?.name}</h4>
//                                       <h4 className="font-inter text-[#969696] font-semibold">Rs {option?.price}</h4>
//                                     </div>))}
//                                 </div>}
//                             </div>
//                           ))}
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Availability for Food Item Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setAvailabilityForFoodItem(!availabilityForFoodItem)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Availability for food item</h3>
//                           {availabilityForFoodItem ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Availability for <b>food item</b></p>
//                       </div>
//                       {availabilityForFoodItem &&
//                         <AvailabilityForFoodItem form={form} />
//                       }
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Submit Buttons */}
//                 <div className='flex gap-5 bg-[#FFFFFF] w-full p-4'>
//                   <button type='button' className='h-[68px] w-full text-[#F97474] text-xl font-semibold font-inter bg-[#FFFFFF] rounded-lg border-[1px] border-[#256FEF]'>Discard</button>
//                   <button
//                     type="submit"
//                     disabled={isAddItemLoading}
//                     className='h-[68px] w-full text-[#FFFFFF] text-xl font-semibold font-inter bg-[#256FEF] rounded-lg border-[1px] border-[#256FEF] disabled:opacity-50'
//                   >
//                     {isAddItemLoading ? 'Saving...' : 'Save changes'}
//                   </button>
//                 </div>
//               </form>
//             </Form>
//           </div>

//           {/* Modal Components */}
//           {isVariantModalOpen &&
//             <CreateVariantModel
//               isVariantModalOpen={isVariantModalOpen}
//               setIsVariantModalOpen={setIsVariantModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }

//           {isMapAddonsModalOpen &&
//             <MapAddOnModel
//               isMapAddonsModalOpen={isMapAddonsModalOpen}
//               setIsMapAddonsModalOpen={setIsMapAddonsModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }

//           {isAddCustomizationModalOpen &&
//             <AddCustomizationModal
//               isAddCustomizationModalOpen={isAddCustomizationModalOpen}
//               setIsAddCustomizationModalOpen={setIsAddCustomizationModalOpen}
//               currentIndex={currentIndex}
//               setValue1={setValue}
//               getValues1={getValues}
//             />
//           }

//           {isCustomizationModalOpen &&
//             <AddCustomizationCategoryModal
//               isCustomizationModalOpen={isCustomizationModalOpen}
//               setIsCustomizationModalOpen={setIsCustomizationModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }
//         </div>
//       </section>
//     </AdminWrapper>
//   );
// };

// export default AddMenu;

// const AddMenu = () => {
//   const navigate = useNavigate();
//   const [isItemImageUploadModalOpen, setIsItemImageUploadModalOpen] = useState(false);
//   const [isVariant, setIsVariant] = useState(false);
//   const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
//   const [isMapAddons, setIsMapAddons] = useState(false);
//   const [isMapAddonsModalOpen, setIsMapAddonsModalOpen] = useState(false);
//   const [isAdditionalDetails, setIsAdditionalDetails] = useState(false);
//   const [isServingInfo, setIsServingInfo] = useState(false);
//   const [isCustomization, setIsCustomization] = useState(false);
//   const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
//   const [isCreateVariantModalOpen, setIsCreateVariantModalOpen] = useState(false);
//   const [isAddCustomizationModalOpen, setIsAddCustomizationModalOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [cuisines, setCuisines] = useState([]);
//   const [availabilityForFoodItem, setAvailabilityForFoodItem] = useState(false);

//   // 🔥 ENHANCED: Better state management for tags and addons
//   const [availableTags, setAvailableTags] = useState([]);
//   const [allTags, setAllTags] = useState([]); // ✅ Store all tags (menu + addon)
//   const [addons, setAddons] = useState([]);
//   const [addonGroups, setAddonGroups] = useState([]); // ✅ Store addon groups
//   const [menuTags, setMenuTags] = useState([]);
//   const [isTagsLoading, setIsTagsLoading] = useState(false);
//   const [showAddonForm, setShowAddonForm] = useState(false);
//   const [newAddon, setNewAddon] = useState({
//     name: '',
//     price: '',
//     isAvailable: true,
//     isVeg: true,
//     isDefault: false,
//     tags: [] // ✅ Will store [{id: '', name: ''}, ...]
//   });

//   const params = useParams();
//   const { state } = useLocation();

//   const form = useForm({
//     resolver: zodResolver(addItemSchema),
//     defaultValues: {
//       itemName: "",
//       itemImage: "",
//       itemImagePreview: "",
//       itemDescription: "",
//       cuisine: "",
//       foodType: "",
//       basePrice: "",
//       packagingCharges: "",
//       numberOfPeople: "",
//       dishSize: "",
//       preparationTime: "",
//       restaurant: "",
//       tags: [],
//       variations: [],
//       addOns: [],
//       customizations: [],
//       timingType: "sameAsRestaurant",
//       openingTime: "",
//       closingTime: "",
//       days: []
//     }
//   });

//   const { register, control, watch, setValue, getValues } = form;
//   const restaurantRef = register("restaurant");
//   const itemImageRef = register("itemImage");
//   const restaurant = watch("restaurant");
//   const itemImage = watch("itemImage");

//   // 🔥 CRITICAL FIX: Enhanced tag fetching that handles your exact API response structure
//   const fetchAllTags = async () => {
//     try {
//       setIsTagsLoading(true);
//       console.log('🔄 Fetching all tags...');

//       const [menuTagsRes, addonTagsRes] = await Promise.all([
//         fetch('/capsicoTag/for-menu', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' }
//         }),
//         fetch('/capsicoTag/for-addon', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' }
//         })
//       ]);

//       const [menuTagsData, addonTagsData] = await Promise.all([
//         menuTagsRes.json(),
//         addonTagsRes.json()
//       ]);

//       console.log('📋 Menu tags response:', menuTagsData);
//       console.log('📋 Addon tags response:', addonTagsData);

//       // ✅ CRITICAL: Handle the exact structure from your API
//       const menuTags = menuTagsData.data || [];
//       const addonTags = addonTagsData.data || [];

//       console.log('✅ Processed menu tags:', menuTags);
//       console.log('✅ Processed addon tags:', addonTags);

//       // Store addon tags separately for dropdown
//       setAvailableTags(Array.isArray(addonTags) ? addonTags : []);

//       // ✅ CRITICAL: Combine ALL tags for comprehensive lookup
//       const combinedTags = [
//         ...(Array.isArray(menuTags) ? menuTags : []),
//         ...(Array.isArray(addonTags) ? addonTags : [])
//       ];

//       console.log('🔗 Combined tags for lookup:', combinedTags);
//       console.log('🔗 Combined tag IDs:', combinedTags.map(t => ({ id: t.id || t._id, name: t.name })));
//       setAllTags(combinedTags);

//     } catch (error) {
//       console.error('❌ Error fetching tags:', error);
//     } finally {
//       setIsTagsLoading(false);
//     }
//   };

//   const handleMenuTagsChange = (tags) => {
//     setMenuTags(tags);
//     setValue('tags', tags);
//   };

//   // 🔥 ENHANCED: Tag handling to store only {id, name} objects
//   // const handleTagsChange = (selectedTagIds) => {
//   //   console.log('🏷️ Selected tag IDs:', selectedTagIds);

//   //   // Convert tag IDs to simple {id, name} objects
//   //   const tagObjects = selectedTagIds.map(tagId => {
//   //     // Find the tag in availableTags or allTags
//   //     let foundTag = availableTags.find(t => (t.id || t._id) === tagId);

//   //     if (!foundTag) {
//   //       foundTag = allTags.find(t => (t.id || t._id) === tagId);
//   //     }

//   //     if (foundTag) {
//   //       return {
//   //         id: foundTag.id || foundTag._id,
//   //         name: foundTag.displayName || foundTag.name
//   //       };
//   //     }

//   //     // Fallback if tag not found
//   //     console.warn('❌ Tag not found for ID:', tagId);
//   //     return {
//   //       id: tagId,
//   //       name: 'Unknown Tag'
//   //     };
//   //   });

//   //   console.log('🏷️ Tag objects (id + name only):', tagObjects);

//   //   setNewAddon(prev => ({
//   //     ...prev,
//   //     tags: tagObjects
//   //   }));
//   // };
// // 1) When tags are chosen in addon modal

// // When normalizing selected tags
// const handleTagsChange = (selectedTagIdsOrObjs = []) => {
//   const tagObjects = selectedTagIdsOrObjs.map((t) => {
//     // Already object from selector
//     if (t && typeof t === "object" && t.id) {
//       const flatId = typeof t.id === "object" ? t.id.id : t.id;
//       // keep color if selector provides it
//       return { id: flatId, name: t.name, color: t.color };
//     }
//     const tagId = String(t);
//     const found =
//       availableTags.find(x => (x.id || x._id)?.toString() === tagId) ||
//       allTags.find(x => (x.id || x._id)?.toString() === tagId);
//     return found
//       ? { id: found.id || found._id, name: found.displayName || found.name, color: found.color }
//       : { id: tagId, name: "Tag" };
//   });
//   setNewAddon(prev => ({ ...prev, tags: tagObjects }));
// };

//   // Handle form input changes
//   const handleInputChange = (field, value) => {
//     setNewAddon(prev => ({ ...prev, [field]: value }));
//   };

//   // 🔥 ENHANCED: Add new addon with {id, name} tag format
//   const handleAddAddon = () => {
//     if (!newAddon.name.trim() || !newAddon.price) {
//       alert('Please fill in addon name and price');
//       return;
//     }

//     console.log('🔥 Adding addon with {id, name} tags:', newAddon.tags);

//     const addon = {
//       id: Date.now().toString(),
//       name: newAddon.name.trim(),
//       price: parseFloat(newAddon.price),
//       isAvailable: newAddon.isAvailable,
//       isVeg: newAddon.isVeg,
//       tags: newAddon.tags, // ✅ Store {id, name} objects
//       isDefault: newAddon.isDefault
//     };

//     console.log('🔥 Final addon object with {id, name} tags:', addon);

//     const updatedAddons = [...addons, addon];
//     setAddons(updatedAddons);
//     setValue('addOns', updatedAddons);

//     // Reset form
//     setNewAddon({
//       name: '',
//       price: '',
//       isAvailable: true,
//       isVeg: true,
//       isDefault: false,
//       tags: []
//     });
//     setShowAddonForm(false);
//   };

//   // Remove addon
//   const handleRemoveAddon = (addonId) => {
//     const updatedAddons = addons.filter(addon => addon.id !== addonId);
//     setAddons(updatedAddons);
//     setValue('addOns', updatedAddons);
//   };

//   // 🔥 UPDATED: getTagName function for simplified format
//   // const getTagName = (tagData) => {
//   //   // If tagData is the new {id, name} format
//   //   if (typeof tagData === 'object' && tagData.name) {
//   //     return tagData.name;
//   //   }

//   //   // If tagData is just an ID string (legacy format)
//   //   if (typeof tagData === 'string') {
//   //     const tagId = tagData;

//   //     // Try to find in loaded tags
//   //     let foundTag = availableTags.find(t => (t.id || t._id) === tagId);
//   //     if (!foundTag) {
//   //       foundTag = allTags.find(t => (t.id || t._id) === tagId);
//   //     }

//   //     if (foundTag) {
//   //       return foundTag.displayName || foundTag.name;
//   //     }
//   //   }

//   //   return 'Unknown Tag';
//   // };
// // 2) Display helpers
// const getTagName = (tagData) => {
//   // If object, trust the provided name and do not override
//   if (tagData && typeof tagData === "object") return tagData.name || "Tag";
//   // Legacy string ID path
//   const tagId = String(tagData);
//   const found =
//     availableTags.find((t) => t.id?.toString() === tagId) ||
//     allTags.find((t) => t.id?.toString() === tagId);
//   return found ? (found.name || found.displayName) : "Tag";
// };

//   // 🔥 UPDATED: getTagColor function (still needed for display)
//   // const getTagColor = (tagData) => {
//   //   let tagId;

//   //   // Extract ID from different formats
//   //   if (typeof tagData === 'object') {
//   //     tagId = tagData.id;
//   //   } else {
//   //     tagId = tagData;
//   //   }

//   //   // Find color from loaded tags
//   //   let foundTag = availableTags.find(t => (t.id || t._id) === tagId);
//   //   if (!foundTag) {
//   //     foundTag = allTags.find(t => (t.id || t._id) === tagId);
//   //   }

//   //   return foundTag ? foundTag.color : '#6b7280';
//   // };
// // Ensure consistent color lookup for both {id,name} and nested shapes
// // One true source of color
// const getTagColor = (tagData) => {
//   // Flatten id from possible shapes
//   let tagId = null;
//   if (tagData && typeof tagData === "object") {
//     tagId = typeof tagData.id === "object" ? tagData.id.id : tagData.id;
//   } else {
//     tagId = String(tagData);
//   }

//   // Look up from loaded tags (same data that powers the dropdown)
//   const found =
//     availableTags.find(t => (t.id || t._id)?.toString() === String(tagId)) ||
//     allTags.find(t => (t.id || t._id)?.toString() === String(tagId));

//   return found?.color || "#6b7280";
// };

//   // 🔥 UPDATED: displayExistingAddons to handle {id, name} format
//   const displayExistingAddons = () => {
//     const existingAddons = getValues('addOns') || [];

//     if (!Array.isArray(existingAddons) || existingAddons.length === 0) {
//       return null;
//     }

//     return (
//       <div className="mb-6">
//         <h4 className="font-inter text-[#969696] font-semibold mb-3">Existing Addons:</h4>
//         <div className="space-y-3">
//           {existingAddons.map((addon, index) => (
//             <div key={addon.id || addon._id || index} className="bg-gray-50 p-4 rounded-lg border">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h5 className="font-semibold text-lg">{addon.name}</h5>
//                     <span className="text-lg font-bold text-green-600">₹{addon.price}</span>
//                     <div className="flex gap-2">
//                       <span className={`px-2 py-1 rounded-full text-xs ${addon.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                         {addon.isVeg ? 'Veg' : 'Non-Veg'}
//                       </span>
//                       <span className={`px-2 py-1 rounded-full text-xs ${addon.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
//                         {addon.isAvailable ? 'Available' : 'Unavailable'}
//                       </span>
//                       {addon.isDefault && (
//                         <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
//                           Default
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* ✅ ENHANCED: Handle both {id, name} objects and legacy ID strings */}
//                   {addon.tags && Array.isArray(addon.tags) && addon.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-1 mb-2">
//                       {addon.tags.map((tagData, tagIndex) => {
//                         const tagName = getTagName(tagData);
//                         const tagColor = getTagColor(tagData);
//                         const tagId = typeof tagData === 'object' ? tagData.id : tagData;

//                         console.log(`🏷️ Processing tag for addon "${addon.name}":`, {
//                           tagData,
//                           tagName,
//                           tagColor,
//                           tagId
//                         });

//                         return (
//                           <span
//                             key={tagId || tagIndex}
//                             style={{ backgroundColor: tagColor }}
//                             className="text-white px-2 py-1 rounded-full text-xs font-medium"
//                             title={`Tag: ${tagName} (ID: ${tagId})`}
//                           >
//                             {tagName}
//                           </span>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* Show debug info in development */}
//                   {process.env.NODE_ENV === 'development' && addon.tags && (
//                     <div className="text-xs text-gray-500 mt-1">
//                       Debug Tags: {JSON.stringify(addon.tags)}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={() => handleRemoveAddon(addon.id)}
//                   className="text-red-500 hover:text-red-700 ml-4"
//                 >
//                   <FaTimes size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   useEffect(() => {
//     updateMultiplePreview(restaurant, "restaurantPreview", setValue);
//     updateMultiplePreview(itemImage, "itemImagePreview", setValue);
//   }, [form, restaurant, itemImage, setValue]);

//   // 🔥 ENHANCED: Fetch all tags when addon section opens
//   useEffect(() => {
//     if (isMapAddons) {
//       fetchAllTags(); // ✅ Fetch both menu and addon tags

//       // Initialize with existing addons if any
//       const existingAddons = getValues('addOns') || [];
//       setAddons(existingAddons);
//     }
//   }, [isMapAddons, getValues]);

//   const handleCustomization = (index) => {
//     setCurrentIndex(index);
//     setIsAddCustomizationModalOpen(true);
//   }

//   const { res, fetchData, isLoading } = useGetApiReq();

//   const getCuisines = () => {
//     fetchData("/admin/get-cuisines");
//   }

//   useEffect(() => {
//     getCuisines();
//   }, [])

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       console.log("get cuisines res", res);
//       setCuisines(res?.data?.data?.cuisines);
//     }
//   }, [res])

//   const { res: addItemRes, fetchData: fetchAddItemData, isLoading: isAddItemLoading } = usePostApiReq();

//   const onSubmit = (data) => {
//     console.log("submit data", data);

//     const availableTimings = {
//       sameAsRestaurant: data.timingType === "sameAsRestaurant",
//       start: data.openingTime,
//       end: data.closingTime,
//       days: data.days,
//     }

//     const modifiedCustomizations = getValues("customizations")?.map((customization) => {
//       return {
//         name: customization.categoryName,
//         type: customization.customizationType,
//         options: customization.customizationOptions,
//       }
//     })

//     // Enhanced addons with proper structure for backend
//     const modifiedAddOns = getValues("addOns")?.map((addon) => {
//       return {
//         id: addon.id,
//         name: addon.name,
//         price: addon.price,
//         isAvailable: addon.isAvailable,
//         isVeg: addon.isVeg,
//         tags: addon.tags || [],
//         isDefault: addon.isDefault
//       }
//     })

//     const formData = new FormData();
//     formData.append("name", data.itemName);
//     formData.append("description", data.itemDescription);
//     formData.append("price", data.basePrice);
//     formData.append("FoodType", data.foodType);
//     formData.append("cuisine", data.cuisine);
//     formData.append("preparationTime", data.preparationTime);
//     formData.append("categoryId", params?.categoryId);
//     formData.append("availableTimings", JSON.stringify(availableTimings));
//     formData.append("tags", JSON.stringify(menuTags));
//     formData.append("variations", JSON.stringify(getValues("variations")));
//     formData.append("addOns", JSON.stringify(modifiedAddOns));
//     formData.append("customizations", JSON.stringify(modifiedCustomizations));
//     Array.from(data.itemImage).forEach((image) => {
//       formData.append("images", image);
//     });
//     fetchAddItemData(`/admin/add-menu-item/${state?.restaurantId}`, formData);
//   }

//   useEffect(() => {
//     if (addItemRes?.status === 200 || addItemRes?.status === 201) {
//       console.log("add item res", addItemRes);
//       navigate(`/admin/restaurant/${state?.restaurantId}/menu`)
//     }
//   }, [addItemRes])

//   return (
//     <AdminWrapper>
//       <section className='px-0 py-0 w-full h-full min-h-screen'>
//         <div className='flex justify-start items-center mb-4'>
//           <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
//           <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurant</h2>
//         </div>
//         <div className='bg-[#FFFFFF]'>
//           <div className='px-10 bg-[#FFFFFF] border-b-[1px] border-b-[#CDCDCD]'>
//             <h1 className='text-[#000000] text-2xl font-semibold font-inter py-8'>Add Item Details</h1>
//           </div>
//           <div className='mb-4 py-4'>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//                 <div>
//                   {/* Basic Details Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h3 className='text-[#000000] text-xl font-semibold font-inter'>Basic Details</h3>

//                       {/* Item Name */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="itemName"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Item Name</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="Enter Dish Name"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Item Description */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="itemDescription"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Item Description</FormLabel>
//                               <FormControl>
//                                 <Textarea className="resize-none" placeholder="Add a detailed description explaining the dish"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Food Type */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="foodType"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Food Type</FormLabel>
//                               <FormControl>
//                                 <RadioGroup
//                                   onValueChange={field.onChange}
//                                   defaultValue={field.value}
//                                   className="flex"
//                                 >
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="veg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <VegIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "veg" && "text-[#3579F0]"}`}>Veg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="non-veg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "non-veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <NonVegIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "non-veg" && "text-[#3579F0]"}`}>Non-Veg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                   <FormItem className="flex items-center space-y-0">
//                                     <FormControl className="hidden">
//                                       <RadioGroupItem value="egg" />
//                                     </FormControl>
//                                     <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "egg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                       <EggIcon />
//                                       <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "egg" && "text-[#3579F0]"}`}>Egg</p>
//                                     </FormLabel>
//                                   </FormItem>
//                                 </RadioGroup>
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Preparation Time */}
//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="preparationTime"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Preparation Time</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Preparation Time (in minutes)"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       {/* Item Photos */}
//                       <div className="mt-5">
//                         <Label>Item Photos</Label>
//                         <FormField
//                           control={control}
//                           name="itemImage"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel className="cursor-pointer left-0 w-full h-full top-0">
//                                 <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">Change</span>
//                                 {!watch("itemImagePreview") &&
//                                   <div className='border-2 mt-2 flex flex-col bg-[#F7FAFF] items-center justify-center primary-color w-40 h-40 rounded-md px-5 py-4'>
//                                     <FiUpload size={25} />
//                                     <p className='font-semibold text-center primary-color text-sm mt-2'>Upload</p>
//                                   </div>
//                                 }
//                                 {watch("itemImagePreview")?.length > 0 && (
//                                   <div className="flex gap-4 flex-wrap mt-5">
//                                     {watch("itemImagePreview").map((image, index) => (
//                                       <img key={index} className="w-40" src={image} alt={`Preview ${index + 1}`} />
//                                     ))}
//                                   </div>
//                                 )}
//                               </FormLabel>
//                               <FormControl className="hidden">
//                                 <Input multiple={true} type="file" {...itemImageRef} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Item Pricing Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h2 className="class-lg6 text-black">Item Pricing</h2>

//                       <div className="bg-[#F7FAFF] py-4 px-6 rounded-lg mt-2">
//                         <h2 className="class-base6 text-black">Customers trust brands with fair pricing</h2>
//                         <p className="class-sm2 text-[#757575]">Keep same prices across menus offered for online ordering.</p>
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="basePrice"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Base price</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Enter Base price of dish"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="w-full mt-5">
//                         <FormField
//                           control={control}
//                           name="packagingCharges"
//                           render={({ field }) => (
//                             <FormItem className="z-20">
//                               <FormLabel>Packaging charges</FormLabel>
//                               <FormControl>
//                                 <Input type="number" placeholder="Enter packaging charges"  {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <div className="bg-[#F7FAFF] py-3 px-6 rounded-lg mt-5">
//                         <h2 className="class-base6 text-black">Please make sure that your offline and online prices match</h2>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Variants Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsVariant(!isVariant)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Variants</h3>
//                           {isVariant ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>You can offer variations of a item, such as size/ base/ crust, etc. When customers place an order, they must choose at least one from the defined variants.</p>
//                       </div>
//                       {isVariant &&
//                         <>
//                           <button onClick={() => setIsVariantModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md">
//                             <FaPlus className="text-base" />
//                             <p className="font-semibold text-lg">Create new Variant</p>
//                           </button>
//                           {watch("variations").length > 0 &&
//                             <div className="mt-5">
//                               <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                 <h4 className="font-inter text-[#969696] font-semibold">Variant Name</h4>
//                                 <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                               </div>
//                               {watch("variations")?.map((variation, i) => (
//                                 <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                   <h4 className="font-inter text-[#969696] font-semibold">{variation?.name}</h4>
//                                   <h4 className="font-inter text-[#969696] font-semibold">Rs {variation?.price}</h4>
//                                 </div>))}
//                             </div>
//                           }
//                         </>
//                       }
//                     </div>
//                   </div>

//                   {/* Menu Tags Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5">
//                       <h3 className='text-[#000000] text-xl font-semibold font-inter mb-4'>Menu Tags</h3>
//                       <p className="text-gray-600 text-sm mb-4">
//                         Add tags to help categorize and highlight your menu items
//                       </p>

//                       <MenuTagSelector
//                         selectedTags={menuTags}
//                         onTagsChange={handleMenuTagsChange}
//                         tagType="menu"
//                         className="w-full"
//                       />
//                     </div>
//                   </div>

//                   {/* 🔥 ENHANCED: Map Addons Section with comprehensive tag support */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsMapAddons(!isMapAddons)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Map Addons</h3>
//                           {isMapAddons ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add-ons enhance the customer experience by offering extra choices like toppings or desserts.</p>
//                       </div>
//                       {isMapAddons &&
//                         <div className="space-y-6">
//                           {/* ✅ CRITICAL FIX: Display existing/fetched addons with proper tag names */}
//                           {displayExistingAddons()}

//                           {/* Enhanced Addons Display */}
//                           {addons.length > 0 && (
//                             <div>
//                               <h4 className="font-inter text-[#969696] font-semibold mb-3">Current Addons:</h4>
//                               <div className="space-y-3">
//                                 {addons.map((addon) => (
//                                   <div key={addon.id} className="bg-gray-50 p-4 rounded-lg border">
//                                     <div className="flex justify-between items-start">
//                                       <div className="flex-1">
//                                         <div className="flex items-center gap-3 mb-2">
//                                           <h5 className="font-semibold text-lg">{addon.name}</h5>
//                                           <span className="text-lg font-bold text-green-600">₹{addon.price}</span>
//                                           <div className="flex gap-2">
//                                             <span className={`px-2 py-1 rounded-full text-xs ${addon.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                                               {addon.isVeg ? 'Veg' : 'Non-Veg'}
//                                             </span>
//                                             <span className={`px-2 py-1 rounded-full text-xs ${addon.isAvailable ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
//                                               {addon.isAvailable ? 'Available' : 'Unavailable'}
//                                             </span>
//                                             {addon.isDefault && (
//                                               <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
//                                                 Default
//                                               </span>
//                                             )}
//                                           </div>
//                                         </div>

//                                         {/* ✅ ENHANCED: Tags display with proper names */}
//                                         {addon.tags && addon.tags.length > 0 && (
//                                           <div className="flex flex-wrap gap-1 mb-2">
//                                             {addon.tags.map((tagData, tagIndex) => {
//                                               const tagName = getTagName(tagData);
//                                               const tagColor = getTagColor(tagData);
//                                               const tagId = typeof tagData === 'object' ? tagData.id : tagData;

//                                               return (
//                                                 <span
//                                                   key={tagId || tagIndex}
//                                                   style={{ backgroundColor: tagColor }}
//                                                   className="text-white px-2 py-1 rounded-full text-xs font-medium"
//                                                 >
//                                                   {tagName}
//                                                 </span>
//                                               );
//                                             })}
//                                           </div>
//                                         )}
//                                       </div>

//                                       <button
//                                         onClick={() => handleRemoveAddon(addon.id)}
//                                         className="text-red-500 hover:text-red-700 ml-4"
//                                       >
//                                         <FaTimes size={16} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* 🔥 ENHANCED: Add New Addon Form with {id, name} tag format */}
//                           {showAddonForm && (
//                             <div className="bg-white border-2 border-dashed border-[#4A67FF] rounded-lg p-6 space-y-4">
//                               <h4 className="font-inter text-[#4A67FF] font-semibold text-lg mb-4">Add New Addon</h4>

//                               {/* Addon Name */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                                 <input
//                                   type="text"
//                                   value={newAddon.name}
//                                   onChange={(e) => handleInputChange('name', e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
//                                   placeholder="e.g., Extra Paneer"
//                                 />
//                               </div>

//                               {/* Addon Price */}
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
//                                 <input
//                                   type="number"
//                                   value={newAddon.price}
//                                   onChange={(e) => handleInputChange('price', e.target.value)}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A67FF]"
//                                   placeholder="50"
//                                   min="0"
//                                   step="0.01"
//                                 />
//                               </div>

//                               {/* Checkboxes */}
//                               <div className="flex gap-6">
//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isAvailable}
//                                     onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Available
//                                 </label>

//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isVeg}
//                                     onChange={(e) => handleInputChange('isVeg', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Vegetarian
//                                 </label>

//                                 <label className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={newAddon.isDefault}
//                                     onChange={(e) => handleInputChange('isDefault', e.target.checked)}
//                                     className="mr-2"
//                                   />
//                                   Set as Default
//                                 </label>
//                               </div>

//                               {/* ✅ ENHANCED: Tags Section with {id, name} format */}
//                               <div className="mt-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>

//                                 {/* ✅ Show currently selected tags */}
//                                 {newAddon.tags && newAddon.tags.length > 0 && (
//                                   <div className="flex flex-wrap gap-2 mb-3 p-2 bg-gray-50 rounded">
//                                     <span className="text-xs text-gray-600">Selected:</span>
//                                     {newAddon.tags.map((tagObj, index) => (
//                                       <span
//                                         key={tagObj.id || index}
//                                         style={{ backgroundColor: getTagColor(tagObj) }}
//                                         className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-medium"
//                                       >
//                                         {tagObj.name}
//                                         <button
//                                           type="button"
//                                           onClick={(e) => {
//                                             e.preventDefault();
//                                             const updatedTags = newAddon.tags.filter((_, i) => i !== index);
//                                             setNewAddon(prev => ({ ...prev, tags: updatedTags }));
//                                           }}
//                                           className="hover:bg-black/20 rounded-full p-0.5 ml-1"
//                                         >
//                                           <FaTimes size={10} />
//                                         </button>
//                                       </span>
//                                     ))}
//                                   </div>
//                                 )}

//                                 {/* ✅ MenuTagSelector */}
//                                 <MenuTagSelector
//                                   selectedTags={newAddon.tags.map(tag => tag.id)} // Extract IDs for selector
//                                   onTagsChange={handleTagsChange} // Use enhanced handler
//                                   tagType="addon"
//                                   className="w-full"
//                                 />

//                                 {/* ✅ Debug info in development */}
//                                 {process.env.NODE_ENV === 'development' && (
//                                   <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
//                                     <div>Selected Tags: {newAddon.tags.length}</div>
//                                     <div>Tags: {JSON.stringify(newAddon.tags, null, 2)}</div>
//                                     <div>Available Tags: {availableTags.length}</div>
//                                     <div>All Tags: {allTags.length}</div>
//                                   </div>
//                                 )}
//                               </div>

//                               {/* Form Actions */}
//                               <div className="flex gap-3 pt-4">
//                                 <button
//                                   type="button"
//                                   onClick={handleAddAddon}
//                                   className="bg-[#4A67FF] text-white px-6 py-2 rounded-md hover:bg-[#3651E6] flex-1"
//                                 >
//                                   Add Addon
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setShowAddonForm(false);
//                                     setNewAddon({
//                                       name: '',
//                                       price: '',
//                                       isAvailable: true,
//                                       isVeg: true,
//                                       isDefault: false,
//                                       tags: []
//                                     });
//                                   }}
//                                   className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           )}

//                           {/* Create Addon Buttons */}
//                           <button onClick={() => setIsMapAddonsModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF] mb-4">
//                             <FaPlus className="text-base" />
//                             <p className="font-semibold text-lg">Create new Add on group (Modal)</p>
//                           </button>

//                           {!showAddonForm && (
//                             <button
//                               type="button"
//                               className="bg-[#F8F9FC] text-[#4A67FF] p-4 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#4A67FF]"
//                               onClick={() => setShowAddonForm(true)}
//                             >
//                               <FaPlus className="text-base" />
//                               <p className="font-semibold text-lg">Create new Add on with Tags</p>
//                             </button>
//                           )}

//                           {/* Display Current Addons in List Format (Original Code) */}
//                           {watch("addOns").length > 0 && (
//                             <div className="mt-5">
//                               <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                 <h4 className="font-inter text-[#969696] font-semibold">AddOn Name</h4>
//                                 <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                               </div>
//                               {watch("addOns")?.map((addon, i) => (
//                                 <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                   <h4 className="font-inter text-[#969696] font-semibold">{addon?.name}</h4>
//                                   <h4 className="font-inter text-[#969696] font-semibold">Rs {addon?.price}</h4>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Additional Details Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsAdditionalDetails(!isAdditionalDetails)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Additional Details</h3>
//                           {isAdditionalDetails ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add Cuisine</p>
//                       </div>
//                       {isAdditionalDetails &&
//                         <div className="border border-[#A8A8A8] p-5 w-full rounded-md">
//                           <h3 className="text-black class-lg6">Cuisine</h3>

//                           {cuisines.length === 0 && isLoading &&
//                             <Spinner />
//                           }

//                           {cuisines.length === 0 && !isLoading &&
//                             <DataNotFound name="Cuisines" />
//                           }

//                           {cuisines.length > 0 &&
//                             <div className="flex items-center gap-2">
//                               <FormField
//                                 control={control}
//                                 name="cuisine"
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel></FormLabel>
//                                     <FormControl>
//                                       <RadioGroup
//                                         onValueChange={field.onChange}
//                                         defaultValue={field.value}
//                                         className="flex flex-wrap gap-3"
//                                       >
//                                         {cuisines?.map((cuisine) => (
//                                           <FormItem key={cuisine?._id} className="flex items-center space-y-0">
//                                             <FormControl className="hidden">
//                                               <RadioGroupItem value={cuisine?._id} />
//                                             </FormControl>
//                                             <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === cuisine?._id && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
//                                               <p>{cuisine?.name}</p>
//                                             </FormLabel>
//                                           </FormItem>
//                                         ))}
//                                       </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>
//                           }
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Serving Info Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsServingInfo(!isServingInfo)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Serving Info</h3>
//                           {isServingInfo ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Add serving sizes to improve customer experience.</p>
//                       </div>
//                       {isServingInfo &&
//                         <div className="grid grid-cols-2 items-center gap-2 w-full">
//                           <FormField
//                             control={control}
//                             name="numberOfPeople"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Number of people</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Select appropriate serving info"  {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={control}
//                             name="dishSize"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Dish size</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Enter quantity"  {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Customization Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setIsCustomization(!isCustomization)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Customization</h3>
//                           <div className="flex items-center gap-3">
//                             <Button type="button" onClick={() => setIsCustomizationModalOpen(true)} variant="outline" className="flex gap-1 px-5 items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
//                               <FaPlus />
//                               Add More
//                             </Button>
//                             {isCustomization ? <FaMinus className="text-black" size={20} />
//                               : <FaPlus className="text-black" size={20} />}
//                           </div>
//                         </div>
//                         <p>Customization for category</p>
//                       </div>
//                       {isCustomization &&
//                         <div className="w-full flex flex-col gap-4">
//                           {watch("customizations")?.map((customization, i) => (
//                             <div key={i} className="w-full">
//                               <div className="flex justify-between items-center gap-4">
//                                 <h3 className="font-inter text-lg text-[#969696] font-semibold">{customization?.categoryName}</h3>
//                                 <Button type="button" onClick={() => handleCustomization(i)} variant="outline" className="flex gap-1 w-[200px] items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
//                                   <FaPlus />
//                                   Add Customization
//                                 </Button>
//                               </div>
//                               {customization?.customizationOptions &&
//                                 customization?.customizationOptions.length > 0 &&
//                                 <div className="px-4">
//                                   <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
//                                     <h4 className="font-inter text-[#969696] font-semibold">Customization Name</h4>
//                                     <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
//                                   </div>
//                                   {customization?.customizationOptions?.map((option, i) => (
//                                     <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
//                                       <h4 className="font-inter text-[#969696] font-semibold">{option?.name}</h4>
//                                       <h4 className="font-inter text-[#969696] font-semibold">Rs {option?.price}</h4>
//                                     </div>))}
//                                 </div>}
//                             </div>
//                           ))}
//                         </div>
//                       }
//                     </div>
//                   </div>

//                   {/* Availability for Food Item Section */}
//                   <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
//                     <div className="p-5 border-b border-[#C8C8C8]">
//                       <div onClick={() => setAvailabilityForFoodItem(!availabilityForFoodItem)} className="cursor-pointer pb-6">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-black class-lg6">Availability for food item</h3>
//                           {availabilityForFoodItem ? <FaMinus className="text-black" size={20} />
//                             : <FaPlus className="text-black" size={20} />}
//                         </div>
//                         <p>Availability for <b>food item</b></p>
//                       </div>
//                       {availabilityForFoodItem &&
//                         <AvailabilityForFoodItem form={form} />
//                       }
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Submit Buttons */}
//                 <div className='flex gap-5 bg-[#FFFFFF] w-full p-4'>
//                   <button type='button' className='h-[68px] w-full text-[#F97474] text-xl font-semibold font-inter bg-[#FFFFFF] rounded-lg border-[1px] border-[#256FEF]'>Discard</button>
//                   <button className='h-[68px] w-full text-[#FFFFFF] text-xl font-semibold font-inter bg-[#256FEF] rounded-lg border-[1px] border-[#256FEF]'>Save changes</button>
//                 </div>
//               </form>
//             </Form>
//           </div>

//           {/* Modal Components */}
//           {isVariantModalOpen &&
//             <CreateVariantModel
//               isVariantModalOpen={isVariantModalOpen}
//               setIsVariantModalOpen={setIsVariantModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }

//           {isMapAddonsModalOpen &&
//             <MapAddOnModel
//               isMapAddonsModalOpen={isMapAddonsModalOpen}
//               setIsMapAddonsModalOpen={setIsMapAddonsModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }

//           {isAddCustomizationModalOpen &&
//             <AddCustomizationModal
//               isAddCustomizationModalOpen={isAddCustomizationModalOpen}
//               setIsAddCustomizationModalOpen={setIsAddCustomizationModalOpen}
//               currentIndex={currentIndex}
//               setValue1={setValue}
//               getValues1={getValues}
//             />
//           }

//           {isCustomizationModalOpen &&
//             <AddCustomizationCategoryModal
//               isCustomizationModalOpen={isCustomizationModalOpen}
//               setIsCustomizationModalOpen={setIsCustomizationModalOpen}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           }
//         </div>
//       </section>
//     </AdminWrapper>
//   )
// }

// export default AddMenu;
