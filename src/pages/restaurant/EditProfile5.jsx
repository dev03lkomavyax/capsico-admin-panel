import { Button } from '@/components/ui/button'
import { EditProfileSchema5 } from '@/schema/restaurantSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MdOutlineFileUpload } from 'react-icons/md'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updatePreview } from '@/utils/updatePreview'
import { useEffect } from 'react'

const EditProfile5 = ({ setPage }) => {
    const form = useForm({
        resolver: zodResolver(EditProfileSchema5),
        defaultValues: {
            panNumber: "",
            nameOnPan: "",
            address: "",
            panImage: "",
            FSSAICertificateNumber: "",
            FSSAIExpiryDate: "",
            fssaiImage: "",
            bankAccountNumber: "",
            reEnterAccountNumber: "",
            accountType: "",
            IFSCCode: "",
        }
    })

    const { register, control, watch, setValue, getValues } = form;

    const panImageRef = register("panImage");
    const fssaiImageRef = register("fssaiImage");

    const panImage = watch("panImage");
    const fssaiImage = watch("panImage");


    useEffect(() => {
        updatePreview(panImage, "panImagePreview", setValue);
        updatePreview(fssaiImage, "fssaiPreview", setValue);
    }, [form, panImage, fssaiImage, setValue]);

    const onSubmit = (data) => {
        console.log("data", data);
        setPage((prev) => prev + 1);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-5">
                <div>
                    <div className='border border-[#C2CDD6] rounded-md px-8 py-6'>
                        <h3 className='text-lg font-bold text-[#4A5E6D]'>Upload Legal Documents</h3>
                        {/* <p className='text-xs font-semibold text-[#ABABAB]'>Update delivery timings and menu for online ordering</p> */}
                        <div className="px-4 py-3 border border-[#AB8C2A] text-[#947A28] rounded-lg mt-4 bg-[#FFFCF6]">
                            A mistake in this section can lead to delays in onboarding process.Please follow all instructions
                            very carefullly.
                        </div>
                        <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-7'>
                            <h3 className='text-lg font-bold text-[#4A5E6D]'>PAN details</h3>
                            <div className='flex justify-between gap-2'>
                                <p className='text-xs font-semibold text-[#ABABAB]'>We will verify the legal entity with this information.</p>
                                <p className='text-xs font-semibold text-[#93A5C9]'>Important guideliness</p>
                            </div>

                            <div className='mt-5 flex flex-col gap-8'>
                                <div className='grid grid-cols-2 gap-5'>
                                    <FormField
                                        control={control}
                                        name="panNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="PAN number of legally entity" className="placeholder:text-[#667085] w-full placeholder:font-inter" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name="nameOnPan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name on PAN card" className="placeholder:text-[#667085] w-full placeholder:font-inter" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Complete address of the legal entity" className="placeholder:text-[#667085] w-full placeholder:font-inter" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="panImage"
                                    render={({ field }) => (
                                        <FormItem className="z-20">
                                            <FormLabel className="cursor-pointer  left-0 w-full h-full top-0">
                                                {!watch("panImagePreview") &&
                                                    <div className='border border-[#C2C2C2] bg-[#EDEDED] text-[#7C7C7C] w-full px-3 py-[10px] flex gap-2 items-center justify-center rounded-md'>
                                                        <MdOutlineFileUpload size={20} />
                                                        <span>Upload PAN</span>
                                                    </div>
                                                }
                                                {watch("panImagePreview") &&
                                                    <div className='border border-[#C2C2C2] bg-[#EDEDED] text-[#7C7C7C] w-full px-3 py-[10px] flex gap-2 items-center justify-center rounded-md'>
                                                        {watch("panImage")[0]?.name}
                                                    </div>
                                                }
                                            </FormLabel>
                                            <FormControl className="hidden">
                                                <Input multiple="true" type="file" accept='.png,.jpeg,.jpg' {...panImageRef} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-7'>
                        <h3 className='text-lg font-bold text-[#4A5E6D]'>FSSAI certificate</h3>
                        <div className='flex justify-between gap-2'>
                            <p className='text-xs font-semibold text-[#ABABAB]'>This is required to comply with regulationson food safety</p>
                            <p className='text-xs font-semibold text-[#93A5C9]'>Important guideliness</p>
                        </div>
                        <div className='mt-5 flex flex-col'>
                            <FormField
                                control={control}
                                name="FSSAICertificateNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input placeholder="FSSAI certificate number" className="placeholder:text-[#667085] w-full placeholder:font-inter" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='grid grid-cols-2 gap-5 mt-8'>
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
                                                                "w-full pl-3 text-left font-normal hover:bg-transparent",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
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
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
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
                                                {!watch("fssaiImagePreview") &&
                                                    <div className='border border-[#789AC6] bg-[#F4F9FC] text-[#789AC6] w-full px-3 py-[10px] flex gap-2 items-center justify-center rounded-md'>
                                                        <MdOutlineFileUpload size={20} />
                                                        <span>Upload FSSA certificate</span>
                                                    </div>
                                                }
                                                {watch("fssaiImagePreview") &&
                                                    <div className='border border-[#789AC6] bg-[#F4F9FC] text-[#789AC6] w-full px-3 py-[10px] flex gap-2 items-center justify-center rounded-md'>
                                                        {watch("fssaiImage")[0]?.name}
                                                    </div>
                                                }
                                            </FormLabel>
                                            <FormControl className="hidden">
                                                <Input multiple="true" type="file" accept='.png,.jpeg,.jpg' {...fssaiImageRef} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <p className='text-sm mt-5'>Haven’t applied for FSSAI certificate yet?<button className='text-[#5A7DC2] font-inter font-semibold'>Apply here</button></p>

                            <div className='px-3 py-2 text-xs mt-3 bg-[#EADBB1] rounded text-[#786224] border border-[#7D704C]'>
                                <span className='font-semibold'>Note:</span>As per government guidelines,food businesses cannot operate and receive online
                                orders based on a FSSAI Application starting 1st jul 2021.If you have applied for a FSSAI
                                license or registration,please come back to this page once it gets approved.Details fixed
                                till now will be auto-saved.
                            </div>
                        </div>
                    </div>

                    <div className='border border-[#C2CDD6] rounded-md px-8 py-6 mt-7'>
                        <h3 className='text-lg font-bold font-inter text-[#4A5E6D]'>Account details</h3>
                        <div className='flex justify-between gap-2'>
                            <p className='text-xs font-semibold text-[#ABABAB]'>We will verify the legal entity with this information.</p>
                            <p className='text-xs font-semibold text-[#93A5C9]'>Important guideliness</p>
                        </div>
                        <div className='mt-5 flex flex-col gap-8'>
                            <div className='grid grid-cols-2 gap-5'>
                                <FormField
                                    control={control}
                                    name="bankAccountNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Bank account number" className="placeholder:text-[#667085] w-full placeholder:font-inter" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="reEnterAccountNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Re-enter account number" className="placeholder:text-[#667085] w-full placeholder:font-inter" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-5'>
                                <FormField
                                    control={control}
                                    name="accountType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="text-[#667085]">
                                                        <SelectValue placeholder="Select account type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="type1">Type1</SelectItem>
                                                        <SelectItem value="type2">Type2</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
                                                <Input placeholder="Bank IFSC code" className="placeholder:text-[#667085] w-full placeholder:font-inter" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <button type='button' className='border border-[#BBBBBB] bg-[#EFEFEF] text-[#A5A5A5] w-full px-3 py-[10px] flex gap-2 items-center justify-center rounded-md'>
                                    Verify account details
                                </button>
                            </div>
                        </div>
                        <p className='text-[#858585] mt-1 text-xs'>We will credit 1 in your account to validate your bank account details</p>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-10">
                    <Button size="lg" className="w-20" type="submit">Done</Button>
                </div>
            </form>
        </Form>
    )
}

export default EditProfile5