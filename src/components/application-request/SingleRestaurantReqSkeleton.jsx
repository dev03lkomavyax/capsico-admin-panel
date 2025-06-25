import React from 'react'
import { TableCell, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';

const SingleRestaurantReqSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="w-10">
        <Skeleton className="w-6 h-6 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell className="flex gap-10">
        <Skeleton className="h-8 w-20 rounded-[10px]" />
        <Skeleton className="h-8 w-20 rounded-[10px]" />
      </TableCell>
    </TableRow>
  );
}

export default SingleRestaurantReqSkeleton