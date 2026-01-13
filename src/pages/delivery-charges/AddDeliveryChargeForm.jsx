import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DataNotFound from "@/components/DataNotFound";
import ReactPagination from "@/components/pagination/ReactPagination";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import { deliveryChargeSchema } from "@/schema/DeliveryChargeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddDeliveryChargeForm() {
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [zones, setZones] = useState([]);

  const location = useLocation();
  const deliveryCharge = location?.state?.deliveryCharge || "";
  const modifiedPincodes = deliveryCharge?.pincodes?.map((pincode) => ({
    pincode,
  }));

  const form = useForm({
    resolver: zodResolver(deliveryChargeSchema),
    defaultValues: {
      city: "",
      zone: "",
      from: 0,
      to: 0,
      pincodes: modifiedPincodes || [],
      incentive: 0,
      baseCharge: 20,
      perKmCharge: 5,
      modifiers: {
        timeOfDay: { day: 0, night: 10 },
        weather: { rain: 15, extreme: 20 },
        demandSurge: { enabled: false, multiplier: 1 },
      },
      isActive: true,
    },
  });

  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const { watch, handleSubmit, control, reset, getValues } = form;
  const { res, fetchData, isLoading } = usePostApiReq();
  const {
    res: updateRes,
    fetchData: updateCharge,
    isLoading: isUpdateChargeLoading,
  } = usePatchApiReq();
  const {
    res: fetchCitiesRes,
    fetchData: fetchCities,
    isLoading: isCitiesLoading,
  } = useGetApiReq();
  const {
    res: fetchZonesRes,
    fetchData: fetchZones,
    isLoading: isZonesLoading,
  } = useGetApiReq();

  const getCities = () => {
    fetchCities("/availableCities/get-all");
  };

  console.log("getValues", getValues());

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (fetchCitiesRes?.status === 200 || fetchCitiesRes?.status === 201) {
      console.log("fetchCitiesRes", fetchCitiesRes);
      setCities(fetchCitiesRes?.data?.cities || []);
    }
  }, [fetchCitiesRes]);

  console.log("deliveryCharge", deliveryCharge?.zone);

  useEffect(() => {
    if (deliveryCharge) {
      reset({
        ...deliveryCharge,
        city: deliveryCharge?.city?._id,
        zone: deliveryCharge?.zone?._id,
        from: deliveryCharge?.baseDistanceFromKm,
        to: deliveryCharge?.baseDistanceToKm,
      });
    }
  }, [deliveryCharge]);

  const getZones = () => {
    fetchZones(`/zones/get-all?page=${page}`);
  };

  useEffect(() => {
    getZones();
  }, [page]);

  useEffect(() => {
    if (fetchZonesRes?.status === 200 || fetchZonesRes?.status === 201) {
      setZones(fetchZonesRes?.data?.data);
      setTotalPage(fetchZonesRes?.data?.pagination?.totalPages);
      console.log("getZones res", fetchZonesRes);
    }
  }, [fetchZonesRes]);

  const onSubmit = (values) => {
    console.log(values);
    if (deliveryCharge) {
      updateCharge(
        `/delivery-charges/update/${deliveryCharge._id}/${deliveryCharge?.city?._id}`,
        {
          ...values,
          baseDistanceFromKm:values.from,
          baseDistanceToKm:values.to,
          // pincodes: values.pincodes.map((item) => item.pincode),
        }
      );
    } else {
      fetchData("/delivery-charges/create", {
        ...values,
        baseDistanceFromKm: values.from,
        baseDistanceToKm: values.to,
        // pincodes: values.pincodes.map((item) => item.pincode),
      });
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      navigate("/admin/delivery-charges");
    }
  }, [res]);

  useEffect(() => {
    if (updateRes?.status === 200 || updateRes?.status === 201) {
      navigate("/admin/delivery-charges");
    }
  }, [updateRes]);

  const onError = (error) => {
    console.log("error", error);
  };

  return (
    <AdminWrapper>
      <button onClick={() => navigate(-1)} className="flex gap-2 items-center">
        <ChevronLeftIcon />
        <h2 className="text-[#000000] text-xl font-medium font-roboto">
          {deliveryCharge ? "Update" : "Add"} Delivery Charge
        </h2>
      </button>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-6 mx-auto bg-white mt-10 rounded-lg border p-5"
        >
          {/* City */}
          {/* <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {!deliveryCharge && (
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
                        field.onChange(value);
                        // const selectedCity = cities.find((c) => c._id === value);
                        // if (selectedCity) {
                        //   setValue("cityName", selectedCity.city || "");
                        // }
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
          )}

          <div className="grid grid-cols-2 gap-5 items-end">
            <FormField
              control={control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between gap-5">
                    Zone
                    <ReactPagination
                      className="justify-end"
                      totalPage={totalPage}
                      setPage={setPage}
                    />
                  </FormLabel>
                  <FormControl>
                    <Select
                      disabled={isZonesLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      key={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Zone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-50">
                        {zones?.map((zone) => (
                          <SelectItem key={zone?._id} value={zone?._id}>
                            {zone?.name}
                          </SelectItem>
                        ))}

                        {zones.length === 0 && <p>No zones found</p>}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="incentive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incentive</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Charges */}
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={control}
              name="baseCharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Charge</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="perKmCharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Per Km Charge</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Modifiers */}
          <div className="">
            <FormLabel className="text-base">Modifiers</FormLabel>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <FormField
                control={control}
                name="modifiers.timeOfDay.day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day Modifier</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="modifiers.timeOfDay.night"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Night Modifier</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="modifiers.weather.rain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rain Modifier</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="modifiers.weather.extreme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extreme Weather Modifier</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Demand Surge */}
          <FormField
            control={control}
            name="modifiers.demandSurge.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <FormLabel>Enable Surge Pricing</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </div>
                <p className="text-sm text-muted-foreground">
                  Surge pricing applies an additional multiplier to the delivery
                  charge during peak demand hours. Enable this if you want the
                  delivery fee to increase dynamically when demand is high.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="modifiers.demandSurge.multiplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surge Multiplier</FormLabel>
                <FormControl>
                  <Input
                    disabled={!watch("modifiers.demandSurge.enabled")}
                    type="number"
                    step="0.1"
                    min={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active */}
          <FormField
            control={control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Is Active?</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading || isUpdateChargeLoading}
            variant="capsico"
            type="submit"
            className="w-full"
          >
            {isLoading || isUpdateChargeLoading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </AdminWrapper>
  );
}
