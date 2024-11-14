import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

function ProductInfo({form}) {
    return (
        <div className='space-y-6'>
            <div className='bg-[#FFFFFF] rounded-lg px-5 pt-5 pb-12 w-full space-y-5'>
                <h3 className='text-[#000000] text-sm font-medium font-dm'>Product Information</h3>
                <FormField
                    control={form.control}
                    name="productTitle"
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
                    name="productRangeDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#000000] text-sm font-medium font-dm">Product Range Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Brief description of your product offerings" className='resize-none border-[1px] border-[#B9B9B9] rounded-lg h-[120px] bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
            <div className='bg-[#FFFFFF] rounded-lg px-5 pt-5 pb-12 w-full space-y-5'>
                <h3 className='text-[#000000] text-sm font-medium font-dm'>Additional Information </h3>
                <FormField
                    control={form.control}
                    name="deliveryRadius"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="number" placeholder="Delivery Radius (in KM)" className='border-[1px] border-[#B9B9B9] rounded-lg h-12 bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#000000] text-sm font-medium font-dm">Any Other Information (Special Requests/Requirements)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" className='resize-none border-[1px] border-[#B9B9B9] rounded-lg h-[120px] bg-[#FCFCFC] placeholder:text-[#000000] text-sm font-medium font-dm' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

export default ProductInfo