import { getSocket } from "@/socket";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SanitizationModal = ({ open, setOpen, orderId }) => {
  const socket = getSocket();

  const [temperature, setTemperature] = useState("");
  const [sanitized, setSanitized] = useState("");

  const handleSubmit = () => {
    if (!temperature || sanitized === "") return;

    socket.emit("sanitization_completed", {
      orderId,
      temperature: Number(temperature),
      sanitization: sanitized === "true",
    });

    setOpen(false);
    setTemperature("");
    setSanitized("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Sanitization</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Temperature */}
          <div className="space-y-1">
            <Label>Temperature (°C)</Label>
            <Input
              type="number"
              placeholder="Enter temperature"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>

          {/* Sanitization */}
          <div className="space-y-1">
            <Label>Sanitization Done</Label>
            <Select value={sanitized} onValueChange={setSanitized}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SanitizationModal;
