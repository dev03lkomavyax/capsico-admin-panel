import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import useGetApiReq from '@/hooks/useGetApiReq';
import usePostApiReq from '@/hooks/usePostApiReq';
import { EditProfileSchema2 } from '@/schema/restaurantSchema';
import { generateTimeOptions } from '@/utils/generateTimeOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProfile2 = ({ setPage, restaurant }) => {
  const form = useForm({
    resolver: zodResolver(EditProfileSchema2),
    defaultValues: {
      restaurantOptions: [],
      cuisines: [],
      openingTime: "",
      closingTime: "",
      days: [],
    }
  })

  const { register, control, watch, setValue, getValues, reset } = form;
  const [showMoreRestaurantOptions, setShowMoreRestaurantOptions] = useState(false)
  const [showMoreCuisines, setShowMoreCuisines] = useState(false)
  const navigate = useNavigate();

  const handleToggle = () => {
    setShowMoreRestaurantOptions(!showMoreRestaurantOptions);
  };

  const handleToggleCuisines = () => {
    setShowMoreCuisines(!showMoreCuisines);
  };

  const selectedCuisines = watch('cuisines');
  const selectedRestaurantOptions = watch('restaurantOptions');
  const selectedDays = watch('days');

  const {pathname} = useLocation();
  const timeOptions = generateTimeOptions();

  useEffect(() => {
    console.log('Selected cuisines:', selectedCuisines);
    console.log('Selected Days:', selectedDays);
    console.log('Selected restaurantOptions:', selectedRestaurantOptions);
  }, [selectedCuisines, selectedRestaurantOptions, selectedDays]);

  const { basicInfo, location, partnerDetails } = restaurant || {};
  
  useEffect(() => {
      reset({
        restaurantOptions: [],
        cuisines: [],
        openingTime: "",
        closingTime: "",
        days: [],
      });
    }, [restaurant]);

  const { res, fetchData, isLoading } = usePostApiReq();
  const { res: cuisinesRes, fetchData: fetchCuisinesData, isLoading: isCuisinesLoading } = useGetApiReq();

  const [cuisines, setCuisines] = useState([])

  const getCuisines = () => {
    fetchCuisinesData("/admin/get-cuisines");
  }

  useEffect(() => {
    getCuisines();
  }, [])

  useEffect(() => {
    if (cuisinesRes?.status === 200 || cuisinesRes?.status === 201) {
      console.log("cuisinesRes", cuisinesRes);
      setCuisines(cuisinesRes?.data?.data?.cuisines);
    }
  }, [cuisinesRes])

  const onSubmit = (data) => {
    // setIsRegisterSuccessModalOpen(true);
    console.log("data", data);
    const restaurantTypes = {
      bakery: false,
      pureVeg: false,
      foodCourt: false,
      dessertShop: false,
      beverageShop: false,
      fastFood: false,
      casualFoodStall: false
    };
    const workingHours = {
      openingTime: data.openingTime,
      closingTime: data.closingTime,
      weekDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      }
    }

    data.restaurantOptions.forEach((opt) => {
      restaurantTypes[opt] = true
    });

    data.days.forEach((day) => {
      workingHours.weekDays[day] = true
    });

    console.log("restaurantTypes", restaurantTypes);


    fetchData(`/admin/restraunt-registration2/${restaurant?._id || restaurant?.id || "68550fa5acbd8e70333f11e0"}`, {
      priceForOne: data.priceForOne,
      vegType: data.restaurantType,
      restaurantTypes: restaurantTypes,
      selectedCuisineIds: data.cuisines,
      workingHours,
    });
  }


  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      toast.success(res?.data.message);
      setPage(3);
    }
  }, [res])

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
          <div className="flex justify-between gap-2 mb-8">
            <button onClick={() => navigate(-1)} className='flex justify-start items-center'>
              <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
              <h2 className='text-[#000000] text-xl font-medium font-roboto'>{pathname.includes("/add-restaurant") ? "Add Restaurant" : "Edit Profile"}</h2>
            </button>
            <Button disabled={isLoading} size="lg" className="w-20 bg-[#1064FD]" type="submit">Save</Button>
          </div>

          <div className='border border-[#C2CDD6] rounded-md px-8 py-6'>
            <h3 className='text-xl font-bold text-[#4A5E6D]'>Choose Restaurant Type</h3>
            {/* <p className='text-[25px] font-normal text-[#92A5B5]'>Restaurant name. address. contact no., owner details</p> */}
            <div className='mt-5'>
              <FormField
                control={control}
                name="restaurantType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-5"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="BOTH" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Both
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="VEG" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Veg
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="NON_VEG" />
                          </FormControl>
                          <FormLabel className="font-normal">Non Veg</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    {/* <FormLabel className="font-normal text-base text-[#667085]">
                                            {item.label}
                                        </FormLabel> */}

                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <div className="mt-5">
              <FormField
                control={control}
                name="priceForOne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-[#344054] font-inter">Price for one</FormLabel>
                    <FormControl>
                      <Input placeholder="Rs 250" className="placeholder:text-[#667085] placeholder:font-inter border-[#E4E6EE]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-6'>
            <h3 className='text-xl font-bold text-[#4A5E6D]'>Choose options for your restaurant</h3>
            {/* <p className='text-[25px] font-normal text-[#92A5B5]'>Restaurant name. address. contact no., owner details</p> */}
            <div className='mt-5'>
              <FormField
                control={control}
                name="restaurantOptions"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-3 gap-3 items-center">
                      {restaurantOptions.slice(0, showMoreRestaurantOptions ? restaurantOptions.length : 4).map((item) => (
                        <FormField
                          key={item.id}
                          control={control}
                          name="restaurantOptions"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    className="w-5 h-5"
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-base text-[#667085]">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}

                      <div>
                        <button type='button' onClick={handleToggle} className="primary-color text-base font-normal">
                          {showMoreRestaurantOptions ? '- View less' : '+ View more'}
                        </button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-6'>
            <h3 className='text-xl font-bold text-[#4A5E6D]'>Sorts of Cuisines</h3>
            <p className='text-lg font-normal text-[#92A5B5]'>Pick options which best describe food you serve</p>
            <div className='mt-5'>
              <FormField
                control={control}
                name="cuisines"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-3 gap-3 items-center">
                      {cuisines.slice(0, showMoreCuisines ? cuisines.length : 4).map((item) => (
                        <FormField
                          key={item.id}
                          control={control}
                          name="cuisines"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item._id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    className="w-5 h-5"
                                    checked={field.value?.includes(item._id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item._id])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item._id
                                          )
                                        )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-base text-[#667085]">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <div>
                        <button type='button' onClick={handleToggleCuisines} className="primary-color text-base font-normal">
                          {showMoreCuisines ? '- View less' : '+ View more'}
                        </button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-6'>
            <h3 className='text-xl font-bold text-[#4A5E6D]'>Restaurant Working Hours</h3>
            <p className='text-lg font-normal text-[#92A5B5]'>Set restaurant opening and closing hours.</p>

            <div className='mt-5 grid grid-cols-[47%_2%_47%] w-[60%] gap-5'>
              <FormField
                control={control}
                name="openingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-[#344054] font-inter">Opening Time</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(e) => {
                          field.onChange(e);
                          // handleOnChange(i);
                        }}
                      // disabled={fields.find((item) => item.index === i) ? false : true}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Opening Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {timeOptions.map((time, index) => (
                              <SelectItem key={index} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mt-auto mb-4 text-xl text-[#667085]'>to</div>
              <FormField
                control={control}
                name="closingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-[#344054] font-inter">Closing Time</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(e) => {
                          field.onChange(e);
                          // handleOnChange(i);
                        }}
                      // disabled={fields.find((item) => item.index === i) ? false : true}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Closing Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {timeOptions.map((time, index) => (
                              <SelectItem key={index} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mt-5'>
              <FormField
                control={control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-3 gap-3 items-center">
                      {days.map((item) => (
                        <FormField
                          key={item.id}
                          control={control}
                          name="days"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    className="w-5 h-5"
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-base text-[#667085]">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* <div className="flex justify-end gap-2 mt-10">
            <Button size="lg" className="w-20" type="submit">Done</Button>
          </div> */}
        </form>
      </Form>
    </div>
  )
}

export default EditProfile2