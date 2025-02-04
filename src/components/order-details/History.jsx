import React from 'react'
import Timeline from './Timeline'

const History = ({ status, timing }) => {

    // console.log("timingHistory", timing)
    // console.log("status", status)
    
    return (
        <div>
            {status === "Delivered" && <>
                <Timeline
                    title="Order Delivered"
                    time={timing?.expectedDeliveryTime}
                    status={status}
                    className="bg-[#57A748]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Prepared"
                    time={timing?.expectedDeliveryTime}
                    status={status}
                    className="bg-[#57A748]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time={timing?.expectedDeliveryTime}
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "Preparing" && <>
                <Timeline
                    title="Order Delivered"
                    time={timing?.expectedPreparationTime}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Prepared"
                    time={timing?.expectedPreparationTime}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time={timing?.expectedPreparationTime}
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "New order" && <>
                <Timeline
                    title="Order Delivered"
                    time={timing?.expectedPreparationTime}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Preparing"
                    time={timing?.expectedPreparationTime}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Accepted"
                    time={timing?.expectedPreparationTime}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time={timing?.expectedPreparationTime}
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "Cancelled" && <>
                <Timeline
                    title="Order cancelled"
                    time={timing?.orderedAt}
                    status={status}
                    className="bg-[#F05542]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time={timing?.orderedAt}
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}
        </div>
    )
}

export default History