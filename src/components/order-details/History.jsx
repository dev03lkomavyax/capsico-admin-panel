import React from 'react'
import Timeline from './Timeline'

const History = ({ status }) => {
    return (
        <div>
            {status === "Delivered" && <>
                <Timeline
                    title="Order Delivered"
                    time="19-10-2024  00:21:01"
                    status={status}
                    className="bg-[#57A748]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Prepared"
                    time="19-10-2024  00:21:01"
                    status={status}
                    className="bg-[#57A748]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time="19-10-2024  00:21:01"
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "Preparing" && <>
                <Timeline
                    title="Order Delivered"
                    time="19-10-2024  00:21:01"
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Prepared"
                    time="19-10-2024  00:21:01"
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time="19-10-2024  00:21:01"
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "New order" && <>
                <Timeline
                    title="Order Delivered"
                    time=""
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Preparing"
                    time=""
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order Accepted"
                    time=""
                    status={status}
                    className="bg-[#7F7F7F]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time="19-10-2024  00:21:01"
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}

            {status === "Cancelled" && <>
                <Timeline
                    title="Order cancelled"
                    time=""
                    status={status}
                    className="bg-[#F05542]"
                />
                <div className="ml-3 border-l border-dashed border-gray-400 h-8"></div>
                <Timeline
                    title="Order received"
                    time="19-10-2024  00:21:01"
                    status={status}
                    className="bg-[#57A748]"
                />
            </>}
        </div>
    )
}

export default History