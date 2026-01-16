
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

export const SingleEarning = ({ earning }) => {
  const params = useParams();
  
  return (
    <TableRow
    >
      <TableCell>{}</TableCell>
    </TableRow>
  );
};

SingleEarning.Skeleton = function SingleEarningSkeletion() {
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

      <TableCell className="text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
      </TableCell>
    </TableRow>
  );
};
