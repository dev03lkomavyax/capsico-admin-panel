import React from 'react'
import avatar from '@/assets/Image-198.png';
import NonVegetarian from '@/assets/Non Vegetarian Food Symbol.png';
import { Button } from '../ui/button';
import ReactStars from 'react-stars';


const SingleDelivery = ({ rating }) => {
    return (
        <div className='px-2 py-6 grid grid-cols-5 gap-4 items-center border-t border-[#C9C9C9]'>
            <div className='flex gap-2 items-center'>
                <img className='w-9 rounded-lg' src={avatar} alt="order" />
                <div>
                    <h2 className='font-inter text-sm font-bold'>Burger King</h2>
                    <p className='font-inter text-[10px] text-[#6B7280]'>Nirala Nagar</p>
                </div>
            </div>
            <p className='text-xs font-inter text-[#6B7280] text-center'>August 13, 04:31 PM</p>
            <p className='text-sm font-inter font-bold text-center text-[#363636]'>₹ 230.52</p>
            <div className='flex justify-center'>
                {rating ?
                    <ReactStars
                        count={5}
                        value={4}
                        size={28}
                        edit={false}
                        color1={'#d3d6e4'}
                        color2={'#FFC71E'}
                    />
                    :
                    <button className='border border-[#397FFE] h-8 text-xs px-2 text-[#397FFE]'>Rate Order</button>
                }
            </div>
            <div className='flex justify-center'>
                <Button className="flex gap-2 w-24 h-8 bg-[#00A86B] hover:bg-[#00A86B] rounded text-xs items-center">
                    Delivered
                </Button>
            </div>
        </div>
    )
}

export default SingleDelivery