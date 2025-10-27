import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const DeliveryReqSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="w-10">
        <Skeleton className="w-6 h-6 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="flex gap-10">
        <Skeleton className="h-8 w-20 rounded-[10px]" />
        <Skeleton className="h-8 w-20 rounded-[10px]" />
      </TableCell>
    </TableRow>
  );
};

export default DeliveryReqSkeleton;
