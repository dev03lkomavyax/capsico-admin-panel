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
import usePostApiReq from "@/hooks/usePostApiReq";
import { viewDbImagePreview } from "@/lib/utils";
import {
  AddProfileSchema3,
  EditProfileSchema2,
  EditProfileSchema3,
} from "@/schema/restaurantSchema";
import { updateMultiplePreview } from "@/utils/updatePreview";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { PiCameraPlus } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile3 = ({ setPage, restaurant: restaurantData }) => {
  const form = useForm({
    resolver: zodResolver(
      restaurantData ? EditProfileSchema3 : AddProfileSchema3
    ),
    defaultValues: {
      menuImages: "",
      foodImages: "",
      restaurant: "",
    },
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { register, control, watch, setValue, getValues, reset } = form;
  const { res, fetchData, isLoading } = usePostApiReq();

  const menuImagesRef = register("menuImages");
  const restaurantRef = register("restaurant");
  const foodImagesRef = register("foodImages");

  const menuImages = watch("menuImages");
  const restaurant = watch("restaurant");
  const foodImages = watch("foodImages");

  useEffect(() => {
    updateMultiplePreview(menuImages, "menuImagesPreview", setValue);
    updateMultiplePreview(restaurant, "restaurantPreview", setValue);
    updateMultiplePreview(foodImages, "foodImagesPreview", setValue);
  }, [form, menuImages, restaurant, foodImages, setValue]);

  const { basicInfo } = restaurantData || {};

  useEffect(() => {
    const menuImagesPreviews = basicInfo?.menuImages?.map((image) =>
      viewDbImagePreview(image)
    );
    const imagesPreviews = basicInfo?.images?.map((image) =>
      viewDbImagePreview(image)
    );
    const foodImagesPreviews = basicInfo?.foodImages?.map((image) =>
      viewDbImagePreview(image)
    );

    if (menuImages?.length === 0) {
      setValue("menuImagesPreview", menuImagesPreviews || "");
    }

    if (restaurant?.length === 0) {
      setValue("restaurantPreview", imagesPreviews || "");
    }

    if (foodImages?.length === 0) {
      setValue("foodImagesPreview", foodImagesPreviews || "");
    }
  }, [restaurantData, menuImages, restaurant, foodImages, setValue]);

  const onSubmit = (data) => {
    // setIsRegisterSuccessModalOpen(true);
    console.log("data", data);
    const { menuImages, restaurant: restaurantImages, foodImages } = data;

    const formData = new FormData();

    // Handle Menu Images
    if (menuImages?.length > 0) {
      Array.from(menuImages).forEach((file) => {
        formData.append("menuImages", file);
      });
    }

    // Handle Restaurant Images
    if (restaurantImages?.length > 0) {
      Array.from(restaurantImages).forEach((file) => {
        formData.append("restaurantImages", file);
      });
    }

    // Handle Food Images
    if (foodImages?.length > 0) {
      Array.from(foodImages).forEach((file) => {
        formData.append("foodImages", file);
      });
    }

    if (restaurantData) {
      fetchData(
        `/admin/update-restraunt-registration-upload-images/${
          restaurantData?._id || restaurantData?.id || "68550fa5acbd8e70333f11e0"
        }`,
        formData
      );
    } else {
      fetchData(
        `/admin/restraunt-registration-upload-images/${
          restaurantData?._id || restaurantData?.id || "68550fa5acbd8e70333f11e0"
        }`,
        formData
      );
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      toast.success(res?.data.message);
      setPage(4);
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
          <div className="border bg-white border-[#C2CDD6] rounded-md px-8 py-6 mt-6">
            <div className="w-full mt-4">
              <div>
                <h3 className="text-xl font-bold text-[#4A5E6D]">
                  Menu Images
                </h3>
                <p className="text-lg font-normal text-[#92A5B5]">
                  Your menu will be displayed directly to customers on Capsico
                </p>
              </div>
              <div className="w-full gap-10 pt-10">
                <div className="w-full relative">
                  <FormField
                    control={control}
                    name="menuImages"
                    render={({ field }) => (
                      <FormItem className="z-20">
                        <FormLabel className="cursor-pointer  left-0 w-full h-full top-0">
                          {/* <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">Change</span> */}
                          {/* {watch("menuImagesPreview") &&
                                                <img className='w-full h-full object-contain' src={watch("menuImagesPreview")} alt="" />
                                            } */}

                          <div className="border-2 mb-3 border-dashed border-[#C2CDD6] w-full h-72  flex flex-col justify-center items-center rounded-md">
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

            <div className="w-full mt-4">
              <div>
                <h3 className="text-xl font-bold text-[#4A5E6D]">
                  Restaurant Images
                </h3>
                <p className="text-lg font-normal text-[#92A5B5]">
                  Please upload at least one photo of the restaurant’s facade
                  (front view)
                </p>
              </div>
              <div className="w-full gap-10 pt-10">
                <div className="w-full relative">
                  <FormField
                    control={control}
                    name="restaurant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="cursor-pointer left-0 w-full h-full top-0">
                          <div className="border-2 mb-3 border-dashed border-[#C2CDD6] w-full h-72  flex flex-col justify-center items-center rounded-md">
                            <div className="border-2 flex flex-col items-center primary-color border-dashed rounded px-5 py-4">
                              <PiCameraPlus
                                className="text-[#1AA6F1]"
                                size={45}
                              />
                              <p className="font-bold text-center text-[#1AA6F1] text-sm mt-2">
                                Add Photo
                              </p>
                            </div>
                            <p className="font-normal text-xs mt-2">
                              or drop files to upload
                            </p>
                          </div>
                        </FormLabel>
                        <FormControl className="hidden">
                          <Input
                            multiple="true"
                            type="file"
                            accept=".png,.jpeg,.jpg"
                            {...restaurantRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {watch("restaurantPreview") && (
                    <div className="flex flex-wrap h-full gap-4">
                      {watch("restaurantPreview").map((prev, i) => (
                        <img key={i} className="w-80 h-52" src={prev} alt="" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full mt-4">
              <div>
                <h3 className="text-xl font-bold text-[#4A5E6D]">
                  Food Images
                </h3>
                <p className="text-lg font-normal text-[#92A5B5]">
                  Please avoid uploading images of raw ingredients
                </p>
              </div>
              <div className="w-full gap-10 pt-10">
                <div className="w-full relative">
                  <FormField
                    control={control}
                    name="foodImages"
                    render={({ field }) => (
                      <FormItem className="z-20">
                        <FormLabel className="cursor-pointer  left-0 w-full h-full top-0">
                          {/* <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">Change</span> */}
                          {/* {watch("foodImagesPreview") &&
                                                <img className='w-full h-full object-contain' src={watch("foodImagesPreview")} alt="" />
                                            } */}
                          <div className="border-2 mb-3 border-dashed border-[#C2CDD6] w-full h-72  flex flex-col justify-center items-center rounded-md">
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
                        </FormLabel>
                        <FormControl className="hidden">
                          <Input
                            multiple="true"
                            type="file"
                            accept=".png,.jpeg,.jpg"
                            {...foodImagesRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {watch("foodImagesPreview") && (
                    <div className="flex flex-wrap h-full gap-4">
                      {watch("foodImagesPreview").map((prev, i) => (
                        <img key={i} className="w-80 h-52" src={prev} alt="" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditProfile3;
