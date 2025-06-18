/* eslint-disable react/prop-types */
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";

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
  }, [res, getAllSubadmins]);

  const handleValueChange = (value, subadminId) => {
    if (value === "remove") {
      setIsAlertDeleteModalOpen(true);
    } else {
      navigate("/admin/sub-admin/edit-subadmin", { state: { subadminId } });
    }
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
          <Select
            onValueChange={(value) => handleValueChange(value, subadmin?._id)}
          >
            <SelectTrigger className="flex justify-between items-center w-[120px] h-[30px] text-[#252525] text-sm font-medium font-roboto border-[#E9E9EA] border-[1px] rounded-[10px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  className="text-[#252525] text-sm font-medium font-roboto"
                  value="remove"
                >
                  Remove
                </SelectItem>
                <SelectItem
                  className="text-[#252525] text-sm font-medium font-roboto"
                  value="edit"
                >
                  Edit
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </TableCell>
      </TableRow>

      {isAlertDeleteModalOpen && (
        <AlertModal
          isAlertDeleteModalOpen={isAlertDeleteModalOpen}
          setIsAlertDeleteModalOpen={setIsAlertDeleteModalOpen}
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
