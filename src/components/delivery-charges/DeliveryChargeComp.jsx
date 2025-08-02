import { Edit, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import AlertModal from "../AlertModal";
import { useState } from "react";

const DeliveryChargeComp = () => {
  const [isAlertDeleteModalOpen, setIsAlertDeleteModalOpen] = useState(false);

  const handleRemove = () => {
    setIsAlertDeleteModalOpen(true);
  };

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
        </TableCell>
        <TableCell>Mumbai</TableCell>
        <TableCell>20</TableCell>
        <TableCell>5</TableCell>
        <TableCell>10</TableCell>
        <TableCell>15</TableCell>
        <TableCell>✅ 1.5x</TableCell>
        <TableCell>2 days ago</TableCell>
        <TableCell>
          <div className="flex gap-2 items-center">
            <Button
              //   onClick={onEdit}
              variant="update"
              size="icon"
            >
              <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
              {/* Edit */}
            </Button>
            <Button onClick={handleRemove} variant="delete" size="icon">
              <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
              {/* Delete */}
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isAlertDeleteModalOpen && (
        <AlertModal
          isAlertModalOpen={isAlertDeleteModalOpen}
          setIsAlertModalOpen={setIsAlertDeleteModalOpen}
          header="Delete Delivery Charge"
          description="Are you sure you want to delete this delivery charge? This action cannot be undone."
          disabled={false}
          onConfirm={() => {}}
        />
      )}
    </>
  );
};

export default DeliveryChargeComp;
