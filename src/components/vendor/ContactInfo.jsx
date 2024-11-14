import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

function ContactInfo({form}) {
  return (
    <div className='space-y-6'>
        <div className='bg-[#FFFFFF] rounded-lg px-5 pt-5 pb-12 w-full space-y-5'>
            <h3 className='text-[#000000] text-sm font-medium font-dm'>Contact Information</h3>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="email" placeholder="Email Address" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="number" placeholder="Phone Number" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
        </div>
        <div className='bg-[#FFFFFF] rounded-lg px-5 pt-5 pb-12 w-full space-y-5'>
            <h3 className='text-[#000000] text-sm font-medium font-dm'>Store Details</h3>
            <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="GSTIN (if applicable)" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="fssaiLicense"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="FSSAI License (for Food & Grocery)" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="panNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="PAN Number" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="numberOfEmployees"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="number" placeholder="Number of Employees" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="yearsOfOperation"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="number" placeholder="Years of Operation" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </div>
  )
}

export default ContactInfo