import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export const EarningRow = ({ row }) => {
  return (
    <TableRow key={row._id}>
      <TableCell>{format(new Date(row.createdAt), "dd MMM, yyyy")}</TableCell>
      <TableCell>{row.ownerType}</TableCell>
      <TableCell
        className={row.type === "CREDIT" ? "text-green-600" : "text-red-600"}
      >
        {row.type}
      </TableCell>
      <TableCell>₹{row.amount || 0}</TableCell>
      <TableCell>₹{row.breakup?.commissionAmount || 0}</TableCell>
      <TableCell>₹{row.breakup?.subtotal || 0}</TableCell>
      <TableCell>{row.referenceType || "-"}</TableCell>
      <TableCell>{row.remark || "-"}</TableCell>
    </TableRow>
  );
};

EarningRow.Skeleton = function EarningRowSkeletion() {
  return (
    <TableRow>
      {/* Date */}
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>

      {/* Recipient ID */}
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>

      {/* Recipient Type Badge */}
      <TableCell>
        <Skeleton className="h-6 w-28 rounded-full" />
      </TableCell>

      {/* Transaction details */}
      <TableCell>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-56" />
        </div>
      </TableCell>

      {/* Amount */}
      <TableCell className="text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
      </TableCell>

      {/* Status Badge */}
      <TableCell>
        <Skeleton className="h-6 w-24 rounded-full" />
      </TableCell>
    </TableRow>
  );
};
