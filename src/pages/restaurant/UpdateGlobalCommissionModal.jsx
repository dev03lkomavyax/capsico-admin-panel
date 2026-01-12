import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/utils/axiosInstance";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";

const UpdateGlobalCommissionModal = ({ open, onOpenChange }) => {
  const [commission, setCommission] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: updateRes,
    fetchData: updatePlatformFee,
    isLoading: isUpdateLoading,
  } = usePostApiReq();

  /* ===============================
  Fetch existing commission
  =============================== */
  const fetchCommission = async () => {
    fetchData(`/commission/get-global`);
  };

  useEffect(() => {
    fetchCommission();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("fetchCommission res", res?.data);
      const { commission } = res?.data;
      setCommission(commission?.globalCommissionPercentage || 0);
    }
  }, [res]);

  /* ===============================
  Update commission
  =============================== */
  const handleUpdate = async () => {
    if (commission === "" || commission < 0 || commission > 100) {
      setError("Commission must be between 0 and 100");
      return;
    }

    setError(null);
    updatePlatformFee(`/commission/update-global`, {
      globalCommissionPercentage: commission,
    });
  };

  useEffect(() => {
    if (updateRes?.status === 200 || updateRes?.status === 201) {
      console.log("updateRes", updateRes);
      onOpenChange();
    }
  }, [updateRes]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Global Commission Settings</DialogTitle>
        </DialogHeader>

        <Card className="border-none shadow-none">
          <CardContent className="space-y-4 p-0">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading commission...
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Global Commission (%)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={commission}
                    onChange={(e) =>
                      setCommission(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    placeholder="Enter commission percentage"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
              </>
            )}
          </CardContent>
        </Card>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            variant="capsico"
            onClick={handleUpdate}
            disabled={isUpdateLoading}
          >
            {isUpdateLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGlobalCommissionModal;
