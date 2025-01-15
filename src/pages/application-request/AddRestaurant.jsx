import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import ReactPagination from '@/components/pagination/ReactPagination';
import AddRestaurant1 from './AddRestaurant1';
import AddRestaurant2 from './AddRestaurant2';
import AddRestaurant3 from './AddRestaurant3';
import AddRestaurant4 from './AddRestaurant4';
import AddRestaurant5 from './AddRestaurant5';
import AddRestaurant6 from './AddRestaurant6';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';

const AddRestaurant = () => {
    const [pageCount, setPageCount] = useState(6);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    return (
        <AdminWrapper>
            <section>
                <button onClick={() => navigate(-1)} className='flex justify-start items-center mb-8'>
                    <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
                    <h2 className='text-[#000000] text-xl font-medium font-roboto'>Edit Profile</h2>
                </button>

                <div className='mb-10'>
                    {page === 1 && <AddRestaurant1 />}
                    {page === 2 && <AddRestaurant2 />}
                    {page === 3 && <AddRestaurant3 />}
                    {page === 4 && <AddRestaurant4 />}
                    {page === 5 && <AddRestaurant5 />}
                    {page === 6 && <AddRestaurant6 />}
                </div>

                <ReactPagination
                    setPage={setPage}
                    totalPage={pageCount}
                />

            </section>
        </AdminWrapper>
    )
}

export default AddRestaurant