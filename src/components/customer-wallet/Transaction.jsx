import React from "react";
import { TableCell, TableRow } from "../ui/table";

const Transaction = ({ txn }) => {
  return (
    <TableRow className="border-b border-outline-light/20 dark:border-outline-dark/20">
      <TableCell className="text-on-surface-variant-light dark:text-on-surface-variant-dark">
        {txn.date}
      </TableCell>
      <TableCell className="font-mono text-on-surface-variant-light dark:text-on-surface-variant-dark">
        {txn.txnId}
      </TableCell>
      <TableCell>
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            txn.type === "credit"
              ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
          }`}
        >
          {txn.type}
        </span>
      </TableCell>
      <TableCell
        className={`text-right font-medium ${
          txn.type === "credit"
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {txn.type === "credit" ? `+ ₹${txn.amount}.00` : `- ₹${txn.amount}.00`}
      </TableCell>
      <TableCell className="text-center">
        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          {txn.status}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default Transaction;
