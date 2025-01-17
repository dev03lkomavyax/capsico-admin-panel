import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import usePostApiReq from '@/hooks/usePostApiReq'
import { useEffect, useState } from 'react'
import VegIcon from '../customIcons/VegIcon'

const ProductInventory = ({ foodItem }) => {
    const { name, price, isAvailable, veg } = foodItem;
    const [isOn, setIsOn] = useState(isAvailable);

    const { res, fetchData, isLoading } = usePostApiReq();

    const toggleFoodAvailability = (value) => {
        fetchData(`/restaurant/food-availability/${foodItem?.id}`);
    }

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("toggleFoodAvailability res", res);
            setIsOn(res?.data?.data?.isAvailable)
        }
    }, [res])

    return (
        <div className='px-5 py-3 flex justify-between items-center group gap-2 border-b hover:bg-[#F7FAFF] cursor-pointer'>
            <div className='flex gap-3 items-center'>
                <img className='w-20 rounded' src={`${import.meta.env.VITE_IMAGE_URL}/${foodItem?.image}`} alt="item" />
                <div className=''>
                    <VegIcon />
                    {/* <NonVegIcon /> */}
                    {/* <EggIcon /> */}
                    <h3 className='eleven-color class-base1 mt-2'>{name}</h3>
                    <p className='class-base1'>₹{price}</p>
                </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
                <Switch
                    id="custom-switch"
                    checked={isOn}
                    onCheckedChange={(value) => toggleFoodAvailability(value)}
                    className={isOn ? "bg-green-500" : "bg-gray-300"}
                />
                <Label htmlFor="airplane-mode">In Stock</Label>
            </div>
        </div>
    )
}

export default ProductInventory