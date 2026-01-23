import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePutApiReq from "@/hooks/usePutApiReq";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import { readCookie } from "@/utils/readCookie";

const DeliveryPartnerDialog = ({ open, setOpen, zoneId }) => {
  const [partners, setPartners] = useState([]);
  const [selected, setSelected] = useState([]); // array for multi-select
  const [deselected, setDeselected] = useState([]);
  const userInfo = readCookie("userInfo");

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: submitRes,
    fetchData: submitData,
    isLoading: isSubmitLoading,
  } = usePutApiReq();

  useEffect(() => {
    fetchData(`/zones/get-partners?cityId=${userInfo.city || ""}`);
  }, []);

  console.log("selected", selected);
  console.log("deselected", deselected);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      const data = res?.data?.partners || [];

      // Pre-select partners already assigned to this zone
      const preSelected = data
        .filter((item) => item?.assignedZone?.zoneId?._id === zoneId)
        .map((item) => item._id);

      setSelected(preSelected);
      setPartners(data);
    }
  }, [res]);

  const handleToggle = (id, wasChecked) => {
    if (wasChecked) {
      // ✅ Unchecked now → add to deselected
      setDeselected((prev) => [...new Set([...prev, id])]);
      setSelected((prev) => prev.filter((p) => p !== id));
    } else {
      // ✅ Checked now → add to selected
      setSelected((prev) => [...new Set([...prev, id])]);
      setDeselected((prev) => prev.filter((p) => p !== id));
    }
  };

  const handleSave = () => {
    if (selected.length === 0 && deselected.length === 0) {
      toast.error("No changes to save");
      return;
    }

    submitData(`/zones/partners/zone`, {
      assign: selected,
      unassign: deselected,
      zoneId,
    });
  };

  useEffect(() => {
    if (submitRes?.status === 200 || submitRes?.status === 201) {
      toast.success("Zone updated successfully");
      setOpen(false);
    }
  }, [submitRes]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Delivery Partners</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        ) : partners.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No delivery partners found
          </p>
        ) : (
          <div className="space-y-2">
            {partners.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={p._id}
                    checked={selected.includes(p._id)}
                    onCheckedChange={(checked) =>
                      handleToggle(p._id, selected.includes(p._id))
                    }
                    disabled={isSubmitLoading}
                  />

                  <Label htmlFor={p._id}>
                    {p.personalInfo?.name || "Unnamed Partner"}
                  </Label>
                </div>

                {p?.assignedZone?.zoneId?._id === zoneId && (
                  <span className="text-xs text-green-600 font-medium">
                    Assigned
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={isSubmitLoading}>
            {isSubmitLoading ? <Spinner /> : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryPartnerDialog;
