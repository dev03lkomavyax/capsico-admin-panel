import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FaMinus } from "react-icons/fa6";

function AdditionalDetails() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='px-10 py-8 border-b-[1px] border-b-[#C8C8C8]'>
            <div>
                <div className='flex justify-between w-full'>
                    <h3 className='text-[#000000] text-xl font-semibold font-inter mb-2'>Variants</h3>
                    {isOpen === false ?
                        <FiPlus onClick={() => setIsOpen(!isOpen)} className='text-3xl cursor-pointer' />
                        : <FaMinus onClick={() => setIsOpen(!isOpen)} className='text-3xl cursor-pointer' />
                    }
                </div>
                <p className='text-[#676767] text-base font-normal font-inter mb-4'>You can offer variations of a item, such as size/ base/ crust, etc. When customers place an order, they must choose at least one from the defined variants.</p>
            </div>
            {isOpen &&
                <div className='bg-[#F8F9FC] rounded-lg p-6 space-y-11'>
                    <div>
                        <div>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg text-[#434343] text-sm font-normal font-inter'>Vegan</button>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg text-[#434343] text-sm font-normal font-inter'>Vegan</button>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg text-[#434343] text-sm font-normal font-inter'>Vegan</button>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg text-[#434343] text-sm font-normal font-inter'>Vegan</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdditionalDetails