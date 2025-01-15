import { readCookie } from "@/utils/readCookie";
import { FiBell, FiSettings } from "react-icons/fi";

const Header = () => {
    const userInfo = readCookie("userInfo");


    return (
        <header className='h-20 bg-white ps-4 pe-10 py-5 flex justify-end items-center'>
            {/* <div className='flex items-center gap-6'>
                <img src={logo} className='w-[51px] h-[48px]' alt="de9to" />
                <img src={logo} className='w-[132px] h-[48px]' alt="de9to" />
            </div> */}
            <div className="flex items-center gap-4">
                <FiBell className='text-lg text-[#397FFE]' />
                <FiSettings className='text-lg text-[#397FFE]' />

                <img src={userInfo?.userImage} className="object-cover bg-red-400 border p-[1px] w-14 h-14 rounded-full cursor-pointer" alt="profile-img" />
            </div>
        </header>
    )
}

export default Header