import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { handleLoading } from "@/store/slices/loadingSlice";
import Cookies from "js-cookie";
import useCrashReporter from "@/hooks/useCrashReporter";
import { readCookie } from "@/utils/readCookie";

const usePatchApiReq = () => {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

      const response = await axiosInstance.patch(url, sendData, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Saved");
        setRes(response);
      }

      setError(null);
      return response;
    } catch (err) {
      setError(err);
      toast.error(err.response?.data?.message || "An error occurred.");

      // ✅ AUTO CRASH REPORTING
      if (shouldReportCrash) {
        reportCrash({
          error: err,
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

      if (err?.response?.status === 401) {
        Cookies.set("admin-status", false, { expires: 365 });
      }

    } finally {
      setIsLoading(false);
      dispatch(handleLoading(false));
    }
  };

  return { res, error, isLoading, fetchData };
};

export default usePatchApiReq;
