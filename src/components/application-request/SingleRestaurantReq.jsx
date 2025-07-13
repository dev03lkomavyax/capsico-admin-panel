import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import AlertModal from "../AlertModal";
import ReqRejectModal from "./ReqRejectModal";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { FaTrash } from "react-icons/fa6";
import useDeleteApiReq from "@/hooks/useDeleteApiReq";

const SingleRestaurantReq = ({ req, getRestaurantRequests }) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isDeleteAlertModalOpen, setIsDeleteAlertModalOpen] = useState(false);
  const [isReqRjectModal, setIsReqRjectModal] = useState(false);

  const { res, fetchData, isLoading } = usePatchApiReq();
  const {
    res: res1,
    fetchData: fetchData1,
    isLoading: isLoading1,
  } = useDeleteApiReq();

  const updateStatus = () => {
    fetchData(`/admin/update-restaurant-status/${req?._id}`, {
      status: "APPROVED",
    });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("update status res", res);
      setIsAlertModalOpen(false);
      getRestaurantRequests();
    }
  }, [res, setIsReqRjectModal]);

  const deleteReq = () => {
    fetchData1(`/admin/delete-restaurant?restaurantId=${req?._id}`);
  };

  useEffect(() => {
    if (res1?.status === 200 || res1?.status === 201) {
      console.log("delete res", res1);
      setIsDeleteAlertModalOpen(false);
      getRestaurantRequests();
    }
  }, [res1 ]);

  return (
    <>
      <TableRow>
        <TableCell className="w-10">
          {
            <Checkbox className="border-[1px] border-[#E9E9EA] bg-[#F7F8FA] w-6 h-6" />
          }
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-normal font-sans">
          {req?._id}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-bold capitalize font-sans">
          {req?.name}
        </TableCell>
        <TableCell className="text-[#1D1929] text-[10px] font-normal font-sans">
          {req?.createdAt && format(new Date(req?.createdAt), "MMMM dd, yyyy")}
        </TableCell>
        <TableCell className="text-[#1D1929] text-xs font-normal font-roboto">
          {req?.address?.addressLine}, {req?.address?.city}
        </TableCell>
        <TableCell>
          <div className="flex gap-3">
            <button
              onClick={() => setIsReqRjectModal(true)}
              className="bg-[#D02C2C] px-4 py-[6px] rounded-md text-[#FFFFFF] text-xs font-semibold font-sans"
            >
              Reject
            </button>
            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="bg-[#4B9A57] px-4 py-[6px] rounded-md text-[#FFFFFF] text-xs font-semibold font-sans"
            >
              Approve
            </button>
            <button
              onClick={() => setIsDeleteAlertModalOpen(true)}
              className="bg-[#D02C2C] px-2 py-[6px] rounded-md text-[#FFFFFF] text-xs font-semibold font-sans"
            >
              <FaTrash />
            </button>
          </div>
        </TableCell>
      </TableRow>

      {isAlertModalOpen && (
        <AlertModal
          header="Approve Request"
          description="Are you sure you want to approve this request?"
          disabled={isLoading}
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          onConfirm={updateStatus}
        />
      )}

      {isDeleteAlertModalOpen && (
        <AlertModal
          header="Delete Request"
          description="Are you sure you want to delete this request?"
          disabled={isLoading1}
          isAlertModalOpen={isDeleteAlertModalOpen}
          setIsAlertModalOpen={setIsDeleteAlertModalOpen}
          onConfirm={deleteReq}
        />
      )}

      {isReqRjectModal && (
        <ReqRejectModal
          isReqRjectModal={isReqRjectModal}
          setIsReqRjectModal={setIsReqRjectModal}
          restaurantId={req?._id}
          getRestaurantRequests={getRestaurantRequests}
        />
      )}
    </>
  );
};

export default SingleRestaurantReq;
