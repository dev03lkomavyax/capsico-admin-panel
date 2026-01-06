import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DatePicker from "@/components/DatePicker";
import MultiSelect from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePutApiReq from "@/hooks/usePutApiReq";
import { offerSchema } from "@/schema/CreateCouponSchema";
import { readCookie } from "@/utils/readCookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateOffer = () => {
  const userInfo = readCookie("userInfo");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsByRestaurant, setItemsByRestaurant] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const { state: offer } = useLocation();

  useEffect(() => {
    console.log("offer", offer);
  }, [offer]);

  const {
    res: fetchRestaurantsRes,
    fetchData: fetchRestaurants,
    isLoading: isRestaurantsLoading,
  } = useGetApiReq();

  const getRestaurants = () => {
    fetchRestaurants(`/admin/get-all-restaurants`);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    if (
      fetchRestaurantsRes?.status === 200 ||
      fetchRestaurantsRes?.status === 201
    ) {
      console.log("fetchRestaurantsRes", fetchRestaurantsRes);
      setRestaurants(fetchRestaurantsRes?.data?.restaurants || []);
      // setValue("restaurantId", offer.id);
    }
  }, [fetchRestaurantsRes]);

  const form = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      restaurantId: offer?.restaurantId?._id || "",
      offerName: offer?.name || "",
      description: offer?.description || "",
      offerType: offer?.offerType || "percentageDiscount",
      scope: offer?.scope || "global",
      discountValue: offer?.offerDetails?.discountValue || 0,
      maxDiscount: offer?.offerDetails?.maxDiscount || 0,
      startDate: (offer?.startDate && new Date(offer?.startDate)) || new Date(),
      endDate: (offer?.endDate && new Date(offer?.endDate)) || new Date(),
      applicableItems: offer?.applicableItems?.map((item) => item.id) || [],
      applicableCategories:
        offer?.applicableCategories?.map((item) => item.id) || [],
      categoryId: "",
      priorityLevel: offer?.priority || 0,
      minOrderValue: offer?.minOrderValue || 0,
      offerDetails: {
        bogoConfig: offer?.offerDetails?.bogoConfig,
        comboItems: offer?.offerDetails?.comboItems,
        comboPrice: offer?.offerDetails?.comboPrice,
        comboConfig: offer?.offerDetails?.comboConfig,
      },
      maxUsage: offer?.maxUsageCount,
      maxUsesPerUser: offer?.maxUsagePerUser,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    reset,
    setValue,
    formState,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "offerDetails.comboItems",
  });

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: itemsRes,
    fetchData: itemsFetchData,
    isLoading: itemsIsLoading,
  } = useGetApiReq();
  const {
    res: itemsByRestaurantRes,
    fetchData: itemsByRestaurantFetchData,
    isLoading: isItemsByRestaurantLoading,
  } = useGetApiReq();
  const {
    res: categoryRes,
    fetchData: categoryFetchData,
    isLoading: categoryIsLoading,
  } = useGetApiReq();
  const {
    res: addCouponRes,
    fetchData: addCoupon,
    isLoading: isAddCouponLoading,
  } = usePutApiReq();

  const getCategory = () => {
    categoryFetchData(`/admin/get-categories/${watch("restaurantId")}`,);
  };

  useEffect(() => {
    if (watch("restaurantId") && watch("scope") !== "global") {
      getCategory();
    }
  }, [watch("restaurantId"), watch("scope")]);

  useEffect(() => {
    if (categoryRes?.status === 200 || categoryRes?.status === 201) {
      console.log("categoryRes", categoryRes);
      const modifiedCategories = categoryRes?.data?.data?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }));
      setCategories(modifiedCategories || []);
    }
  }, [categoryRes]);

  const getItems = () => {
    itemsFetchData(`/admin/get-items-by-category/${watch("categoryId")}`);
  };

  useEffect(() => {
    if (
      watch("scope") !== "global" &&
      watch("categoryId") &&
      watch("scope") !== "categorywise"
    ) {
      getItems();
    }
  }, [watch("categoryId"), watch("scope")]);

  useEffect(() => {
    if (itemsRes?.status === 200 || itemsRes?.status === 201) {
      console.log("itemsRes", itemsRes);
      const modifiedItems = itemsRes?.data?.items?.map((item) => ({
        label: item?.name,
        value: item?._id,
      }));
      setItems(modifiedItems);
    }
  }, [itemsRes]);

  const getItemsByRestaurant = () => {
    itemsByRestaurantFetchData(
      `/admin/get-items-by-restaurantId/${watch("restaurantId")}`
    );
  };

  useEffect(() => {
    if (
      (watch("offerType") === "comboDeals" && watch("restaurantId")) ||
      watch("scope") === "itemwise"
    ) {
      getItemsByRestaurant();
    }
  }, [watch("restaurantId"), watch("offerType"), watch("scope")]);

  useEffect(() => {
    if (
      itemsByRestaurantRes?.status === 200 ||
      itemsByRestaurantRes?.status === 201
    ) {
      console.log("itemsByRestaurantRes", itemsByRestaurantRes);
      const modifiedItems = itemsByRestaurantRes?.data?.items?.map((item) => ({
        label: item?.name,
        value: item?._id,
      }));
      setItemsByRestaurant(modifiedItems);
    }
  }, [itemsByRestaurantRes]);

  const onSubmit = (data) => {
    console.log("data", data);

    const apiData = {
      restaurantId: userInfo?.id || "",
      name: data.offerName,
      description: data.description,
      offerType: data.offerType,
      scope: data.scope,
      applicableItems: data.applicableItems,
      applicableCategories: data.applicableCategories,
      minOrderValue: data.minOrderValue,
      startDate: data.startDate,
      endDate: data.endDate,
      maxUsageCount: data.maxUsage,
      maxUsagePerUser: data.maxUsesPerUser,
      priority: data.priorityLevel,
    };

    if (data.offerType === "flatOff") {
      apiData.offerDetails = { discountValue: data.discountValue };
    }

    if (data.offerType === "percentageDiscount") {
      apiData.offerDetails = {
        discountValue: data.discountValue,
        maxDiscount: data.maxDiscount,
      };
    }

    if (data.offerType === "bogoOffers") {
      apiData.offerDetails = {
        bogoConfig: {
          buyQuantity: data.offerDetails.bogoConfig.buyQuantity,
          getQuantity: data.offerDetails.bogoConfig.getQuantity,
          freeItemType: data.offerDetails.bogoConfig.freeItemType,
        },
      };
    }

    if (data.offerType === "comboDeals") {
      apiData.offerDetails = {
        comboItems: data.offerDetails.comboItems,
        comboPrice: data.offerDetails.comboPrice,
        comboConfig: data.offerDetails.comboConfig,
      };
    }
    console.log("apiData", apiData);

    addCoupon(`/offers/update-offer/${offer.id}`, apiData);
  };

  useEffect(() => {
    if (addCouponRes?.status === 200 || addCouponRes?.status === 201) {
      console.log("addCoupon Res", addCouponRes);
      reset();
       navigate("/admin/offers");
    }
  }, [addCouponRes]);

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <AdminWrapper>
      <div>
        <button
          className="inline-flex gap-1 items-center mt-5"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Update Offer
          </h2>
        </button>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-4 bg-white p-4 rounded-md mt-5 mx-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="restaurantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Restaurant" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {restaurants.map((restaurant) => (
                          <SelectItem
                            key={restaurant._id}
                            value={restaurant._id}
                          >
                            {restaurant.name}
                          </SelectItem>
                        ))}
                        {restaurants.length === 0 && (
                          <p>No restaurants found</p>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={control}
                name="couponCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Coupon Code"
                        className="uppercase"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={control}
                name="offerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Offer Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="offerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offer Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Offer Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="flatOff">Flat Off</SelectItem>
                        <SelectItem value="percentageDiscount">
                          Percentage Discount
                        </SelectItem>
                        <SelectItem value="bogoOffers">
                          Buy One Get One
                        </SelectItem>
                        <SelectItem value="comboDeals">Combo Deals</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(watch("offerType") === "flatOff" ||
                watch("offerType") === "percentageDiscount") && (
                <FormField
                  control={control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Discount Value"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {watch("offerType") === "percentageDiscount" && (
                <FormField
                  control={control}
                  name="maxDiscount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Discount (in Rs)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Maximum Discount"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {watch("offerType") === "bogoOffers" && (
                <>
                  <FormField
                    control={control}
                    name="offerDetails.bogoConfig.buyQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Buy Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="offerDetails.bogoConfig.getQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Get Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="offerDetails.bogoConfig.freeItemType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Item Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Free Item Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="same">Same</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {watch("offerType") === "comboDeals" && (
                <>
                  <div className="col-span-2">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-[1fr_1fr_auto_1fr] gap-4 mb-2"
                      >
                        {/* Item ID */}
                        <FormField
                          control={control}
                          name={`offerDetails.comboItems.${index}.itemId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                key={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Item" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {itemsByRestaurant?.map((item) => (
                                    <SelectItem
                                      key={item?.value}
                                      value={item?.value}
                                    >
                                      {item?.label}
                                    </SelectItem>
                                  ))}

                                  {itemsByRestaurant.length === 0 && (
                                    <p>No items found</p>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Quantity */}
                        <FormField
                          control={control}
                          name={`offerDetails.comboItems.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Required checkbox */}
                        <FormField
                          control={control}
                          name={`offerDetails.comboItems.${index}.isRequired`}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 mt-6">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Required</FormLabel>
                            </FormItem>
                          )}
                        />

                        {/* Remove button */}
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                          className="mt-6"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    {formState?.errors?.offerDetails?.comboItems?.root
                      ?.message && (
                      <p className="text-destructive">
                        {formState.errors.offerDetails.comboItems.root.message}
                      </p>
                    )}

                    <div className="flex justify-end">
                      {/* Add button */}
                      <Button
                        type="button"
                        className="w-[40%]"
                        onClick={() =>
                          append({ itemId: "", quantity: 1, isRequired: false })
                        }
                      >
                        Add Item
                      </Button>
                    </div>
                  </div>

                  <FormField
                    control={control}
                    name="offerDetails.comboPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Combo Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="offerDetails.comboConfig.allowSubstitution"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Allow Substitution</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {watch("offerDetails.comboConfig.allowSubstitution") && (
                    <FormField
                      control={control}
                      name="offerDetails.comboConfig.substitutionLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Substitutions</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}
              <FormField
                control={control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Scope" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="categorywise">
                          Category-wise
                        </SelectItem>
                        <SelectItem value="itemwise">Item-wise</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {watch("scope") === "itemwise" && (
                <FormField
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
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
                          {categories?.map((category) => (
                            <SelectItem
                              key={category?.value}
                              value={category?.value}
                            >
                              {category?.label}
                            </SelectItem>
                          ))}

                          {categories.length === 0 && (
                            <p>No categories found</p>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )} */}

              {watch("scope") === "categorywise" && (
                <FormField
                  control={control}
                  name="applicableCategories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applicable Categories</FormLabel>
                      <MultiSelect
                        label="Select Categories"
                        options={categories}
                        value={field.value || []}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {watch("scope") === "itemwise" && (
                <FormField
                  control={control}
                  name="applicableItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Items</FormLabel>
                      <FormControl>
                        <MultiSelect
                          label="Select Items"
                          options={itemsByRestaurant}
                          value={field.value || []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* <FormField
                control={control}
                name="applicableTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applicable to</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Applicable to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Items</SelectItem>
                        <SelectItem value="cuisine">Cuisine</SelectItem>
                        <SelectItem value="specific_items">
                          Specific Items
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={control}
                name="minOrderValue"
                type="number"
                placeholder="Minimum Order Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="maxUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Usage</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Maximum Usage"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {watch("isDealOfDay") && (
                <FormField
                  control={control}
                  name="dealType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Deal Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="item">Item</SelectItem>
                          <SelectItem value="category">Category</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )} */}

              <FormField
                control={control}
                name="maxUsesPerUser"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Uses Per User</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Maximum Uses Per User"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="priorityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority Level</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Priority Level"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={control}
                name="usageFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Usage Frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no_restriction">
                          No Restriction
                        </SelectItem>
                        <SelectItem value="once_per_day">
                          Once Per Day
                        </SelectItem>
                        <SelectItem value="once_per_week">
                          Once Per Week
                        </SelectItem>
                        <SelectItem value="once_per_month">
                          Once Per Month
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            {/* <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="isDealOfDay"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Deal of the Day</FormLabel>
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
            </div> */}
            <div className="flex justify-end">
              <Button variant="capsico" type="submit" className="ml-auto">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminWrapper>
  );
};

export default UpdateOffer;
