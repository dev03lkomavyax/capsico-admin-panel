import React from 'react'
import SingleLineChart from './SingleLineChart'
import MultiLineChart from './MultiLineChart'

const Overview = () => {
  return (
    <section className='space-y-5'>
      <div>
        <h2 className='text-[#000000] text-2xl font-medium font-inter mb-5'>Sales Overview</h2>
        <div className='flex gap-8 flex-wrap'>
          <MultiLineChart title="Sales & Orders" />
          <MultiLineChart title="Average Order Value" />
          <SingleLineChart title="Market Share" />
        </div>
      </div>
      <div>
        <h2 className='text-[#000000] text-2xl font-medium font-inter mb-5'>User Experience</h2>
        <div className='flex gap-8 flex-wrap'>
          <MultiLineChart title="Rated order & review" />
          <MultiLineChart title="Average Order Value" />
          <MultiLineChart title="Average Order Value" />
          <MultiLineChart title="Average Order Value" />
        </div>
      </div>
      <div>
        <h2 className='text-[#000000] text-2xl font-medium font-inter mb-5'>Marketing</h2>
        <div className='flex gap-8 flex-wrap'>
          <SingleLineChart title="Average Order Value" />
          <SingleLineChart title="Order Percentage from Promotion" />
          <MultiLineChart title="Impressions & Impressions from Promotions" />
          <SingleLineChart title="Promotion CTR" />
          <MultiLineChart title="Promotion CTR" />
          <MultiLineChart title="Total sales & Gross Sales from Promotion" />
          <MultiLineChart title="Orders % & Effective Offers" />
          <MultiLineChart title="Orders % & Effective Offers" />
          <SingleLineChart title="Effective discount" />
        </div>
      </div>
      <div>
        <h2 className='text-[#000000] text-2xl font-medium font-inter mb-5'>Trending Menu</h2>
        <div className='flex gap-8'>
          <MultiLineChart title="M2C & Menu score " />
        </div>
      </div>
    </section>
  )
}

export default Overview