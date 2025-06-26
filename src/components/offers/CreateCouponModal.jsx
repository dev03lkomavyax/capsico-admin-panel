/* eslint-disable react/prop-types */
import { CreateCouponSchema } from "@/schema/CreateCouponSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import MultiSelect from "../MultiSelect";
import { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";

const CreateCouponModal = ({
  isCreateCouponModalOpen,
  setIsCreateCouponModalOpen,
}) => {
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const form = useForm({
    resolver: zodResolver(CreateCouponSchema),
    defaultValues: {
      couponCode: "",
      couponName: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      maxDiscount: 0,
      startDate: new Date(),
      endDate: new Date(),
      applicableItems: [],
      applicableTo: "all",
      applicableCuisines: [],
      status: "active",
      categoryId: "",
      isDealOfDay: false,
      priorityLevel: 0,
      minOrderValue: 0,
    },
  });

  const { handleSubmit, control, watch, getValues } = form;

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: itemsRes,
    fetchData: itemsFetchData,
    isLoading: itemsIsLoading,
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
  } =usePostApiReq();

  const getCuisines = () => {
    fetchData("/admin/get-cuisines");
  };

  useEffect(() => {
    getCuisines();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      const modifiedCuisines = res?.data?.data?.cuisines?.map((cuisine) => ({
        label: cuisine?.name,
        value: cuisine?._id,
      }));
      setCuisines(modifiedCuisines);
    }
  }, [res]);

  const getCategory = () => {
    categoryFetchData("/admin/get-categories");
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (categoryRes?.status === 200 || categoryRes?.status === 201) {
      console.log("categoryRes", categoryRes);
      setCategories(categoryRes?.data?.categories);
    }
  }, [categoryRes]);

  const getItems = () => {
    itemsFetchData(`/admin/get-items-by-category/${watch("categoryId")}`);
  };
  
  useEffect(() => {
    watch("categoryId") && getItems();
  }, [watch("categoryId")]);

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
  
  const onSubmit = (data) => {
    console.log("data", data);
    const apiData = {
      name: data.couponName,
      code: data.couponCode?.toUpperCase(),
      dealoftheday: data.isDealOfDay,
      priority: data.priorityLevel,
      description: data.description,
      createdBy: "platform",
      discountType: data.discountType,
      discountValue: data.discountValue,
      maxDiscount: data.maxDiscount,
      minOrderValue: data.minOrderValue,
      applicableOn: data.applicableTo,
      applicableCuisines: data.applicableCuisines,
      applicableItems: data.applicableItems,
      startDate: data.startDate,
      endDate: data.endDate,
      isActive: data.status === "active" ? true : false,
      maxUsageCount: data.maxUsage,
      dealType: data.dealType,
      maxUsagePerUser: data.maxUsesPerUser,
      usageFrequency: data.usageFrequency,
    };
    addCoupon(`/admin/add-coupon`, apiData);
  };
  
  useEffect(() => {
    if (addCouponRes?.status === 200 || addCouponRes?.status === 201) {
      console.log("addCoupon Res", addCouponRes);
      setIsCreateCouponModalOpen(false);
    }
  }, [addCouponRes]);

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <Dialog
      open={isCreateCouponModalOpen}
      onOpenChange={setIsCreateCouponModalOpen}
    >
      <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Offer</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
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
              />

              <FormField
                control={control}
                name="couponName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Coupon Name" {...field} />
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

              <FormField
                control={control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Discount Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="buyOneGetOne">
                          Buy One Get One
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watch("discountType") !== "buyOneGetOne" && (
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

              {watch("discountType") === "percentage" && (
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
              />

              {watch("applicableTo") === "cuisine" && (
                <FormField
                  control={control}
                  name="applicableCuisines"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuisines</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <MultiSelect
                            label="Select Cuisines"
                            options={cuisines}
                            value={field.value || []}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {watch("applicableTo") === "specific_items" && (
                <FormField
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category?._id}
                              value={category?._id}
                            >
                              {category?.name}
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
              )}

              {watch("categoryId") && (
                <FormField
                  control={control}
                  name="applicableItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Items</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <MultiSelect
                            label="Select Items"
                            options={items}
                            value={field.value || []}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">In Active</SelectItem>
                      </SelectContent>
                    </Select>
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

              {watch("isDealOfDay") && (
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
              )}

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
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <Button variant="capsico" type="submit" className="ml-auto">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCouponModal;
