import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import CashSubmissionTable from "./CashSubmissionTable";
import { Metric } from "@/components/delivery-agent/Metric";
import useGetApiReq from "@/hooks/useGetApiReq";

const CashSubmission = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [submissionSummary, setSubmissionSummary] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { res, fetchData, isLoading } = useGetApiReq();
  const { deliveryAgentId } = useParams();

  const getCashSubmissions = () => {
    fetchData(`/cash-collection/get-all?deliveryPartnerId=${deliveryAgentId}`);
  };

  useEffect(() => {
    getCashSubmissions();
  }, []);

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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
        >
          <IoIosArrowBack className="text-2xl" />
          <span className="font-roboto text-lg font-medium">
            Cash Submissions
          </span>
        </button>

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
