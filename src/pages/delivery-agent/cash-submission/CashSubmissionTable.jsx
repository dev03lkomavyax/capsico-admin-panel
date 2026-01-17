import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Submission from "./Submission";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "@/components/Spinner";
import DataNotFound from "@/components/DataNotFound";

const data = [
  {
    _id: "696a2defd9cbc00d973790a3",
    deliveryPartner: "696a0b708401deb44d916722",
    amount: 25,
    receiptNumber: "CASH-SUB-1768566255518-BPF0N",
    submittedBy: "6900b492f55c66ca2f0ecd49",
    verificationStatus: "verified",
    remarks: "Cash handover to admin at Lucknow branch",
    submissionDate: "2026-01-16T12:24:15.519Z",
    createdAt: "2026-01-16T12:24:15.519Z",
    updatedAt: "2026-01-16T13:00:55.561Z",
    verifiedBy: "6900b492f55c66ca2f0ecd49",
  },
  {
    _id: "696a33bd6a3442a42fc37f28",
    deliveryPartner: "696a0b708401deb44d916722",
    amount: 30,
    receiptNumber: "CASH-SUB-1768567741731-CGLC1",
    submittedBy: "6900b492f55c66ca2f0ecd49",
    verificationStatus: "pending",
    remarks: "COD cash submission Lucknow Zone A",
    submissionDate: "2026-01-16T12:49:01.734Z",
    createdAt: "2026-01-16T12:49:01.736Z",
    updatedAt: "2026-01-16T12:49:01.736Z",
  },
];

export default function CashSubmissionTable() {
  const [submissions, setSubmissions] = useState([]);

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
    }
  }, [res]);

  return (
    <div className=" border bg-white mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Receipt No</TableHead>
            <TableHead className="whitespace-nowrap">Amount (₹)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="whitespace-nowrap">Submitted On</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Verified By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {submissions.map((submission) => (
            <Submission
              key={submission._id}
              submission={submission}
              getData={getCashSubmissions}
            />
          ))}
        </TableBody>
      </Table>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && submissions.length === 0 && (
        <DataNotFound name="Submissions" />
      )}
    </div>
  );
}
