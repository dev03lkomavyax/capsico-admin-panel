import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import VerifyCashSubmissionModal from "./CashSubmissionVerifyModal";
import { format } from "date-fns";

const statusColor = (status) => {
  if (status === "verified")
    return "bg-green-100 text-green-700 hover:bg-green-200";
  if (status === "rejected") return "bg-red-100 text-red-700 hover:bg-red-200";
  return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
};

const Submission = ({ submission, getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium whitespace-nowrap">
          {submission.receiptNumber}
        </TableCell>

        <TableCell>₹{submission.amount}</TableCell>

        <TableCell>
          <Badge className={statusColor(submission.verificationStatus)}>
            {submission.verificationStatus}
          </Badge>
        </TableCell>

        <TableCell>
          {submission.submissionDate &&
            format(new Date(submission.submissionDate), "dd MMM, yyyy hh:mm a")}
        </TableCell>

        <TableCell>
          <div className="w-80">{submission.remarks || "-"}</div>
        </TableCell>

        <TableCell>
          <div className="w-80">{submission.adminRemarks || "-"}</div>
        </TableCell>

        <TableCell>
          {submission.verifiedBy?.name ? (
            <div>
              <p>{submission.verifiedBy?.name}</p>
              <p>{submission.verifiedBy?.email}</p>
              <p>{submission.verifiedBy?.phone}</p>
            </div>
          ) : (
            "-"
          )}
        </TableCell>
        <TableCell>
          {submission.verificationStatus === "pending" ? (
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="capsico"
              className="px-4"
            >
              Verify
            </Button>
          ) : (
            <Badge>Verified</Badge>
          )}
        </TableCell>
      </TableRow>

      {isModalOpen && (
        <VerifyCashSubmissionModal
          open={isModalOpen}
          onClose={() => setIsModalOpen((prev) => !prev)}
          submissionId={submission?._id}
          getData={getData}
        />
      )}
    </>
  );
};

export default Submission;
