import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const AvailableBalanceDetails = () => {
    const navigate = useNavigate();

    return (
        <AdminWrapper>
            <section>
                <div className='flex justify-between h-14'>
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1">
                        <IoIosArrowBack className='text-2xl' />
                        <span className='font-roboto text-lg font-medium'>Wallet Info</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-[2%]">
                    <div className='bg-white p-6 py-10 rounded-lg'>
                        <p className='font-inter font-medium text-[#1C1C1C]'>Available Balance</p>
                        <h2 className='font-inter font-semibold text-3xl text-[#1C1C1C] mt-2'>₹ 2500</h2>
                    </div>
                    <div className='bg-white p-6 py-10 rounded-lg'>
                        <p className='font-inter font-medium text-[#1C1C1C]'>Earn to date:</p>
                        <h2 className='font-inter font-semibold text-3xl text-[#1C1C1C] mt-2'>₹ 5000</h2>
                    </div>
                </div>

                <div className="rounded-lg mt-7 p-5 px-6 bg-white">
                    <div className="flex justify-between items-center">
                        <h4 className='font-inter text-sm text-[#1F2A37] font-medium'>Latest Transactions</h4>
                        <button className='flex gap-1 items-center text-sm'>
                            View all
                            <IoIosArrowForward />
                        </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <h4 className='font-inter text-sm text-[#374151] font-medium'>Razor pay</h4>
                            <p className='text-[10px] text-[#6B7280]'>14 Jun, 2024 | 10:03 AM</p>
                        </div>
                        <button className='flex gap-1 items-center text-sm'>
                            <div>
                                <h4 className='font-inter text-sm text-[#374151] font-medium'>₹600.0</h4>
                                <p className='text-[10px] text-[#374151]'>Successful</p>
                            </div>
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </section>
        </AdminWrapper>
    )
}

export default AvailableBalanceDetails