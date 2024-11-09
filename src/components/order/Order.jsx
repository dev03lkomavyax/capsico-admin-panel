import React, { useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { TableCell, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const Order = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <TableRow>
            <TableCell className='w-10'>{<Checkbox className='border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6' />}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data.orderID}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-bold font-roboto">{data.order}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">{data.customer}</TableCell>
            <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">{data.createdDate}</TableCell>
            <TableCell className="text-[#667085] text-[9px] font-normal font-inter">{data.restaurantName}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-bold font-sans">{data.price}</TableCell>
            <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
                <Popover open={open} onOpenChange={() => setOpen(!open)}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-24 h-8 px-2 justify-between text-[#003CFF]"
                        >
                            {value
                                ? frameworks.find((framework) => framework.value === value)?.label
                                : "Select"}
                            <ChevronsUpDown className="opacity-50 text-[#003CFF]" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search Name" className="h-9" />
                            <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                    {frameworks.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                // setOpen(false)
                                            }}
                                            className="flex justify-between items-center"
                                        >
                                            <div className="flex gap-2 items-center">
                                                <img className='w-6 h-6 rounded-full bg-blue-200' src="" alt="" />
                                                <h3 className='text-[10px]'>Corey Gislason</h3>
                                            </div>
                                            <p className='font-semibold text-[10px] text-[#003CFF]'>Available Now</p>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableRow>
    )
}

export default Order