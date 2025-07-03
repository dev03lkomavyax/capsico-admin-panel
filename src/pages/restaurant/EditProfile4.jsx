import { Button } from "@/components/ui/button";
import { EditProfileSchema4 } from "@/schema/restaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateMultiplePreview } from "@/utils/updatePreview";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PiCameraPlus } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

const EditProfile4 = ({ setPage, restaurant }) => {
  const form = useForm({
    resolver: zodResolver(EditProfileSchema4),
    defaultValues: {
      isRefered: true,
      timing: "",
      menuImages: "",
      menuImagesPreview: "",
      numberType: "Mobile",
      number: "",
      isManually: "Enter this information manually",
      fullName: "",
      email: "",
      accountingNotificationsNumber: "",
    },
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { register, control, watch, setValue, getValues, reset } = form;
  const menuImagesRef = register("menuImages");

  const menuImages = watch("menuImages");

  useEffect(() => {
    updateMultiplePreview(menuImages, "menuImagesPreview", setValue);
  }, [form, menuImages, setValue]);

  const { basicInfo, location, partnerDetails } = restaurant || {};

  useEffect(() => {
    // reset({
    //     timing: "",
    //     numberType: "",
    //     number: "",
    //     isManually: "",
    //     fullName: "",
    //     email: "",
    //     accountingNotificationsNumber: "",
    // })
  }, [restaurant]);

  const onSubmit = (data) => {
    console.log("data", data);
    setPage((prev) => prev + 1);
  };

  const onError = (data) => {
    console.log("data", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="w-full py-5"
      >
        <div className="flex justify-between gap-2 mb-8">
          <button
            onClick={() => setPage((page) => page - 1)}
            className="flex justify-start items-center"
          >
            <MdKeyboardArrowLeft className="text-[#000000] text-2xl" />
            <h2 className="text-[#000000] text-xl font-medium font-roboto">
              {pathname.includes("/add-restaurant")
                ? "Add Restaurant"
                : "Edit Profile"}
            </h2>
          </button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            size="lg"
            className="w-20 bg-[#1064FD]"
            type="button"
          >
            Save
          </Button>
        </div>
        <div className="border border-[#C2CDD6] rounded-md px-8 py-6">
          <h3 className="text-lg font-bold text-[#4A5E6D]">
            General restaurant information
          </h3>
          <p className="text-xs font-semibold text-[#ABABAB]">
            Update delivery timings and menu for online ordering
          </p>
          <div className="mt-5 flex flex-col gap-8">
            <FormField
              control={control}
              name="isRefered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-[#5E5858] font-inter">
                    Did a zomato representative refer you to this platform?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-10 space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={true} />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={false} />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="timing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-[#5E5858] font-inter">
                    What are the timmings during which customes can place online
                    orders?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col mt-3 space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Delivery and restaurant timing are same" />
                        </FormControl>
                        <FormLabel className="font-semibold text-[#919191]">
                          Delivery and restaurant timing are same
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Delivery timings are different for restaurant timings" />
                        </FormControl>
                        <FormLabel className="font-semibold text-[#919191]">
                          Delivery timings are different for restaurant timings
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="border border-[#C2CDD6] rounded-md px-8 py-6 mt-7">
          <h3 className="text-lg font-bold text-[#4A5E6D]">
            Upload online ordering menu photos
          </h3>
          <p className="text-xs font-semibold text-[#ABABAB]">
            Costomers will choose item from this menu while placing online
            orders
          </p>
          <div className="mt-5 flex flex-col gap-8">
            <div className="w-full relative">
              <FormField
                control={control}
                name="menuImages"
                render={({ field }) => (
                  <FormItem className="z-20">
                    <FormLabel className="cursor-pointer  left-0 w-full h-full top-0">
                      {!watch("menuImagesPreview") && (
                        <div className="border-2 border-dashed border-[#C2CDD6] w-full h-72  flex flex-col justify-center items-center rounded-md">
                          <div className="border-2 flex flex-col items-center primary-color border-dashed rounded px-5 py-4">
                            <PiCameraPlus
                              className="text-[#1AA6F1]"
                              size={45}
                            />
                            <p className="font-bold text-[#1AA6F1] text-center primary-color text-sm mt-2">
                              Add Photo
                            </p>
                          </div>
                          <p className="font-normal text-xs mt-2">
                            or drop files to upload
                          </p>
                        </div>
                      )}
                    </FormLabel>
                    <FormControl className="hidden">
                      <Input
                        multiple="true"
                        type="file"
                        accept=".png,.jpeg,.jpg"
                        {...menuImagesRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watch("menuImagesPreview") && (
                <div className="flex flex-wrap h-full gap-4">
                  {watch("menuImagesPreview").map((prev, i) => (
                    <img key={i} className="w-80 h-52" src={prev} alt="" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-[#C2CDD6] rounded-md px-8 py-6 mt-7">
          <h3 className="text-lg font-bold font-inter text-[#4A5E6D]">
            Priority contact numbers
          </h3>
          <p className="text-xs font-semibold text-[#ABABAB]">
            These will be used for resolving order specific issueds
          </p>
          <div className="mt-5 flex flex-col w-[50%] gap-8">
            <FormField
              control={control}
              name="numberType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-10 space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Mobile" />
                        </FormControl>
                        <FormLabel className="font-semibold text-[#797979]">
                          Mobile
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Landline" />
                        </FormControl>
                        <FormLabel className="font-semibold text-[#797979]">
                          Landline
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Same as restaurant mobile no." />
                        </FormControl>
                        <FormLabel className="font-semibold text-[#797979]">
                          Same as restaurant mobile no.
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <div className="flex gap-0 border rounded w-full">
                        <Input
                          placeholder="+91  |  STD code  | Landline number"
                          className="placeholder:text-[#667085] w-full placeholder:font-inter border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </div>
                      <Button
                        type="button"
                        disabled={watch("phoneNumber")?.length !== 10}
                        variant="capsico"
                        className="disabled:bg-[#BBBBBB] w-36 rounded"
                      >
                        Verify
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border border-[#C2CDD6] rounded-md px-8 py-6 mt-7">
          <h3 className="text-lg font-bold font-inter text-[#4A5E6D]">
            Receiving banking / accounting notifications (invoices)
          </h3>
          <p className="text-xs font-semibold text-[#ABABAB]">
            These will be used for billing related communication
          </p>
          <div className="mt-5 flex flex-col gap-5">
            <FormField
              control={control}
              name="isManually"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Use details of the restaurant owner." />
                        </FormControl>
                        <FormLabel className="font-semibold text-[#797979]">
                          Use details of the restaurant owner.
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Enter this information manually" />
                        </FormControl>
                        <FormLabel className="font-semibold text-[#797979]">
                          Enter this information manually
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {getValues("isManually") === "Enter this information manually" && (
              <>
                <div className="grid grid-cols-2 gap-5 w-[50%]">
                  <FormField
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full name"
                            className="placeholder:text-[#667085] w-full placeholder:font-inter"
                            {...field}
                          />
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
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email ID"
                            className="placeholder:text-[#667085] w-full placeholder:font-inter"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name="accountingNotificationsNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="+91  | Accounting Notifications number"
                          className="placeholder:text-[#667085] w-[50%] placeholder:font-inter"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditProfile4;
