import React from 'react'

const Fallback = () => {
    return (
        <div className="w-full h-screen bg-[#1064FD] text-white flex justify-center items-center text-3xl font-semibold">
            <div className="text-center">
                <div className="mb-4 text-3xl font-extrabold ">
                    <h2 className='animate-pulse duration-1000'>Capsico</h2>
                    {/* <div className='animate-spin duration-1000'>⏳</div> */}
                </div>
            </div>
        </div>
    )
}

export default Fallback