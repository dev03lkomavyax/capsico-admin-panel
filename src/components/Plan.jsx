import { IoCheckmarkCircleSharp } from 'react-icons/io5'

const Plan = () => {
    return (
        <div className="flex justify-between items-center rounded-lg p-4 shadow-md w-full border-black border-2">
            <div className="flex items-start gap-4 w-full">
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-5 mb-3'>
                            <IoCheckmarkCircleSharp className='text-2xl' />
                            <h2 className="text-xl text-[#000000] font-semibold">Subscription plan</h2>
                        </div>
                        <div className="text-2xl font-bold text-black">
                            $10
                        </div>
                    </div>
                    <span className="inline-block bg-blue-100 text-[#8F104D] text-[15px] font-medium py-1 px-4 rounded-2xl mt-1">
                        5% Discount
                    </span>
                    <div className="mt-2 space-y-1 text-gray-700">
                        <div className='flex items-center gap-1'>
                            <IoCheckmarkCircleSharp className='text-xl' />
                            Lorem ipsum dolor sit amet</div>
                        <div className='flex items-center gap-1'>
                            <IoCheckmarkCircleSharp className='text-xl' />
                            Lorem ipsum dolor sit amet</div>
                        <div className='flex items-center gap-1'>
                            <IoCheckmarkCircleSharp className='text-xl' />
                            Lorem ipsum dolor sit amet</div>
                        <div className='flex items-center gap-1'>
                            <IoCheckmarkCircleSharp className='text-xl' />
                            Lorem ipsum dolor sit amet</div>
                        <div className='flex items-center gap-1'>
                            <IoCheckmarkCircleSharp className='text-xl' />
                            Lorem ipsum dolor sit amet</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plan