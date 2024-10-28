import avatar from "@/assets/Image-120.png";
import { Button } from '@/components/ui/button';
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from 'react-icons/fa6'

const OrderDetails = () => {
    return (
        <div className='bg-[#F5F7FA] p-10 h-screen'>
            <div className='flex justify-between h-14'>
                <div>
                    <div className="flex items-center gap-1">
                        <IoIosArrowBack className='text-2xl' />
                        <span className='font-roboto text-lg font-medium'>Order ID #1264903 </span>
                    </div>
                    <span className='text-sm text-[#5F5F5F] font-roboto'>Orders/orders details</span>
                </div>
                <Button className="text-[#167316] bg-[#CEFFCA] h-[54px] w-[167px] text-xl hover:text-[#167316] hover:bg-[#CEFFCA]">Delivered</Button>
            </div>

            {/* h-[calc(100vh-56px)] */}
            <div className="grid grid-cols-[26%_71%] gap-[3%] mt-5">
                <div className='rounded-lg bg-white p-4'>
                    <div className="flex justify-center flex-col items-center">
                        <img src={avatar} alt="avatar" />
                        <h2 className='font-medium font-roboto mt-3 text-xl'>Leon Barrows</h2>
                        <p className="font-roboto text-[#838383] text-sm">Customer</p>
                    </div>
                    <div className="flex flex-col mt-5">
                        <h2 className="font-roboto text-sm mb-2">History</h2>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 bg-[#57A748] p-[6px] text-white rounded-full">
                                <FaCheck />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-black font-medium text-sm">Order Delivered</span>
                                <span className="text-[#6E6D6D] text-xs">19-10-2024  00:21:01</span>
                            </div>
                        </div>

                        <div className="ml-3 border-l border-dashed border-gray-400 h-6"></div>

                        <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 bg-[#BEBEBE] text-white p-[6px] rounded-full">
                                <FaCheck />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-black font-medium text-sm">Order Prepared</span>
                                <span className="text-[#6E6D6D] text-xs">19-10-2024  00:20:38</span>
                            </div>
                        </div>

                        <div className="ml-3 border-l border-dashed border-gray-400 h-6"></div>

                        <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 bg-[#BEBEBE] text-white p-[6px] rounded-full">
                                <FaCheck />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-black font-medium text-sm">Order received</span>
                                <span className="text-[#6E6D6D] text-xs">19-10-2024  00:20:38</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='rounded-lg bg-white p-4'>
                        <span className="text-sm font-roboto">Restaurant Details</span>
                        <h2 className="font-inter">Adiyaman Hotel</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails