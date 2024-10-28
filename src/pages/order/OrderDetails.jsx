import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

const OrderDetails = () => {
    return (
        <div className='py-4 px-6 bg-[#F5F7FA]'>
            <div className='flex justify-between'>
                <div>
                    <div className="flex items-center gap-1">
                        <IoIosArrowBack className='text-2xl' />
                        <span className='font-inter text-lg font-medium'>Order ID #1264903 </span>
                    </div>
                    <span className='text-sm text-[#5F5F5F] font-inter'>Orders/orders details</span>
                </div>
                <Button className="text-[#167316] bg-[#CEFFCA] hover:text-[#167316] hover:bg-[#CEFFCA]">Delivered</Button>
            </div>
        </div>
    )
}

export default OrderDetails