import Offers from '@/components/offers/Offers';
import TrackOffer from '@/components/offers/TrackOffer';
import React, { useState } from 'react'

const CreateOfferPage = () => {
    const [isCreateOffer, setIsCreateOffer] = useState(true);
    return (
        <div className='border-[1px] bg-[#F5F7FA] py-20 w-full min-h-screen'>
            <div className='border-t-[1px] border-t-[#DAE1E7] px-5 flex gap-4'>
                <button onClick={() => setIsCreateOffer(true)} className={`py-3 px-2 font-inter class-base1 border-b-4 ${isCreateOffer ? "primary-color  border-[#1AA6F1]" : "border-transparent"}`}>Create offers</button>
                <button onClick={() => setIsCreateOffer(false)} className={`py-3 px-2 font-inter class-base1 border-b-4 ${isCreateOffer ? "border-transparent" : "primary-color border-[#1AA6F1]"}`}>Track Offers</button>
            </div>
            <div className='px-5'>
                {isCreateOffer ?
                    <Offers />
                    : <TrackOffer />
                }
            </div>
        </div>
    )
}

export default CreateOfferPage