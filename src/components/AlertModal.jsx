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
          <AlertDialogCancel onClick={handleCancel} className="h-9">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-[#4A67FF] hover:bg-[#4A67FF] h-9" disabled={disabled} onClick={handleConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
