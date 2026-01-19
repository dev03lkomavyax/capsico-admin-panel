import DataNotFound from "@/components/DataNotFound";
import Spinner from "@/components/Spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Submission from "./Submission";
import ReactPagination from "@/components/pagination/ReactPagination";



export default function CashSubmissionTable({
  submissions,
  isLoading,
  getCashSubmissions,
  setPage,
  pageCount,
}) {
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
            <TableHead>Admin Remarks</TableHead>
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

      <ReactPagination setPage={setPage} totalPage={pageCount} />
    </div>
  );
}
