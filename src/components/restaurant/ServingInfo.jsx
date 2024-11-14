import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FaMinus } from "react-icons/fa6";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

function ServingInfo({form}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='px-10 py-8 border-b-[1px] border-b-[#C8C8C8]'>
            <div>
                <div className='flex justify-between w-full'>
                    <h3 className='text-[#000000] text-xl font-semibold font-inter mb-2'>Serving Info</h3>
                    {isOpen === false ?
                        <FiPlus onClick={() => setIsOpen(!isOpen)} className='text-3xl cursor-pointer' />
                        : <FaMinus onClick={() => setIsOpen(!isOpen)} className='text-3xl cursor-pointer' />
                    }
                </div>
                <p className='text-[#676767] text-base font-normal font-inter mb-4'>Add serving sizes to improve customer experience.</p>
            </div>
            {isOpen &&
                <div className='grid grid-cols-2 gap-6 w-full'>
                    <FormField
                        control={form.control}
                        name="numberofPeople"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Number of people</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Select appropriate serving info" className='min-h-[56px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] rounded-lg placeholder:text-[#969696] text-base font-normal font-inter' {...field}></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="dishSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-[#969696] text-base font-semibold font-inter'>Dish Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='min-h-[56px] border-[1px] border-[#B6B6B6] bg-[#FFFFFF] text-[#969696] text-base font-normal font-inter'>
                              <SelectValue placeholder="Enter quantity" className='rounded-lg' />
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
            }
        </div>
    )
}

export default ServingInfo