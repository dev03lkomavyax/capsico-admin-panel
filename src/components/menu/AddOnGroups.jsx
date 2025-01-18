import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import Dips from "@/assets/Dips.webp";
import ExtraCheese from "@/assets/ExtraCheese.webp";
import Sauces from "@/assets/Sauces.webp";
import Toppings from "@/assets/Toppings.webp";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { stepsData } from "@/data/steps";
import { useEffect, useState } from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaArrowLeft, FaCirclePlus, FaPlus, FaXmark } from "react-icons/fa6";
import AddOn from "./AddOn";
import ExistingItem from "./ExistingItem";
import Step from "./Step";
// Please add at least 1 addon item.

const AddOnGroups = ({ isAddonGroupsModalOpen, setIsAddonGroupsModalOpen }) => {
    const [isAddOnGroups, setIsAddOnGroups] = useState(false);
    const [isAddFromExistingMenu, setIsAddFromExistingMenu] = useState(false);
    const [addOnsArray, setAddOnsArray] = useState([]);

    const handleAddOns = () => {
        setAddOnsArray([...addOnsArray, "*"]);
    }

    const handlePropertyRemove = (index) => {
        const filtered = addOnsArray.filter((_, i) => i !== index);
        setAddOnsArray(filtered);
    }

    const schema = z.object({
        groupName: z.string().min(1, "Group Name is required"),
        minSelection: z.string().min(1, "Min selection is required"),
        maxSelection: z.string().optional(),
        isCompulsory: z.boolean(),
        isSelectMultiple: z.boolean(),
        maximumQuantity: z.string().optional(),
    });


    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            groupName: "",
            minSelection: "",
            maxSelection: "",
            isCompulsory: false,
            isSelectMultiple: false,
            maximumQuantity: "",
            foodType: "veg",
        }
    })
    const { register, control, watch, setValue, getValues, setError, clearErrors } = form;

    const selectedItems = useFieldArray({
        control,
        name: "selectedItems"
    });

    const onSubmit = (data) => {
        console.log("data", data);
        setIsAddonGroupsModalOpen(false);
    }

    useEffect(() => {
        const minSelection = watch("minSelection");
        const maxSelection = watch("maxSelection");

        if (minSelection > maxSelection) {
            setError("minSelection", {
                type: "manual",
                message: "Min selection cannot be greater than max selection"
            });
        } else {
            clearErrors("minSelection");
        }
    }, [watch("minSelection"), watch("maxSelection")]);


    return (
        <Sheet className="" open={isAddonGroupsModalOpen} onOpenChange={setIsAddonGroupsModalOpen}>
            <SheetContent className="sm:w-1/2 p-0 overflow-y-auto">
                <SheetHeader>
                    {!isAddFromExistingMenu && <>
                        {!isAddOnGroups &&
                            <div className="px-5 py-6 sticky z-30 top-0 bg-white border-b">
                                <SheetTitle className="flex justify-between">
                                    <h2 className="text-2xl">Add on groups</h2>
                                    <X onClick={() => setIsAddonGroupsModalOpen(false)} className="h-6 w-6 cursor-pointer" />
                                </SheetTitle>
                                <p className="class-sm4 w-[70%] fourteen-color mt-1">Add on groups enhance the customer experience by offering extra choices like toppings or desserts</p>
                            </div>
                        }
                        {isAddOnGroups && <SheetTitle className="text-2xl border-b p-5 sticky z-30 flex items-center gap-4 top-0 bg-white">
                            <FaArrowLeft onClick={() => setIsAddOnGroups(false)} className="text-2xl cursor-pointer" />
                            Create add on group
                        </SheetTitle>
                        }
                    </>}

                    {isAddFromExistingMenu && <SheetTitle className="text-2xl border-b p-5 sticky z-30 flex items-center justify-between gap-4 top-0 bg-white">
                        Select items
                        <FaXmark onClick={() => setIsAddFromExistingMenu(false)} className="text-2xl cursor-pointer" />
                    </SheetTitle>}

                    <SheetDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                {!isAddFromExistingMenu ?
                                    <>
                                        {!isAddOnGroups && <div className="mb-16 p-5">
                                            <div className="flex flex-col gap-5">
                                                {stepsData.map((step, index) => (
                                                    <Step
                                                        key={index}
                                                        imgSrc={step.imgSrc}
                                                        imgAlt={step.imgAlt}
                                                        heading={step.heading}
                                                        description={step.description}
                                                    />
                                                ))}
                                            </div>
                                            <h2 className="class-lg6 text-black mt-8">Examples of an add on groups</h2>
                                            <div className="flex gap-7 mt-4">
                                                <div>
                                                    <img className="w-[70px] h-[70px] object-contain" src={Dips} alt="" />
                                                    <h4 className="class-sm4 mt-1">Dips</h4>
                                                </div>
                                                <div>
                                                    <img className="w-[70px] h-[70px] object-contain" src={Sauces} alt="" />
                                                    <h4 className="class-sm4 mt-1">Sauces</h4>
                                                </div>
                                                <div>
                                                    <img className="w-[70px] h-[70px] object-contain" src={Toppings} alt="" />
                                                    <h4 className="class-sm4 mt-1">Toppings</h4>
                                                </div>
                                                <div>
                                                    <img className="w-[70px] h-[70px] object-contain" src={ExtraCheese} alt="" />
                                                    <h4 className="class-sm4 mt-1">Extra Cheese</h4>
                                                </div>
                                            </div>

                                            <div onClick={() => setIsAddOnGroups(true)} className='border mt-14 cursor-pointer border-dashed border-[#1AA1F1] bg-[#1aa6f10c] w-full h-36 flex flex-col justify-center items-center rounded-md'>
                                                <FaCirclePlus className="primary-color" size={25} />
                                                <p className='font-semibold text-center primary-color class-base2 mt-3'>Create a new variant</p>
                                            </div>
                                        </div>}
                                        {isAddOnGroups &&
                                            <div>
                                                <div className="mb-28 p-5 mt-3">
                                                    <div className="w-full">
                                                        <FormField
                                                            control={control}
                                                            name="groupName"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Group Name</FormLabel>
                                                                    <FormControl>
                                                                        <FormControl>
                                                                            <Input placeholder="Enter group name"  {...field} />
                                                                        </FormControl>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="rounded-lg border mt-6">
                                                        <div>
                                                            <div className="rounded-t-lg bg-[#F8F9FC] p-4">
                                                                <FormField
                                                                    control={control}
                                                                    name="isCompulsory"
                                                                    render={({ field }) => (
                                                                        <FormItem className="flex gap-3 items-center">
                                                                            <FormControl>
                                                                                <div className="flex justify-between items-center w-full">
                                                                                    <FormLabel>Customer selection is compulsory</FormLabel>
                                                                                    <Switch
                                                                                        className="data-[state=checked]:bg-[#1AA6F1]"
                                                                                        checked={field.value}
                                                                                        onCheckedChange={field.onChange}
                                                                                    />
                                                                                </div>
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="w-full grid grid-cols-2 gap-3 p-3">
                                                                <FormField
                                                                    control={control}
                                                                    name="minSelection"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Min Selection</FormLabel>
                                                                            <FormControl>
                                                                                <FormControl>
                                                                                    <Input type="number" {...field} />
                                                                                </FormControl>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={control}
                                                                    name="maxSelection"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Max Selection</FormLabel>
                                                                            <FormControl>
                                                                                <Input type="number" {...field} />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="border-t mt-4">
                                                                <div className="p-3">
                                                                    {/* <h4 className="class-sm4 seven-color">Allow selecting multiple units of same item</h4> */}
                                                                    <FormField
                                                                        control={control}
                                                                        name="isSelectMultiple"
                                                                        render={({ field }) => (
                                                                            <FormItem className="flex gap-3 items-center">
                                                                                <FormControl className="w-full">
                                                                                    <div className="flex justify-between items-center w-full">
                                                                                        <FormLabel>Allow selecting multiple units of same item</FormLabel>
                                                                                        <Switch
                                                                                            className="data-[state=checked]:bg-[#1AA6F1]"
                                                                                            checked={field.value}
                                                                                            onCheckedChange={field.onChange}
                                                                                        />
                                                                                    </div>
                                                                                </FormControl>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="w-full p-3">
                                                                    <FormField
                                                                        control={control}
                                                                        name="maximumQuantity"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <FormControl className="w-full">
                                                                                    <div className="flex justify-between items-center w-full">
                                                                                        <FormLabel>Maximum quantity per item</FormLabel>
                                                                                        <Input disabled={!watch("isSelectMultiple")} className="w-[20%]" type="number" {...field} />
                                                                                    </div>
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3 mt-6">
                                                        <Button onClick={() => setIsAddFromExistingMenu(true)} type="button" size="lg" variant="outline" className="w-full class-sm2 border-[#1AA6F1] hover:bg-[#1aa6f10c] primary-color hover:text-[#1AA6F1] flex gap-2 justify-start py-6 items-center">
                                                            <BiSolidFoodMenu className="text-2xl" />
                                                            Select existing item from menu
                                                        </Button>
                                                        <Button onClick={handleAddOns} type="button" size="lg" variant="outline" className="w-full class-sm2 border-[#1AA6F1] hover:bg-[#1aa6f10c] primary-color hover:text-[#1AA6F1] flex gap-2 justify-start py-6 items-center">
                                                            <FaPlus />
                                                            Create new add on
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col gap-3 mt-5">
                                                        {addOnsArray.map((item, index) => (
                                                            <AddOn
                                                                key={index}
                                                                control={control}
                                                                handlePropertyRemove={handlePropertyRemove}
                                                                index={index}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 fixed right-0 bottom-0 w-1/2 bg-white p-4 shadow-3xl">
                                                    <Button type="submit" size="lg" variant="capsico" className="w-full class-base2">Create Group</Button>
                                                </div>
                                            </div>
                                        }
                                    </>
                                    :
                                    <div>
                                        <ExistingItem
                                            title="combos"
                                            control={control}
                                            selectedItems={selectedItems}
                                        />
                                    </div>
                                }
                            </form>
                        </Form>


                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default AddOnGroups