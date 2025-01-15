import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import Offers from '@/components/offers/Offers';
import TrackOffer from '@/components/offers/TrackOffer';
import React, { useState } from 'react'

const CreateOfferPage = () => {
    const [isCreateOffer, setIsCreateOffer] = useState(true);
    return (
        <AdminWrapper>
            <section className='w-full'>
                <div className='px-5 flex gap-4'>
                    <button onClick={() => setIsCreateOffer(true)} className={`py-3 px-2 font-inter class-base1 border-b-4 ${isCreateOffer ? "primary-color  border-[#1AA6F1]" : "border-transparent"}`}>Create offers</button>
                    <button onClick={() => setIsCreateOffer(false)} className={`py-3 px-2 font-inter class-base1 border-b-4 ${isCreateOffer ? "border-transparent" : "primary-color border-[#1AA6F1]"}`}>Track Offers</button>
                </div>
                <div className='px-5'>
                    {isCreateOffer ?
                        <Offers />
                        : <TrackOffer />
                    }
                </div>
            </section>
        </AdminWrapper>
    )
}

export default CreateOfferPage