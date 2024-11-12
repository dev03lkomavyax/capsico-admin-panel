import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { editProfileSchema } from '@/schema/vendorSchema'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import BankDetails from '@/components/vendor/BankDetails'
import ContactInfo from '@/components/vendor/ContactInfo'

function VendorEditProfile() {

    const [pageNumber, setpageNumber] = useState(3)

    const form = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            businessName: "",
            foodCategory: "",
            title: "",
            businessAddress: "",
            streetAddress: "",
            city: "",
            state: "",
            pincode: "",
            // businessName: "",
            // businessName: "",
            // businessName: "",
            // businessName: "",
            // businessName: "",
        }
    })

    const onSubmit = (data) => {
        console.log("data:", data)
        form.reset({
            businessName: "",
            foodCategory: "",
            title: "",
            businessAddress: "",
            streetAddress: "",
            city: "",
            state: "",
            pincode: "",
        })
    }

    return (
        <section className='border-[1px] bg-[#E0E2E7] px-16 py-10 w-full'>
            <div className='flex justify-between items-center mb-8'>
                <div className='flex justify-start items-center'>
                    <MdKeyboardArrowLeft className='text-[#000000] text-4xl' />
                    <h2 className='text-[#000000] text-xl font-medium font-roboto'>Vendor</h2>
                </div>
            </div>
            <div className='w-full'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full">
                        {pageNumber === 1 && <div className='bg-[#FFFFFF] rounded-lg p-4 w-full space-y-5'>
                            <h3 className='text-[#000000] text-sm font-medium font-dm'>Business Information</h3>
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Business Name" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                    control={form.control}
                                    name="foodCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='border-[1px] border-[#B9B9B9] rounded-lg bg-[#FCFCFC] text-[#000000] text-sm font-medium font-dm h-12'>
                                                        <SelectValue placeholder="Primary Food Category (Others)" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Title" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Business Address"
                                                className="resize-none border-[1px] border-[#B9B9B9] rounded-lg h-[120px] bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Street Address"
                                                className="resize-none border-[1px] border-[#B9B9B9] rounded-lg h-[120px] bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='w-full grid grid-cols-2 gap-8'>
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='border-[1px] border-[#B9B9B9] rounded-lg bg-[#FCFCFC] text-[#000000] text-sm font-medium font-dm h-12'>
                                                        <SelectValue placeholder="City" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='border-[1px] border-[#B9B9B9] rounded-lg bg-[#FCFCFC] text-[#000000] text-sm font-medium font-dm h-12'>
                                                        <SelectValue placeholder="State" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Pincode" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>}
                        {pageNumber === 2 && <ContactInfo form={form}/>}
                        {pageNumber === 3 && <BankDetails form={form}/>}
                        <div className='flex justify-end gap-6'>
                            <button onClick={()=> setpageNumber(pageNumber-1)} className='border-[1px] border-[#ABABAB] rounded-lg h-12 w-28 text-[#ABABAB] text-base font-medium font-dm bg-[#FFFFFF] hover:bg-[#f7f7f7]'>Previous</button>
                            <button onClick={()=> setpageNumber(pageNumber+1)} className='border-[1px] border-[#1064FD] rounded-lg h-12 w-28 text-[#FFFFFF] text-base font-medium font-dm bg-[#1064FD] hover:bg-[#1063fde5]'>Next</button>
                            {pageNumber === 4 && <button className='border-[1px] border-[#1064FD] rounded-lg h-12 w-28 text-[#FFFFFF] text-base font-medium font-dm bg-[#1064FD] hover:bg-[#1063fde5]'>Next</button>}
                        </div>
                        {/* <Button type="submit">Submit</Button> */}
                    </form>
                </Form>
            </div>
        </section>
    )
}

export default VendorEditProfile