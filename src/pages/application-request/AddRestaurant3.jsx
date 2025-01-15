import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import cuisines from '@/data/cuisines.json';
import days from '@/data/days.json';
import restaurantOptions from '@/data/restaurantOptions.json';
import { addRestaurantSchema3 } from '@/schema/ApplicationRequest';
import { EditProfileSchema2 } from '@/schema/restaurantSchema';
import { generateTimeOptions } from '@/utils/generateTimeOptions';
import { updateMultiplePreview } from '@/utils/updatePreview';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { PiCameraPlus } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const AddRestaurant3 = ({page, setPage}) => {
        const navigate = useNavigate();
    
    const form = useForm({
        resolver: zodResolver(addRestaurantSchema3),
        defaultValues: {
            menuImages: "",
            foodImages: "",
            restaurant: "",
        }
    })

    const { register, control, watch, setValue, getValues } = form;

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

    const onSubmit = (data) => {
        console.log("data", data);
        setPage(page+1)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
                <div className='flex justify-between'>
                                        <button onClick={() => navigate(-1)} className='flex justify-start items-center mb-8'>
                                            <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
                                            <h2 className='text-[#000000] text-xl font-medium font-roboto'>Edit Profile</h2>
                                        </button>
                                        <Button size="lg" className="w-24 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md" type="submit">Save</Button>
                                    </div>
                <div>
                    <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-6'>
                        <div className='w-full mt-4'>
                            <div>
                                <h3 className='text-xl font-bold text-[#4A5E6D]'>Menu Images</h3>
                                <p className='text-lg font-normal text-[#92A5B5]'>Your menu will be displayed directly to customers on Capsico</p>
                            </div>
                            <div className="grid w-full gap-10 pt-10">
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

                                                    {!watch("menuImagesPreview") &&
                                                        <div className='border-2 border-dashed border-[#C2CDD6] w-full h-72  flex flex-col justify-center items-center rounded-md'>
                                                            <div className='border-2 flex flex-col items-center primary-color border-dashed rounded px-5 py-4'>
                                                                <PiCameraPlus className='text-[#1AA6F1]' size={45} />
                                                                <p className='font-bold text-[#1AA6F1] text-center primary-color text-sm mt-2'>Add Photo</p>
                                                            </div>
                                                            <p className='font-normal text-xs mt-2'>or drop files to upload</p>
                                                        </div>
                                                    }
                                                </FormLabel>
                                                <FormControl className="hidden">
                                                    <Input multiple="true" type="file" accept='.png,.jpeg,.jpg' {...menuImagesRef} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {watch("menuImagesPreview") &&
                                        <div className='flex flex-wrap h-full gap-4'>
                                            {watch("menuImagesPreview").map((prev, i) => (
                                                <img key={i} className='w-80 h-52' src={prev} alt="" />
                                            ))}
                                        </div>}
                                </div>
                            </div>
                        </div>

                        <div className='w-full mt-4'>
                            <div>
                                <h3 className='text-xl font-bold text-[#4A5E6D]'>Restaurant Images</h3>
                                <p className='text-lg font-normal text-[#92A5B5]'>Please upload at least one photo of the restaurant’s facade (front view)</p>
                            </div>
                            <div className="grid w-full gap-10 pt-10">
                                <div className="w-full relative">
                                    <FormField
                                        control={control}
                                        name="restaurant"
                                        render={({ field }) => (
                                            <FormItem className="z-20">
                                                <FormLabel className="cursor-pointer left-0 w-full h-full top-0">
                                                    {/* <span className="cursor-pointer absolute right-0 -top-7 text-xs p-1 border-dashed rounded-sm">Change</span> */}
                                                    {/* {watch("restaurantPreview") &&
                                                <img className='w-full h-full object-contain' src={watch("restaurantPreview")} alt="" />
                                            } */}
                                                    {!watch("restaurantPreview") &&
                                                        <div className='border-2 border-dashed border-[#C2CDD6] w-full h-72  flex flex-col justify-center items-center rounded-md'>
                                                            <div className='border-2 flex flex-col items-center primary-color border-dashed rounded px-5 py-4'>
                                                                <PiCameraPlus className='text-[#1AA6F1]' size={45} />
                                                                <p className='font-bold text-center text-[#1AA6F1] text-sm mt-2'>Add Photo</p>
                                                            </div>
                                                            <p className='font-normal text-xs mt-2'>or drop files to upload</p>
                                                        </div>
                                                    }
                                                </FormLabel>
                                                <FormControl className="hidden">
                                                    <Input multiple="true" type="file" accept='.png,.jpeg,.jpg' {...restaurantRef} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {watch("restaurantPreview") &&
                                        <div className='flex flex-wrap h-full gap-4'>
                                            {watch("restaurantPreview").map((prev, i) => (
                                                <img key={i} className='w-80 h-52' src={prev} alt="" />
                                            ))}
                                        </div>}
                                </div>
                            </div>
                        </div>

                        <div className='w-full mt-4'>
                            <div>
                                <h3 className='text-xl font-bold text-[#4A5E6D]'>Food Images</h3>
                                <p className='text-lg font-normal text-[#92A5B5]'>Please avoid uploading images of raw ingredients</p>
                            </div>
                            <div className="grid w-full gap-10 pt-10">
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
                                                    {!watch("foodImagesPreview") &&
                                                        <div className='border-2 border-dashed border-[#C2CDD6] w-full h-72  flex flex-col justify-center items-center rounded-md'>
                                                            <div className='border-2 flex flex-col items-center primary-color border-dashed rounded px-5 py-4'>
                                                                <PiCameraPlus className='text-[#1AA6F1]' size={45} />
                                                                <p className='font-bold text-[#1AA6F1] text-center primary-color text-sm mt-2'>Add Photo</p>
                                                            </div>
                                                            <p className='font-normal text-xs mt-2'>or drop files to upload</p>
                                                        </div>
                                                    }
                                                </FormLabel>
                                                <FormControl className="hidden">
                                                    <Input multiple="true" type="file" accept='.png,.jpeg,.jpg' {...foodImagesRef} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {watch("foodImagesPreview") &&
                                        <div className='flex flex-wrap h-full gap-4'>
                                            {watch("foodImagesPreview").map((prev, i) => (
                                                <img key={i} className='w-80 h-52' src={prev} alt="" />
                                            ))}
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default AddRestaurant3