import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import Spinner from "@/components/Spinner";
import usePostApiReq from "@/hooks/usePostApiReq";
import { format } from "date-fns";

const PlatformFeeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState("");
  const [metaDetails, setMetaDetails] = useState("");

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: updateRes,
    fetchData: updatePlatformFee,
    isLoading: isUpdateLoading,
  } = usePostApiReq();

  const getPlatformFee = () => {
    fetchData(`/platform-settings/get`);
  };

  useEffect(() => {
    getPlatformFee();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getPlatformFee res", res?.data);
      const { platformFee, meta } = res?.data;
      setEnabled(platformFee?.enabled);
      setValue(platformFee?.value);
      setMetaDetails(meta);
    }
  }, [res]);

  const handleSave = () => {
    updatePlatformFee(`/platform-settings/create`, { enabled, value });
  };

  useEffect(() => {
    if (updateRes?.status === 200 || updateRes?.status === 201) {
      console.log("updateRes", updateRes);
      setIsModalOpen(false);
    }
  }, [updateRes]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Platform Fee Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Enable / Disable */}
          <div className="flex items-center justify-between">
            <Label className="font-medium">Enable Platform Fee</Label>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {/* Fee Amount */}
          <div className="space-y-2">
            <Label>Platform Fee Amount (₹)</Label>
            <Input
              type="number"
              min={0}
              disabled={!enabled}
              placeholder="Enter platform fee"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              This fee will be automatically applied to all new orders.
            </p>
            <div>
              {metaDetails?.updatedAt && (
                <p className="text-xs text-muted-foreground">
                  Updated on{" "}
                  {metaDetails?.updatedAt &&
                    format(new Date(metaDetails?.updatedAt), "dd MMM, yyyy")}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="capsico"
            onClick={handleSave}
            disabled={enabled && value === ""}
          >
            {isUpdateLoading ? <Spinner /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlatformFeeModal;
