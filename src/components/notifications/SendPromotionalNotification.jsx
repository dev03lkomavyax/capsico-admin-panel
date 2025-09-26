import AdminWrapper from "../admin-wrapper/AdminWrapper";
import usePostApiReq from "@/hooks/usePostApiReq";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import useGetApiReq from "@/hooks/useGetApiReq";
import DataNotFound from "../DataNotFound";
import { updatePreview } from "@/utils/updatePreview";
import { PiCameraPlus } from "react-icons/pi";
import Spinner from "../Spinner";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { MdCalendarMonth } from "react-icons/md";

const SendPromotionalNotification = () => {
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        image: z
          .any()
          .refine((files) => files instanceof FileList && files.length > 0, {
            message: "Image is required",
          }),
        imagePreview: z.string().optional(),
        title: z.string().min(1, "Title required."),
        description: z.string().min(1, "Description required."),
        radiusInKm: z.coerce.number().min(1, "Radius required."),
        city: z.string().min(1, "City required."),
        cityName: z.string().optional(),
        restaurant: z.string().min(1, "Restaurant required."),
        date: z.date().optional().nullable(),
        time: z.string().optional(),
      })
    ),
    defaultValues: {
      title: "",
      description: "",
      radiusInKm: "",
      city: "",
      cityName: "",
      restaurant: "",
      image: "",
      imagePreview: "",
      date: null,
      time: "",
    },
  });

  const { watch, control, handleSubmit, setValue, getValues, register } = form;

   const handleDateSelect = (value) => {
     setValue("date", value);
     setOpen(false);
   };
  console.log("getValues", getValues());

  const imageRef = register("image");

  const image = watch("image");

  useEffect(() => {
    updatePreview(image, "imagePreview", setValue);
  }, [form, image, setValue]);

  const { res, fetchData, isLoading } = usePostApiReq();
  const {
    res: fetchCitiesRes,
    fetchData: fetchCities,
    isLoading: isCitiesLoading,
  } = useGetApiReq();
  const {
    res: fetchRestaurantsRes,
    fetchData: fetchRestaurants,
    isLoading: isRestaurantsLoading,
  } = useGetApiReq();

  const getCities = () => {
    fetchCities("/availableCities/get-all");
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (fetchCitiesRes?.status === 200 || fetchCitiesRes?.status === 201) {
      console.log("fetchCitiesRes", fetchCitiesRes);
      setCities(fetchCitiesRes?.data?.cities || []);
    }
  }, [fetchCitiesRes]);

  const city = watch("city");
  const getRestaurants = () => {
    fetchRestaurants(
      `/admin/get-all-restaurants?assignedCity=${watch("cityName")}`
    );
  };

  useEffect(() => {
    city && getRestaurants();
  }, [city]);

  useEffect(() => {
    if (
      fetchRestaurantsRes?.status === 200 ||
      fetchRestaurantsRes?.status === 201
    ) {
      console.log("fetchRestaurantsRes", fetchRestaurantsRes);
      setRestaurants(fetchRestaurantsRes?.data?.restaurants || []);
    }
  }, [fetchRestaurantsRes]);

  const onSubmit = (data) => {
    console.log("data :", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("radiusInKm", data.radiusInKm);
    formData.append("cityId", data.city);
    formData.append("restaurantId", data.restaurant);
    formData.append("image", data.image[0]);
    data.date &&
      formData.append(
        "scheduleDate",
        format(new Date(data.date), "yyyy-MM-dd")
      );
    data.time && formData.append("scheduleTime", data.time);
    fetchData(`/notification/send-promotional-notification`, formData);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("onSubmit res", res);
      navigate("/admin/notifications");
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div className="space-y-4">
        <Link
          to="/admin/notifications"
          className="inline-flex gap-1 items-center"
        >
          <ChevronLeft />
          <h2 className="text-[#111928] text-xl font-semibold font-inter">
            Send Notification
          </h2>
        </Link>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-white p-4"
          >
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-2 gap-5">
                    <FormLabel className="cursor-pointer  left-0 w-full h-full top-0">
                      <div className="border-2 mb-3 border-dashed border-[#C2CDD6] w-full h-72  flex flex-col justify-center items-center rounded-md">
                        <div className="border-2 flex flex-col items-center primary-color border-dashed rounded px-5 py-4">
                          <PiCameraPlus className="text-[#1AA6F1]" size={45} />
                          <p className="font-bold text-[#1AA6F1] text-center primary-color text-sm mt-2">
                            Add Photo
                          </p>
                        </div>
                        <p className="font-normal text-xs mt-2">
                          or drop files to upload
                        </p>
                      </div>
                    </FormLabel>
                    {watch("imagePreview") && (
                      <img
                        className="w-full aspect-video h-full object-cover"
                        src={watch("imagePreview")}
                        alt="image"
                      />
                    )}
                  </div>
                  <FormControl className="hidden">
                    <Input
                      multiple="true"
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      {...imageRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Title <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Title..."
                      className={`placeholder:text-[#A6A6A6] resize-none  font-inter rounded-lg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Description <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Description..."
                      className={`placeholder:text-[#A6A6A6] resize-none  font-inter rounded-lg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <FormField
                control={form.control}
                name="radiusInKm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-[#111928] font-semibold font-inter opacity-80`}
                    >
                      Radius (In Km) <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Radius..."
                        type="number"
                        className={`placeholder:text-[#A6A6A6] resize-none  font-inter rounded-lg`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-[#111928] font-semibold font-inter opacity-80`}
                    >
                      City <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value); // cityId
                          const selectedCity = cities.find(
                            (c) => c._id === value
                          );
                          setValue("cityName", selectedCity?.city || "");
                        }}
                        value={field.value}
                      >
                        <SelectTrigger disabled={isCitiesLoading}>
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
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
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {city && (
                <FormField
                  control={form.control}
                  name="restaurant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-inter opacity-80`}
                      >
                        Restaurant <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger disabled={isRestaurantsLoading}>
                            <SelectValue placeholder="Select Restaurant" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
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
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-[#111928] font-semibold font-inter opacity-80`}
                    >
                      Date
                    </FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full flex h-10 px-4 border-[#808080] gap-2 justify-start text-[#717171] max-med:px-3 max-med:h-[46px] max-med:rounded-lg",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <MdCalendarMonth className="text-[#838383] text-xl absolute top-[35%] right-[6.5%]" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-[#838383] text-base font-normal max-med:text-sm">
                                Select a date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={handleDateSelect}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-[#111928] font-semibold font-inter opacity-80`}
                    >
                      Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        id="time-picker"
                        step="60"
                        // defaultValue="10:30:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="h-11 w-full text-base font-inter"
              variant="capsico"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </AdminWrapper>
  );
};

export default SendPromotionalNotification;
