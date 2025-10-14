import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
// import { handleErrorModal, handleUnautorizedModalOpen } from "@/store/slices/errorSlice";
import toast from "react-hot-toast";
import { handleLoading } from "@/store/slices/loadingSlice";
import Cookies from "js-cookie";

const usePatchApiReq = () => {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async (url, sendData, config = {}) => {
    try {
      setIsLoading(true);
      await dispatch(handleLoading(true));
      const response = await axiosInstance.patch(url, sendData, config);
      console.log("res", response);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Saved");
        setRes(response);
      }
    } catch (error) {
      console.log("patch api error =>", error);
      if (error?.response?.status === 403) {
        // await dispatch(handleUnautorizedModalOpen({ isUnautorizedModalOpen: true }));
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
        // await dispatch(handleErrorModal({ isOpen: true, message: error.response?.data?.message || "An error occurred.",isLogoutBtn: true }));
      }
      if (error?.response?.status === 401) {
        Cookies.set("admin-status", false, { expires: 365 });
      }
    } finally {
      setIsLoading(false);
      await dispatch(handleLoading(false));
    }
  };

  return { res, isLoading, fetchData };
};

export default usePatchApiReq;
