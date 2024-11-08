import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import ReactPaginate from 'react-paginate'
import EditProfile1 from './EditProfile1';
import EditProfile2 from './EditProfile2';
import { useNavigate } from 'react-router-dom';
import EditProfile3 from './EditProfile3';

const EditProfile = () => {
    const [pageCount, setPageCount] = useState(6);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    return (
        <section className='py-8 px-12 bg-[#f9f9f9]'>
            <button onClick={() => navigate(-1)} className='flex justify-start items-center mb-8'>
                <MdKeyboardArrowLeft className='text-[#000000] text-2xl' />
                <h2 className='text-[#000000] text-xl font-medium font-roboto'>Edit Profile</h2>
            </button>

            <div>
                {page === 1 && <EditProfile1 />}
                {page === 2 && <EditProfile2 />}
                {page === 3 && <EditProfile3 />}
                {page === 4 && <EditProfile1 />}
                {page === 5 && <EditProfile1 />}
                {page === 6 && <EditProfile1 />}
            </div>

            <ReactPaginate
                pageCount={pageCount}
                onPageChange={(e) => setPage(e.selected + 1)}
                containerClassName="flex justify-center items-center space-x-4 mx-auto"
                pageClassName="px-2 py-1 cursor-pointer"
                pageLinkClassName="text-[#ABABAB] font-normal font-sans"
                activeClassName="active-blue font-semibold font-sans"
                previousClassName="text-[#1D1929] text-2xl cursor-pointer"
                nextClassName="text-[#1D1929] text-2xl cursor-pointer"
                previousLabel="&#8249;"
                nextLabel="&#8250;"
                breakLabel="..."
                breakClassName="text-gray-400 px-2"
                disabledClassName="text-gray-300 cursor-not-allowed"
            />

        </section>
    )
}

export default EditProfile