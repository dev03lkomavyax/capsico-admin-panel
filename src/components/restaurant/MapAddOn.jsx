import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FaMinus } from "react-icons/fa6";

function MapAddOn() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='px-10 py-8 border-b-[1px] border-b-[#C8C8C8]'>
            <div>
                <div className='flex justify-between w-full'>
                    <h3 className='text-[#000000] text-xl font-semibold font-inter mb-2'>Map Addons</h3>
                    {isOpen === false ?
                        <FiPlus onClick={() => setIsOpen(!isOpen)} className='text-3xl cursor-pointer' />
                        : <FaMinus onClick={() => setIsOpen(!isOpen)} className='text-3xl cursor-pointer' />
                    }
                </div>
                <p className='text-[#676767] text-base font-normal font-inter mb-4'>Add-ons enhance the customer experience by offering extra choices like toppings or desserts.</p>
            </div>
            {isOpen &&
                <div className='bg-[#F7FAFF] rounded-lg p-7 mt-10'>
                    <p className='text-[#4A67FF] text-xl font-semibold font-inter'>+ Create new Add on group</p>
                </div>
            }
        </div>
    )
}

export default MapAddOn