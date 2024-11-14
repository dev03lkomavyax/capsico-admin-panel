import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import EditProfile1 from './EditProfile1';
import EditProfile2 from './EditProfile2';
import { useNavigate } from 'react-router-dom';
import EditProfile3 from './EditProfile3';
import EditProfile4 from './EditProfile4';
import EditProfile5 from './EditProfile5';
import EditProfile6 from './EditProfile6';
import ReactPagination from '@/components/pagination/ReactPagination';

const RestaurantEditProfile = () => {
    const [pageCount, setPageCount] = useState(6);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    return (
        <section className='py-8 px-12 bg-[#f9f9f9]'>
            <button onClick={() => navigate(-1)} className='flex justify-start items-center mb-8'>
                <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
                <h2 className='text-[#000000] text-xl font-medium font-roboto'>Edit Profile</h2>
            </button>

            <div className='mb-10'>
                {page === 1 && <EditProfile1 />}
                {page === 2 && <EditProfile2 />}
                {page === 3 && <EditProfile3 />}
                {page === 4 && <EditProfile4 />}
                {page === 5 && <EditProfile5 />}
                {page === 6 && <EditProfile6 />}
            </div>

            <ReactPagination
                setPage={setPage}
                totalPage={pageCount}
            />

        </section>
    )
}

export default RestaurantEditProfile