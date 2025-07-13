/* eslint-disable react/prop-types */
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import { Button } from "./ui/button";

const Subadmin = ({ subadmin, getAllSubadmins }) => {
  const navigate = useNavigate();
  const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);

  const { res, fetchData, isLoading } = useDeleteApiReq();

  const deleteSubadmin = () => {
    fetchData(`/admin/delete-subadmin?subAdminId=${subadmin._id}`);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("subadims res", res);
      getAllSubadmins();
    }
  }, [res]);

  const handleEdit = () => {
    navigate("/admin/sub-admin/edit-subadmin", {
      state: { subadminId: subadmin._id },
    });
  };

  const handleRemove = () => {
    setIsAlertDeleteModalOpen(true);
  };

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          {
            <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
          }
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin._id}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.name}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.position}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.email}
        </TableCell>
        <TableCell className="text-[#252525] text-sm font-medium font-roboto">
          {subadmin.phone}
        </TableCell>
        <TableCell>
          <div className="flex gap-2 items-center">
            <Button onClick={handleEdit} size="xs" variant="capsico">
              Edit
            </Button>
            <Button onClick={handleRemove} size="xs" variant="destructive">
              Remove
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {isAlertDeleteModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertDeleteModalOpen}
          setIsAlertModalOpen={setIsAlertDeleteModalOpen}
          header="Delete Subadmin"
          description="Are you sure you want to delete this subadmin? This action cannot be undone."
          disabled={isLoading}
          onConfirm={deleteSubadmin}
        />
      )}
    </>
  );
};

export default Subadmin;
