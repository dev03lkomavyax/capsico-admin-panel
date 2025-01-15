import { useState } from "react";
import { useDispatch } from "react-redux";
// import { handleErrorModal, handleUnautorizedModalOpen } from "@/store/slices/errorSlice";
import toast from "react-hot-toast";
import { handleLoading } from "@/store/slices/loadingSlice";
import { axiosInstance } from "@/utils/axiosInstance";

const usePostApiReq = () => {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const fetchData = async (url, sendData, config = {}) => {
        try {
            setIsLoading(true);
            await dispatch(handleLoading(true));
            const response = await axiosInstance.post(url, sendData, { ...config, withCredentials: true });
            console.log("res", response);
            if (response.status === 200 || response.status === 201) {
                setRes(response);
                toast.success(response.data.message || "Saved");
            }
        } catch (error) {
            console.log("post api error =>", error);
            if (error?.response?.status === 403) {
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

export default usePostApiReq;