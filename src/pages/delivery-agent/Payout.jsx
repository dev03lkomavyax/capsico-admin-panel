import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { axiosInstance } from "@/utils/axiosInstance";
import { format } from "date-fns";
import { DownloadIcon } from "lucide-react";
const statusVariant = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "destructive",
};

export const Payout = ({ payout }) => {
  const downloadPdf = async () => {
    try {
      const response = await axiosInstance.get(
        `/payout/download/${payout._id}`,
        {
          responseType: "blob", // 🔴 REQUIRED
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `PAYOUT_REPORT_${payout._id}.pdf`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
    }
  };

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
      {payout.recipientType === "MERCHANT" && (
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="w-auto px-4"
                  variant="capsico"
                  onClick={downloadPdf}
                >
                  <DownloadIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Payout Report</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
      )}
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
};
