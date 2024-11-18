import React, { useState } from 'react'
import OfferDetails from './OfferDetails'

const TrackOffer = () => {
    const [selected, setSelected] = useState("All")
    const [offerActiveTab, setOfferActiveTab] = useState(false)

    return (
        <div className='px-5 py-5'>
            <div className='bg-white py-3 pb-0 w-auto inline-flex gap-2'>
                <button onClick={() => setSelected("All")} className={`pb-2 px-3 border-b-4 class-base1 ${selected === "All" ? "border-[#1AA6F1] primary-color" : "border-transparent"}`}>All</button>
                <button onClick={() => setSelected("Active")} className={`pb-2 px-3 border-b-4 class-base1 ${selected === "Active" ? "border-[#1AA6F1] primary-color" : "border-transparent"}`}>Active</button>
                <button onClick={() => setSelected("Inactive")} className={`pb-2 px-3 border-b-4 class-base1 ${selected === "Inactive" ? "border-[#1AA6F1] primary-color" : "border-transparent"}`}>Inactive</button>
                <button onClick={() => setSelected("Scheduled")} className={`pb-2 px-3 border-b-4 class-base1 ${selected === "Scheduled" ? "border-[#1AA6F1] primary-color" : "border-transparent"}`}>Scheduled</button>
            </div>

            <div className='mt-5 flex flex-col gap-5'>
                {
                    selected === "All" && <>
                        <OfferDetails offerActiveTab={offerActiveTab} setOfferActiveTab={setOfferActiveTab} />
                    </>
                }
                {
                    selected === "Active" && <>
                        <OfferDetails offerActiveTab={offerActiveTab} setOfferActiveTab={setOfferActiveTab} />
                    </>
                }
                {
                    selected === "Inactive" && <>
                        <OfferDetails offerActiveTab={offerActiveTab} setOfferActiveTab={setOfferActiveTab} />
                    </>
                }
                {
                    selected === "Scheduled" && <>
                        <OfferDetails offerActiveTab={offerActiveTab} setOfferActiveTab={setOfferActiveTab} />
                    </>
                }
            </div>
        </div>
    )
}

export default TrackOffer