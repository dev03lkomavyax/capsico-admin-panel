import React from 'react'

function Invoice() {
    return (
        <div>
            <div className='bg-[#FFFFFF] border-[1px] border-[#DAE1E7] p-[10px]'>
                <h4 className='text-[#323F49] font-xl font-normal text-center'>Financial year - 2024</h4>
            </div>
            <div className="bg-white border-[1px] border-[#DAE1E7] rounded-lg shadow px-7 py-8  mx-auto">
                <div className="flex justify-between">
                    <div>
                        <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Invoice No</h4>
                        <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">ALDP-123-12345</p>
                    </div>
                    <div>
                        <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Month</h4>
                        <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">Not available</p>
                    </div>
                    <div>
                        <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Type</h4>
                        <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">Online Ordering</p>
                    </div>
                    <div>
                        <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Download Invoice</h4>
                        <p className="text-[#1AA6F1] font-xl font-medium font-inter text-center">Download</p>
                    </div>
                    <div>
                        <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Download Credit/Debit Note</h4>
                        <p className="text-[#1AA6F1] font-xl font-medium font-inter text-center">Download</p>
                    </div>
                    <div>
                        <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Download TCS</h4>
                        <p className="text-[#1AA6F1] font-xl font-medium font-inter text-center">Download</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoice