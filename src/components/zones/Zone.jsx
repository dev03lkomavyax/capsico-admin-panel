import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Edit, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import AlertModal from "../AlertModal";
import DeliveryPartnerDropdown from "./DeliveryPartnerDropdown";
import DeliveryPartnerDialog from "./DeliveryPartnerDropdown";

const Zone = ({ zone, getZones }) => {
  const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    res: deleteRes,
    fetchData: deleteZone,
    isLoading: isDeleteChargeLoading,
  } = useDeleteApiReq();

  const deleteZoneFun = () => {
    deleteZone(`/zones/${zone?._id}?permanent=true`);
  };

  useEffect(() => {
    if (deleteRes?.status === 200 || deleteRes?.status === 201) {
      console.log("deleteRes res", deleteRes);
      getZones();
      setIsAlertDeleteModalOpen(false);
    }
  }, [deleteRes]);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{zone.name}</TableCell>
        <TableCell className="font-medium">{zone.description}</TableCell>
        <TableCell>{zone.city?.city || "NA"}</TableCell>
        <TableCell className="capitalize">{zone.type}</TableCell>
        <TableCell>
          {zone.center?.coordinates
            ? `${zone.center.coordinates[0].toFixed(
                6
              )}, ${zone.center.coordinates[1].toFixed(6)}`
            : "—"}
        </TableCell>
        <TableCell>
          {zone.type === "circle" ? zone.radius ?? "—" : "—"}
        </TableCell>
        <TableCell>
          <Badge variant={zone.isActive ? "default" : "secondary"}>
            {zone.isActive ? "Active" : "Inactive"}
          </Badge>
          {/* <Switch
          checked={zone.isActive}
          onCheckedChange={() => toggleActive(zone)}
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500 mt-2"
        /> */}
        </TableCell>
        <TableCell className="text-right">
          <div className="inline-flex items-center gap-2">
            {/* <Button size="sm" variant="ghost" onClick={() => openEditModal(zone)}>
            <Edit size={14} />
          </Button> */}
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setIsAlertDeleteModalOpen(true)}
              title="Delete Zone"
            >
              <Trash size={14} />
            </Button>
            <Button
              onClick={() => setIsDialogOpen(true)}
              size="sm"
              title="Assign zone to delivery partner"
            >
              Assign
            </Button>
            {isDialogOpen && (
              <DeliveryPartnerDialog
                open={isDialogOpen}
                setOpen={setIsDialogOpen}
                zoneId={zone._id}
              />
            )}
          </div>
        </TableCell>
      </TableRow>
      {isAlertDeleteModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertDeleteModalOpen}
          setIsAlertModalOpen={setIsAlertDeleteModalOpen}
          header="Delete Zone Charge"
          description="Are you sure you want to delete this Zone? This action cannot be undone."
          disabled={isDeleteChargeLoading}
          onConfirm={deleteZoneFun}
        />
      )}
    </>
  );
};

export default Zone;
