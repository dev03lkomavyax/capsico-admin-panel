import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaPlus } from 'react-icons/fa6'
import { toast } from 'react-hot-toast'
import { AddCustomizationSchema } from '@/schema/CustomizationSchema'

const AddCustomizationModal = ({ isAddCustomizationModalOpen, setIsAddCustomizationModalOpen, setValue1, getValues1, currentIndex }) => {
    const form = useForm({
        resolver: zodResolver(AddCustomizationSchema),
        defaultValues: {
            customizationName: "",
            price: "",
        }
    })

    const [customizations, setCustomizations] = useState([]);
    const { register, control, watch, setValue, trigger, getValues, reset, handleSubmit } = form;

    const onSubmit = (data) => {
        console.log("data", data);
        setCustomizations(prev => [
            ...prev,
            { name: data.customizationName, price: data.price }
        ]);
        reset();
    }

    const validateAndSubmit = async () => {
        // Validate form fields manually
        const isValid = await trigger(); // Triggers validation for all fields
        if (isValid) {
            const values = getValues(); // Retrieve validated form values
            console.log("Form Data:", values);
        } else {
            console.log("Validation Failed");
        }
    };

    const sendArray = () => {
        if (customizations.length === 0) {
            toast.error("At least add one customization")
            return;
        }

        const customization = getValues1("customizations");
        console.log("customization present", customization[currentIndex].customizationOptions);
        if (customization[currentIndex].customizationOptions) {
            customizations.forEach((element) => {
                customization[currentIndex].customizationOptions.push(element);
            });
        }
        else {
            customization[currentIndex].customizationOptions = customizations
        }

        console.log("Final Customizations Array", customization[currentIndex].customizationOptions);
        setIsAddCustomizationModalOpen(false);
    }

    return (
        <Sheet className="" open={isAddCustomizationModalOpen} onOpenChange={setIsAddCustomizationModalOpen}>
            <SheetContent className="sm:w-1/2 p-0 overflow-y-auto h-full">
                <SheetHeader>
                    <SheetTitle className="text-2xl border-b p-5 sticky z-30 flex justify-between items-center gap-4 top-0 bg-white">
                        <div className='flex items-center gap-4'>
                            <FaArrowLeft onClick={() => setIsAddCustomizationModalOpen(false)} className="text-2xl cursor-pointer" />
                            Customization
                        </div>
                    </SheetTitle>
                    <SheetDescription>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                                <div className="mb-16 h-full">
                                    <div className="py-6 px-5">
                                        <div className='w-full grid grid-cols-[1fr_1fr_10%] items-end gap-5 border p-4 rounded-md'>
                                            <FormField
                                                control={control}
                                                name="customizationName"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Customization Name</FormLabel>
                                                        <FormControl className="">
                                                            <Input placeholder="Customization Name"  {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={control}
                                                name="price"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Price (In Rs)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Price (In Rs)"  {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit" variant="capsico">
                                                Add
                                            </Button>
                                        </div>
                                        {customizations.length > 0 &&
                                            <>
                                                <div className="grid grid-cols-[70%_28%] gap-[2%] mt-10 border-b border-[#DADADA] pb-2">
                                                    <h4 className="font-inter text-[#969696] font-semibold">Customization Name</h4>
                                                    <h4 className="font-inter text-[#969696] font-semibold">Price (In Rs)</h4>
                                                </div>
                                                {customizations.map((item, i) => (
                                                    <div key={i} className="grid grid-cols-[70%_28%] gap-[2%] border-b border-[#DADADA] py-2">
                                                        <h4 className="font-inter text-[#969696] font-semibold">{item?.name}</h4>
                                                        <h4 className="font-inter text-[#969696] font-semibold">Rs {item?.price}</h4>
                                                    </div>
                                                ))}
                                            </>}
                                    </div>
                                </div>

                                <div className="flex gap-2 fixed right-0 bottom-0 w-1/2 bg-white p-4 shadow-3xl">
                                    <Button onClick={sendArray} type="button" size="lg" variant="capsico" className="w-full class-base2">Submit</Button>
                                </div>
                            </form>
                        </Form>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default AddCustomizationModal