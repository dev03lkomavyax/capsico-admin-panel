import { handleLoading } from "@/store/slices/loadingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import useCrashReporter from "@/hooks/useCrashReporter";
import { readCookie } from "@/utils/readCookie";

const usePutApiReq = () => {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = readCookie("userInfo");

  const dispatch = useDispatch();
  const { reportCrash } = useCrashReporter();

  const fetchData = async (url, sendData, options = {}) => {
    const {
      reportCrash: shouldReportCrash = false,
      screenName,
      severity = "HIGH",
      userType = "Admin",
    } = options;

    try {
      setIsLoading(true);
      dispatch(handleLoading(true));

      const response = await axiosInstance.put(url, sendData, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        setRes(response);
        toast.success(response.data.message || "Updated");
      }

      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");

      // ✅ AUTO CRASH REPORTING
      if (shouldReportCrash) {
        reportCrash({
          error,
          screenName,
          severity,
          request: {
            url,
            body: sendData,
          },
          userId: userInfo.id,
          userType,
        });
      }

      if (error?.response?.status === 401) {
        Cookies.set("admin-status", false, { expires: 365 });
      }

    } finally {
      setIsLoading(false);
      dispatch(handleLoading(false));
    }
  };

  return { res, isLoading, fetchData };
};

export default usePutApiReq;
