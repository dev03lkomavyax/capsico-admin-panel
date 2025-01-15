import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const Field = ({ name, placeholder, control, title, type, }) => {
    return (
        <FormField
            control={control}
            name={`${name}`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={`text-[#202224] text-lg font-semibold font-nunito opacity-80`}>{title}</FormLabel>
                    <FormControl>
                        <Input type={`${type}`} placeholder={`${placeholder}`} className={`h-[56px] placeholder:text-[#A6A6A6] text-lg font-semibold font-nunito border-[1px] border-[#D8D8D8] bg-[#F1F4F9] rounded-lg mt-4`} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default Field