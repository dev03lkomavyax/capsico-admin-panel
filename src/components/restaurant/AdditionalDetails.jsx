import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FaMinus } from "react-icons/fa6";

function AdditionalDetails() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='px-10 py-8 border-b-[1px] border-b-[#C8C8C8]'>
            <div>
                <div className='flex justify-between w-full'>
                    <h3 className='text-[#000000] text-xl font-semibold font-inter mb-2'>Additional Details</h3>
                    {isOpen === false ?
                        <FiPlus onClick={() => setIsOpen(!isOpen)} className='text-3xl cursor-pointer' />
                        : <FaMinus onClick={() => setIsOpen(!isOpen)} className='text-3xl cursor-pointer' />
                    }
                </div>
                <p className='text-[#676767] text-base font-normal font-inter mb-4'>Add tags for better search optimization</p>
            </div>
            {isOpen &&
                <div className='border-[1px] border-[#A8A8A8] rounded-lg px-5 pt-5 pb-16 space-y-10'>
                    <div className='space-y-4'>
                        <h3 className='text-[#000000] text-xl font-semibold font-inter'>Tags</h3>
                        <div className=' space-x-3'>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg w-[138px] h-[38px] text-[#434343] text-sm font-normal font-inter'>Chef’s special</button>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg w-[138px] h-[38px] text-[#434343] text-sm font-normal font-inter'>Chef’s special</button>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg w-[138px] h-[38px] text-[#434343] text-sm font-normal font-inter'>Chef’s special</button>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg w-[138px] h-[38px] text-[#434343] text-sm font-normal font-inter'>Chef’s special</button>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <h3 className='text-[#000000] text-xl font-semibold font-inter'>Spice Levels</h3>
                        <div className=' space-x-3'>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg w-[138px] h-[38px] text-[#434343] text-sm font-normal font-inter'>Medium spicy</button>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg w-[138px] h-[38px] text-[#434343] text-sm font-normal font-inter'>Very spicy</button>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <h3 className='text-[#000000] text-xl font-semibold font-inter'>Frosting</h3>
                        <div className=' space-x-3'>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg w-[138px] h-[38px] text-[#434343] text-sm font-normal font-inter'>Freshly Frosted</button>
                            <button className='border-[1px] border-[#B6B6B6] rounded-lg w-[138px] h-[38px] text-[#434343] text-sm font-normal font-inter'>Pre- Frosted</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdditionalDetails