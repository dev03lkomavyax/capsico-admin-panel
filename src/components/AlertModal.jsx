/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

const AlertModal = ({
  isAlertModalOpen,
  setIsAlertModalOpen,
  header,
  description,
  onConfirm,
  disabled,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    setIsAlertModalOpen(false);
  };

  return (
    <AlertDialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} className="h-9">
            Cancel
          </AlertDialogCancel>
            <Button
              onClick={handleConfirm}
              disabled={disabled}
              variant="capsico"
            >
              Confirm
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
