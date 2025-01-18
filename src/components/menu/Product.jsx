// import outletIcon from "@/assets/outlet.png"
import { BiTrash } from 'react-icons/bi'
import VegIcon from '../customIcons/VegIcon'
import NonVegIcon from '../customIcons/NonVegIcon';

const Product = ({ foodItem }) => {
    const { name, price, isAvailable, veg } = foodItem;

    return (
        <div className='px-5 py-3 flex justify-between items-center group gap-2 border-b hover:bg-[#F7FAFF] cursor-pointer'>
            <div className='flex gap-3 items-center'>
                <img className='w-20 rounded' src={`${import.meta.env.VITE_IMAGE_URL}/${foodItem?.image}`} alt="item" />
                <div className=''>
                    {veg ? <VegIcon /> : <NonVegIcon />}
                    {/* <EggIcon /> */}
                    <h3 className='text-[#686868] text-base font-semibold font-inter mt-2'>{name}</h3>
                    <p className='class-base1'>₹{price}</p>
                </div>
            </div>
            <BiTrash onClick={() => { }} className="text-[#E4626F] text-xl cursor-pointer hidden group-hover:block" />
        </div>
    )
}

export default Product