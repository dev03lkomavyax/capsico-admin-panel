import img from '@/assets/Image-120.png';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import OrderItem from '@/components/order-details/OrderItem';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';

const capsico = true;

const ReviewsDetails = () => {
    const navigate = useNavigate();
    return (
        <AdminWrapper>
            <section>
                <div className='flex justify-between h-14'>
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1">
                        <IoIosArrowBack className='text-2xl' />
                        <span className='font-roboto text-lg font-medium'>Review Details</span>
                    </button>
                </div>
                <div className="w-full mt-3 bg-white p-5 rounded-lg">
                    <div className='flex gap-1 items-center'>
                        <img src={img} className='w-12 h-12 rounded-full' />
                        <div>
                            <h1 className='font-inter font-medium'>Ervin Smitham</h1>
                            <ReactStars
                                count={5}
                                value={4}
                                size={28}
                                edit={false}
                                color1={'#d3d6e4'}
                                color2={'#E0B936'}
                                className='-mt-2'
                            />
                        </div>
                    </div>

                    <p className='font-inter text-[#535353] mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.</p>
                    <p className='font-inter text-[#9B9B9B] mt-2'>July 13, 2023</p>

                    <div className="my-6 py-6 border-t border-b border-[#CECECE] flex justify-between items-center">
                        <div>
                            <h3 className='text-sm font-inter'>Vendor Details</h3>
                            <h2 className='font-inter text-xl font-medium mt-2'>J.S Vendor</h2>
                            <p className='font-inter text-[#565656]'>462 Cortney Glens, Berkshire</p>
                        </div>
                        <button className='font-inter text-[#003CFF] font-semibold text-lg'>View</button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <h2 className="font-inter text-sm font-medium">Items</h2>
                        <h2 className="font-inter text-sm font-medium text-center">Oty</h2>
                        <h2 className="font-inter text-sm font-medium text-right">Price</h2>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="grid grid-cols-3 gap-3">
                            <h3 className='text-sm font-dmSans font-medium text-[#515151]'>Idli 2 nos</h3>
                            <h3 className="font-inter text-sm font-medium text-center">7</h3>
                            <h3 className="font-inter text-sm font-medium text-right">₹230</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
                        <h3 className='font-roboto font-medium flex gap-1 items-center text-[#515151]'>
                            Total amount
                        </h3>
                        <div></div>
                        <h3 className="font-roboto text-[#515151] font-medium text-right">₹390</h3>
                    </div>
                </div>

            </section>
        </AdminWrapper>
    )
}

export default ReviewsDetails