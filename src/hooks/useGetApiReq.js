import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { handleLoading } from "@/store/slices/loadingSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import useCrashReporter from "@/hooks/useCrashReporter";
import { readCookie } from "@/utils/readCookie";

const useGetApiReq = () => {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = readCookie("userInfo");

  const dispatch = useDispatch();
  const { reportCrash } = useCrashReporter();

  const fetchData = async (url, options = {}) => {
    const {
      reportCrash: shouldReportCrash = false,
      screenName,
      severity = "MEDIUM", // GET is usually lower severity
      params,
      userType = "Admin",
    } = options;

    try {
      setIsLoading(true);
      dispatch(handleLoading(true));

      const response = await axiosInstance.get(url, {
        params,
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        setRes(response);
      }

      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");

      // ✅ OPTIONAL CRASH REPORTING
      if (shouldReportCrash) {
        reportCrash({
          error,
          screenName,
          severity,
          request: {
            method:"GET",
            url,
            query: params,
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

export default useGetApiReq;
