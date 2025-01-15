import pocket from '@/assets/3dicons.png';
import call from '@/assets/call.png';
import edit from '@/assets/edit.png';
import avatar from '@/assets/Image-198.png';
import location from '@/assets/location.png';
import sms from '@/assets/sms.png';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import SingleOrderDetails from '@/components/customer/SingleOrderDetails';
import { IoIosArrowBack } from 'react-icons/io';

const CustomerDetails = () => {
    return (
        <AdminWrapper>
            <div className='p-0'>
                <div className='flex justify-between h-14'>
                    <div className="flex items-center gap-1">
                        <IoIosArrowBack className='text-2xl' />
                        <span className='font-roboto text-lg font-medium'>Customer detail</span>
                    </div>
                </div>
                <div className="grid grid-cols-[60%_38%] gap-[2%]">
                    <div className='bg-white p-5 rounded-lg flex gap-10'>
                        <img className='w-52 h-52 rounded-lg' src={avatar} alt="avatar" />
                        <div className='w-full'>
                            <div className='flex w-full justify-between items-center gap-3'>
                                <h1 className='font-inter text-3xl font-semibold text-[#202020]'>Prashant Kumar Singh</h1>
                                <img className='w-5 h-5 cursor-pointer' src={edit} alt="edit" />
                            </div>
                            <div className="flex flex-col gap-3 mt-5">
                                <div className="flex items-center gap-2">
                                    <img className='w-5 h-5' src={location} alt="location" />
                                    <p className='font-inter text-[#696969] text-lg'>New Delhi India</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img className='w-5 h-5' src={sms} alt="sms" />
                                    <p className='font-inter text-[#696969] text-lg'>officialprashanttt@gmail.com</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img className='w-5 h-5' src={call} alt="call" />
                                    <p className='font-inter text-[#696969] text-lg'>+91 8009396321</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between rounded-lg bg-[#7FADFF]'>
                        <div className='px-10 py-6 flex justify-between items-center'>
                            <div>
                                <span className='font-inter font-medium text-white'>Available Balance</span>
                                <h2 className='text-white font-inter font-bold text-4xl mt-2'>₹ 2500</h2>
                            </div>
                            <img className='w-24' src={pocket} alt="pocket" />
                        </div>
                        <div className='py-4 px-6 bg-[#A8C7FF] rounded-b-lg flex justify-between items-end'>
                            <div>
                                <p className='font-inter text-[#707070]'>Previous transaction</p>
                                <p className='font-inter text-[#707070]'>20 June,2024</p>
                            </div>
                            <p className='font-inter text-[#FF0000] font-semibold'>Rs 200</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg mt-7 p-5 bg-white">
                    <h2 className='font-inter font-semibold'>Order history</h2>
                    <div className="flex flex-col mt-5">
                        <SingleOrderDetails rating={true} />
                        <SingleOrderDetails rating={false} />
                        <SingleOrderDetails rating={true} />
                    </div>
                </div>
            </div>
        </AdminWrapper>
    )
}

export default CustomerDetails