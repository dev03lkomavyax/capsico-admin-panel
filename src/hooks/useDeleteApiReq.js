import { useState } from "react";
import { useDispatch } from "react-redux";
// import { handleErrorModal, handleUnautorizedModalOpen } from "@/store/slices/errorSlice";
import toast from "react-hot-toast";
import { handleLoading } from "@/store/slices/loadingSlice";
import { axiosInstance } from "@/utils/axiosInstance";

const useDeleteApiReq = () => {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const fetchData = async (url, config = {}) => {
        try {
            setIsLoading(true);
            await dispatch(handleLoading(true));
            const response = await axiosInstance.delete(url, config);
            if (response.status === 200 || response.status === 201) {
                toast.success(response?.data?.message || "Deleted");
                setRes(response);
                console.log("delete api response", response);
            }
        } catch (error) {
            if (error?.response.status === 403) {
                // await dispatch(handleUnautorizedModalOpen({ isUnautorizedModalOpen: true }));
            }
            else {
                toast.error(error.response?.data?.message || "An error occurred.")
                // await dispatch(handleErrorModal({ isOpen: true, message: error.response?.data?.message || "An error occurred.", isLogoutBtn: true }));
            }
        } finally {
            setIsLoading(false);
            await dispatch(handleLoading(false));
        }
    };

    return { res, isLoading, fetchData };


};

export default useDeleteApiReq;