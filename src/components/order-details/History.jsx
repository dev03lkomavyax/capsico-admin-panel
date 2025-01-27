import React from 'react'
import Timeline from './Timeline'
import { format } from 'date-fns'

const History = ({ status, timing }) => {
    
    return (
        <div>
            {status === "Delivered" && <>
                <Timeline
                    title="Order Delivered"
                    // time="19-10-2024  00:21:01"
                    time={timing?.expectedDeliveryTime && format(new Date(timing?.expectedDeliveryTime), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#57A748]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Prepared"
                    time={timing?.expectedDeliveryTime && format(new Date(timing?.expectedDeliveryTime), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#57A748]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time={timing?.expectedDeliveryTime && format(new Date(timing?.expectedDeliveryTime), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "Preparing" && <>
                <Timeline
                    title="Order Delivered"
                    time={timing?.expectedPreparationTime && format(new Date(timing?.expectedPreparationTime), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Prepared"
                    time={timing?.expectedPreparationTime && format(new Date(timing?.expectedPreparationTime), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time={timing?.expectedPreparationTime && format(new Date(timing?.expectedPreparationTime), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "New order" && <>
                <Timeline
                    title="Order Delivered"
                    time={timing?.orderedAt && format(new Date(timing?.orderedAt), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Preparing"
                    time={timing?.orderedAt && format(new Date(timing?.orderedAt), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Accepted"
                    time={timing?.orderedAt && format(new Date(timing?.orderedAt), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time={timing?.orderedAt && format(new Date(timing?.orderedAt), "dd-MM-yyyy")}
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "Cancelled" && <>
                <Timeline
                    title="Order cancelled"
                    time={timing}
                    status={status}
                    className="bg-[#F05542]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time={timing}
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}
        </div>
    )
}

export default History