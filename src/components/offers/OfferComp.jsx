import greenBadge from "@/assets/Vector.png"
import redBadge from "@/assets/Vector.png"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useState } from "react";
import abcd from '@/assets/Vector2.png'

const OfferComp = ({ offerIcon, offerVale, offerPercent, tagTitle, isTagRed = false, setOfferValue }) => {

    function abc() {
        setOfferValue(offerPercent)
        console.log('bh')
    }

    const [selectVendorOrRestaurant, setSelectVendorOrRestaurant] = useState('')

    return (
        <Sheet>
            <SheetTrigger>
                <div onClick={abc} style={{ backgroundImage: `url(${abcd})` }} className='w-36 h-36 relative bg-no-repeat bg-center flex flex-col items-center justify-center'>
                    <h3 className='text-xl font-bold font-numans'>{offerPercent}% Off</h3>
                    <p className='font-numans font-medium text-xs'>Max ₹{offerVale}</p>
                    {tagTitle && <div style={{ backgroundImage: `url(${isTagRed ? redBadge : greenBadge})` }} className="text-white w-24 h-20 absolute -bottom-4 bg-no-repeat bg-center py-1 px-5 text-center flex flex-col items-center justify-center">
                        <div className="text-[11px] font-medium leading-3 break-words">{tagTitle}</div>
                        {/* <span className="block text-[11px] font-medium -mt-1">only</span> */}
                    </div>}
                </div>
            </SheetTrigger>
            <SheetContent className="min-w-[560px] w-full h-full overflow-y-scroll px-0">
                <div className="">
                    <h2 className="text-[#000000] text-base font-semibold font-inter px-4 py-2">Create New Offer</h2>
                    <div className='bg-[#4A81DA] h-[140px] w-full'>
                        <p className="text-[#FFFFFF] text-2xl font-semibold font-inter px-4 pt-24">{offerPercent}% OFF upto Rs {offerVale}</p>
                    </div>
                    <div className='px-4 pt-4 pb-7 w-full flex flex-col gap-4'>
                        <Select defaultValue={selectVendorOrRestaurant} onValueChange={setSelectVendorOrRestaurant}>
                            <Label className='text-[#000000] text-xl font-medium font-inter'>Select</Label>
                            <SelectTrigger className="text-[#000000] text-sm font-light font-inter w-full px-4 h-[46px] border-[1px] border-[#D6D6D6] rounded-lg focus:ring focus:ring-transparent focus:border-black ">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className='text-[#000000] text-sm font-light font-inter'>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                <SelectItem value="vendor">Vendor</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className='text-[#737373] text-sm font-normal font-inter'>Your offer will start on 3rd oct 2024 at 7:00 PM. You can stop this offer at anytime.</p>
                    </div>
                    <div className='border-[5px] border-[#F1F1F1]'></div>
                    <div className='px-4 pt-4 pb-10 w-full flex flex-col gap-[10px]'>
                        <p className='text-[#000000] text-base font-medium font-inter'>Offer details</p>
                        <p className='text-[#000000] text-base font-medium font-inter mb-5'>Offer applicable for: All users on all  items, excluding MRP items</p>
                        <p className='text-[#000000] text-base font-medium font-inter'>Minimum order value : Rs159</p>
                    </div>
                    <div className='border-[5px] border-[#F1F1F1]'></div>
                    <div className='px-4 pt-4 w-full flex flex-col gap-4'>
                        <div className='flex items-center gap-3 mb-16'>
                            <Checkbox className='w-[26px] h-[26px] rounded-lg' />
                            <p className='text-[#000000] text-base font-medium font-inter'>I have read and accept all the <span className='text-[#4A81DA]'>terms and conditions</span></p>
                        </div>
                        <button className={`h-[53px] rounded-lg bg-[#4A81DA] text-[#FFFFFF] text-base font-medium font-inter`}>Choose outlet & Activate</button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default OfferComp