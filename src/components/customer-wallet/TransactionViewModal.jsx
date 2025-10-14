import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Link, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TransactionStatus from "./TransactionStatus";

const TransactionViewModal = ({
  isOpen,
  setIsOpen,
  transactionId,
  customId,
}) => {
  const [transaction, setTransaction] = useState([]);
  const { customerId } = useParams();
  const navigate = useNavigate();
  
    const handleClick = () => {
      if (transaction?.orderDetails?.orderId) {
        navigate(`/admin/order/${transaction?.orderDetails?.orderId}`);
      }
    };

  const { res, fetchData, isLoading } = useGetApiReq();

  const getTransactionDetails = () => {
    fetchData(`/wallet/transactions/${customerId}/${transactionId}`);
  };

  useEffect(() => {
    getTransactionDetails();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getTransactionDetails res", res);
      setTransaction(res?.data?.data);
    }
  }, [res]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* 📄 Sheet Content */}
      <SheetContent
        side="right"
        className="flex flex-col justify-between max-w-lg max-h-[100vh] overflow-y-auto"
      >
        <div className="w-full p-6 space-y-6">
          <SheetHeader className="flex flex-row items-center justify-between">
            <div>
              <SheetTitle>Transaction Details</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Detailed information about the selected transaction
              </SheetDescription>
            </div>
            {/* <SheetClose asChild>
            <Button size="icon" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose> */}
          </SheetHeader>

          {/* 🧾 Transaction Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">
                Transaction ID
              </p>
              <p className="font-semibold text-foreground">{customId}</p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Type</p>
              <p
                className={cn(
                  "font-semibold text-foreground capitalize",
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-destructive"
                )}
              >
                {transaction.type}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-2xl font-semibold text-primary">
                ₹{transaction.amount}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <div className="flex items-center gap-2">
                {/* <span className="w-2 h-2 rounded-full bg-green-500" /> */}
                <p className="font-semibold text-foreground capitalize">
                  {/* {transaction.status} */}
                  <TransactionStatus status={transaction.status} />
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* 🧠 Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <p className="text-muted-foreground">Reason</p>
              <p className="font-medium text-foreground">
                {transaction?.reason}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Related Order</p>
              <div className="flex items-center gap-1">
                <p className="font-medium text-foreground">
                  {transaction?.orderDetails?.orderNumber || "-"}
                </p>
                {transaction?.orderDetails?.orderNumber && (
                  <Link
                    onClick={handleClick}
                    className="h-4 w-4 text-primary cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Initiated By</p>
              {/* <p className="font-medium text-foreground">System</p> */}
              <Badge variant="outline" className="mt-2 capitalize">
                {transaction.initiatedBy}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Date/Time</p>
              <p className="font-medium text-foreground">
                {transaction.timestamp &&
                  format(
                    new Date(transaction.timestamp),
                    "dd MMM, yyyy hh:mm a"
                  )}
              </p>
            </div>
          </div>

          {/* 🧭 Footer */}
        </div>
        <div className="mt-6">
          <SheetClose asChild>
            <Button variant="capsico" className="w-full font-bold">
              Close
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionViewModal;
