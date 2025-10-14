import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import TransactionViewModal from "./TransactionViewModal";
import { generateTransactionId } from "@/lib/utils";
import { format } from "date-fns";
import TransactionStatus from "./TransactionStatus";
import { useNavigate } from "react-router-dom";

const Transaction1 = ({ txn }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const txnId = generateTransactionId(txn.id);
  const navigate = useNavigate();

  const handleClick = () => {
    if (txn?.orderDetails?.orderId) {
      navigate(`/admin/order/${txn?.orderDetails?.orderId}`);
    }
  };

  return (
    <>
      <TableRow className="hover:bg-surface dark:hover:bg-white/5">
        <TableCell className="whitespace-nowrap text-sm font-medium text-on-surface dark:text-white">
          {txn.id ? txnId : "-"}
        </TableCell>
        <TableCell className="whitespace-nowrap text-sm text-on-surface-variant dark:text-white/80">
          <span
            className={`inline-flex items-center rounded-full capitalize px-2 py-1 text-xs font-medium ${
              txn.type === "credit"
                ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
            }`}
          >
            {txn.type}
          </span>
        </TableCell>
        <TableCell
          className={`whitespace-nowrap text-sm font-semibold ${
            txn.type === "credit" ? "text-green-500" : "text-destructive"
          }`}
        >
          {txn.type === "credit"
            ? `+ ₹${txn.amount}`
            : `- ₹${Math.abs(txn.amount)}`}
        </TableCell>
        <TableCell className="whitespace-nowrap text-sm text-on-surface-variant dark:text-white/80">
          {txn.reason || "-"}
        </TableCell>
        <TableCell
          onClick={handleClick}
          className="whitespace-nowrap cursor-pointer text-sm text-on-surface-variant dark:text-white/80"
        >
          {txn?.orderDetails?.orderNumber || "-"}
        </TableCell>
        <TableCell className="whitespace-nowrap text-sm text-on-surface-variant dark:text-white/80">
          {txn.timestamp && format(new Date(txn.timestamp), "dd MMM, yyyy")}
        </TableCell>
        <TableCell className="whitespace-nowrap text-sm capitalize text-on-surface-variant dark:text-white/80">
          <Badge variant="outline">{txn.initiatedBy}</Badge>
        </TableCell>
        <TableCell className="text-center">
          <TransactionStatus status={txn.status} />
        </TableCell>
        <TableCell className="whitespace-nowrap text-sm">
          <Button
            onClick={() => setIsViewModalOpen(true)}
            variant="outline"
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/20"
          >
            <EyeIcon />
            View
          </Button>
        </TableCell>
      </TableRow>

      {isViewModalOpen && (
        <TransactionViewModal
          isOpen={isViewModalOpen}
          setIsOpen={setIsViewModalOpen}
          transactionId={txn.id}
          customId={txnId}
        />
      )}
    </>
  );
};

export default Transaction1;
