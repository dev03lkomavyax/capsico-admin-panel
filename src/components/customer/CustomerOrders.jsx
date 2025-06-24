import React, { useEffect, useState } from "react";
import SingleOrderDetails from "./SingleOrderDetails";
import { useParams } from "react-router-dom";
import useGetApiReq from "@/hooks/useGetApiReq";
import ReactPagination from "../pagination/ReactPagination";
import { LIMIT } from "@/constants/constants";
import Spinner from "../Spinner";
import DataNotFound from "../DataNotFound";

const CustomerOrders = () => {
    const [customerOrders, setCustomerOrders] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const { customerId } = useParams();
    const { res, fetchData, isLoading } = useGetApiReq();

    const getCustomerOrders = () => {
        fetchData(`/admin/get-customer-orders/${customerId}?page=${page}&limit=${LIMIT}`);
    };

    useEffect(() => {
        getCustomerOrders();
    }, [page]);

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("getCustomerOrders res", res?.data);
            setCustomerOrders(res?.data?.orders);
            setTotalPage(res?.data?.pagination?.totalPages ||0);
            setPage(res?.data?.pagination?.page);
        }
    }, [res]);

    // console.log("customerOrders", customerOrders.map((order) => order?.issues));

    return (
        <div className="rounded-lg mt-7 p-5 bg-white">
            <h2 className="font-inter font-semibold">Order history</h2>

            <div className="flex flex-col mt-5">
                {customerOrders.map((order) => (
                    <SingleOrderDetails key={order?._id} order={order} />
                ))}

                {customerOrders.length === 0 && isLoading &&
                    <Spinner />
                }

                {customerOrders.length === 0 && !isLoading &&
                    <DataNotFound name="Orders" />
                }
            </div>

            <ReactPagination totalPage={totalPage} setPage={setPage} />
        </div>
    );
};

export default CustomerOrders;
