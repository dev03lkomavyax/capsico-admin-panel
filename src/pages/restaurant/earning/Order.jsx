import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";

const statusVariant = {
  delivered: "success",
  cancelled: "destructive",
  rejected: "destructive",
  pending: "warning",
};


export const OrderRow = ({ order }) => {
  const { watch, setValue } = useFormContext();

  const selectedOrders = watch("selectedOrders") || [];
  const isChecked = selectedOrders.includes(order._id);

  const toggleOrder = () => {
    if (isChecked) {
      setValue(
        "selectedOrders",
        selectedOrders.filter((id) => id !== order._id)
      );
    } else {
      setValue("selectedOrders", [...selectedOrders, order._id]);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isChecked} onCheckedChange={toggleOrder} />
      </TableCell>

      <TableCell>{format(new Date(order.createdAt), "dd MMM, yyyy")}</TableCell>

      <TableCell className="font-medium">{order.orderNumber}</TableCell>

      <TableCell className="text-muted-foreground">
        {order.userName || "—"}
      </TableCell>

      <TableCell>{order.restaurantName}</TableCell>

      <TableCell className="text-right">
        ₹{order.orderAmount.toLocaleString("en-IN")}
      </TableCell>

      <TableCell className="text-right font-semibold">
        ₹{order.restaurantEarning.toLocaleString("en-IN")}
      </TableCell>

      <TableCell>
        <Badge variant={statusVariant[order.status] || "outline"}>
          {order.status}
        </Badge>
      </TableCell>
    </TableRow>
  );
};


OrderRow.Skeleton = function OrderSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-36" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
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

