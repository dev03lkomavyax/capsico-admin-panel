import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import { getSocket } from "@/socket";
import toast from "react-hot-toast";

const OrderUpdateModal = ({ open, setOpen, newOrder }) => {
  const [isRejected, setIsRejected] = useState(false);
  const [selected, setSelected] = useState("");
  const socket = getSocket();

  // ------------------------
  // Reject Order
  // ------------------------
  const handleCancel = (e) => {
    e.preventDefault();

    if (!selected) {
      toast.error("Please select a reason");
      return;
    }

    socket.emit("update_order_status", {
      orderId: newOrder?.id || newOrder?._id,
      status: "rejected",
      reason: selected,
    });

    setIsRejected(false);
    setOpen(false);
    toast.success("Order Rejected Successfully");
  };

  // ------------------------
  // Accept Order
  // ------------------------
  const handleAction = (e) => {
    e.preventDefault();

    socket.emit("update_order_status", {
      orderId: newOrder?.id || newOrder?._id,
      status: "confirmed",
      time: 10,
      reason: "",
    });

    setOpen(false);
    toast.success("Order Accepted Successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        {/* ACTION BUTTONS */}
        {!isRejected && (
          <div className="flex gap-3 mt-4">
            <Button className="w-full" variant="capsico" onClick={handleAction}>
              Accept Order
            </Button>

            <Button
              className="w-full"
              variant="destructive"
              onClick={() => setIsRejected(true)}
            >
              Reject Order
            </Button>
          </div>
        )}

        {/* REJECTION REASONS */}
        {isRejected && (
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <Label className="font-medium">Select reason</Label>
              <Button
                onClick={() => setIsRejected(false)}
                variant="ghost"
                className="p-0 hover:bg-transparent"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>

            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="grid gap-2"
            >
              <label className="flex items-start gap-3 rounded-md border p-3 cursor-pointer hover:shadow-sm">
                <RadioGroupItem
                  value="Items out of stock"
                  className="mt-[6px]"
                />
                <div className="font-semibold">Items out of stock</div>
              </label>

              <label className="flex items-start gap-3 rounded-md border p-3 cursor-pointer hover:shadow-sm">
                <RadioGroupItem value="Outlet closed" className="mt-[6px]" />
                <div className="font-semibold">Outlet closed</div>
              </label>

              <label className="flex items-start gap-3 rounded-md border p-3 cursor-pointer hover:shadow-sm">
                <RadioGroupItem value="Kitchen is full" className="mt-[6px]" />
                <div className="font-semibold">Kitchen is full</div>
              </label>
            </RadioGroup>

            <Button
              onClick={handleCancel}
              className="w-full rounded-lg"
              variant="capsico"
            >
              Submit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderUpdateModal;
