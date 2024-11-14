// import outletIcon from "@/assets/outlet.png"
import { BiTrash } from 'react-icons/bi'

const Product = () => {
    return (
        <div className='px-8 py-5 flex justify-between items-center group gap-2 border-b hover:bg-[#F7FAFF] cursor-pointer'>
            <div className='flex gap-12 items-center'>
                <img className='w-24 h-24 rounded-lg border-[1px] border-[#E0E0E0]' src="https://picsum.photos/48" alt="" />
                <div className='space-y-1'>
                    <h3 className='text-[#686868] text-xl font-semibold font-inter mt-2'>Wired Earphones </h3>
                    <p className='text-[#000000] text-xl font-semibold font-inter'>Rs 89</p>
                </div>
            </div>
            <BiTrash onClick={() => { }} className="text-[#E4626F] text-xl cursor-pointer hidden group-hover:block" />
        </div>
    )
}

export default Product