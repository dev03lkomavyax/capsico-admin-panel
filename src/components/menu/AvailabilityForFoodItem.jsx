/* eslint-disable react/prop-types */
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import days from '@/data/days.json';
import useGetApiReq from '@/hooks/useGetApiReq';
import { useEffect, useState } from 'react';

const AvailabilityForFoodItem = ({ form }) => {
    const { control, watch, getValues } = form;
    const [operatingHours, setOperatingHours] = useState("");

    console.log("days", getValues("days"));
    const { res, fetchData, isLoading } = useGetApiReq();

    const restaurantTimings = () => {
        fetchData("/restaurant/Restaurant-timings");
    }

    useEffect(() => {
        restaurantTimings();
    }, [])

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("restaurantTimings res", res);
            setOperatingHours(res?.data?.data.operatingHours);
        }
    }, [res])

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = operatingHours;


    return (
        <div className="w-full flex flex-col gap-4">
            <h3 className="font-inter text-lg text-[#2C62C6]">Delivery</h3>
            <FormField
                control={control}
                name="timingType"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        {/* <FormLabel>Notify me about...</FormLabel> */}
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                            >
                                <FormItem>
                                    <div className='flex items-start gap-1'>
                                        <FormControl>
                                            <RadioGroupItem value="sameAsRestaurant" />
                                        </FormControl>
                                        <div>
                                            <FormLabel className="font-inter text-black font-semibold block -mt-[0px]">
                                                Same as rstaurant timmings
                                            </FormLabel>
                                            <div className="flex flex-col gap-1 mt-2">
                                                {monday?.isOpen && <p>{`Mon: ${monday?.timings?.open} - ${monday?.timings?.close}`}</p>}
                                                {tuesday?.isOpen && <p>{`Tue: ${tuesday?.timings?.open} - ${tuesday?.timings?.close}`}</p>}
                                                {wednesday?.isOpen && <p>{`Wed: ${wednesday?.timings?.open} - ${wednesday?.timings?.close}`}</p>}
                                                {thursday?.isOpen && <p>{`Thu: ${thursday?.timings?.open} - ${thursday?.timings?.close}`}</p>}
                                                {friday?.isOpen && <p>{`Fri: ${friday?.timings?.open} - ${friday?.timings?.close}`}</p>}
                                                {saturday?.isOpen && <p>{`Sat: ${saturday?.timings?.open} - ${saturday?.timings?.close}`}</p>}
                                                {sunday?.isOpen && <p>{`Sat: ${sunday?.timings?.open} - ${sunday?.timings?.close}`}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </FormItem>
                                <FormItem>
                                    <div className='flex items-start gap-1'>
                                        <FormControl>
                                            <RadioGroupItem value="custom" />
                                        </FormControl>
                                        <FormLabel className="font-inter text-black font-semibold block -mt-[0px]">
                                            Custom food timings
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {watch("timingType") === "custom" &&
                <div className='mt-6'>
                    <div className='mt-5 grid grid-cols-[47%_2%_47%] gap-5'>
                        <FormField
                            control={control}
                            name="openingTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" text-[#344054] font-inter">Opening Time</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local"  {...field} />
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
                                        <Input type="datetime-local"  {...field} />
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
                                        {/* <div>
                                        <button className="primary-color text-base font-normal">+ View more</button>
                                    </div> */}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default AvailabilityForFoodItem