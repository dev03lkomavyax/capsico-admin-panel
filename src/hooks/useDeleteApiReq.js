import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { handleLoading } from "@/store/slices/loadingSlice";
import { axiosInstance } from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import useCrashReporter from "@/hooks/useCrashReporter";
import { readCookie } from "@/utils/readCookie";

const useDeleteApiReq = () => {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = readCookie("userInfo");
  const { reportCrash } = useCrashReporter();

  const dispatch = useDispatch();

  const fetchData = async (url, options = {}) => {
    const {
      reportCrash: shouldReportCrash = false,
      screenName,
      severity = "HIGH",
      userType = "Admin",
    } = options;

    try {
      setIsLoading(true);
      dispatch(handleLoading(true));

      const response = await axiosInstance.delete(url, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || "Deleted");
        setRes(response);
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

export default useDeleteApiReq;
