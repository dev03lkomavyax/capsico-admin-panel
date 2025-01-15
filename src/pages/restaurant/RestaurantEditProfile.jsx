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
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';

const RestaurantEditProfile = () => {
    const [pageCount, setPageCount] = useState(6);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    return (
        <AdminWrapper>
            <section className='py-0 px-0'>
                <button onClick={() => navigate(-1)} className='flex justify-start items-center mb-8'>
                    <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
                    <h2 className='text-[#000000] text-xl font-medium font-roboto'>Edit Profile</h2>
                </button>

                <div className='mb-10'>
                    {page === 1 && <EditProfile1 setPage={setPage} />}
                    {page === 2 && <EditProfile2 setPage={setPage} />}
                    {page === 3 && <EditProfile3 setPage={setPage} />}
                    {page === 4 && <EditProfile4 setPage={setPage} />}
                    {page === 5 && <EditProfile5 setPage={setPage} />}
                    {page === 6 && <EditProfile6 />}
                </div>

                {/* <ReactPagination
                    setPage={setPage}
                    totalPage={pageCount}
                /> */}

            </section>
        </AdminWrapper>
    )
}

export default RestaurantEditProfile