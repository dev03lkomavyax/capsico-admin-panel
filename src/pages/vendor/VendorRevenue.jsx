import Invoice from '@/components/revenue/Invoice';
import Payout from '@/components/revenue/Payout';
import Report from '@/components/revenue/Report';
import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

const VendorRevenue = () => {

  const [activeTab, setActiveTab] = useState("payout");
  const navigate = useNavigate()
  return (
    <section className='border-[1px] bg-[#F5F7FA] px-10 py-10 w-full h-full min-h-screen'>
      <div className='flex justify-start items-center mb-4'>
        <MdKeyboardArrowLeft onClick={()=>navigate(-1)} className='text-[#000000] text-4xl cursor-pointer' />
        <h2 className='text-[#000000] text-xl font-medium font-roboto'>Revenue</h2>
      </div>
      <div className='flex gap-3 mb-6'>
        <button onClick={() => setActiveTab('payout')} className={`${activeTab === 'payout' ? 'text-[#1AA6F1] border-b-[#1AA6F1]' : 'text-[#637D92] border-b-transparent'} text-base font-normal font-inter p-[10px] border-b-[3px]`}>Payouts</button>
        <button onClick={() => setActiveTab('invoice')} className={`${activeTab === 'invoice' ? 'text-[#1AA6F1] border-b-[#1AA6F1]' : 'text-[#637D92] border-b-transparent'} text-base font-normal font-inter p-[10px] border-b-[3px]`}>Invoices</button>
        <button onClick={() => setActiveTab('report')} className={`${activeTab === 'report' ? 'text-[#1AA6F1] border-b-[#1AA6F1]' : 'text-[#637D92] border-b-transparent'} text-base font-normal font-inter p-[10px] border-b-[3px]`}>UTR Reports</button>
        <button onClick={() => setActiveTab('tax')} className={`${activeTab === 'tax' ? 'text-[#1AA6F1] border-b-[#1AA6F1]' : 'text-[#637D92] border-b-transparent'} text-base font-normal font-inter p-[10px] border-b-[3px]`}>Taxes</button>
      </div>
      {activeTab === 'payout' && <Payout />}
      {activeTab === 'invoice' && <Invoice />}
      {activeTab === 'report' && <Report />}
    </section>
  )
}

export default VendorRevenue