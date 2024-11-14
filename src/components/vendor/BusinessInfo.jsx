import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'


function BusinessInfo({ form }) {
    return (
        <div className='bg-[#FFFFFF] rounded-lg px-5 py-5 w-full space-y-5'>
            <h3 className='text-[#000000] text-sm font-medium font-dm'>Business Information</h3>
            <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Business Name" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
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
                            <Input type="text" placeholder="Title" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
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
                            <Input type="number" placeholder="Pincode" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default BusinessInfo