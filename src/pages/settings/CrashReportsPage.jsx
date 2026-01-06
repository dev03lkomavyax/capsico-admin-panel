import useGetApiReq from "@/hooks/useGetApiReq";
import { CrashFilters } from "./CrashFilters";
import { adaptCrashForList } from "./crashListAdapter";
import { CrashTable } from "./CrashTable";
import { useEffect, useState } from "react";
import ReactPagination from "@/components/pagination/ReactPagination";

const mockCrashes = [
  {
    _id: "65a4f01a9b1c1a001",
    appName: "FoodieApp",
    appVersion: "1.4.2",
    environment: "production",

    errorName: "TypeError",
    errorMessage: "Cannot read properties of undefined (reading 'length')",
    stackTrace: "at CheckoutScreen.tsx:87",

    severity: "CRITICAL",
    screenName: "CheckoutScreen",

    device: {
      platform: "Android",
      os: "Android",
      osVersion: "13",
      deviceModel: "Pixel 7",
    },

    userId: "user_2391",
    userType: "User",

    resolved: false,
    crashAt: "2026-01-05T17:40:10.000Z",
    createdAt: "2026-01-05T17:40:10.000Z",
    updatedAt: "2026-01-05T17:40:10.000Z",
  },
  {
    _id: "65a4f01a9b1c1a002",
    appName: "DeliveryPartnerApp",
    appVersion: "2.0.0",
    environment: "staging",

    errorName: "NetworkError",
    errorMessage: "Request failed with status code 500",
    stackTrace: "at api.ts:112",

    severity: "MEDIUM",
    screenName: "OrdersList",

    device: {
      platform: "Android",
      os: "Android",
      osVersion: "12",
      deviceModel: "Samsung S21",
    },

    userId: "partner_442",
    userType: "DeliveryPartner",

    resolved: false,
    crashAt: "2026-01-05T16:36:42.000Z",
    createdAt: "2026-01-05T16:36:42.000Z",
    updatedAt: "2026-01-05T16:36:42.000Z",
  },
  {
    _id: "65a4f01a9b1c1a003",
    appName: "AdminDashboard",
    appVersion: "0.9.8",
    environment: "development",

    errorName: "SyntaxError",
    errorMessage: "Unexpected token '<'",
    stackTrace: "at CrashReportsPage.tsx:19",

    severity: "LOW",
    screenName: "CrashReportsPage",

    device: {
      platform: "Web",
      os: "Windows",
      browser: "Chrome 143",
    },

    userId: "admin_12",
    userType: "User",

    resolved: true,
    resolvedAt: "2026-01-04T19:00:00.000Z",
    crashAt: "2026-01-04T18:10:00.000Z",
    createdAt: "2026-01-04T18:10:00.000Z",
    updatedAt: "2026-01-04T19:00:00.000Z",
  },
];

export function CrashReportsPage() {
  const [crashReports, setCrashReports] = useState([]);
  const [environment, setEnvironment] = useState("");
  const [severity, setSeverity] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getCrashReport = () => {
    fetchData(
      `/crash-report/get?environment=${environment}&severity=${severity}`
    );
  };

  useEffect(() => {
    getCrashReport();
  }, [environment, severity, page]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getCrashReport res", res?.data);
      const modifiedData = res?.data?.data?.map(adaptCrashForList);
      setCrashReports(modifiedData);
      setPageCount(res?.data?.meta?.totalPages);
    }
  }, [res]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Crash Reports</h1>
        <p className="text-sm text-muted-foreground">
          Total Crashes: <span className="font-mono">{res?.data?.meta?.total || 0}</span>
        </p>
      </header>

      <div className="rounded-xl border bg-white dark:bg-[#111722]">
        <CrashFilters
          environment={environment}
          setEnvironment={setEnvironment}
          severity={severity}
          setSeverity={setSeverity}
        />
        <CrashTable crashes={crashReports} />

        <ReactPagination setPage={setPage} totalPage={pageCount} />
      </div>
    </div>
  );
}
