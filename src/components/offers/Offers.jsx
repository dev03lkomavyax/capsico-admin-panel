import React, { useState } from 'react'
import offerIcon from '@/assets/Vector.png';
import promoIcon from '@/assets/Vector.png'
import OfferComp from './OfferComp'
import CreateCustomModel from './CreateCustomModel';


const Offers = () => {
    const [offerValue, setOfferValue] = useState('bh')
    const [createCustomModel, setCreateCustomModel] = useState(false)
    return (
        <div>
            <div className="flex gap-3 mt-5">
                <OfferComp
                    offerIcon={offerIcon}
                    offerPercent={50}
                    offerVale={100}
                    tag={""}
                    setOfferValue={setOfferValue}
                />
                <OfferComp
                    offerIcon={offerIcon}
                    offerPercent={40}
                    offerVale={80}
                    tag={""}
                    setOfferValue={setOfferValue}
                />
                <OfferComp
                    offerIcon={offerIcon}
                    offerPercent={50}
                    offerVale={100}
                    tagTitle={"new users only"}
                    setOfferValue={setOfferValue}
                />
                <OfferComp
                    offerIcon={offerIcon}
                    offerPercent={40}
                    offerVale={100}
                    tagTitle={"new users only"}
                    setOfferValue={setOfferValue}
                />
                <OfferComp
                    offerIcon={offerIcon}
                    offerPercent={30}
                    offerVale={75}
                    tagTitle={"new users only"}
                    setOfferValue={setOfferValue}
                />
                <OfferComp
                    offerIcon={offerIcon}
                    offerPercent={50}
                    offerVale={100}
                    tagTitle={"Lunch only"}
                    isTagRed
                    setOfferValue={setOfferValue}
                />
                <OfferComp
                    offerIcon={offerIcon}
                    offerPercent={40}
                    offerVale={80}
                    tagTitle={"Breakfast only"}
                    isTagRed
                    setOfferValue={setOfferValue}
                />
            </div>
            <h2 className='text-[#7991A4] text-base font-medium font-inter'>Personalized offer for you</h2>
            <div onClick={() => setCreateCustomModel(true)} className='bg-[#FFFFFF] rounded-lg flex items-center gap-3 p-5 h-32 max-w-[540px] cursor-pointer'>
                <div className="w-[70px] h-[70px] rounded-full bg-[#A4F4E7] flex justify-center items-center">
                    <img src={promoIcon} alt="promoIcon" />
                </div>
                <div className='space-y-2'>
                    <h3 className='text-[#000000] text-2xl font-medium font-inter'>Custom offer</h3>
                    <p className='text-[#7991A4] text-sm font-normal font-inter'>Thrill customers with complimentary discounts on every order.</p>
                </div>
            </div>
            {createCustomModel && <CreateCustomModel
                createCustomModel={createCustomModel}
                setCreateCustomModel={setCreateCustomModel}
            />}

        </div>
    )
}

export default Offers