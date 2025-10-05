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

const TicketAssignModal = ({
  open,
  setOpen,
  ticketId,
  getTickets,
  assignedTo,
}) => {
  const [selected, setSelected] = useState("");
  const [subadmins, setSubadmins] = useState([]);

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: submitRes,
    fetchData: submitData,
    isLoading: isSubmitLoading,
  } = usePutApiReq();

  useEffect(() => {
    fetchData(`/admin/get-subadmins`);
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("get-subadmins res", res);
      const data = res?.data?.subAdmins;

      // data.forEach((item) => {
      //   console.log(
      //     "item?.assignedZone?.zoneId?._id === zoneId",
      //     item?.assignedZone?.zoneId?._id === zoneId
      //   );
      //   if (item?.assignedZone?.zoneId?._id === zoneId) {
      //     setSelected(item?._id);
      //   }
      // });

      setSubadmins(data || []);
    }
  }, [res]);

  console.log("selected", selected);

  const handleAssign = () => {
    console.log("Assigned partner:", selected);
    if(!selected){
      toast.error("Select Subadmin")
      return;
    }
    submitData(`/deliveryExec//admin/assign-ticket/${ticketId}`, {
      assignToAdminId: selected,
    });
  };

  useEffect(() => {
    if (submitRes?.status === 200 || submitRes?.status === 201) {
      getTickets();
      setOpen(false);
    }
  }, [submitRes]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Subadmin</DialogTitle>
        </DialogHeader>

        {subadmins.length === 0 ? (
          <p className="text-sm text-muted-foreground">No subadmins found</p>
        ) : (
          <RadioGroup value={selected} onValueChange={setSelected}>
            {subadmins.map((subadmin) => (
              <div
                key={subadmin._id}
                className="flex items-center justify-between space-x-2 rounded-md border p-2"
              >
                <div className="flex gap-3">
                  <RadioGroupItem value={subadmin._id} id={subadmin._id} />
                  <Label htmlFor={subadmin._id}>{subadmin?.name || "NA"}</Label>
                </div>
                {/* {assignedTo === subadmin.name && (
                  <Button
                    className="w-auto px-3"
                    onClick={() => handleUnassign(subadmin._id)}
                    disabled={isSubmitLoading}
                  >
                    {isSubmitLoading ? <Spinner /> : "Unassign"}
                  </Button>
                )} */}
              </div>
            ))}
          </RadioGroup>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {/* {subadmins.length !== 0 && (
            <>
              {!selected && ( */}
          <Button onClick={handleAssign} disabled={isSubmitLoading}>
            {isSubmitLoading ? <Spinner /> : "Assign"}
          </Button>
          {/* )}
            </>
          )} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketAssignModal;
