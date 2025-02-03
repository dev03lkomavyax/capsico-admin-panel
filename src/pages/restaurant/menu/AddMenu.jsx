import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FiPlus, FiUpload } from "react-icons/fi";
import Variants from '@/components/restaurant/Variants'
import ServingInfo from '@/components/restaurant/ServingInfo'
import MapAddOn from '@/components/restaurant/MapAddOn'
import AdditionalDetails from '@/components/restaurant/AdditionalDetails'
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper'
import useGetApiReq from '@/hooks/useGetApiReq'
import { updateMultiplePreview } from '@/utils/updatePreview'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import VegIcon from '@/components/customIcons/VegIcon'
import NonVegIcon from '@/components/customIcons/NonVegIcon'
import EggIcon from '@/components/customIcons/EggIcon'
import { Label } from '@/components/ui/label'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import CreateVariantModel from '@/components/menu/CreateVariantModel'
import MapAddOnModel from '../../../components/menu/MapAddOnModel'
import Spinner from '@/components/Spinner'
import DataNotFound from '@/components/DataNotFound'
import { Button } from '@/components/ui/button'
import { addItemSchema } from '@/schema/restaurantSchema'
import usePostApiReq from '@/hooks/usePostApiReq'
import AddCustomizationModal from '../../../components/menu/AddCustomizationModal'
import AddCustomizationCategoryModal from '@/components/menu/AddCustomizationCategoryModal'
import AvailabilityForFoodItem from '@/components/menu/AvailabilityForFoodItem'

const AddMenu = () => {

  const navigate = useNavigate()
  const [isItemImageUploadModalOpen, setIsItemImageUploadModalOpen] = useState(false);
  const [isVariant, setIsVariant] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isMapAddons, setIsMapAddons] = useState(false);
  const [isMapAddonsModalOpen, setIsMapAddonsModalOpen] = useState(false);
  const [isAdditionalDetails, setIsAdditionalDetails] = useState(false);
  const [isServingInfo, setIsServingInfo] = useState(false);
  const [isCustomization, setIsCustomization] = useState(false);
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
  const [isCreateVariantModalOpen, setIsCreateVariantModalOpen] = useState(false);
  const [isAddCustomizationModalOpen, setIsAddCustomizationModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [availabilityForFoodItem, setAvailabilityForFoodItem] = useState(false);
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      itemName: "",
      itemImage: "",
      itemImagePreview: "",
      itemDescription: "",
      cuisine: "",
      foodType: "",
      menuCategory: "",
      basePrice: "",
      packagingCharges: "",
      numberOfPeople: "",
      dishSize: "",
      preparationTime: "",
      restaurant: "",
      variations: [],
      addOns: [],
      customizations: [],
      timingType: "sameAsRestaurant",
      openingTime: "",
      closingTime: "",
      days: []
    }
  })
  const { register, control, watch, setValue, getValues } = form;

  const restaurantRef = register("restaurant");
  const itemImageRef = register("itemImage");

  const restaurant = watch("restaurant");
  const itemImage = watch("itemImage");


  useEffect(() => {
    updateMultiplePreview(restaurant, "restaurantPreview", setValue);
    updateMultiplePreview(itemImage, "itemImagePreview", setValue);
  }, [form, restaurant, itemImage, setValue]);

  const handleCustomization = (index) => {
    setCurrentIndex(index);
    setIsAddCustomizationModalOpen(true);
  }

  const { state } = useLocation();
  const { res, fetchData, isLoading } = useGetApiReq();

  const getCuisines = () => {
    fetchData("/admin/get-cuisines");
  }

  console.log("getvalues data", getValues());

  useEffect(() => {
    getCuisines();
  }, [])

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("get cuisines res", res);
      setCuisines(res?.data?.data?.cuisines);
    }
  }, [res])

  const { res: addItemRes, fetchData: fetchAddItemData, isLoading: isAddItemLoading } = usePostApiReq();

  const onSubmit = (data) => {
    console.log("submit data", data);

    const availableTimings = {
      sameAsRestaurant: data.timingType === "sameAsRestaurant",
      start: data.openingTime,
      end: data.closingTime,
      days: data.days,
    }

    const modifiedCustomizations = getValues("customizations")?.map((customization) => {
      return {
        name: customization.categoryName,
        type: customization.customizationType,
        options: customization.customizationOptions,
      }
    })

    const formData = new FormData();
    formData.append("name", data.itemName);
    formData.append("description", data.itemDescription);
    formData.append("price", data.basePrice);
    formData.append("FoodType", data.foodType);
    formData.append("cuisine", data.cuisine);
    formData.append("preparationTime", data.preparationTime);
    formData.append("categoryId", params?.categoryId);
    formData.append("availableTimings", JSON.stringify(availableTimings));
    formData.append("variations", JSON.stringify(getValues("variations")));
    formData.append("addOns", JSON.stringify(getValues("addOns")));
    formData.append("customizations", JSON.stringify(modifiedCustomizations));
    Array.from(data.itemImage).forEach((image) => {
      formData.append("images", image);
    });
    fetchAddItemData(`/admin/add-menu-item/${state?.restaurantId}`, formData);
  }
  // menuCategory: "",
  // packagingCharges: "",
  // numberOfPeople: "",
  // dishSize: "",
  // customizations: [],

  useEffect(() => {
    if (addItemRes?.status === 200 || addItemRes?.status === 201) {
      console.log("add item res", addItemRes);
      navigate(`/admin/restaurant/${state?.restaurantId}/menu`)
    }
  }, [addItemRes])

  return (
    <AdminWrapper>
      <section className='px-0 py-0 w-full h-full min-h-screen'>
        <div className='flex justify-start items-center mb-4'>
          <MdKeyboardArrowLeft onClick={() => navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
          <h2 className='text-[#000000] text-xl font-medium font-roboto'>Restaurant </h2>
        </div>
        <div className='bg-[#FFFFFF]'>
          <div className='px-10 bg-[#FFFFFF] border-b-[1px] border-b-[#CDCDCD]'>
            <h1 className='text-[#000000] text-2xl font-semibold font-inter py-8'>Add Item Details</h1>
          </div>
          <div className='mb-4 py-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div>
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5">
                      <h3 className='text-[#000000] text-xl font-semibold font-inter'>Basic Details</h3>
                      {/* <h2 className="class-lg6 text-black">Basic Details</h2> */}
                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="itemName"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Item Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter Dish Name"  {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="itemDescription"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Item Description</FormLabel>
                              <FormControl>
                                <Textarea className="resize-none" placeholder="Add a detailed description explaining the dish"  {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

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
                                    <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
                                      <VegIcon />
                                      <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "veg" && "text-[#3579F0]"}`}>Veg</p>
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-y-0">
                                    <FormControl className="hidden">
                                      <RadioGroupItem value="non-veg" />
                                    </FormControl>
                                    <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "non-veg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
                                      <NonVegIcon />
                                      <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "non-veg" && "text-[#3579F0]"}`}>Non-Veg</p>
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-y-0">
                                    <FormControl className="hidden">
                                      <RadioGroupItem value="egg" />
                                    </FormControl>
                                    <FormLabel className={`border rounded p-4 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("foodType") === "egg" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
                                      <EggIcon />
                                      <p className={`text-black group-hover:text-[#3579F0] ${getValues("foodType") === "egg" && "text-[#3579F0]"}`}>Egg</p>
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="menuCategory"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Menu Category</FormLabel>
                              <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Combos">Combos</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="preparationTime"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Preparation Time</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Preparation Time (in minutes)"  {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-5">
                        <Label>Item Photos</Label>
                        {/* <div onClick={() => setIsItemImageUploadModalOpen(true)} className='border-2 mt-2 flex flex-col bg-[#F7FAFF] items-center justify-center primary-color w-40 h-40 rounded-md px-5 py-4'>
                                                    <FiUpload size={25} />
                                                    <p className='font-semibold text-center primary-color text-sm mt-2'>Upload</p>
                                                </div> */}
                        <FormField
                          control={control}
                          name="itemImage"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel className="cursor-pointer left-0 w-full h-full top-0">
                                <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">Change</span>
                                {!watch("itemImagePreview") &&
                                  <div className='border-2 mt-2 flex flex-col bg-[#F7FAFF] items-center justify-center primary-color w-40 h-40 rounded-md px-5 py-4'>
                                    <FiUpload size={25} />
                                    <p className='font-semibold text-center primary-color text-sm mt-2'>Upload</p>
                                  </div>
                                }
                                {watch("itemImagePreview")?.length > 0 && (
                                  <div className="flex gap-4 flex-wrap mt-5">
                                    {watch("itemImagePreview").map((image, index) => (
                                      <img key={index} className="w-40" src={image} alt={`Preview ${index + 1}`} />
                                    ))}
                                  </div>
                                )}
                              </FormLabel>
                              <FormControl className="hidden">
                                <Input multiple={true} type="file" {...itemImageRef} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pb-5 border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5">
                      <h2 className="class-lg6 text-black">Item Pricing</h2>

                      <div className="bg-[#F7FAFF] py-4 px-6 rounded-lg mt-2">
                        <h2 className="class-base6 text-black">Customers trust brands with fair pricing</h2>
                        <p className="class-sm2 text-[#757575]">Keep same prices across menus offered for online ordering.</p>
                      </div>

                      <div className="w-full mt-5">
                        <FormField
                          control={control}
                          name="basePrice"
                          render={({ field }) => (
                            <FormItem className="z-20">
                              <FormLabel>Base price</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter Base price of dish"  {...field} />
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
                                <Input type="number" placeholder="Enter packaging charges"  {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="bg-[#F7FAFF] py-3 px-6 rounded-lg mt-5">
                        <h2 className="class-base6 text-black">Please make sure that your offline and online prices match</h2>
                      </div>
                    </div>
                  </div>
                  <div className="pb- border-b-2 border-dashed border-[#D3D3D3]">
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div onClick={() => setIsVariant(!isVariant)} className="cursor-pointer pb-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Variants</h3>
                          {isVariant ? <FaMinus className="text-black" size={20} />
                            : <FaPlus className="text-black" size={20} />}
                        </div>
                        <p>You can offer variations of a item, such as size/ base/ crust, etc. When customers place an order, they must choose at least one from the defined variants.</p>
                      </div>
                      {isVariant &&
                        <>
                          <button onClick={() => setIsVariantModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md">
                            <FaPlus className="text-base" />
                            <p className="font-semibold text-lg">Create new Variant</p>
                          </button>
                          {watch("variations").length > 0 &&
                            <div className="mt-5">
                              <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
                                <h4 className="font-inter text-[#969696] font-semibold">Variant Name</h4>
                                <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
                              </div>
                              {watch("variations")?.map((variation, i) => (
                                <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
                                  <h4 className="font-inter text-[#969696] font-semibold">{variation?.name}</h4>
                                  <h4 className="font-inter text-[#969696] font-semibold">Rs {variation?.price}</h4>
                                </div>))}
                            </div>
                          }
                        </>
                      }
                    </div>
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div onClick={() => setIsMapAddons(!isMapAddons)} className="cursor-pointer pb-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Map Addons</h3>
                          {isMapAddons ? <FaMinus className="text-black" size={20} />
                            : <FaPlus className="text-black" size={20} />}
                        </div>
                        <p>Add-ons enhance the customer experience by offering extra choices like toppings or desserts.</p>
                      </div>
                      {isMapAddons &&
                        <>
                          <button onClick={() => setIsMapAddonsModalOpen(true)} type="button" className="bg-[#F8F9FC] text-[#4A67FF] p-5 w-full flex items-center gap-2 rounded-md">
                            <FaPlus className="text-base" />
                            <p className="font-semibold text-lg">Create new Add on group</p>
                          </button>
                          {watch("addOns").length > 0 &&
                            <div className="mt-5">
                              <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
                                <h4 className="font-inter text-[#969696] font-semibold">AddOn Name</h4>
                                <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
                              </div>
                              {watch("addOns")?.map((variation, i) => (
                                <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
                                  <h4 className="font-inter text-[#969696] font-semibold">{variation?.name}</h4>
                                  <h4 className="font-inter text-[#969696] font-semibold">Rs {variation?.price}</h4>
                                </div>))}
                            </div>
                          }
                        </>
                      }
                    </div>
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div onClick={() => setIsAdditionalDetails(!isAdditionalDetails)} className="cursor-pointer pb-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Additional Details</h3>
                          {isAdditionalDetails ? <FaMinus className="text-black" size={20} />
                            : <FaPlus className="text-black" size={20} />}
                        </div>
                        <p>Add Cuisine</p>
                      </div>
                      {isAdditionalDetails &&
                        <div className="border border-[#A8A8A8] p-5 w-full rounded-md">
                          <h3 className="text-black class-lg6">Cuisine</h3>

                          {cuisines.length === 0 && isLoading &&
                            <Spinner />
                          }

                          {cuisines.length === 0 && !isLoading &&
                            <DataNotFound name="Cuisines" />
                          }

                          {cuisines.length > 0 &&
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
                                          <FormItem key={cuisine?._id} className="flex items-center space-y-0">
                                            <FormControl className="hidden">
                                              <RadioGroupItem value={cuisine?._id} />
                                            </FormControl>
                                            <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === cuisine?._id && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
                                              <p>{cuisine?.name}</p>
                                            </FormLabel>
                                          </FormItem>
                                        ))}

                                        <FormItem className="flex items-center space-y-0">
                                          <FormControl className="hidden">
                                            <RadioGroupItem value="Indian cuisine" />
                                          </FormControl>
                                          <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === "Indian cuisine" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
                                            <p>Indian cuisine</p>
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-y-0">
                                          <FormControl className="hidden">
                                            <RadioGroupItem value="Jain" />
                                          </FormControl>
                                          <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === "Jain" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
                                            <p>Jain</p>
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-y-0">
                                          <FormControl className="hidden">
                                            <RadioGroupItem value="Italian cuisine" />
                                          </FormControl>
                                          <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === "Italian cuisine" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
                                            <p>Italian cuisine</p>
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-y-0">
                                          <FormControl className="hidden">
                                            <RadioGroupItem value="Vegan" />
                                          </FormControl>
                                          <FormLabel className={`border border-[#B6B6B6] rounded p-4 py-2 flex items-center gap-2 cursor-pointer group hover:bg-[#EDF4FF] ${getValues("cuisine") === "Vegan" && "bg-[#EDF4FF] border border-[#3579F0]"}`}>
                                            <p>Vegan</p>
                                          </FormLabel>
                                        </FormItem>
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          }
                        </div>
                      }
                    </div>
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div onClick={() => setIsServingInfo(!isServingInfo)} className="cursor-pointer pb-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Serving Info</h3>
                          {isServingInfo ? <FaMinus className="text-black" size={20} />
                            : <FaPlus className="text-black" size={20} />}
                        </div>
                        <p>Add serving sizes to improve customer experience.</p>
                      </div>
                      {isServingInfo &&
                        <div className="grid grid-cols-2 items-center gap-2 w-full">
                          <FormField
                            control={control}
                            name="numberOfPeople"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of people</FormLabel>
                                <FormControl>
                                  <Input placeholder="Select appropriate serving info"  {...field} />
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
                                  <Input placeholder="Enter quantity"  {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      }
                    </div>
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div onClick={() => setIsCustomization(!isCustomization)} className="cursor-pointer pb-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Customization</h3>
                          <div className="flex items-center gap-3">
                            <Button type="button" onClick={() => setIsCustomizationModalOpen(true)} variant="outline" className="flex gap-1 px-5 items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
                              <FaPlus />
                              Add More
                            </Button>
                            {isCustomization ? <FaMinus className="text-black" size={20} />
                              : <FaPlus className="text-black" size={20} />}
                          </div>
                        </div>
                        <p>Customization for category</p>
                      </div>
                      {isCustomization &&
                        <div className="w-full flex flex-col gap-4">
                          {watch("customizations")?.map((customization, i) => (
                            <div key={i} className="w-full">
                              <div className="flex justify-between items-center gap-4">
                                <h3 className="font-inter text-lg text-[#969696] font-semibold">{customization?.categoryName}</h3>
                                <Button type="button" onClick={() => handleCustomization(i)} variant="outline" className="flex gap-1 w-[200px] items-center border-[#4A67FF] text-[#4A67FF] hover:border-[#4A67FF] hover:bg-transparent hover:text-[#4A67FF]">
                                  <FaPlus />
                                  Add Customization
                                </Button>
                              </div>
                              {/* <h4 className="font-inter text-[#969696] font-semibold">Sub Category Name</h4> */}
                              {customization?.customizationOptions &&
                                customization?.customizationOptions.length > 0 &&
                                <div className="px-4">
                                  <div className="grid grid-cols-[70%_28%] gap-[2%] mt-5 border-b border-[#DADADA] pb-2">
                                    <h4 className="font-inter text-[#969696] font-semibold">Customization Name</h4>
                                    <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
                                  </div>
                                  {customization?.customizationOptions?.map((option, i) => (
                                    <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
                                      <h4 className="font-inter text-[#969696] font-semibold">{option?.name}</h4>
                                      <h4 className="font-inter text-[#969696] font-semibold">Rs {option?.price}</h4>
                                    </div>))}
                                </div>}
                            </div>
                          ))}

                        </div>
                      }
                    </div>
                    <div className="p-5 border-b border-[#C8C8C8]">
                      <div onClick={() => setAvailabilityForFoodItem(!availabilityForFoodItem)} className="cursor-pointer pb-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black class-lg6">Availability for  food item</h3>
                          {availabilityForFoodItem ? <FaMinus className="text-black" size={20} />
                            : <FaPlus className="text-black" size={20} />}

                        </div>
                        <p>Availability for <b>food item</b></p>
                      </div>

                      {availabilityForFoodItem &&
                        <AvailabilityForFoodItem form={form} />
                      }
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 bg-[#FFFFFF] w-full p-4'>
                  <button type='button' className='h-[68px] w-full text-[#F97474] text-xl font-semibold font-inter bg-[#FFFFFF] rounded-lg border-[1px] border-[#256FEF]'>Discard</button>
                  <button className='h-[68px] w-full text-[#FFFFFF] text-xl font-semibold font-inter bg-[#256FEF] rounded-lg border-[1px] border-[#256FEF]'>Save changes</button>
                </div>
              </form>
            </Form>
          </div>

          {isVariantModalOpen &&
            <CreateVariantModel
              isVariantModalOpen={isVariantModalOpen}
              setIsVariantModalOpen={setIsVariantModalOpen}
              setValue={setValue}
              getValues={getValues}
            />
          }

          {isMapAddonsModalOpen &&
            <MapAddOnModel
              isMapAddonsModalOpen={isMapAddonsModalOpen}
              setIsMapAddonsModalOpen={setIsMapAddonsModalOpen}
              setValue={setValue}
              getValues={getValues}
            />
          }

          {isAddCustomizationModalOpen &&
            <AddCustomizationModal
              isAddCustomizationModalOpen={isAddCustomizationModalOpen}
              setIsAddCustomizationModalOpen={setIsAddCustomizationModalOpen}
              currentIndex={currentIndex}
              setValue1={setValue}
              getValues1={getValues}
            />
          }

          {isCustomizationModalOpen &&
            <AddCustomizationCategoryModal
              isCustomizationModalOpen={isCustomizationModalOpen}
              setIsCustomizationModalOpen={setIsCustomizationModalOpen}
              setValue={setValue}
              getValues={getValues}
            />
          }
        </div>
      </section>
    </AdminWrapper>

  )
}

export default AddMenu