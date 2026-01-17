import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { round2 } from "../admin/Metric/utils";

export const SingleEarning = ({ earning, index }) => {
  const params = useParams();

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <div>
          <p>{earning?.name}</p>
          <p>{earning?.phone}</p>
          <p>{earning?.email}</p>
        </div>
      </TableCell>
      <TableCell>₹ {round2(earning?.balance)}</TableCell>
      <TableCell>
        <Link
          className="underline text-blue-600 hover:text-blue-700 underline-offset-2 font-semibold"
          to={`/admin/restaurant/${earning?.restaurantId}/payout/create`}
        >
          Create Payout
        </Link>
      </TableCell>
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
