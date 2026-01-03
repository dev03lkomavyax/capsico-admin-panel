import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const EarningRow = ({ row }) => {
  const params = useParams();

  return (
    <TableRow
      className={cn("", row.type === "CREDIT" ? "bg-green-100" : "bg-red-100")}
      key={row._id}
    >
      <TableCell>{format(new Date(row.createdAt), "dd MMM, yyyy")}</TableCell>
      <TableCell>{row.ownerType}</TableCell>
      <TableCell
        className={row.type === "CREDIT" ? "text-green-600" : "text-red-600"}
      >
        {row.type}
      </TableCell>
      <TableCell>₹{row.amount}</TableCell>
      {/* <TableCell>₹{row.breakup?.deliveryFee || 0}</TableCell>
      <TableCell>₹{row.breakup?.incentive || 0}</TableCell> */}
      <TableCell>{row.referenceType || "-"}</TableCell>
      <TableCell>{row.remark || "-"}</TableCell>
      <TableCell>
        <button title="View Details">
          <Link
            to={`/admin/delivery-agent/${params?.deliveryAgentId}/payout/${row._id}`}
            state={{ payout: row }}
          >
            <EyeIcon />
          </Link>
        </button>
      </TableCell>
    </TableRow>
  );
};

EarningRow.Skeleton = function EarningRowSkeletion() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-6 w-28 rounded-full" />
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-56" />
        </div>
      </TableCell>

      <TableCell className="text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-6 w-24 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24 rounded-full" />
      </TableCell>
    </TableRow>
  );
};
