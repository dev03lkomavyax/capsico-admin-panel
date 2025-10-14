import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Star } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePostApiReq from "@/hooks/usePostApiReq";
import useGetApiReq from "@/hooks/useGetApiReq";
import DataNotFound from "../DataNotFound";
import MultiSelect from "../MultiSelect";

// Zod Schema
const spotlightSchema = z.object({
  restaurantId: z.string().min(1, "Restaurant ID is required"),
  cuisineIds: z.array(z.string().min(1, "Cuisine ID cannot be empty")),
});

const CreateSpotlightModal = ({ open, setOpen, getSpotlights }) => {
  const [newCuisine, setNewCuisine] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  const form = useForm({
    resolver: zodResolver(spotlightSchema),
    defaultValues: {
      restaurantId: "",
      cuisineIds: [],
    },
  });

  const { watch, getValues, control, handleSubmit, setValue } = form;

  const { res, fetchData, isLoading } = usePostApiReq();
  const {
    res: cuisinesRes,
    fetchData: fetchCuisines,
    isLoading: isCuisinesLoading,
  } = useGetApiReq();
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
    }
  }, [fetchRestaurantsRes]);

  const getCuisines = () => {
    fetchCuisines(
      `/admin/get-cuisines?restaurantId=${getValues("restaurantId")}`
    );
  };

  useEffect(() => {
    watch("restaurantId") && getCuisines();
  }, [watch("restaurantId")]);

  useEffect(() => {
    if (cuisinesRes?.status === 200 || cuisinesRes?.status === 201) {
        console.log("cuisinesRes", cuisinesRes);
        
      const modifiedCuisines = cuisinesRes?.data?.data?.cuisines?.map(
        (cuisine) => ({
          label: cuisine?.name,
          value: cuisine?._id,
        })
      );
      setCuisines(modifiedCuisines);
    }
  }, [cuisinesRes]);


  function onSubmit(values) {
    console.log("values", values);
    fetchData(values)
    
    // setOpen(false);
  }

   useEffect(() => {
      if (res?.status === 200 || res?.status === 201) {
        console.log("create cuisine Res", res);
        setOpen(false);
        getSpotlights()
      }
    }, [res]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Star size={18} /> Create Spotlight
              </DialogTitle>
              <DialogDescription>
                Highlight a restaurant and its cuisines in the spotlight.
              </DialogDescription>
            </div>
            {/* <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="p-1 rounded-md hover:bg-muted"
            >
              <X size={18} />
            </button> */}
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="restaurantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant ID</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="min-w-[140px]">
                        <SelectValue placeholder="Select Restaurant" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999]">
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        className="w-[525px]"
                      />
                    </FormControl>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <div className="flex w-full justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Spotlight</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSpotlightModal;
