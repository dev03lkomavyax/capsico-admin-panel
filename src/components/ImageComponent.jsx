import React from 'react'
import { FaXmark } from 'react-icons/fa6'
import { ImFileText2 } from "react-icons/im";

const ImageCompo = ({ title }) => {
    return (
        <>
            <h3 className={`text-[#606060] text-sm font-sans font-normal mb-[13px]`}>Upload {title}</h3>
            <div className={`flex flex-col items-center justify-center gap-2 w-[350px] h-[200px] border-dashed border-[1px] border-[#4B5563] rounded-sm`}>
                <ImFileText2 />
                <p className={`text-[#4B5563] text-[9px] font-semibold font-inter`}>Drop your Image here</p>
                <div className={`w-fit text-[#4B5563] text-[9px] font-semibold font-inter border-[1px] border-[#9CA3AF] rounded-sm p-1 cursor-pointer`}>Upload</div>
                <p className={`text-[#4B5563] text-[7.2px] font-normal font-inter`}>Supports jpg,png and gif</p>
            </div>
        </>
    )
}

const ShowImageCompo = ({ field, setValue, watch, title, name }) => {
    const resetfield = ()=>{
        setValue(field, "")
        setValue(name, "")
    }
    return (
        <div className='relative w-[350px]'>
            <h3 className={`text-[#606060] text-sm font-sans font-normal mb-4`}>Upload {title}</h3>
            <img src={watch(field)} className='w-full h-full' alt="clinicQrCode-img" />
            <FaXmark onClick={resetfield} className='absolute right-[-10%] top-8 text-2xl cursor-pointer' />
        </div>
    )
}

export { ImageCompo, ShowImageCompo }
