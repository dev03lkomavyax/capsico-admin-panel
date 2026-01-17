import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";

const UpdateGlobalGSTCard = () => {
  const [gst, setGst] = useState({
    restaurantGST: { enabled: true, percentage: 0 },
    platformFeeGST: { enabled: true, percentage: 0 },
    deliveryFeeGST: { enabled: true, percentage: 0 },
    commissionGST: { enabled: true, percentage: 0 },
  });

  const [error, setError] = useState(null);

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: updateRes,
    fetchData: updateGST,
    isLoading: isUpdateLoading,
  } = usePostApiReq();

  /* ===============================
     Fetch existing GST config
  =============================== */
  useEffect(() => {
    fetchData("/commission/get-global-gst");
  }, []);

  useEffect(() => {
    if (res?.status === 200) {
      setGst(res?.data?.gst);
    }
  }, [res]);

  /* ===============================
     Update GST
  =============================== */
  const handleUpdate = () => {
    const isInvalid =
      gst.restaurantGST.percentage < 0 ||
      gst.restaurantGST.percentage > 28 ||
      gst.platformFeeGST.percentage < 0 ||
      gst.platformFeeGST.percentage > 28 ||
      gst.deliveryFeeGST.percentage < 0 ||
      gst.deliveryFeeGST.percentage > 28 ||
      gst.commissionGST.percentage < 0 ||
      gst.commissionGST.percentage > 28;

    if (isInvalid) {
      setError("GST percentage must be between 0 and 28");
      return;
    }

    setError(null);
    updateGST("/commission/update-global-gst", gst);
  };

  const renderGSTInput = (label, path) => (
    <div className="space-y-2">
      <Label>{label} (%)</Label>
      <Input
        type="number"
        min={0}
        max={28}
        value={gst[path].percentage}
        onChange={(e) =>
          setGst((prev) => ({
            ...prev,
            [path]: {
              ...prev[path],
              percentage: e.target.value === "" ? "" : Number(e.target.value),
            },
          }))
        }
        placeholder="Enter GST %"
      />
    </div>
  );

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Global GST</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading GST configuration...
          </div>
        ) : (
          <>
            {renderGSTInput("Restaurant GST (Food)", "restaurantGST")}
            {renderGSTInput("Platform Fee GST", "platformFeeGST")}
            {renderGSTInput("Delivery Fee GST", "deliveryFeeGST")}
            {renderGSTInput("Restaurant Commission GST", "commissionGST")}

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
                  "Update GST"
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateGlobalGSTCard;
