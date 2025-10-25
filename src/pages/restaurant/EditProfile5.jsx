import { Button } from "@/components/ui/button";
import {
  AddProfileSchema5,
  EditProfileSchema5
} from "@/schema/restaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePostApiReq from "@/hooks/usePostApiReq";
import { cn, viewDbImagePreview } from "@/lib/utils";
import { updatePreview } from "@/utils/updatePreview";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowLeft, MdOutlineFileUpload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile5 = ({ setPage, restaurant }) => {
  const form = useForm({
    resolver: zodResolver(restaurant ? EditProfileSchema5 : AddProfileSchema5),
    defaultValues: {
      panNumber: "",
      panImage: "",
      FSSAICertificateNumber: "",
      FSSAIExpiryDate: "",
      fssaiImage: "",
      accountHolderName: "",
      bankAccountNumber: "",
      IFSCCode: "",
      bankName: "",
      bankBranch: "",
      gstNo: "",
    },
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { register, control, watch, setValue, getValues, reset } = form;

  const panImageRef = register("panImage");
  const fssaiImageRef = register("fssaiImage");

  const panImage = watch("panImage");
  const fssaiImage = watch("fssaiImage");
  const { res, fetchData, isLoading } = usePostApiReq();

  useEffect(() => {
    updatePreview(panImage, "panImagePreview", setValue);
    updatePreview(fssaiImage, "fssaiPreview", setValue);
  }, [form, panImage, fssaiImage, setValue]);

  const { bankDetails, documents, gstNo } = restaurant || {};

  useEffect(() => {
    const { fssai, idProof } = documents || {};
    reset({
      accountHolderName: bankDetails?.accountHolder,
      bankAccountNumber: bankDetails?.accountNumber,
      bankBranch: bankDetails?.branch,
      IFSCCode: bankDetails?.ifscCode,
      bankName: bankDetails?.bankName,
      FSSAICertificateNumber: fssai?.number,
      FSSAIExpiryDate: fssai?.expiryDate
        ? new Date(fssai?.expiryDate)
        : new Date(),
      panNumber: idProof?.number,
      gstNo: gstNo,
      fssaiPreview: fssai?.image && viewDbImagePreview(fssai?.image),
      panImagePreview:
        idProof?.images?.front && viewDbImagePreview(idProof?.images?.front),
    });
  }, [restaurant]);

  const onSubmit = (data) => {
    console.log("data", data);
    const {
      panImage,
      fssaiImage,
      panNumber,
      FSSAICertificateNumber,
      FSSAIExpiryDate,
      accountHolderName,
      bankAccountNumber,
      IFSCCode,
      bankName,
      bankBranch,
      gstNo,
    } = data;

    const formData = new FormData();
    formData.append("panNumber", panNumber);
    formData.append("panImage", panImage[0]);

    formData.append("fssaiLicenseNumber", FSSAICertificateNumber);
    formData.append("fssaiImage", fssaiImage[0]);
    formData.append("fssaiLicenseExpiryDate", FSSAIExpiryDate);

    formData.append("accountHolderName", accountHolderName);
    formData.append("accountNumber", bankAccountNumber);
    formData.append("ifscCode", IFSCCode);
    formData.append("bankName", bankName);
    formData.append("bankBranch", bankBranch);
    formData.append("gstNo", gstNo);

    fetchData(
      `/admin/restraunt-registration5/${
        restaurant?._id || restaurant?.id || "68550fa5acbd8e70333f11e0"
      }`,
      formData
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      toast.success(res?.data.message);
      setPage(6);
    }
  }, [res]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
        <div>
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
              disabled={isLoading}
              size="lg"
              className="w-20 bg-[#1064FD]"
              type="submit"
            >
              Save
            </Button>
          </div>
          <div className="border border-[#C2CDD6] rounded-md px-8 py-6">
            <h3 className="text-lg font-bold text-[#4A5E6D]">
              Upload Legal Documents
            </h3>
            {/* <p className='text-xs font-semibold text-[#ABABAB]'>Update delivery timings and menu for online ordering</p> */}
            <div className="px-4 py-3 border border-[#AB8C2A] text-[#947A28] rounded-lg mt-4 bg-[#FFFCF6]">
              A mistake in this section can lead to delays in onboarding
              process.Please follow all instructions very carefullly.
            </div>
            <div className="py-6 mt-7">
              <h3 className="text-lg font-bold text-[#4A5E6D]">PAN details</h3>
              <div className="flex justify-between gap-2">
                <p className="text-xs font-semibold text-[#ABABAB]">
                  We will verify the legal entity with this information.
                </p>
                <p className="text-xs font-semibold text-[#93A5C9]">
                  Important guideliness
                </p>
              </div>

              <div className="grid grid-cols-2 items-center mt-5 gap-5">
                <FormField
                  control={control}
                  name="panNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="PAN number of legally entity"
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
                  name="panImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="cursor-pointer w-full h-full">
                        <div className="border bg-[#4A67FF] hover:bg-[#4A67FF] text-white w-full px-3 py-[10px] flex gap-2 items-center justify-center rounded-md">
                          <MdOutlineFileUpload size={20} />
                          <span>Upload PAN</span>
                        </div>
                      </FormLabel>
                      <FormControl className="hidden">
                        <Input
                          multiple="true"
                          type="file"
                          accept=".png,.jpeg,.jpg"
                          {...panImageRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {watch("panImagePreview") && (
                <div className="mt-5">
                  <p className="text-[#4A5E6D] text-sm mb-1">Pan Card:</p>
                  <img
                    src={watch("panImagePreview")}
                    alt="pan"
                    className="w-96 h-60 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="border border-[#C2CDD6] rounded-md px-8 py-6 mt-7">
            <h3 className="text-lg font-bold text-[#4A5E6D]">
              FSSAI certificate
            </h3>
            <div className="flex justify-between gap-2">
              <p className="text-xs font-semibold text-[#ABABAB]">
                This is required to comply with regulationson food safety
              </p>
              <p className="text-xs font-semibold text-[#93A5C9]">
                Important guideliness
              </p>
            </div>
            <div className="mt-5 flex flex-col">
              <FormField
                control={control}
                name="FSSAICertificateNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="FSSAI certificate number"
                        className="placeholder:text-[#667085] w-full placeholder:font-inter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-5 mt-8">
                <FormField
                  control={control}
                  name="FSSAIExpiryDate"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel></FormLabel> */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full rounded-md px-3 text-left font-normal hover:bg-transparent",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field?.value ? (
                                format(field?.value, "PPP")
                              ) : (
                                <span>FSSAI expiry date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="fssaiImage"
                  render={({ field }) => (
                    <FormItem className="z-20">
                      <FormLabel className="cursor-pointer">
                        <div className="border border-[#789AC6] bg-[#F4F9FC] text-[#789AC6] w-full px-3 py-[10px] flex gap-2 items-center justify-center rounded-md">
                          <MdOutlineFileUpload size={20} />
                          <span>Upload FSSA certificate</span>
                        </div>
                      </FormLabel>
                      <FormControl className="hidden">
                        <Input
                          multiple="true"
                          type="file"
                          accept=".png,.jpeg,.jpg"
                          {...fssaiImageRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {watch("fssaiPreview") && (
                <div className="mt-5">
                  <p className="text-[#4A5E6D] text-sm mb-1">
                    FSSAI Certificate:
                  </p>
                  <img
                    src={watch("fssaiPreview")}
                    alt="fssai"
                    className="w-96 h-60 object-cover"
                  />
                </div>
              )}
              <p className="text-sm mt-5">
                Haven’t applied for FSSAI certificate yet?
                <button className="text-[#5A7DC2] font-inter font-semibold">
                  Apply here
                </button>
              </p>

              <div className="px-3 py-2 text-xs mt-3 bg-[#EADBB1] rounded text-[#786224] border border-[#7D704C]">
                <span className="font-semibold">Note:</span>As per government
                guidelines,food businesses cannot operate and receive online
                orders based on a FSSAI Application starting 1st jul 2021.If you
                have applied for a FSSAI license or registration,please come
                back to this page once it gets approved.Details fixed till now
                will be auto-saved.
              </div>
            </div>
          </div>

          <div className="border border-[#C2CDD6] rounded-md px-8 py-6 mt-7">
            <h3 className="text-lg font-bold font-inter text-[#4A5E6D]">
              Account details
            </h3>
            <div className="flex justify-between gap-2">
              <p className="text-xs font-semibold text-[#ABABAB]">
                We will verify the legal entity with this information.
              </p>
              <p className="text-xs font-semibold text-[#93A5C9]">
                Important guideliness
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={control}
                  name="accountHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Account Holder Name"
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
                  name="bankAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bank account number"
                          className="placeholder:text-[#667085] w-full placeholder:font-inter"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bank Name"
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
                  name="IFSCCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bank IFSC code"
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
                  name="bankBranch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Branch Name"
                          className="placeholder:text-[#667085] w-full placeholder:font-inter"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="border border-[#C2CDD6] rounded-md px-8 py-6 mt-7">
            <h3 className="text-lg font-bold font-inter text-[#4A5E6D]">
              GST Details
            </h3>
            <div className="mt-5 flex flex-col gap-8">
              <div className="w-2/3">
                <FormField
                  control={control}
                  name="gstNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="GST Number"
                          className="placeholder:text-[#667085] w-full placeholder:font-inter"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditProfile5;
