import call from "@/assets/call.png";
import edit from "@/assets/edit.png";
import avatar from "@/assets/Image-198.png";
import location from "@/assets/location.png";
import sms from "@/assets/sms.png";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { DeliveryAgentProfileSchema } from "@/schema/DeliveryAgentProfileSchema";
import { MdCancel } from "react-icons/md";
import { updatePreview } from "@/utils/updatePreview";
import { PiCameraPlus } from "react-icons/pi";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import useGetApiReq from "@/hooks/useGetApiReq";

const DeliveryAgentProfileEdit = () => {
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [deliveryPartnerDetailsData, setDeliveryPartnerDetailsData] =
    useState("");
  const { deliveryAgentId } = useParams();
  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: res1,
    fetchData: fetchData1,
    isLoading: isLoading1,
  } = useGetApiReq();

  const getDeliveryPartnerDetails = () => {
    fetchData(`/admin/get-delivery-partner/${deliveryAgentId}`);
  };

  useEffect(() => {
    getDeliveryPartnerDetails();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("deliveryPartnerDetailsData", res?.data);
      setDeliveryPartnerDetailsData(res?.data?.data);
    }
  }, [res]);

  console.log("deliveryPartnerDetailsData", deliveryPartnerDetailsData);

  const form = useForm({
    resolver: zodResolver(DeliveryAgentProfileSchema),
    defaultValues: {
      userImage: "",
      aadharFront: "",
      aadharBack: "",
      panCard: "",
      drivingLicense: "",
      userImagePreview: "",
      aadharFrontPreview: "",
      aadharBackPreview: "",
      drivingLicenseImagePreview: "",
      panCardPreview: "",
      fullName: "",
      address: "New Delhi India",
      email: "officialprashanttt@gmail.com",
      phone: "8009396321",
      altPhone: "987654321012",
      aadharNumber: "111111110000",
      DLNumber: "TN03013559",
      DLExpiry: new Date(),
      bankName: "BOB,- Retail Banking",
      accountNumber: "1234567890",
      IFSCcode: "BARB0000",
      panCardNumber: "POIUYTR0887",
      maximumSecurityDeposit: "0",
    },
  });
  const { register, control, watch, setValue, getValues } = form;

  useEffect(() => {
    const { documents, earnings } = deliveryPartnerDetailsData || {};

    const { bankDetails } = earnings || {};

    setValue("fullName", deliveryPartnerDetailsData?.personalInfo?.name);
    setValue("email", deliveryPartnerDetailsData?.personalInfo?.email);
    setValue("phone", deliveryPartnerDetailsData?.personalInfo?.phone);
    setValue(
      "userImagePreview",
      deliveryPartnerDetailsData?.personalInfo?.profileImage &&
        `${import.meta.env.VITE_IMAGE_URL}/${
          deliveryPartnerDetailsData?.personalInfo?.profileImage
        }`
    );

    setValue("aadharNumber", documents?.aadharCard?.number);
    setValue("DLNumber", documents?.drivingLicense?.number);
    setValue("DLExpiry", documents?.drivingLicense?.expiryDate);
    setValue("panCardNumber", documents?.panCard?.number);
    setValue("accountNumber", bankDetails?.accountNumber);
    setValue(
      "aadharFrontPreview",
      documents?.aadharCard?.image?.front &&
        `${import.meta.env.VITE_IMAGE_URL}/${
          documents?.aadharCard?.image?.front
        }`
    );
    setValue(
      "aadharBackPreview",
      documents?.aadharCard?.image?.front &&
        `${import.meta.env.VITE_IMAGE_URL}/${
          documents?.aadharCard?.image?.back
        }`
    );
    setValue(
      "drivingLicenseImagePreview",
      documents?.drivingLicense?.image &&
        `${import.meta.env.VITE_IMAGE_URL}/${documents?.drivingLicense?.image}`
    );
    setValue(
      "panCardPreview",
      documents?.panCard?.image &&
        `${import.meta.env.VITE_IMAGE_URL}/${documents?.panCard?.image}`
    );
    setValue("bankName", bankDetails?.bankName);
    setValue("IFSCcode", bankDetails?.ifscCode);
    setValue("upiId", bankDetails?.upiId);
    setValue("accountHolderName", bankDetails?.accountHolderName);
  }, [res]);

  const userImageRef = register("userImage");
  const aadharFrontRef = register("aadharFront");
  const aadharBackRef = register("aadharBack");
  const panCardRef = register("panCard");
  const drivingLicenseRef = register("drivingLicense");

  const userImage = watch("userImage");
  const aadharFront = watch("aadharFront");
  const aadharBack = watch("aadharBack");
  const panCard = watch("panCard");
  const drivingLicense = watch("drivingLicense");

  useEffect(() => {
    updatePreview(userImage, "userImagePreview", setValue);
    updatePreview(aadharFront, "aadharFrontPreview", setValue);
    updatePreview(aadharBack, "aadharBackPreview", setValue);
    updatePreview(drivingLicense, "drivingLicenseImagePreview", setValue);
    updatePreview(panCard, "panCardPreview", setValue);
  }, [
    form,
    userImage,
    setValue,
    aadharFront,
    aadharBack,
    drivingLicense,
    panCard,
  ]);

  const onSubmit = (data) => {
    console.log("data", data);

    const formData = new FormData();
    const personalInfo = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
    };

    // formdata.append("personalInfo[name]", "Ravi Kumar 123");
    // formdata.append("personalInfo[email]", "ravi.kumar123@example.com");
    // formdata.append("personalInfo[phone]", "9876543219");
    // formdata.append("personalInfo[dateOfBirth]", "1990-05-10");
    // formdata.append("personalInfo[gender]", "male");
    // formdata.append("languages[]", "English");
    // formdata.append("languages[]", "Hindi");
    // formdata.append("address[street]", "123 MG Road");
    // formdata.append("address[city]", "Bangalore");
    // formdata.append("address[state]", "Karnataka");
    // formdata.append("address[pincode]", "560001");
    // formdata.append("address[longitude]", "77.5946");
    // formdata.append("address[latitude]", "12.9716");
    // formdata.append("vehicleInfo[type]", "bike");
    // formdata.append("vehicleInfo[registrationNumber]", "KA01AB1234");
    // formdata.append("aadharNumber", "123412341234");
    // formdata.append("status[isOnline]", "false");
    // formdata.append("status[availability]", "busy");
    // formdata.append("documents[drivingLicense][number]", "DL12345678");
    // formdata.append("documents[drivingLicense][expiryDate]", "2030-12-31");
    // formdata.append("documents[aadharCard][number]", "123456789012");
    // formdata.append("documents[panCard][number]", "ABCDE1234F");
    // formdata.append("bankDetails[accountHolderName]", "Vivek Sharma");
    // formdata.append("bankDetails[accountNumber]", "123456789012");
    // formdata.append("bankDetails[ifscCode]", "HDFC0001234");
    // formdata.append("bankDetails[bankName]", "HDFC Bank");
    // formdata.append("bankDetails[upiId]", "viveksharma@hdfcbank");
    // formdata.append(
    //   "profileImage",
    //   fileInput.files[0],
    //   "/C:/Users/vivek/Downloads/oleg-demakov-zEIApnww3fU-unsplash.jpg"
    // );
    // formdata.append(
    //   "drivingLicenseImage",
    //   fileInput.files[0],
    //   "/C:/Users/vivek/Downloads/oleg-demakov-zEIApnww3fU-unsplash.jpg"
    // );
    // formdata.append(
    //   "aadharFrontImage",
    //   fileInput.files[0],
    //   "/C:/Users/vivek/Downloads/oleg-demakov-zEIApnww3fU-unsplash.jpg"
    // );
    // formdata.append(
    //   "aadharBackImage",
    //   fileInput.files[0],
    //   "/C:/Users/vivek/Downloads/oleg-demakov-zEIApnww3fU-unsplash.jpg"
    // );
    // formdata.append(
    //   "panCardImage",
    //   fileInput.files[0],
    //   "/C:/Users/vivek/Downloads/oleg-demakov-zEIApnww3fU-unsplash.jpg"
    // );

    fetchData1(`/admin/update-profile/${deliveryAgentId}`);
  };

  return (
    <AdminWrapper>
      <section>
        <div className="flex justify-between h-14">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1"
          >
            <IoIosArrowBack className="text-2xl" />
            <span className="font-roboto text-lg font-medium">Edit info</span>
          </button>
        </div>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mt-3 bg-white p-5 rounded-lg"
            >
              <div className="flex gap-10">
                {isEdit ? (
                  <FormField
                    control={control}
                    name="userImage"
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-40">
                          <FormLabel className="cursor-pointer">
                            {!watch("userImagePreview") && (
                              <div className="border-2 border-dashed border-[#C2CDD6] w-40 h-40 rounded-lg flex flex-col justify-center items-center">
                                <div className="flex flex-col items-center primary-color border-dashed rounded px-5">
                                  <PiCameraPlus
                                    className="text-[#1AA6F1]"
                                    size={45}
                                  />
                                  <p className="font-bold text-[#1AA6F1] text-center primary-color text-sm mt-0">
                                    Add Photo
                                  </p>
                                </div>
                                <p className="font-normal text-xs mt-2">
                                  or drop files to upload
                                </p>
                              </div>
                            )}
                            {watch("userImagePreview") && (
                              <img
                                className="w-40 h-40"
                                src={getValues("userImagePreview")}
                                alt=""
                              />
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              className="placeholder:text-[#3B3B3B] hidden w-full"
                              {...userImageRef}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <img
                    className="w-40 h-40 rounded-lg"
                    src={`${import.meta.env.VITE_IMAGE_URL}/${
                      deliveryPartnerDetailsData?.personalInfo?.profileImage
                    }`}
                    alt="avatar"
                  />
                )}

                <div className="w-full">
                  <div className="flex w-full justify-between items-center gap-3">
                    {isEdit ? (
                      <FormField
                        control={control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel className="text-lg text-[#3B3B3B] font-bold font-inter">Enter OTP</FormLabel> */}
                            <FormControl>
                              <Input
                                placeholder=""
                                className="placeholder:text-[#3B3B3B] w-80"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <h1 className="font-inter text-3xl font-semibold text-[#202020]">
                        {getValues("fullName")}
                      </h1>
                    )}
                    {isEdit ? (
                      <MdCancel
                        className="cursor-pointer text-2xl"
                        onClick={() => setIsEdit(false)}
                      />
                    ) : (
                      <img
                        onClick={() => setIsEdit(true)}
                        className="w-5 h-5 cursor-pointer"
                        src={edit}
                        alt="edit"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-3 mt-5">
                    <div className="flex items-center gap-2">
                      <img className="w-5 h-5" src={sms} alt="sms" />
                      {isEdit ? (
                        <FormField
                          control={control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Enter Email"
                                  type="email"
                                  className="placeholder:text-[#3B3B3B] w-80"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="font-inter text-[#696969] text-lg">
                          {getValues("email")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="w-5 h-5" src={call} alt="call" />
                      {isEdit ? (
                        <FormField
                          control={control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Enter Phone No."
                                  type="number"
                                  className="placeholder:text-[#3B3B3B] w-80"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="font-inter text-[#696969] text-lg">
                          {getValues("phone")}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <img className="w-5 h-5" src={location} alt="location" />
                      {isEdit ? (
                        <FormField
                          control={control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder=""
                                  className="placeholder:text-[#3B3B3B] w-80"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <p className="font-inter text-[#696969] text-lg">
                          {getValues("address")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 mt-3">
                <p className="font-roboto text-lg text-[#696969]">
                  Aadhar Number
                </p>
                {isEdit ? (
                  <FormField
                    control={control}
                    name="aadharNumber"
                    render={({ field }) => (
                      <FormItem>
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
                ) : (
                  <p className="font-inter text-[#696969] text-lg">
                    {getValues("aadharNumber")}
                  </p>
                )}
              </div>

              <div className="flex gap-5">
                <div>
                  <FormLabel className="cursor-pointer">Addhar Front</FormLabel>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="aadharFront"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-80">
                            <FormLabel className="cursor-pointer">
                              {!watch("userImagePreview") && (
                                <div className="border-2 border-dashed border-[#C2CDD6] w-80 h-60 rounded-lg flex flex-col justify-center items-center">
                                  <div className="flex flex-col items-center primary-color border-dashed rounded px-5">
                                    <PiCameraPlus
                                      className="text-[#1AA6F1]"
                                      size={45}
                                    />
                                    <p className="font-bold text-[#1AA6F1] text-center primary-color text-sm mt-0">
                                      Add Photo
                                    </p>
                                  </div>
                                </div>
                              )}
                              {watch("aadharFrontPreview") && (
                                <img
                                  className="w-80 h-60"
                                  src={getValues("aadharFrontPreview")}
                                  alt=""
                                />
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                className="placeholder:text-[#3B3B3B] hidden w-full"
                                {...aadharFrontRef}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <img
                      className="w-80 h-60 rounded-lg"
                      src={watch("aadharFrontPreview")}
                      alt="avatar"
                    />
                  )}
                </div>

                <div>
                  <FormLabel className="cursor-pointer">Addhar Back</FormLabel>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="aadharBack"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-80">
                            <FormLabel className="cursor-pointer">
                              {!watch("aadharBackPreview") && (
                                <div className="border-2 border-dashed border-[#C2CDD6] w-80 h-60 rounded-lg flex flex-col justify-center items-center">
                                  <div className="flex flex-col items-center primary-color border-dashed rounded px-5">
                                    <PiCameraPlus
                                      className="text-[#1AA6F1]"
                                      size={45}
                                    />
                                    <p className="font-bold text-[#1AA6F1] text-center primary-color text-sm mt-0">
                                      Add Photo
                                    </p>
                                  </div>
                                </div>
                              )}
                              {watch("aadharBackPreview") && (
                                <img
                                  className="w-80 h-60"
                                  src={getValues("aadharBackPreview")}
                                  alt=""
                                />
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                className="placeholder:text-[#3B3B3B] hidden w-full"
                                {...aadharBackRef}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <img
                      className="w-80 h-60 rounded-lg"
                      src={watch("aadharBackPreview")}
                      alt="aadharBack"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 mt-3">
                <p className="font-roboto text-lg text-[#696969]">DL.Number</p>
                {isEdit ? (
                  <FormField
                    control={control}
                    name="DLNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter DL.Number"
                            className="placeholder:text-[#3B3B3B] w-60"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="font-inter text-[#696969] text-lg">
                    {getValues("DLNumber")}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center gap-2 mt-3">
                <p className="font-roboto text-lg text-[#696969]">DL Expiry</p>
                {isEdit ? (
                  <FormField
                    control={form.control}
                    name="DLExpiry"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        {/* <FormLabel>Date of birth</FormLabel> */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] px-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="font-inter text-[#696969] text-lg">
                    {watch("DLExpiry") &&
                      format(new Date(getValues("DLExpiry")), "yyyy/MM/dd")}
                  </p>
                )}
              </div>

              <div>
                <FormLabel className="cursor-pointer">
                  Driving License Image
                </FormLabel>
                {isEdit ? (
                  <FormField
                    control={control}
                    name="drivingLicense"
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-80">
                          <FormLabel className="cursor-pointer">
                            {!watch("drivingLicenseImagePreview") && (
                              <div className="border-2 border-dashed border-[#C2CDD6] w-80 h-60 rounded-lg flex flex-col justify-center items-center">
                                <div className="flex flex-col items-center primary-color border-dashed rounded px-5">
                                  <PiCameraPlus
                                    className="text-[#1AA6F1]"
                                    size={45}
                                  />
                                  <p className="font-bold text-[#1AA6F1] text-center primary-color text-sm mt-0">
                                    Add Photo
                                  </p>
                                </div>
                              </div>
                            )}
                            {watch("drivingLicenseImagePreview") && (
                              <img
                                className="w-80 h-60"
                                src={getValues("drivingLicenseImagePreview")}
                                alt=""
                              />
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              className="placeholder:text-[#3B3B3B] hidden w-full"
                              {...drivingLicenseRef}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <img
                    className="w-80 h-60 rounded-lg"
                    src={watch("drivingLicenseImagePreview")}
                    alt="drivingLicense"
                  />
                )}
              </div>

              <div className="mt-5 pt-5 border-t">
                <p className="font-roboto text-xl text-[#434343]">
                  Bank Details
                </p>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className="font-roboto text-lg text-[#696969]">
                    Bank Name
                  </p>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter Bank Name"
                              className="placeholder:text-[#3B3B3B] w-60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <p className="font-inter text-[#696969] text-lg">
                      {getValues("bankName")}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className="font-roboto text-lg text-[#696969]">
                    Account Holder Name
                  </p>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="accountHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter Account Holder Name"
                              className="placeholder:text-[#3B3B3B] w-60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <p className="font-inter text-[#696969] text-lg">
                      {getValues("accountHolderName")}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className="font-roboto text-lg text-[#696969]">
                    Account Number
                  </p>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter Account Number"
                              type="number"
                              className="placeholder:text-[#3B3B3B] w-60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <p className="font-inter text-[#696969] text-lg">
                      {getValues("accountNumber")}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className="font-roboto text-lg text-[#696969]">
                    IFSC code
                  </p>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="IFSCcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter IFSC code"
                              className="placeholder:text-[#3B3B3B] w-60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <p className="font-inter text-[#696969] text-lg">
                      {getValues("IFSCcode")}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className="font-roboto text-lg text-[#696969]">Upi Id</p>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="upiId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter Upi Id"
                              className="placeholder:text-[#3B3B3B] w-60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <p className="font-inter text-[#696969] text-lg">
                      {getValues("upiId")}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center gap-2 mt-3">
                  <p className="font-roboto text-lg text-[#696969]">
                    Pan Card Number
                  </p>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="panCardNumber"
                      render={({ field }) => (
                        <FormItem>
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
                  ) : (
                    <p className="font-inter text-[#696969] text-lg">
                      {getValues("panCardNumber")}
                    </p>
                  )}
                </div>

                <div>
                  <FormLabel className="cursor-pointer">Pan Card</FormLabel>
                  {isEdit ? (
                    <FormField
                      control={control}
                      name="panCard"
                      render={({ field }) => (
                        <FormItem>
                          <div className="w-80">
                            <FormLabel className="cursor-pointer">
                              {!watch("panCardPreview") && (
                                <div className="border-2 border-dashed border-[#C2CDD6] w-80 h-60 rounded-lg flex flex-col justify-center items-center">
                                  <div className="flex flex-col items-center primary-color border-dashed rounded px-5">
                                    <PiCameraPlus
                                      className="text-[#1AA6F1]"
                                      size={45}
                                    />
                                    <p className="font-bold text-[#1AA6F1] text-center primary-color text-sm mt-0">
                                      Add Photo
                                    </p>
                                  </div>
                                </div>
                              )}
                              {watch("panCardPreview") && (
                                <img
                                  className="w-80 h-60"
                                  src={getValues("panCardPreview")}
                                  alt=""
                                />
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                className="placeholder:text-[#3B3B3B] hidden w-full"
                                {...panCardRef}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <img
                      className="w-80 h-60 rounded-lg"
                      src={watch("panCardPreview")}
                      alt="Pan Card"
                    />
                  )}
                </div>
              </div>

              {isEdit && (
                <div className="flex justify-end mt-5">
                  <Button className="w-36" type="submit">
                    Submit
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </section>
    </AdminWrapper>
  );
};

export default DeliveryAgentProfileEdit;
