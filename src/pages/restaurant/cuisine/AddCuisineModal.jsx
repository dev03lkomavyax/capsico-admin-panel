import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import usePostApiReq from "@/hooks/usePostApiReq";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import SingleImageUpload from "@/components/SingleImageUpload";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetApiReq from "@/hooks/useGetApiReq";
import DataNotFound from "@/components/DataNotFound";
import { TrashIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.any(),
  priorityType: z.enum(["global", "citywise"]).default("global"),
  globalPriority: z.number().optional(),
  cityPriority: z
    .array(
      z.object({
        cityId: z.string().min(1, "City is required"),
        priority: z.coerce.number().min(1, "Priority must be >= 1"),
      })
    )
    .optional(),
});

const AddCuisineModal = ({ open, setOpen, getCuisines, cuisine }) => {
  const [cities, setCities] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: cuisine?.label || "",
      description: cuisine?.description || "",
      image: "",
      imagePreview: cuisine?.image || "",
      priorityType: cuisine?.priorityType || "global",
      globalPriority: cuisine?.globalPriority || 10,
      cityPriority: cuisine?.cityPriority?.map((item) => ({
        ...item,
        cityId: item.cityId?._id,
      })) || [{ cityId: "", priority: 1 }],
    },
  });

  console.log("cuisine", cuisine);

  const { reset, getValues, control, handleSubmit, watch, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cityPriority",
  });

  const {
    res: cityRes,
    fetchData: fetchCities,
    isLoading: isCitiesLoading,
  } = useGetApiReq();
  const { res, fetchData, isLoading } = usePostApiReq();
  const {
    res: updateRes,
    fetchData: updateCuisine,
    isLoading: isCuisineLoadin,
  } = usePatchApiReq();

  const getCities = async () => {
    fetchCities("/availableCities/get-all");
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (cityRes?.status === 200 || cityRes?.status === 201) {
      console.log("cities res", cityRes);
      setCities(cityRes?.data?.cities || []);
    }
  }, [cityRes]);

  const priorityType = watch("priorityType");

  const onSubmit = (values) => {
    console.log("data:", values);

    const formData = new FormData();
    formData.append("name", values.title);
    formData.append("description", values.description);
    formData.append("priorityType", values.priorityType);

    if (values.priorityType === "global") {
      formData.append("globalPriority", values.globalPriority || 10);
    } else if (values.priorityType === "citywise") {
      formData.append("cityPriority", JSON.stringify(values.cityPriority));
    }

    if (values.image) {
      formData.append("image", values.image);
    }

    if (cuisine) {
      updateCuisine(`/admin/cuisine/update/${cuisine.value}`, formData);
    } else {
      fetchData(`/admin/cuisine/add`, formData);
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("add cuisine res", res);
      setOpen(false);
      getCuisines();
    }
  }, [res]);

  useEffect(() => {
    if (updateRes?.status === 200 || updateRes?.status === 201) {
      console.log("update cuisine res", updateRes);
      setOpen(false);
      getCuisines();
    }
  }, [updateRes]);

  const onError = (error) => {
    console.log("error", error);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{cuisine ? "Update" : "Add"} Cuisine</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <SingleImageUpload
              control={control}
              watch={watch}
              setValue={setValue}
              name="image"
              label="Image"
            />
            {/* Title */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input onChange={field.onChange} value={field.value} />
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
                    <Textarea
                      className="resize-none"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority Type */}
            <FormField
              control={control}
              name="priorityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority Type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="citywise">City-wise</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Global Priority */}
            {priorityType === "global" && (
              <FormField
                control={control}
                name="globalPriority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Global Priority (1-10)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={1} max={10} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* City-wise Priority */}
            {priorityType === "citywise" && (
              <div>
                <FormLabel>City-wise Priority (1-10)</FormLabel>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_60px_auto] gap-2 my-2"
                  >
                    <FormField
                      control={control}
                      name={`cityPriority.${index}.cityId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select City" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem
                                    key={city?._id}
                                    value={city?._id}
                                    className="capitalize"
                                  >
                                    {city.city}
                                  </SelectItem>
                                ))}
                                {cities.length === 0 && (
                                  <DataNotFound name="Cities" />
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
                      name={`cityPriority.${index}.priority`}
                      render={({ field }) => (
                        <FormControl>
                          <Input type="number" min={1} max={10} {...field} />
                        </FormControl>
                      )}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="px-3"
                      title="Remove"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="capsico"
                  onClick={() => append({ city: "", priority: 1 })}
                >
                  Add City
                </Button>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row-reverse sm:gap-4 pt-2">
              <Button
                disabled={isLoading || isCuisineLoadin}
                type="submit"
                className="w-auto px-4"
                variant="capsico"
              >
                {isLoading || isCuisineLoadin ? <Spinner /> : "Submit"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="mt-3 sm:mt-0 w-auto px-4"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCuisineModal;
