/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdArrowRight } from 'react-icons/md';

const testArray = ["Egg Combo", "Mutton Combo"];

const ExistingItem = ({ title, control, selectedItems }) => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

    const { fields, append, remove } = selectedItems

    const handleOnChange = (item) => {
        const itemIndex = fields.findIndex((field) => field.name === item);
        if (itemIndex >= 0) {
            remove(itemIndex);
        } else {
            append({ name: item });
        }
    };

    console.log("selectedItems", fields);


    return (
        <div className="py-4 border-b">
            <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className='flex items-center px-6 justify-between w-full'>
                <h4 className='class-xl6 text-black'>{title}</h4>
                <IoIosArrowDown className={`seven-color text-xl cursor-pointer transform transition-transform duration-200 ${isCategoryOpen && "rotate-180 duration-200"}`} />
            </button>
            {isCategoryOpen &&
                <div className='mt-4'>
                    <button onClick={() => setIsSubCategoryOpen(!isSubCategoryOpen)} className='flex items-center px-6 gap-2'>
                        <MdArrowRight className={`seven-color text-xl cursor-pointer transform transition-transform duration-200 ${isSubCategoryOpen && "rotate-90 duration-200"}`} />
                        <h4 className='class-base6 text-black'>{title}</h4>
                    </button>
                    {isSubCategoryOpen &&
                        <div className='mt-4 flex flex-col gap-5'>
                            {testArray.map((item, i) => (
                                <FormField
                                    key={item}
                                    control={control}
                                    name={`${i}`}
                                    render={({ field }) => (
                                        <FormItem className="flex gap-3 items-center">
                                            <FormControl>
                                                <div className="flex justify-between hover:bg-[#1aa6f10c] px-6 pl-8 py-2 hover:text-black items-center w-full">
                                                    <FormLabel>{item}</FormLabel>
                                                    <Checkbox
                                                        checked={fields.some((field) => field.name === item)}
                                                        onCheckedChange={() => handleOnChange(item)}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    }
                </div>}
            <div className="flex gap-2 fixed right-0 bottom-0 w-1/2 bg-white p-4 shadow-3xl">
                <Button type="button" size="lg" variant="capsico" className="w-full class-base2">Add items</Button>
            </div>
        </div>
    )
}

export default ExistingItem