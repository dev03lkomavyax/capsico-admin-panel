import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FaMinus } from "react-icons/fa6";

function MapAddOn() {
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
                <div className='bg-[#F8F9FC] rounded-lg pt-5 pb-10 px-4 space-y-11'>
                    <div className='flex gap-5'>
                        <div className='bg-[#FFFFFF] rounded-lg px-5 py-6 space-y-4 w-[400px]'>
                            <h6 className='text-[#000000] text-xl font-semibold font-inter'>Size</h6>
                            <p className='text-[#585858] text-base font-normal font-inter'>E.g. Small, Medium, Large</p>
                            <p className='text-[#4A67FF] text-xl font-semibold font-inter'>Add property</p>
                        </div>
                        <div className='bg-[#FFFFFF] rounded-lg px-5 py-6 space-y-4 w-[400px]'>
                            <h6 className='text-[#000000] text-xl font-semibold font-inter'>Quantity</h6>
                            <p className='text-[#585858] text-base font-normal font-inter'>E.g. Quarter, Half, Full</p>
                            <p className='text-[#4A67FF] text-xl font-semibold font-inter'>Add property</p>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className='bg-[#FFFFFF] rounded-lg px-5 py-6 space-y-4 w-[400px]'>
                            <h6 className='text-[#000000] text-xl font-semibold font-inter'>Preparation Type</h6>
                            <p className='text-[#585858] text-base font-normal font-inter'>E.g. Halal, Non halal</p>
                            <p className='text-[#4A67FF] text-xl font-semibold font-inter'>Add property</p>
                        </div>
                        <div className='bg-[#FFFFFF] rounded-lg px-5 py-6 space-y-4 w-[400px]'>
                            <h6 className='text-[#000000] text-xl font-semibold font-inter'>Base</h6>
                            <p className='text-[#585858] text-base font-normal font-inter'>E.g. Thin, thick crust</p>
                            <p className='text-[#4A67FF] text-xl font-semibold font-inter'>Add property</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MapAddOn