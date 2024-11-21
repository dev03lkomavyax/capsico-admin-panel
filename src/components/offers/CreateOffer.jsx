import promoIcon from '@/assets/Vector.png';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useNavigate } from 'react-router-dom';
import { Label } from '../ui/label';

const CreateOffer = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [activeTab, setActiveTab] = useState('All')
    const [activePriseTab, setActivePriseTab] = useState('')
    const [slideValue, setSlideValue] = useState([30])
    const [offerValue, setOfferValue] = useState('50%')

    const navigate = useNavigate()

    const handleCheckboxChange = () => {
        setTermsAccepted(!termsAccepted);
    };

    console.log(offerValue)

    return (
        <>
            <div className='py-4 flex justify-start gap-4 w-full'>
                <div onClick={()=> navigate('/admin/offers/create-offer')} className='bg-[#FFFFFF] rounded-lg flex items-center gap-3 p-5 h-32 max-w-[540px] cursor-pointer'>
                    <div className="w-[70px] h-[70px] rounded-full bg-[#A4F4E7] flex justify-center items-center">
                        <img src={promoIcon} alt="promoIcon" />
                    </div>
                    <div className='space-y-2'>
                        <h3 className='text-[#000000] text-2xl font-medium font-inter'>Offers</h3>
                        <p className='text-[#7991A4] text-sm font-normal font-inter'>Thrill customers with complimentary discounts on every order.</p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='bg-[#FFFFFF] rounded-lg flex items-center gap-3 p-5 h-32 max-w-[540px] cursor-pointer'>
                            <div className="w-[70px] h-[70px] rounded-full bg-[#F4CBA4] flex justify-center items-center">
                                <img src={promoIcon} alt="promoIcon" />
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-[#000000] text-2xl font-medium font-inter'>Deal Of the day</h3>
                                <p className='text-[#7991A4] text-sm font-normal font-inter'>Thrill customers with complimentary discounts on every order.</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[1024px] w-full h-full overflow-y-scroll px-0">
                        <div className="">
                            <h2 className="text-[#000000] text-base font-semibold font-inter px-8 py-2">Deal of the day</h2>
                            <div className='border-[1px] border-[#F1F1F1]'></div>
                            <div className='px-8 pt-4 pb-7 w-full flex flex-col gap-4'>
                                <h3 className='text-[#000000] text-xl font-semibold font-inter'>Select your discount</h3>
                                <button className='text-[#000000] text-base font-medium font-inter border-[1px] border-[#D6D6D6] rounded-lg h-[46px]'>{offerValue} OFF upto Rs120</button>
                                {/* <Slider defaultValue={[33]} max={100} step={1} value={slideValue} onValueChange={setSlideValue} /> */}
                                <div className="flex justify-start gap-14 w-full -mt-3 text-[#000000] text-base font-medium font-inter">
                                    {[10, 20, 30, 40, 50, 60].map((mark) => (
                                        <span key={mark}>{mark}%</span>
                                    ))}
                                </div>
                                <div className='flex gap-6'>
                                    <button onClick={() => setActivePriseTab('noMax')} className={`text-[#6E6E6E] text-sm font-medium font-inter border-[1px] border-[#D6D6D6] rounded-lg h-[46px] w-[158px] ${activePriseTab === 'noMax' ? 'bg-[#2D6FE8] fourth-color border-[#2D6FE8]' : 'bg-[#FFFFFF] twentyTwo-color border-[#D6D6D6]'}`}>No Max cap</button>
                                    <button onClick={() => setActivePriseTab('150')} className={`text-[#6E6E6E] text-sm font-medium font-inter border-[1px] border-[#D6D6D6] rounded-lg h-[46px] w-[158px] ${activePriseTab === '150' ? 'bg-[#2D6FE8] fourth-color border-[#2D6FE8]' : 'bg-[#FFFFFF] twentyTwo-color border-[#D6D6D6]'}`}>Rs150</button>
                                    <button onClick={() => setActivePriseTab('120')} className={`text-[#6E6E6E] text-sm font-medium font-inter border-[1px] border-[#D6D6D6] rounded-lg h-[46px] w-[158px] ${activePriseTab === '120' ? 'bg-[#2D6FE8] fourth-color border-[#2D6FE8]' : 'bg-[#FFFFFF] twentyTwo-color border-[#D6D6D6]'}`}>Rs120</button>
                                </div>
                            </div>
                            <div className='border-[5px] border-[#F1F1F1]'></div>
                            <div className='px-8 pt-4 pb-7 w-full flex flex-col gap-4'>
                                <div>
                                    <h3 className='text-[#000000] text-xl font-semibold font-inter mb-3'>Discount applicable for</h3>
                                    <div className='flex items-center justify-between gap-4 w-full'>
                                        <button onClick={() => setActiveTab('All')} className={`w-full h-[46px] text-[#000000] text-base font-medium font-inter rounded-lg border-[1px] ${activeTab === 'All' ? 'bg-[#2D6FE8] text-[#FFFFFF] border-[#2D6FE8]' : 'bg-[#FFFFFF] text-[#6E6E6E] border-[#D6D6D6]'}`}>All</button>
                                        <button onClick={() => setActiveTab('Restaurant')} className={`w-full h-[46px] text-[#000000] text-base font-medium font-inter rounded-lg border-[1px] ${activeTab === 'Restaurant' ? 'bg-[#2D6FE8] text-[#FFFFFF] border-[#2D6FE8]' : 'bg-[#FFFFFF] text-[#6E6E6E] border-[#D6D6D6]'}`}>Select Restaurant</button>
                                        <button onClick={() => setActiveTab('Vendor')} className={`w-full h-[46px] text-[#000000] text-base font-medium font-inter rounded-lg border-[1px] ${activeTab === 'Vendor' ? 'bg-[#2D6FE8] text-[#FFFFFF] border-[#2D6FE8]' : 'bg-[#FFFFFF] text-[#6E6E6E] border-[#D6D6D6]'}`}>Select Vendor</button>
                                    </div>
                                </div>
                                <Select>
                                    <Label className='text-[#000000] text-sm font-medium font-inter'>Select Restaurant </Label>
                                    <SelectTrigger className="text-[#000000] text-sm font-light font-inter w-full px-4 h-[46px] border-[1px] border-[#D6D6D6] rounded-lg focus:ring focus:ring-transparent focus:border-black ">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='text-[#000000] text-sm font-light font-inter'>
                                        <SelectItem value="all-day">All day (24 hours)</SelectItem>
                                        <SelectItem value="a">ABC</SelectItem>
                                        <SelectItem value="b">ABC2</SelectItem>
                                        <SelectItem value="c">ABC3</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <Label className='text-[#000000] text-sm font-medium font-inter'>Select meal</Label>
                                    <SelectTrigger className="text-[#000000] text-sm font-light font-inter w-full px-4 h-[46px] border-[1px] border-[#D6D6D6] rounded-lg focus:ring focus:ring-transparent focus:border-black ">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='text-[#000000] text-sm font-light font-inter'>
                                        <SelectItem value="all-day">All day (24 hours)</SelectItem>
                                        <SelectItem value="a">ABC</SelectItem>
                                        <SelectItem value="b">ABC2</SelectItem>
                                        <SelectItem value="c">ABC3</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className='text-[#737373] text-sm font-normal font-inter'>All users who place an order in this meal will be eligible for the offer</p>
                            </div>
                            <div className='border-[5px] border-[#F1F1F1]'></div>
                            <div className='px-8 pt-4 w-full flex flex-col gap-4'>
                                <Select>
                                    <Label className='text-[#000000] text-xl font-semibold font-inter'>Campaign start date</Label>
                                    <SelectTrigger className="text-[#000000] text-sm font-light font-inter w-full px-4 h-[46px] border-[1px] border-[#D6D6D6] rounded-lg focus:ring focus:ring-transparent focus:border-black ">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className='text-[#000000] text-sm font-light font-inter'>
                                        <SelectItem value="all-day">4th oct 2024</SelectItem>
                                        <SelectItem value="a">ABC</SelectItem>
                                        <SelectItem value="b">ABC2</SelectItem>
                                        <SelectItem value="c">ABC3</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className='text-[#737373] text-sm font-normal font-inter mb-16'>Your offer will start on 3rd oct 2024 at 7:00 PM. You can stop this offer at anytime.</p>
                                <button className={`h-[53px] rounded-lg bg-[#CDCDCD] class-base4 fourth-color`}>Choose outlet & Activate</button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

        </>
    )
}

export default CreateOffer