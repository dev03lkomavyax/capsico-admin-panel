import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { getSocket } from "@/socket";

const CANCEL_REASONS = [
  "Restaurant unavailable",
  "Items out of stock",
  "Delivery partner not available",
  "Suspicious order",
  "Customer request",
  "Other",
];

const CancelOrderModal = ({ open, onClose, orderId }) => {
  const socket = getSocket();
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [loading, setLoading] = useState(false);

  const finalReason = reason === "Other" ? customReason : reason;

  const handleCancelOrder = () => {
    if (!finalReason) return;

    setLoading(true);

    socket.emit("order_cancelled", {
      orderId,
      reason: finalReason,
    });

    // socket.once("cancellation_confirmed", () => {
    //   setLoading(false);
    //   onClose();
    // });

    // socket.once("error", () => {
    //   setLoading(false);
    // });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Label className="font-medium">Select cancellation reason</Label>

          <RadioGroup
            value={reason}
            onValueChange={setReason}
            className="space-y-2"
          >
            {CANCEL_REASONS.map((item) => (
              <label
                key={item}
                className="flex items-start gap-3 rounded-md border p-3 cursor-pointer hover:bg-muted"
              >
                <RadioGroupItem value={item} />
                <span className="text-sm font-medium">{item}</span>
              </label>
            ))}
          </RadioGroup>

          {reason === "Other" && (
            <Textarea
              placeholder="Enter cancellation reason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Close
          </Button>

          <Button
            variant="destructive"
            onClick={handleCancelOrder}
            disabled={!finalReason || loading}
          >
            {loading ? "Cancelling..." : "Confirm Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderModal;
