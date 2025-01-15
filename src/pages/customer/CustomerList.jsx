import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import Capsico from '@/components/customer/Capsico'
import Quickly from '@/components/customer/Quickly'
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper'

const CustomerList = () => {
    const [selectTab, setSelectTab] = useState('capsico')

    return (
        <AdminWrapper>
            <div className='flex flex-col gap-6 w-full h-full py-0 px-0'>
                <div className=''>
                    <div className="flex items-center gap-1">
                        <IoIosArrowBack className='text-2xl' />
                        <span className='text-[#000000] font-roboto text-xl font-medium'>General Customer </span>
                    </div>
                </div>
                <section className='flex justify-start items-center'>
                    <button onClick={() => setSelectTab('capsico')} className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${selectTab === 'capsico' ? 'border-[#003CFF]' : 'border-transparent'}`}>
                        <h6 className='text-[#1D1929] text-sm font-semibold font-roboto'>Capsico</h6>
                        <p className='text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#FF6F03] w-[22px] h-[22px] rounded-[7px]'>20</p>
                    </button>
                    <button onClick={() => setSelectTab('quickly')} className={`flex justify-center items-center gap-[10px] px-[30px] py-3 border-b-[3px] ${selectTab === 'quickly' ? 'border-[#003CFF]' : 'border-transparent'}`}>
                        <h6 className='text-[#1D1929] text-sm font-semibold font-roboto'>Quickly</h6>
                        <p className='text-[#FFFFFF] text-[10px] flex justify-center items-center font-normal font-roboto bg-[#ABABAB] w-[22px] h-[22px] rounded-[7px]'>48</p>
                    </button>
                </section>
                {selectTab === 'capsico' &&
                    <Capsico />
                }
                {selectTab === 'quickly' &&
                    <Quickly />
                }
            </div>
        </AdminWrapper>
    )
}

export default CustomerList