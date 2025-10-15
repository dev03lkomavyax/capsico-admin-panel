import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import toast from "react-hot-toast";
import DatePicker from "@/components/DatePicker";

const spotlightSchema = z.object({
  restaurantId: z.string().min(1, "Select a restaurant"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z
    .string()
    .transform((val) => parseInt(val || "0"))
    .refine((val) => val >= 0 && val <= 100, "Priority must be 0–100"),
  startDate: z.preprocess(
    (val) => (val ? new Date(val) : undefined),
    z.date().optional()
  ),
  endDate: z.preprocess(
    (val) => (val ? new Date(val) : undefined),
    z.date().optional()
  ),

  isActive: z.boolean().default(true),
  spotlightFoodIds: z.array(z.string()).min(1, "Select at least one item"),
});

const CreateSpotlight = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(spotlightSchema),
    defaultValues: {
      restaurantId: "",
      title: "Featured Items",
      description: "",
      priority: "0",
      startDate: "",
      endDate: "",
      isActive: true,
      spotlightFoodIds: [],
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  // console.log("formState-errors", errors);

  // Hooks for APIs
  const { res: fetchRestaurantsRes, fetchData: fetchRestaurants } =
    useGetApiReq();
  const { res: categoryRes, fetchData: categoryFetchData } = useGetApiReq();
  const { res: itemsRes, fetchData: itemsFetchData } = useGetApiReq();
  const {
    res: createRes,
    fetchData: createSpotlight,
    isLoading: isSubmitting,
  } = usePostApiReq();

  // Fetch all restaurants on mount
  useEffect(() => {
    fetchRestaurants(`/admin/get-all-restaurants`);
  }, []);

  useEffect(() => {
    if (
      fetchRestaurantsRes?.status === 200 ||
      fetchRestaurantsRes?.status === 201
    ) {
      setRestaurants(fetchRestaurantsRes?.data?.restaurants || []);
    }
  }, [fetchRestaurantsRes]);

  // Fetch categories on restaurant change
  useEffect(() => {
    if (watch("restaurantId")) {
      categoryFetchData(`/admin/get-categories/${watch("restaurantId")}`);
      setSelectedItems([]);
      setValue("spotlightFoodIds", []);
      setCategory("");
    }
  }, [watch("restaurantId")]);

  useEffect(() => {
    if (categoryRes?.status === 200 || categoryRes?.status === 201) {
      const modifiedCategories = categoryRes?.data?.data?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }));
      setCategories(modifiedCategories || []);
    }
  }, [categoryRes]);

  // Fetch items on category change
  useEffect(() => {
    if (category) {
      itemsFetchData(`/admin/get-items-by-category/${category}`);
      setSelectedItems([]);
      setValue("spotlightFoodIds", []);
    }
  }, [category]);

  useEffect(() => {
    if (itemsRes?.status === 200 || itemsRes?.status === 201) {
      setItems(itemsRes?.data?.items || []);
    }
  }, [itemsRes]);

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((i) => i !== itemId)
        : [...prev, itemId]
    );
  };

  useEffect(() => {
    setValue("spotlightFoodIds", selectedItems);
  }, [selectedItems]);

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    console.log("Spotlight payload:", data);
    await createSpotlight(`/spotlight/createSpotlight`, data);
  };

  useEffect(() => {
    if (createRes?.status === 201 || createRes?.status === 200) {
      toast.success("Spotlight created successfully!");
      navigate("/admin/spotlight");
    } else if (createRes?.status >= 400) {
      toast.error(createRes?.data?.error || "Failed to create spotlight");
    }
  }, [createRes]);

  const onError = (errors) => {
    console.log(errors);
    // toast.error(Object.values(errors)[0]?.message || "Error");
  };

  return (
    <AdminWrapper>
      <div>
        <Link
          to="/admin/spotlight"
          className="inline-flex gap-1 items-center mb-4"
        >
          <ChevronLeft />
          <h2 className="text-[#111928] text-xl font-semibold font-inter">
            Create Spotlight
          </h2>
        </Link>

        <Card className="w-full">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* LEFT SIDE */}
                <div className="md:col-span-2 space-y-6">
                  {/* Restaurant */}
                  <FormField
                    control={control}
                    name="restaurantId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Restaurant</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a restaurant" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {restaurants.map((restaurant) => (
                              <SelectItem
                                key={restaurant?._id}
                                value={restaurant?._id}
                                className="capitalize"
                              >
                                {restaurant.name}
                              </SelectItem>
                            ))}
                            {restaurants.length === 0 && (
                              <DataNotFound name="Restaurants" />
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Title */}
                  <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spotlight Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Chef’s Specials"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Short description..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Menu Items */}
                  <div>
                    {watch("restaurantId") && (
                      <>
                        <FormLabel>Select Category</FormLabel>
                        <div className="flex items-center gap-2 my-4 flex-wrap">
                          {categories.map((cat) => (
                            <Badge
                              key={cat.value}
                              onClick={() => setCategory(cat.value)}
                              variant={
                                category === cat.value ? "default" : "secondary"
                              }
                              className="cursor-pointer"
                            >
                              {cat.label}
                            </Badge>
                          ))}
                          {categories.length === 0 && (
                            <DataNotFound name="Categories" />
                          )}
                        </div>
                      </>
                    )}
                    {category && (
                      <>
                        <div>
                          <FormLabel>Select Menu Items</FormLabel>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.map((item) => (
                              <div
                                key={item._id}
                                onClick={() => toggleItem(item._id)}
                                className={cn(
                                  "rounded-lg p-3 border transition cursor-pointer",
                                  selectedItems.includes(item._id)
                                    ? "border-primary bg-primary/10"
                                    : "border-transparent hover:bg-muted/50"
                                )}
                              >
                                <img
                                  className="aspect-video bg-cover rounded-md mb-3 bg-gray-300"
                                  src={`${import.meta.env.VITE_IMAGE_URL}/${
                                    item.images?.[0]
                                  }`}
                                  alt={item.name}
                                />
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      ₹{item.price}
                                    </p>
                                  </div>
                                  <p className="text-yellow-500 text-sm font-medium">
                                    ★ {item.rating}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {errors.spotlightFoodIds && (
                            <FormMessage>
                              {errors.spotlightFoodIds.message}
                            </FormMessage>
                          )}
                        </div>
                        {items.length === 0 && (
                          <DataNotFound name="Menu Items" />
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="md:col-span-1 space-y-6">
                  {/* Priority */}
                  <FormField
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority (0–100)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Start Date */}
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
                      </FormItem>
                    )}
                  />

                  {/* End Date */}
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
                      </FormItem>
                    )}
                  />

                  {/* isActive */}
                  {/* <FormField
                    control={control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-2 border rounded-md">
                        <FormLabel className="mb-0">Active</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                </div>

                {/* ACTIONS */}
                <div className="col-span-3 flex justify-end gap-4 pt-6 border-t">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => navigate("/admin/spotlight")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Spotlight"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminWrapper>
  );
};

export default CreateSpotlight;
