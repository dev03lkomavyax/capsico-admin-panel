import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";

const UpdateGlobalCommissionCard = () => {
  const [commission, setCommission] = useState("");
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
  useEffect(() => {
    fetchData("/commission/get-global");
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      const { commission } = res?.data;
      setCommission(commission?.globalCommissionPercentage || 0);
    }
  }, [res]);

  /* ===============================
     Update commission
  =============================== */
  const handleUpdate = () => {
    if (commission === "" || commission < 0 || commission > 100) {
      setError("Commission must be between 0 and 100");
      return;
    }

    setError(null);
    updatePlatformFee("/commission/update-global", {
      globalCommissionPercentage: commission,
    });
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Global Commission</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
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

            <div className="flex justify-end pt-2">
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
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateGlobalCommissionCard;
