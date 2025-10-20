import Plan from '@/components/Plan'
import React from 'react'

const EditProfile7 = () => {
    return (
        <div className='grid gap-5 items-center'>
            {/* <Plan /> */}
            <div className="flex justify-between items-center rounded-lg p-4 shadow-md w-full border-black border-2">
                {/* Left Section */}
                <div className="flex items-start gap-4">
                    <div className="text-xl text-black">
                        ✅
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Subscription plan</h2>
                        <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium py-1 px-2 rounded-md mt-1">
                            5% Discount
                        </span>
                        <ul className="mt-2 space-y-1 text-gray-700">
                            <li>✅ Lorem ipsum dolor sit amet</li>
                            <li>✅ Lorem ipsum dolor sit amet</li>
                            <li>✅ Lorem ipsum dolor sit amet</li>
                            <li>✅ Lorem ipsum dolor sit amet</li>
                            <li>✅ Lorem ipsum dolor sit amet</li>
                        </ul>
                    </div>
                </div>

                {/* Right Section */}
                <div className="text-2xl font-semibold text-black">
                    $10
                </div>
            </div>
        </div>
    )
}

export default EditProfile7