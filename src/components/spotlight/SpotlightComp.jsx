import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import AlertModal from "../AlertModal";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { Switch } from "../ui/switch";
import usePatchApiReq from "@/hooks/usePatchApiReq";

const SpotlightComp = ({ spotlight, getData }) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(spotlight.isActive || false);

  const handleRemove = () => {
    setIsAlertModalOpen(true);
  };

  const { res, fetchData, isLoading } = useDeleteApiReq();
  const {
    res: updateStatusRes,
    fetchData: updateStatus,
    isLoading: isUpdateStatusLoading,
  } = usePatchApiReq();

  const deleteSpotlight = () => {
    fetchData(`/spotlight/deleteSpotlight/${spotlight?._id}`);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("delete delivery agent res", res);
      getData();
      setIsAlertModalOpen(false);
    }
  }, [res]);

  const toggleStatus = () => {
    setIsActive((prev) => !prev);
    updateStatus(`/spotlight/toggleSpotlightStatus/${spotlight._id}/toggle-status`);
  };

  useEffect(() => {
    if (updateStatusRes?.status === 200 || updateStatusRes?.status === 201) {
      console.log("toggleStatus res", updateStatusRes);
    }
  }, [updateStatusRes]);

  return (
    <>
      <TableRow>
        {/* ======= Restaurant ======= */}
        <TableCell className="font-medium">
          <div className="flex items-center gap-2">
            {/* {spotlight.restaurantId?.images?.[0] && (
            <img
            src={`${
              spotlight.restaurantId.images[0]
              }`}
              alt={spotlight.restaurantId.name}
              className="w-8 h-8 rounded-md object-cover"
              />
          )} */}
            <span>{spotlight.restaurantId?.name || "N/A"}</span>
          </div>
        </TableCell>

        {/* ======= Spotlight Items ======= */}
        <TableCell className="max-w-[250px] truncate">
          {spotlight.spotlightFoodIds.map((item) => item.name).join(", ")}
        </TableCell>

        {/* ======= Priority ======= */}
        <TableCell>{spotlight.priority ?? "-"}</TableCell>

        {/* ======= Dates ======= */}
        <TableCell>
          {spotlight.startDate
            ? new Date(spotlight.startDate).toLocaleDateString()
            : "-"}
        </TableCell>
        <TableCell>
          {spotlight.endDate
            ? new Date(spotlight.endDate).toLocaleDateString()
            : "-"}
        </TableCell>

        {/* ======= Created On ======= */}
        <TableCell>
          {new Date(spotlight.createdAt).toLocaleDateString()}
        </TableCell>

        {/* ======= Status ======= */}
        <TableCell>
          <div className="space-y-2 flex-col flex">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
            <Switch
              checked={isActive}
              onCheckedChange={toggleStatus}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-orange-500"
            />
          </div>
        </TableCell>

        <TableCell>
          <Button onClick={handleRemove} size="icon" variant="destructive">
            <TrashIcon />
          </Button>
        </TableCell>
      </TableRow>
      {isAlertModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          header="Delete Spotlight"
          description="Are you sure you want to delete this Spotlight? This action cannot be undone."
          disabled={isLoading}
          onConfirm={deleteSpotlight}
        />
      )}
    </>
  );
};

export default SpotlightComp;
