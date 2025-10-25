import DataNotFound from "@/components/DataNotFound";
import DatePicker from "@/components/DatePicker";
import SingleImageUpload from "@/components/SingleImageUpload";
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
import { Textarea } from "@/components/ui/textarea";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import {
  AddProfileSchema6,
  EditProfileSchema6,
} from "@/schema/restaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile6 = ({ setPage, restaurant }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log("restaurant", restaurant);

  const form = useForm({
    resolver: zodResolver(restaurant ? EditProfileSchema6 : AddProfileSchema6),
    defaultValues: {
      dateOfEstablishment: "",
      businessType: "",
      unitType: "",
      ownerProfile: "",
      ownerProfilePreview: "",
      assignedCity: "",
      deliveryRadius: "",
      cancellationTime: "",
      taxPercent: "",
      packagingCharges: "",
      costTag: "",
      udyamNumber: "",
      firmProof: "",
      firmProofPreview: "",
      restaurantFront: "",
      restaurantFrontPreview: "",
      restaurantInside: "",
      restaurantInsidePreview: "",
      restaurantKitchen: "",
      restaurantKitchenPreview: "",
      stockArea: "",
      stockAreaPreview: "",
      commissionPercent: "",
      onboardingSupport: "",
      supportQuery: "",
      agreementAccepted: false,
    },
  });

  const { control, watch, setValue, reset } = form;
  const { res, fetchData, isLoading } = usePostApiReq();
  const [cities, setCities] = useState([]);
  const { res: fetchCitiesRes, fetchData: fetchCities } = useGetApiReq();

  useEffect(() => {
    fetchCities("/availableCities/get-all");
  }, []);

  useEffect(() => {
    if (fetchCitiesRes?.status === 200 || fetchCitiesRes?.status === 201) {
      setCities(fetchCitiesRes?.data?.cities || []);
    }
  }, [fetchCitiesRes]);

  const { step6Data = "" } = restaurant || {};

  useEffect(() => {
    reset({
      agreementAccepted: step6Data?.agreementDeclaration || false,
      assignedCity: step6Data?.assignedCity || "",
      businessType: step6Data?.businessType || "",
      cancellationTime: step6Data?.cancellationConsiderationTime || "",
      commissionPercent: step6Data?.initialCommissionAgreedPercent || "",
      costTag: step6Data?.restaurantCostTag || "",
      dateOfEstablishment: step6Data?.dateOfEstablishment || "",
      deliveryRadius: step6Data?.deliveryRadius || "",
      packagingCharges: step6Data?.restaurantPackagingCharges || "",
      supportQuery: step6Data?.internalUse || "",
      taxPercent: step6Data?.restaurantTaxesPercent || "",
      udyamNumber: step6Data?.udyamRegistrationNumber || "",
      unitType: step6Data?.unitType || "",
      onboardingSupport: step6Data?.onboardingSupportNeeded || "",

      ownerProfilePreview:
        step6Data?.images?.ownerProfilePic &&
        `${step6Data?.images?.ownerProfilePic}`,
      firmProofPreview:
        step6Data?.images?.firmEstablishmentProof &&
        `${step6Data?.images?.firmEstablishmentProof}`,
      restaurantFrontPreview:
        step6Data?.images?.restaurantFrontImage &&
        `${step6Data?.images?.restaurantFrontImage}`,
      restaurantInsidePreview:
        step6Data?.images?.restaurantInside &&
        `${step6Data?.images?.restaurantInside}`,
      restaurantKitchenPreview:
        step6Data?.images?.restaurantKitchenImage &&
        `${step6Data?.images?.restaurantKitchenImage}`,
      stockAreaPreview:
        step6Data?.images?.stockKeepingAreaImage &&
        `${step6Data?.images?.stockKeepingAreaImage}`,
    });
  }, [restaurant]);

  const onSubmit = (data) => {
    console.log("data", data);

    const formData = new FormData();

    const mappedFields = {
      dateOfEstablishment: data.dateOfEstablishment,
      businessType: data.businessType,
      unitType: data.unitType,
      assignedCity: data.assignedCity,
      deliveryRadius: data.deliveryRadius,
      cancellationConsiderationTime: data.cancellationTime,
      restaurantTaxesPercent: data.taxPercent,
      restaurantPackagingCharges: data.packagingCharges,
      restaurantCostTag: data.costTag,
      udyamRegistrationNumber: data.udyamNumber,
      initialCommissionAgreedPercent: data.commissionPercent,
      onboardingSupportNeeded: data.onboardingSupport,
      internalUse: data.supportQuery,
      agreementDeclaration: data.agreementAccepted,
      signDigitallyByOtp: true,
      stockKeepingArea: true,
    };

    Object.entries(mappedFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const imageMapping = {
      ownerProfile: "ownerProfilePic",
      firmProof: "firmEstablishmentProof",
      restaurantFront: "restaurantFront",
      restaurantInside: "restaurantInside",
      restaurantKitchen: "restaurantKitchen",
      stockArea: "stockKeepingAreaImage",
    };

    Object.entries(imageMapping).forEach(([formKey, apiKey]) => {
      if (data[formKey] instanceof File) {
        formData.append(apiKey, data[formKey]);
      }
    });

    if (restaurant?._id || restaurant?.id) {
      formData.append("restaurantId", restaurant._id || restaurant.id);
    }

    fetchData("/restaurant/onboardRestaurant", formData);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      navigate("/admin/restaurant");
    }
  }, [res]);

  const onError = (errors) => console.log("Form errors:", errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="w-full py-5"
      >
        <div className="flex justify-between gap-2 mb-8">
          <button
            type="button"
            onClick={() => setPage((page) => page - 1)}
            className="flex items-center"
          >
            <MdKeyboardArrowLeft className="text-[#000000] text-2xl" />
            <h2 className="text-[#000000] text-xl font-medium font-roboto">
              {pathname.includes("/add-restaurant")
                ? "Add Restaurant"
                : "Edit Profile"}
            </h2>
          </button>
          <Button
            disabled={isLoading}
            size="lg"
            className="w-20 bg-[#1064FD]"
            type="submit"
          >
            Save
          </Button>
        </div>

        <div className="border border-[#C2CDD6] rounded-md px-8 py-6 space-y-8 bg-white">
          {/* Establishment Info */}
          <div>
            <h3 className="text-lg font-bold text-[#4A5E6D] mb-3">
              Establishment Information
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={control}
                name="dateOfEstablishment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Establishment</FormLabel>
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
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sole-proprietorship">
                            Sole Proprietorship
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="private-limited">
                            Private Limited Company
                          </SelectItem>
                          <SelectItem value="public-limited">
                            Public Limited Company
                          </SelectItem>
                          <SelectItem value="llp">LLP</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="unitType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="cloud-kitchen">
                            Cloud Kitchen
                          </SelectItem>
                          <SelectItem value="food-truck">Food Truck</SelectItem>
                          <SelectItem value="cafe">Cafe</SelectItem>
                          <SelectItem value="bakery">Bakery</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="assignedCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned City</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city?._id} value={city?.city}>
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
            </div>
          </div>

          {/* Numeric & Text Fields */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { name: "deliveryRadius", label: "Delivery Radius (km)" },
              { name: "cancellationTime", label: "Cancellation Time (min)" },
              { name: "taxPercent", label: "Restaurant Tax (%)" },
              { name: "packagingCharges", label: "Packaging Charges (₹)" },
              { name: "costTag", label: "Restaurant Cost Tag (Avg. Cost)" },
              { name: "udyamNumber", label: "Udyam Registration Number" },
              { name: "commissionPercent", label: "Initial Commission (%)" },
            ].map((f) => (
              <FormField
                key={f.name}
                control={control}
                name={f.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{f.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={f.label} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Image Uploads */}
          <div>
            <h3 className="text-lg font-bold text-[#4A5E6D] mb-3">
              Upload Images
            </h3>
            <div className="grid grid-cols-2 gap-5">
              {[
                { name: "ownerProfile", label: "Owner Profile Picture" },
                { name: "firmProof", label: "Firm Establishment Proof" },
                { name: "restaurantFront", label: "Restaurant Front Image" },
                { name: "restaurantInside", label: "Restaurant Inside Image" },
                { name: "restaurantKitchen", label: "Kitchen Image" },
                { name: "stockArea", label: "Stock Keeping Area Image" },
              ].map((img) => (
                <SingleImageUpload
                  key={img.name}
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={img.name}
                  label={img.label}
                />
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div>
            <FormField
              control={control}
              name="onboardingSupport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Onboarding Support Needed?</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select onboarding support" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menu-photography">
                          Menu Photography
                        </SelectItem>
                        <SelectItem value="digital-marketing">
                          Digital Marketing
                        </SelectItem>
                        <SelectItem value="staff-training">
                          Staff Training
                        </SelectItem>
                        <SelectItem value="technology-setup">
                          Technology Setup
                        </SelectItem>
                        <SelectItem value="all">All of the above</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="supportQuery"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Support Query Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what help you need..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Agreement */}
          <div className="flex items-center gap-2 mt-5">
            <FormField
              control={control}
              name="agreementAccepted"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">
                    Agreement & Declaration - I agree to all terms and
                    conditions.
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditProfile6;
