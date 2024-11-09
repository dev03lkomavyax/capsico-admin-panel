import { Button } from '@/components/ui/button'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { Separator } from './ui/separator'

const Plan = () => {
    return (
        <div className='border-2 border-[#818181] rounded-md py-10 px-6'>
            <div className="rounded-md bg-[#F1F1F1] inline-flex text-[#000B33] px-3 py-1 text-sm font-inter font-semibold">BASIC</div>
            <p className='mt-2 text-sm font-inter font-light text-black'>Lorem ipsum dolor sit amet.consectetur adipiscing elit</p>

            <Separator className="bg-[#1AA6F1] my-8" />

            <h1 className='text-6xl font-inter font-semibold text-[#000B33]'>$19</h1>
            <p className='font-inter text-sm font-semibold'>consectetur adipiscing elit</p>

            <Separator className="bg-[#1AA6F1] my-8" />
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <div className="flex justify-center items-center p-[3px] rounded-full bg-black w-4 h-4">
                        <FaCheck className='text-white' />
                    </div>
                    <span className='font-inter text-sm'>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex justify-center items-center p-[3px] rounded-full bg-[#FF0000] w-4 h-4">
                        <FaXmark className='text-white' />
                    </div>
                    <span className='font-inter text-sm'>Lorem ipsum dolor sit amet</span>
                </div>
            </div>
            <Button type='button' size="lg" className="mt-5 w-full">Subscribe</Button>
        </div>
    )
}

export default Plan