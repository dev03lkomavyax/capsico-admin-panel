import { handleLoading } from "@/store/slices/loadingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const usePutApiReq = () => {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async (url, sendData, config = {}) => {
    try {
      setIsLoading(true);
      await dispatch(handleLoading(true));
      const response = await axiosInstance.put(url, sendData, {
        ...config,
        withCredentials: true,
      });
      console.log("res", response);
      if (response.status === 200 || response.status === 201) {
        setRes(response);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("put api error =>", error);
      console.log("put api error status =>", error.response);
      toast.error(error.response?.data?.message || "An error occurred.");
      // if (error?.response?.status === 403) {
      //     await dispatch(handleUnautorizedModalOpen({ isUnautorizedModalOpen: true }));
      // }
      // else {
      // }
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

export default usePutApiReq;