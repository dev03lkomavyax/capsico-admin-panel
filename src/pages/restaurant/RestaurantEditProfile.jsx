import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import EditProfile1 from './EditProfile1';
import EditProfile2 from './EditProfile2';
import { useLocation, useNavigate } from 'react-router-dom';
import EditProfile3 from './EditProfile3';
import EditProfile4 from './EditProfile4';
import EditProfile5 from './EditProfile5';
import EditProfile6 from './EditProfile6';
import ReactPagination from '@/components/pagination/ReactPagination';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';
import useGetApiReq from '@/hooks/useGetApiReq';

const RestaurantEditProfile = () => {
    const { res, fetchData, isLoading } = useGetApiReq();

    const [restaurant, setRestaurant] = useState("");
    const [page, setPage] = useState(1);
    const { state } = useLocation();
    // restaurantId

    const getRestaurant = useCallback(() => {
        fetchData(`/admin/get-restaurant/${state?.restaurantId}`);
    }, [state?.restaurantId]);


    useEffect(() => {
        getRestaurant();
    }, [state?.restaurantId]);

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("restaurant details res", res);
            setRestaurant(res?.data?.data);
        }
    }, [res])

    return (
        <AdminWrapper>
            <section className='py-0 px-0'>
                <div className='mb-10'>
                    {page === 1 && <EditProfile1 restaurant={restaurant} setPage={setPage} />}
                    {page === 2 && <EditProfile2 restaurant={restaurant} setPage={setPage} />}
                    {page === 3 && <EditProfile3 restaurant={restaurant} setPage={setPage} />}
                    {page === 4 && <EditProfile4 restaurant={restaurant} setPage={setPage} />}
                    {page === 5 && <EditProfile5 restaurant={restaurant} setPage={setPage} />}
                    {page === 6 && <EditProfile6 restaurant={restaurant} />}
                </div>
            </section>
        </AdminWrapper>
    )
}

export default RestaurantEditProfile