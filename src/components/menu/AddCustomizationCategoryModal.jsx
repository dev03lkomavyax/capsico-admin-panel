import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { AddCustomizationCategorySchema } from '@/schema/CustomizationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa6'

const AddCustomizationCategoryModal = ({ isCustomizationModalOpen, setIsCustomizationModalOpen, setValue, getValues }) => {

    const form = useForm({
        resolver: zodResolver(AddCustomizationCategorySchema),
        defaultValues: {
            categoryName: "",
            customizationType: "",
        }
    })


    const { register, control, watch } = form;
    console.log("type", watch("type"));

    const onSubmit = (data) => {
        console.log("data", data);

        console.log("getValues", getValues("customizations"));
        const array = getValues("customizations");
        setValue("customizations", [...array, data])

        setIsCustomizationModalOpen(false);
    }

    return (
        <Sheet className="" open={isCustomizationModalOpen} onOpenChange={setIsCustomizationModalOpen}>
            <SheetContent className="sm:w-1/2 p-0 overflow-y-auto h-full">
                <SheetHeader>
                    <SheetTitle className="text-2xl border-b p-5 sticky z-30 flex items-center gap-4 top-0 bg-white">
                        <FaArrowLeft onClick={() => setIsCustomizationModalOpen(false)} className="text-2xl cursor-pointer" />
                        Add Customization Category
                    </SheetTitle>
                    <SheetDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                <div className="mb-16 h-full">
                                    <div className="py-6 px-5">
                                        <div className='w-full mt-5'>
                                            <FormField
                                                control={control}
                                                name="categoryName"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Category Name</FormLabel>
                                                        <FormControl className="">
                                                            <Input placeholder="Category Name"  {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='w-full mt-5'>
                                            <FormField
                                                control={control}
                                                name="customizationType"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Customization Type</FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <SelectTrigger className="flex justify-between items-center w-full h-10 text-[#1D1929] text-sm font-normal font-sans border-[#E9E9EA] border-[1px] rounded-lg">
                                                                    <SelectValue placeholder="Select Customization Type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="multiple">Multiple</SelectItem>
                                                                        <SelectItem value="single">Single</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 fixed right-0 bottom-0 w-1/2 bg-white p-4 shadow-3xl">
                                    <Button size="lg" variant="capsico" className="w-full class-base2">Add</Button>
                                </div>
                            </form>
                        </Form>


                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default AddCustomizationCategoryModal