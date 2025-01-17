import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa6'
import { z } from 'zod'

const CreateVariantModel = ({ setValue, getValues, isVariantModalOpen, setIsVariantModalOpen }) => {
    const AddonSchema = z.object({
        name: z.string().min(3, "Minium 3 char is required").max(50, "Name cannot exceed 50 characters"),
        price: z
            .string()
            .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0, "Price must be a valid number and greater than or equal to 0"),
        isDefault: z.boolean().optional(),
    });

    const form = useForm({
        resolver: zodResolver(AddonSchema),
        defaultValues: {
            name: "",
            price: "",
            isDefault: false,
        }
    })
    const { register, handleSubmit, formState: { errors }, reset, control } = form;

    const onsubmit = (data) => {
        console.log("data ", data)
        const prev = getValues("variations");
        setValue("variations", [...prev, data])
        form.reset()
        setIsVariantModalOpen(false);
    }
    
    return (
        <Sheet open={isVariantModalOpen} onOpenChange={setIsVariantModalOpen}>
            <SheetContent className="h-full max-w-[770px] w-full">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col justify-between h-full'>
                        <div>
                            <h2 className='text-[#000000] text-2xl font-semibold font-inter'>Create variants</h2>
                            <div className="grid gap-6 py-4">
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="z-20">
                                            <FormLabel className='text-[#969696] text-base font-medium font-inter'>Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" className='border-[1.5px] border-[#B6B6B6] rounded-lg'   {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem className="z-20">
                                            <FormLabel className='text-[#969696] text-base font-medium font-inter'>Price ( In Rs)</FormLabel>
                                            <FormControl>
                                                <Input type="number" className='border-[1.5px] border-[#B6B6B6] rounded-lg'  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="isDefault"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(!!checked)}
                                                    className='mt-2'
                                                />
                                            </FormControl>
                                            <FormLabel className='text-[#969696] text-base font-medium font-inter'>Set as Default</FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <Button type="submit" size="lg" variant="capsico" className="w-full class-base2">Add Variant</Button>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default CreateVariantModel