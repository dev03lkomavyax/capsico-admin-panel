import { Button } from "@/components/ui/button"
// import greenBadge from "@/assets/green-badge.png"

const OfferDetails = ({offerActiveTab, setOfferActiveTab}) => {
    return (
        <div className='bg-white rounded-xl'>
            <div className='p-4 bg-[#1AA6F1] flex justify-between rounded-xl'>
                <div>
                    <h2 className='text-white font-numans font-bold text-2xl'>Get a flat ₹100 off on your order!</h2>
                    <p className='text-white class-sm5 mt-1'>Begins on 13/07/2024, Ends on 01/01/2031</p>
                </div>
                <div className="flex gap-1">
                    {/* <div style={{ backgroundImage: `url(${greenBadge})` }} className="text-white w-24 bg-no-repeat bg-center py-1 px-5 text-center flex flex-col items-center justify-center">
                        <div className="text-[11px] font-medium leading-3">new users only</div>
                    </div> */}
                    <button className='class-xl6 text-white px-2'>Active</button>
                </div>
            </div>
            <div className="p-6">
                <div className="flex gap-5 justify-center">
                    <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
                        <p className="text-center text-3xl primary-color">₹0</p>
                        <p className="text-center primary-color mt-2">Completed <br /> Orders</p>
                    </div>
                    <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
                        <p className="text-center text-3xl primary-color">₹0</p>
                        <p className="text-center primary-color mt-2">Discount <br /> given</p>
                    </div>
                    <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
                        <p className="text-center text-3xl primary-color">0%</p>
                        <p className="text-center primary-color mt-2">Effective <br /> discount</p>
                    </div>
                    <div className="p-3 border border-[#1AA6F1] border-l-8 border-l-[#22C55E] rounded-xl w-[200px] shadow-custom2">
                        <p className="text-center text-3xl primary-color">₹0</p>
                        <p className="text-center primary-color mt-5">Net sales</p>
                    </div>
                </div>

                <p className="text-[#637D92] class-base1 mt-5">Performance updated as of yesterday.</p>
                <p className="text-[#637D92] class-base1 mt-5">Offer Details:</p>
                <ul className="mt-3">
                    <li className="ml-5 class-base1 text-[#637D92]">Applicable for: All users on all menu items, excluding MRP items</li>
                    <li className="ml-5 class-base1 text-[#637D92]">Minimum order value: ₹199</li>
                    <li className="ml-5 class-base1 text-[#637D92]">Valid at: Desi Platters, Khurram Nagar</li>
                    <li className="ml-5 class-base1 text-[#637D92]">Offer sharing: 100% of the discount value is funded by you</li>
                    <li className="ml-5 class-base1 text-[#637D92]">Created: Offline</li>
                </ul>
                <Button onClick={() => setOfferActiveTab(!offerActiveTab)} variant="destructive" className="w-full bg-[#E4626F] hover:bg-[#e85362] class-base1 mt-4 h-[51px] mb-5">{offerActiveTab?'Activate Offer':'Deactivate Offer'}</Button>
            </div>
        </div>
    )
}

export default OfferDetails