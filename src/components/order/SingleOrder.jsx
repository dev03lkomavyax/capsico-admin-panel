import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";

const SingleOrder = ({ data, getAllOrder }) => {
  const navigate = useNavigate();

  const { timing, scheduleAt } = data;

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/order/${data?._id || data?.id}`);
  };

  const handleRemove = () => {
    setIsAlertModalOpen(true);
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteOrder = () => {
    fetchData(`/admin/delete-order?orderId=${data?._id || data?.id}`);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("order delete res", res);
      getAllOrder();
    }
  }, [res]);

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          {
            // <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
            data.new && (
              <div
                className="blink-dot"
                role="img"
                aria-label="Blinking green dot"
              ></div>
            )
          }
        </TableCell>
        {/* <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
        {data?._id}
      </TableCell> */}
        <TableCell className="text-[#1D1929] text-xs font-bold font-roboto">
          {data?.orderNumber}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
          {data?.user?.name}
        </TableCell>
        <TableCell>
          {scheduleAt && (
            <p className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
              OrderScheduleAt: {format(new Date(scheduleAt), "hh:mm:ss a")}
            </p>
          )}
          {timing?.orderedAt && (
            <p className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
              OrderPlaced: {format(new Date(timing.orderedAt), "hh:mm:ss a")}
            </p>
          )}
          {timing?.confirmedAt && (
            <p className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
              OrderAccepted(Resturant):{" "}
              {format(new Date(timing.confirmedAt), "hh:mm:ss a")}
            </p>
          )}
          {/* {timing?.restaurantrejectedAt && (
            <p className="text-xs text-muted-foreground font-semibold">
              OrderAccepted(Resturant):{" "}
              {format(new Date(timing.restaurantrejectedAt), "hh:mm:ss a")}
            </p>
          )} */}
          {timing?.deliveryAcceptedAt && (
            <p className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
              Order Accepted(DeliveryBoy):{" "}
              {format(new Date(timing.deliveryAcceptedAt), "hh:mm:ss a")}
            </p>
          )}
          {timing?.deliveryRejectedAt && (
            <p className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
              Order Rejected(DeliveryBoy):{" "}
              {format(new Date(timing.deliveryRejectedAt), "hh:mm:ss a")}
            </p>
          )}
          {timing?.readyAt && (
            <p className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
              OrderPrepared: {format(new Date(timing.readyAt), "hh:mm:ss a")}
            </p>
          )}
          {timing?.pickedUpAt && (
            <p className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
              OrderPickedUp: {format(new Date(timing.pickedUpAt), "hh:mm:ss a")}
            </p>
          )}
          {timing?.deliveredAt && (
            <p className="text-xs text-muted-foreground font-semibold">
              OrderDelivered:{" "}
              {format(new Date(timing.deliveredAt), "hh:mm:ss a")}
            </p>
          )}
        </TableCell>
        <TableCell>
          <div
            className={`${
              (data?.status === "confirmed" && "text-[#1619ac] bg-[#b9cbed]") ||
              (data?.status === "pending" && "text-[#000] bg-[#eed94e]") ||
              (data?.status === "preparing" && "text-[#AC9D16] bg-[#FAFDD4]") ||
              (data?.status === "delivered" && "text-[#4FAC16] bg-[#DCFDD4]") ||
              (data?.status === "cancelled" && "text-[#AC1616] bg-[#FDD4D4]") ||
              (data?.status === "rejected" && "text-[#AC1616] bg-[#FDD4D4]") ||
              "text-blue-600 bg-blue-100"
            }  flex justify-center whitespace-nowrap capitalize items-center h-[24px] text-[10px] font-normal font-sans rounded-[10px]`}
          >
            {data.status.split("_").join(" ")}
          </div>
        </TableCell>
        <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
          {data?.timing?.orderedAt &&
            format(new Date(data.timing?.orderedAt), "MMM dd, yyyy")}
        </TableCell>
        <TableCell className="text-[#667085] text-[9px] font-normal font-inter">
          {data.restaurant?.name}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-bold font-sans">
          {data?.amounts?.total}
        </TableCell>
        <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
          {/* {data?.orderTiming || "N/A"} */}
          {data?.timing?.orderedAt &&
            format(new Date(data.timing?.orderedAt), "hh:mm a")}
        </TableCell>

        <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
          <div className="flex gap-2 items-center">
            <Button onClick={handleEdit} size="xs" variant="capsico">
              View detail
            </Button>
            <Button onClick={handleRemove} size="xs" variant="destructive">
              Remove
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {isAlertModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          header="Delete Order"
          description="Are you sure you want to delete this Order? This action cannot be undone."
          disabled={isLoading}
          onConfirm={deleteOrder}
        />
      )}
    </>
  );
};

export default SingleOrder;
