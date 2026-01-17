import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CashSubmissionTable from "./CashSubmissionTable";

const CashSubmission = () => {
  const navigate = useNavigate();

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

        <CashSubmissionTable />
      </div>
    </AdminWrapper>
  );
};

export default CashSubmission;
