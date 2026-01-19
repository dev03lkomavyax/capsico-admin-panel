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



export default function CashSubmissionTable({ submissions ,isLoading,getCashSubmissions}) {
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
