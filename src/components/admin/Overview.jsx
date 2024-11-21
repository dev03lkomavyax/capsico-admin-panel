import React from 'react'
import SingleLineChart from './SingleLineChart'
import MultiLineChart from './MultiLineChart'

const Overview = () => {
  return (
    <section className='space-y-5'>
      <div>
        <h2 className='text-[#000000] text-2xl font-medium font-inter mb-5'>Sales Overview</h2>
        <div className='flex gap-8 flex-wrap'>
          <MultiLineChart />
          <MultiLineChart />
          <SingleLineChart />
        </div>
      </div>
      <div>
        <h2 className='text-[#000000] text-2xl font-medium font-inter mb-5'>User Experience</h2>
        <div className='flex gap-8 flex-wrap'>
          <MultiLineChart />
          <MultiLineChart />
          <MultiLineChart />
          <MultiLineChart />
        </div>
      </div>
      <div>
        <h2 className='text-[#000000] text-2xl font-medium font-inter mb-5'>Marketing</h2>
        <div className='flex gap-8 flex-wrap'>
          <SingleLineChart />
          <SingleLineChart />
          <MultiLineChart />
          <SingleLineChart />
          <MultiLineChart />
          <MultiLineChart />
          <MultiLineChart />
          <MultiLineChart />
          <SingleLineChart />
        </div>
      </div>
      <div>
        <h2 className='text-[#000000] text-2xl font-medium font-inter mb-5'>Trending Menu</h2>
        <div className='flex gap-8'>
          <MultiLineChart />
        </div>
      </div>
    </section>
  )
}

export default Overview