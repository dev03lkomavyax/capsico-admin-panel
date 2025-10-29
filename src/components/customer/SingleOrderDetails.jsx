import avatar from '@/assets/Image-198.png';
import NonVegetarian from '@/assets/Non Vegetarian Food Symbol.png';
import ReactStars from 'react-stars';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import VegIcon from '../customIcons/VegIcon';
import NonVegIcon from '../customIcons/NonVegIcon';
import EggIcon from '../customIcons/EggIcon';


const SingleOrderDetails = ({ order }) => {
    // console.log("order", order);

    return (
        <div className='px-2 py-6 grid grid-cols-6 gap-4 items-center border-t border-[#C9C9C9]'>
            <div className='flex gap-2 items-center'>
                <img className='w-9 h-9 object-cover rounded-lg' src={order?.restaurantId?.images?.[0] ? `${order?.restaurantId?.images?.[0]}` : avatar} alt="order" />
                <div>
                    <h2 className='font-inter text-sm font-bold capitalize'>{order?.restaurantId?.name || "N/A"} </h2>
                    <p className='font-inter text-[10px] text-[#6B7280]'>{order?.restaurantId?.address?.addressLine || "N/A"}</p>
                </div>
            </div>
            <p className='text-xs font-inter text-[#6B7280] text-center'>{order?.timing?.orderedAt && format(new Date(order?.timing?.orderedAt), "MMM dd, hh:mm a")}</p>
            <div className='flex items-center justify-start gap-1'>
                {order?.items[0]?.foodId?.FoodType === "veg" && <VegIcon />}
                {order?.items[0]?.foodId?.FoodType === "Non-veg" && <NonVegIcon />}
                {order?.items[0]?.foodId?.FoodType === "Egg" && <EggIcon />}
                {/* <img className='w-4' src={NonVegetarian} alt="NonVegetarian" /> */}
                <p className='text-xs font-inter text-[#363636]'>{order?.items?.[0]?.quantity} x {order?.items?.[0]?.name}...</p>
            </div>
            <p className='text-sm font-inter font-bold text-center text-[#363636]'>{order?.amounts?.total ? `₹ ${order?.amounts?.total}` : "N/A"}</p>
            <div className='flex justify-center'>
                <ReactStars
                    count={5}
                    value={4}
                    size={28}
                    edit={false}
                    color1={'#d3d6e4'}
                    color2={'#FFC71E'}
                />
            </div>
            <div className='flex justify-center'>
                <Button className="flex gap-2 h-8 px-2 capitalize bg-[#00A86B] hover:bg-[#00A86B] rounded text-[10px] items-center">
                    {order?.status ? order.status.split("_").join(" ") : "N/A"}
                </Button>
            </div>
        </div>
    )
}

export default SingleOrderDetails