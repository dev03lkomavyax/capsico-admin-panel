import React, { useState } from 'react'

function Report() {
  const [activeTab, setActiveTab] = useState("Last 14 Days")
  const tabs = ["Last 14 Days", "Last 30 Days", "Choose Date"]
  return (
    <>
      <div className='bg-[#E7EBEF66]'>
        <div className=' flex justify-between items-center mb-7'>
          <div className='flex gap-3'>
            <button onClick={() => setActiveTab('Last 14 Days')} className={`h-10 border-[1px] ${activeTab === 'Last 14 Days' ? 'border-[#1064FD] text-[#FFFFFF] bg-[#1064FD]' : 'text-[#252525] border-[#DAE1E7] bg-[#FFFFFF]'} rounded-lg  text-sm font-medium font-inter px-4`}>Last 14 days</button>
            <button onClick={() => setActiveTab('Last 30 Days')} className={`h-10 border-[1px] ${activeTab === 'Last 30 Days' ? 'border-[#1064FD] text-[#FFFFFF] bg-[#1064FD]' : 'text-[#252525] border-[#DAE1E7] bg-[#FFFFFF]'} rounded-lg text-sm font-medium font-inter px-4`}>Last 30 days</button>
            <button onClick={() => setActiveTab('Choose Date')} className={`h-10 border-[1px] ${activeTab === 'Choose Date' ? 'border-[#1064FD] text-[#FFFFFF] bg-[#1064FD]' : 'text-[#252525] border-[#DAE1E7] bg-[#FFFFFF]'} rounded-lg text-sm font-medium font-inter px-4`}>Choose Date</button>
          </div>
          <button className='h-10 border-[1px] border-[#1064FD] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#1064FD]'>Download</button>
        </div>
        <div className="bg-white rounded-lg shadow px-8 py-6 border-[1px] border-[#DAE1E7] mx-auto">
          <div className="flex justify-between">
            <div>
              <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">UTR</h4>
              <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">Not available</p>
            </div>
            <div>
              <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Date</h4>
              <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">17 Jul 2024</p>
            </div>
            <div>
              <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Status</h4>
              <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">Pending</p>
            </div>
            <div>
              <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Amount</h4>
              <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">₹199.8</p>
            </div>
            <div>
              <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Details</h4>
              <p className="text-[#1AA6F1] font-xl font-medium font-inter text-center">Download</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Report