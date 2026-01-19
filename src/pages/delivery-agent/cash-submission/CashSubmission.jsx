import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CashSubmissionTable from "./CashSubmissionTable";
import { Metric } from "@/components/delivery-agent/Metric";
import useGetApiReq from "@/hooks/useGetApiReq";
import toast from "react-hot-toast";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import SubmitCashModal from "./SubmitCashModal";

const CashSubmission = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [submissionSummary, setSubmissionSummary] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("Monthly");

  // Optional (for Custom)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { res, fetchData, isLoading } = useGetApiReq();
  const { deliveryAgentId } = useParams();
  const { state } = useLocation();
  console.log("state", state);

  const getCashSubmissions = () => {
    if (range === "Custom" && (!startDate || !endDate)) {
      toast.error("Please select both start and end dates");
      return;
    }

    const params = new URLSearchParams({
      range,
      page,
      deliveryPartnerId: deliveryAgentId,
      ...(range === "Custom" && {
        startDate,
        endDate,
      }),
    });
    fetchData(`/cash-collection/get-all?${params.toString()}`);
  };

  useEffect(() => {
    getCashSubmissions();
  }, [page, range, startDate, endDate]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getCashSubmissions res", res?.data);
      setSubmissions(res?.data?.data?.submissions);
      setSubmissionSummary(res?.data?.data?.summary);
      setPageCount(res?.data?.pagination?.totalPages);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between gap-5 items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1"
          >
            <IoIosArrowBack className="text-2xl" />
            <span className="font-roboto text-lg font-medium">
              Cash Submissions
            </span>
          </button>

          <Button
            onClick={() => setIsModalOpen(true)}
            variant="capsico"
            className="w-auto px-4"
          >
            Submit Cash
          </Button>
        </div>

        {isModalOpen && (
          <SubmitCashModal
            open={isModalOpen}
            onClose={() => setIsModalOpen((prev) => !prev)}
            getData={getCashSubmissions}
            state={state}
          />
        )}

        <div className="flex gap-2 mt-4">
          {["Daily", "Weekly", "Monthly", "Custom"].map((r) => (
            <Button
              key={r}
              variant={range === r ? "capsico" : "outline"}
              size="sm"
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}

          {range === "Custom" && (
            <div className="flex gap-3 max-w-md">
              <DatePicker
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setEndDate(null); // reset end date if start changes
                }}
                placeholder="From date"
              />

              <DatePicker
                value={endDate}
                onChange={setEndDate}
                placeholder="To date"
                disabled={(date) => date > new Date()}
              />
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-4 bg-white rounded-md gap-4 p-4 mt-6 h-24">
            <div className="rounded-md bg-muted animate-pulse h-full" />
            <div className="rounded-md bg-muted animate-pulse h-full" />
            <div className="rounded-md bg-muted animate-pulse h-full" />
            <div className="rounded-md bg-muted animate-pulse h-full" />
          </div>
        ) : (
          <div className="grid grid-cols-4 bg-white rounded-md gap-4 p-4 mt-6">
            <Metric
              label="Cash In Hand"
              value={submissionSummary?.cashInHand || 0}
            />
            <Metric
              label="Total Cash Earned"
              value={submissionSummary?.totalCashEarned || 0}
            />
            <Metric
              label="Total Cash Submitted"
              value={submissionSummary?.totalCashSubmitted || 0}
            />
            <Metric
              label="Pending Verification"
              value={submissionSummary?.pendingVerification || 0}
            />
          </div>
        )}

        <CashSubmissionTable
          submissions={submissions}
          getCashSubmissions={getCashSubmissions}
          isLoading={isLoading}
          setPage={setPage}
          pageCount={pageCount}
        />
      </div>
    </AdminWrapper>
  );
};

export default CashSubmission;
