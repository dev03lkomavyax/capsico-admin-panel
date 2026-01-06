import { axiosInstance } from "@/utils/axiosInstance";

const useCrashReporter = () => {
  const reportCrash = async ({
    error,
    screenName,
    severity = "HIGH",
    request = {},
    device = {},
    userId,
    userType,
  }) => {
    try {
      await axiosInstance.post(
        "/crash-report/create",
        {
          appName: "Admin Panel",
          appVersion: "1.0.0",
          environment: import.meta.env.MODE,

          errorName: error?.name || "UNKNOWN_ERROR",
          errorMessage: error?.message || "Something went wrong",
          stackTrace: error?.stack,

          severity,
          screenName,

          request,
          device: {
            platform: "web",
            browser: navigator.userAgent,
            ...device,
          },

          userId,
          userType,
        },
        { withCredentials: true }
      );
    } catch (e) {
      // NEVER toast, NEVER recurse
      console.error("Crash reporting failed:", e);
    }
  };

  return { reportCrash };
};

export default useCrashReporter;
