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

const AddRestaurant = () => {
    const [pageCount, setPageCount] = useState(6);
    const [page, setPage] = useState(5);

    return (
        <section className='py-8 px-12 bg-[#f9f9f9]'>
            <div className=''>
                {page === 1 && <AddRestaurant1 page={page} setPage={setPage} />}
                {page === 2 && <AddRestaurant2 page={page} setPage={setPage} />}
                {page === 3 && <AddRestaurant3 page={page} setPage={setPage} />}
                {page === 4 && <AddRestaurant4 page={page} setPage={setPage} />}
                {page === 5 && <AddRestaurant5 page={page} setPage={setPage} />}
                {page === 6 && <AddRestaurant6 />}
            </div>

            <ReactPagination
                setPage={setPage}
                totalPage={pageCount}
            />

        </section>
    )
}

export default AddRestaurant