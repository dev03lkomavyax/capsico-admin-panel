import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import useGetApiReq from "@/hooks/useGetApiReq";
import DataNotFound from "@/components/DataNotFound";
import { Link } from "react-router-dom";

const spotlightSchema = z.object({
  restaurant: z.string().min(1, "Select a restaurant"),
  // cuisines: z.array(z.string()).min(1, "Select at least one cuisine"),
  menuItems: z.array(z.string()).min(1, "Select at least one item"),
  category: z.string().optional(),
});

const CreateSpotlight = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  console.log("selectedItems", selectedItems);

  const form = useForm({
    resolver: zodResolver(spotlightSchema),
    defaultValues: {
      restaurant: "",
      cuisines: ["Italian", "American"],
      menuItems: selectedItems,
    },
  });

  const { watch, setValue } = form;
  
  useEffect(() => {
    setValue("menuItems", selectedItems);
  }, [selectedItems]);

  useEffect(
    () => {
      if (watch("restaurant")) {
        getCategory();
        setSelectedItems([]); // reset items
        setValue("category", "");
      }
      if (watch("category")) {
        setSelectedItems([]); // reset items
      }
    },
    [watch("restaurant")],
    watch("category")
  );

  const {
    res: fetchRestaurantsRes,
    fetchData: fetchRestaurants,
    isLoading: isRestaurantsLoading,
  } = useGetApiReq();
  const {
    res: categoryRes,
    fetchData: categoryFetchData,
    isLoading: categoryIsLoading,
  } = useGetApiReq();

  const {
    res: itemsRes,
    fetchData: itemsFetchData,
    isLoading: itemsIsLoading,
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
    }
  }, [fetchRestaurantsRes]);

  const getCategory = () => {
    categoryFetchData(`/admin/get-categories/${watch("restaurant")}`);
  };

  useEffect(() => {
    if (watch("restaurant")) {
      getCategory();
    }
  }, [watch("restaurant")]);

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
    itemsFetchData(`/admin/get-items-by-category/${watch("category")}`);
  };

  useEffect(() => {
    if (watch("category")) {
      getItems();
    }
  }, [watch("category")]);

  useEffect(() => {
    if (itemsRes?.status === 200 || itemsRes?.status === 201) {
      console.log("itemsRes", itemsRes);
      const modifiedItems = itemsRes?.data?.items?.map((item) => ({
        label: item?.name,
        value: item?._id,
      }));
      setItems(itemsRes?.data?.items);
    }
  }, [itemsRes]);

  const onSubmit = (data) => {
    console.log("Spotlight data:", data);
  };
  const onError = (error) => {
    console.log("error", error);
  };

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <AdminWrapper>
      <div>
        {/* <h2 className="text-[#000000] text-xl font-medium font-roboto">
          Create Spotlight
        </h2> */}
        <Link to="/admin/spotlight" className="inline-flex gap-1 items-center">
          <ChevronLeft />
          <h2 className="text-[#111928] text-xl font-semibold font-inter">
            Create Spotlight
          </h2>
        </Link>
        <Card className="w-full">
          {/* <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              ⭐ Create Spotlight
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Highlight a restaurant and its top menu items in the Spotlight
              section.
            </p>
          </CardHeader> */}

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* LEFT SIDE */}
                <div className="md:col-span-2 space-y-6">
                  <FormField
                    control={form.control}
                    name="restaurant"
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

                  {/* Search and Filters */}
                  <div>
                    <FormLabel>Select Menu Items</FormLabel>
                    <div className="flex items-center gap-2 my-4">
                      <div className="flex gap-2 flex-wrap">
                        {categories.map((cat) => (
                          <Badge
                            onClick={() => setValue("category", cat.value)}
                            key={cat.value}
                            variant={
                              watch("category") === cat.value
                                ? "default"
                                : "secondary"
                            }
                            className={cn(
                              "cursor-pointer",
                              cat.label === "All" && "bg-primary text-white"
                            )}
                          >
                            {cat.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Menu Item Cards */}
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
                              item.images[0]
                            })`}
                          />
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.category} • ₹{item.price}
                              </p>
                            </div>
                            <p className="text-yellow-500 text-sm font-medium">
                              ★ {item.rating}
                            </p>
                          </div>
                          <Button
                            variant={
                              selectedItems.includes(item.name)
                                ? "default"
                                : "secondary"
                            }
                            className="mt-3 w-full"
                            type="button"
                          >
                            {selectedItems.includes(item.name)
                              ? "✓ Selected"
                              : "Select"}
                          </Button>
                        </div>
                      ))}
                    </div>
                    {items.length === 0 && <DataNotFound name="Menu Items" />}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="md:col-span-1 space-y-6">
                  {/* <FormField
                    control={form.control}
                    name="cuisines"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuisines</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(
                              field.value.includes(value)
                                ? field.value.filter((v) => v !== value)
                                : [...field.value, value]
                            )
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cuisines" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Italian">Italian</SelectItem>
                            <SelectItem value="American">American</SelectItem>
                            <SelectItem value="Fast Food">Fast Food</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((cuisine) => (
                            <Badge key={cuisine} variant="outline">
                              {cuisine}
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  {/* Spotlight Preview */}
                  {/* <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">
                        Spotlight Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <h4 className="font-bold text-lg">The Gourmet Kitchen</h4>
                      <div>
                        <p className="text-xs uppercase text-muted-foreground font-medium">
                          Selected Items
                        </p>
                        <ul className="list-disc list-inside text-sm mt-1">
                          {selectedItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-muted-foreground font-medium">
                          Cuisines
                        </p>
                        <div className="flex gap-2 flex-wrap mt-1">
                          {form.watch("cuisines").map((cuisine) => (
                            <Badge key={cuisine} variant="secondary">
                              {cuisine}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}
                </div>

                {/* ACTIONS */}
                <div className="col-span-3 flex justify-end gap-4 pt-6 border-t">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit">Save Spotlight</Button>
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
