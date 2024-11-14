import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

function BankDetails({form}) {
    return (
        <div className='bg-[#FFFFFF] rounded-lg pt-5 pb-16 px-5 w-full space-y-5'>
            <h3 className='text-[#000000] text-sm font-medium font-dm'>Bank Details (For Payments)</h3>
            <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Bank Name" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="branchAddress"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Branch Address" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Account Number" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="ifscCode" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default BankDetails