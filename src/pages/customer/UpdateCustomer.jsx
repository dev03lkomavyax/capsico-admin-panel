/* eslint-disable react/prop-types */
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { UpdateCustomerSchema } from "@/schema/UpdateCustomerSchema";
import { updatePreview } from "@/utils/updatePreview";
import { zodResolver } from "@hookform/resolvers/zod";
import { add, format, parse } from "date-fns";
import { Pin } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiCameraPlus } from "react-icons/pi";

const UpdateCustomer = ({
  isUpdateCustomerModalOpen,
  setIsUpdateCustomerModalOpen,
  customer,
  getCustomerDetails,
}) => {
  console.log("customer", customer);

  const form = useForm({
    resolver: zodResolver(UpdateCustomerSchema),
    defaultValues: {
      userImage: "",
      userImagePreview: "",
      name: customer?.name || "",
      email: customer?.email || "",
      gender: customer?.gender || "",
      phone: customer?.phone || "",
      dateOfBirth: customer?.dateOfBirth
        ? parse(customer.dateOfBirth, "dd/MM/yyyy", new Date())
        : null,
      anniversary: customer?.anniversary
        ? parse(customer.anniversary, "dd/MM/yyyy", new Date())
        : null,
    },
  });

  const { register, control, watch, setValue, getValues, handleSubmit } = form;

  console.log("getValues", getValues());

  const userImageRef = register("userImage");

  const userImage = watch("userImage");

  useEffect(() => {
    updatePreview(userImage, "userImagePreview", setValue);
  }, [form, userImage, setValue]);

  const { res, fetchData, isLoading } = usePatchApiReq();

  const onError = (error) => {
    console.log("error", error);
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append(
      "dateOfBirth",
      data.dateOfBirth ? format(data.dateOfBirth, "dd/MM/yyyy") : ""
    );
    formData.append(
      "anniversary",
      data.anniversary ? format(data.anniversary, "dd/MM/yyyy") : ""
    );
    formData.append("gender", data.gender);
    formData.append("userId", customer?._id);
    formData.append("image", data.userImage[0]);

    fetchData("/admin/update-customer", formData);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      setIsUpdateCustomerModalOpen(false);
      getCustomerDetails()
    }
  }, [res, setIsUpdateCustomerModalOpen]);

  return (
    <Dialog
      open={isUpdateCustomerModalOpen}
      onOpenChange={setIsUpdateCustomerModalOpen}
    >
      <DialogContent className="sm:max-w-[925px]">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold font-inter">
              Update Customer Details
            </h2>
            <div className="grid grid-cols-[240px_1fr] items-start gap-5">
              <FormField
                control={control}
                name="userImage"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-60">
                      <FormLabel className="cursor-pointer">
                        {!watch("userImagePreview") && (
                          <div className="border-2 border-dashed border-[#C2CDD6] w-60 h-60 rounded-lg flex flex-col justify-center items-center">
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
                        {watch("userImagePreview") && (
                          <img
                            className="w-60 h-60"
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
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-inter opacity-80`}
                      >
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          className={`placeholder:text-[#A6A6A6]  font-inter rounded-lg`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-inter opacity-80`}
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          className={`placeholder:text-[#A6A6A6]  font-inter rounded-lg`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-inter opacity-80`}
                      >
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone"
                          className={`placeholder:text-[#A6A6A6]  font-inter rounded-lg`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-inter opacity-80`}
                      >
                        Date Of Birth
                      </FormLabel>
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
                  control={form.control}
                  name="anniversary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-inter opacity-80`}
                      >
                        Anniversary
                      </FormLabel>
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
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-[#111928] font-semibold font-inter opacity-80`}
                      >
                        Gender
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="flex justify-between items-center w-full h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="capsico"
                  className="h-11 w-full mt-auto text-base font-inter"
                  disabled={isLoading}
                >
                  Update
                </Button>
              </div>
            </div>
            <div className="flex justify-end"></div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCustomer;
