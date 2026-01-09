import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DatePicker from "@/components/DatePicker";
import SingleImageUpload from "@/components/SingleImageUpload";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePostApiReq from "@/hooks/usePostApiReq";
import { DeliveryPartnerSchema } from "@/schema/AddDeliveryAgentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const AddDeliveryAgent = () => {
  const [previewFiles, setPreviewFiles] = useState({});
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(DeliveryPartnerSchema),
    defaultValues: {
      gender: "male",
      vehicleType: "bike",
      languages: ["English"],
    },
  });

  const { handleSubmit, control, register, watch, setValue, formState } = form;
  const vehicleType = watch("vehicleType");
   const { res, fetchData, isLoading } = usePostApiReq();

  const onFileChange = (fieldName) => (e) => {
    const file = e.target.files && e.target.files[0];
    setValue(fieldName, file, { shouldValidate: true });
    setPreviewFiles((p) => ({ ...p, [fieldName]: file }));
  };

  const onSubmit = (values) => {
    console.log("values", values);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("dateOfBirth", values.dateOfBirth);
    formData.append("gender", values.gender);
    formData.append("languages", JSON.stringify(values.languages));

    const address = {
      street: values.street,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      latitude: values.latitude,
      longitude: values.longitude,
    };
    formData.append("address", JSON.stringify(address));

    formData.append("vehicleType", values.vehicleType);
    if (values.vehicleNumber)
      formData.append("vehicleNumber", values.vehicleNumber);

    if (values.drivingLicenseNumber)
      formData.append("drivingLicenseNumber", values.drivingLicenseNumber);
    if (values.drivingLicenseExpiry)
      formData.append("drivingLicenseExpiry", values.drivingLicenseExpiry);

    formData.append("panNumber", values.panNumber);
    formData.append("aadharNumber", values.aadharNumber);

    // Files must match backend names
    if (values.profileImage)
      formData.append("profileImage", values.profileImage);
    if (values.drivingLicenseImage)
      formData.append("drivingLicenseImage", values.drivingLicenseImage);
    if (values.aadharFrontImage)
      formData.append("aadharFrontImage", values.aadharFrontImage);
    if (values.aadharBackImage)
      formData.append("aadharBackImage", values.aadharBackImage);
    if (values.panCardImage)
      formData.append("panCardImage", values.panCardImage);

    fetchData(`/deliveryExec/delivery-executive/add`, formData, {
      reportCrash: true,
      screenName: "DELIVERY_EXECUTIVE_SIGNUP",
    });
  };

  useEffect(() => {
      if (res?.status === 200 || res?.status === 201) {
        console.log("add deliveryAgent res", res?.data);
        navigate("/admin/delivery-agent");
      }
    }, [res]);

  const onError = (error) => {
    console.log("error", error);
  };

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-start items-center">
          <Link
            to="/admin/delivery-agent"
            className="inline-flex gap-1 items-center"
          >
            <ChevronLeft />
            <h2 className="text-[#111928] text-xl font-semibold font-inter">
              Add Delivery Agent
            </h2>
          </Link>
        </div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6 bg-white p-4 rounded-md mt-5"
          >
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="9876543210"
                        maxLength={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem className="col-span-2">
                <FormLabel>Languages</FormLabel>
                <div className="flex gap-2 items-center">
                  {["English", "Hindi", "Tamil", "Telugu"].map((lang) => (
                    <label key={lang} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={watch("languages")?.includes(lang)}
                        onChange={(e) => {
                          const current = watch("languages") || [];
                          if (e.target.checked)
                            setValue(
                              "languages",
                              Array.from(new Set([...current, lang]))
                            );
                          else
                            setValue(
                              "languages",
                              current.filter((l) => l !== lang)
                            );
                        }}
                      />
                      <span>{lang}</span>
                    </label>
                  ))}
                  <FormMessage />
                </div>
              </FormItem>
            </div>

            {/* Address */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Vehicle */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bike">Bike</SelectItem>
                        <SelectItem value="bicycle">Bicycle</SelectItem>
                        <SelectItem value="3-wheeler">3 Wheeler</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {vehicleType !== "bicycle" && (
                <>
                  <FormField
                    control={control}
                    name="vehicleNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Registration Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="drivingLicenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driving License Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="drivingLicenseExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DL Expiry Date</FormLabel>
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
                </>
              )}

              <FormField
                control={control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Aadhar Number"
                        type="number"
                        className="placeholder:text-[#3B3B3B] w-60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="panNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Pan Card Number"
                        className="placeholder:text-[#3B3B3B] w-60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Documents (Preview style) */}
            <div className="grid grid-cols-3 gap-6 items-start">
              <div>
                <SingleImageUpload
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={"profileImage"}
                  label={"Profile Image"}
                />
              </div>

              <div>
                <SingleImageUpload
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={"aadharFrontImage"}
                  label={"Aadhar Front"}
                />
              </div>

              <div>
                <SingleImageUpload
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={"aadharBackImage"}
                  label={"Aadhar Back"}
                />
              </div>

              <div>
                <SingleImageUpload
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  name={"panCardImage"}
                  label={"PAN Card"}
                />
              </div>

              {vehicleType !== "bicycle" && (
                <div>
                  <SingleImageUpload
                    control={control}
                    watch={watch}
                    setValue={setValue}
                    name={"drivingLicenseImage"}
                    label={"Driving License Image"}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-3">
              <div></div>
              <div></div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Add Delivery Agent"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminWrapper>
  );
};

export default AddDeliveryAgent;
