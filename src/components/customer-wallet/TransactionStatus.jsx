import React from 'react'
import { Badge } from "@/components/ui/badge";

const TransactionStatus = ({ status })=> {
  const variant =
    status === "success"
      ? "success"
      : status === "failed"
      ? "destructive"
      : "warning";

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
}

export default TransactionStatus