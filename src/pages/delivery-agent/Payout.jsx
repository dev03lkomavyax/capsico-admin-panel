import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
const statusVariant = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "destructive",
};

export const Payout = ({ payout }) => {
  return (
    <TableRow key={payout._id}>
      <TableCell>
        {payout.payoutDate &&
          format(new Date(payout.payoutDate), "dd MMM, yyyy")}
      </TableCell>

      <TableCell className="text-xs text-muted-foreground">
        {payout?.recipientId?.personalInfo?.name || payout?.recipientId?.name}
      </TableCell>

      <TableCell>
        <Badge variant="outline">
          {payout.recipientType.replace("_", " ")}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{payout.transactionNumber || "—"}</span>
          <span className="text-xs text-muted-foreground">
            {payout.transactionDetail}
          </span>
        </div>
      </TableCell>

      <TableCell className="text-right font-semibold">
        ₹{payout.amount.toLocaleString("en-IN")}
      </TableCell>

      <TableCell>
        <Badge variant={statusVariant[payout.status]}>{payout.status}</Badge>
      </TableCell>
    </TableRow>
  );
};

Payout.Skeleton = function PayoutSkeleton() {
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
}