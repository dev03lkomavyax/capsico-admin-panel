import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePutApiReq from "@/hooks/usePutApiReq";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

const DeliveryPartnerDialog = ({ open, setOpen, zoneId }) => {
  const [selected, setSelected] = useState("");
  const [partners, setPartners] = useState([]);

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: submitRes,
    fetchData: submitData,
    isLoading: isSubmitLoading,
  } = usePutApiReq();

  useEffect(() => {
    fetchData(`/zones/get-partners`);
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("get partners res", res);
      const data = res?.data?.partners;

      data.forEach((item) => {
        console.log(
          "item?.assignedZone?.zoneId?._id === zoneId",
          item?.assignedZone?.zoneId?._id === zoneId
        );
        if (item?.assignedZone?.zoneId?._id === zoneId) {
          setSelected(item?._id);
        }
      });

      setPartners(data || []);
    }
  }, [res]);

  console.log("selected", selected);

  const handleAssign = () => {
    console.log("Assigned partner:", selected);

    if (!selected) {
      toast.error("Select Partner");
      return;
    }
    submitData(`/zones/partners/${selected}/zone`, { zoneId });
  };

  const handleUnassign = (id) => {
    submitData(`/zones/partners/${id}/zone`);
  };

  useEffect(() => {
    if (submitRes?.status === 200 || submitRes?.status === 201) {
      setOpen(false);
    }
  }, [submitRes]);

  const isShowAsssign = partners.find(
    (p) => p?.assignedZone?.zoneId?._id === zoneId
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Delivery Partner</DialogTitle>
        </DialogHeader>

        {partners.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No delivery partners found
          </p>
        ) : (
          <RadioGroup value={selected} onValueChange={setSelected}>
            {partners.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between space-x-2 rounded-md border p-2"
              >
                <div className="flex gap-3">
                  <RadioGroupItem value={p._id} id={p._id} />
                  <Label htmlFor={p._id}>
                    {p.personalInfo?.name || "Unnamed Partner"}
                  </Label>
                </div>
                {p?.assignedZone?.zoneId?._id === zoneId && (
                  <Button
                    className="w-auto px-3"
                    onClick={() => handleUnassign(p._id)}
                    disabled={isSubmitLoading}
                  >
                    {isSubmitLoading ? <Spinner /> : "Unassign"}
                  </Button>
                )}
              </div>
            ))}
          </RadioGroup>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          {!isShowAsssign && (
            <Button onClick={handleAssign} disabled={isSubmitLoading}>
              {isSubmitLoading ? <Spinner /> : "Assign"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryPartnerDialog;
