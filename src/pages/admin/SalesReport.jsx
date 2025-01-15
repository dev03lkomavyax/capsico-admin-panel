import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import Metric from '@/components/admin/Metric'
import Overview from '@/components/admin/Overview'
import React, { useState } from 'react'
import { BsGrid1X2 } from 'react-icons/bs';
import { FaChartLine } from 'react-icons/fa6';

const SalesReport = () => {
    const [isMetric, setIsMetric] = useState(true);

    return (
        <AdminWrapper>
            <section className='px-0 py-0 w-full min-h-screen'>
                <div className='bg-[#FFFFFF66] p-5 border-b border-[#DAE1E7]'>
                    <div className='flex items-center'>
                        <button onClick={() => setIsMetric(true)} className={`flex gap-2 items-center py-2 rounded-lg px-4 border class-base1 border-r-0 rounded-r-none ${isMetric ? "border-[#1AA6F1] primary-color" : "bg-[#4A5E6D] text-white border-[#4A5E6D]"}`}>
                            <BsGrid1X2 className='text-xl' />
                            <span>Metric</span>
                        </button>
                        <button onClick={() => setIsMetric(false)} className={`px-4 border border-l-0 py-2 rounded-lg rounded-l-none class-base1 flex gap-2 items-center ${!isMetric ? "border-[#1AA6F1] primary-color bg-white" : "bg-[#4A5E6D] text-white border-[#4A5E6D]"}`}>
                            <FaChartLine />
                            <span>Overview</span>
                        </button>
                    </div>
                    {/* <div className=''> */}
                    <div className="mt-10">
                        {isMetric ?
                            <Metric />
                            : <Overview />
                        }
                    </div>
                    {/* </div> */}
                </div>
            </section>
        </AdminWrapper>
    )
}

export default SalesReport