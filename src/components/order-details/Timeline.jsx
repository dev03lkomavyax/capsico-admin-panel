import React from 'react'
import { FaCheck, FaXmark } from 'react-icons/fa6'

const Timeline = ({ title, time, status, className }) => {
    return (
        <div className="flex items-center space-x-2">
            <div className={`flex items-center justify-center w-6 h-6 ${className} p-[6px] text-white rounded-full`}>
                {status === "Cancelled" ? <FaXmark /> : <FaCheck />}
            </div>
            <div className="flex flex-col">
                <span className="text-black font-medium text-sm">{title}</span>
                <span className="text-[#6E6D6D] text-xs">{time}</span>
            </div>
        </div>
    )
}

export default Timeline