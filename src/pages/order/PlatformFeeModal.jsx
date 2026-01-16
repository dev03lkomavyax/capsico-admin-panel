import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import Spinner from "@/components/Spinner";
import usePostApiReq from "@/hooks/usePostApiReq";
import { format } from "date-fns";

const PlatformFeeCard = () => {
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState("");
  const [metaDetails, setMetaDetails] = useState(null);

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: updateRes,
    fetchData: updatePlatformFee,
    isLoading: isUpdateLoading,
  } = usePostApiReq();

  /* ===============================
     Fetch platform fee
  =============================== */
  useEffect(() => {
    fetchData("/platform-settings/get");
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      const { platformFee, meta } = res?.data;
      setEnabled(platformFee?.enabled);
      setValue(platformFee?.value);
      setMetaDetails(meta);
    }
  }, [res]);

  /* ===============================
     Save platform fee
  =============================== */
  const handleSave = () => {
    updatePlatformFee("/platform-settings/create", { enabled, value });
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Platform Fee</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
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

              {metaDetails?.updatedAt && (
                <p className="text-xs text-muted-foreground">
                  Updated on{" "}
                  {format(new Date(metaDetails.updatedAt), "dd MMM, yyyy")}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <Button
                variant="capsico"
                onClick={handleSave}
                disabled={enabled && value === ""}
              >
                {isUpdateLoading ? <Spinner /> : "Update"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformFeeCard;
