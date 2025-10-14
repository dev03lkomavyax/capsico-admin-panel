import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import ManualWalletAdjustmentDialog from "@/components/customer-wallet/ManualWalletAdjustment";
import Transaction1 from "@/components/customer-wallet/Transaction1";
import ReactPagination from "@/components/pagination/ReactPagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetApiReq from "@/hooks/useGetApiReq";
import DataNotFound from "@/components/DataNotFound";
import Spinner from "@/components/Spinner";

const TransactionHistory = () => {
  const { customerId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useLocation();
  const user = state?.user || {};

  const { res, fetchData, isLoading } = useGetApiReq();

  const getTransactionHistory = () => {
    fetchData(`/wallet/transactions/${customerId}?page=${page}&limit=${10}`);
  };

  useEffect(() => {
    getTransactionHistory();
  }, [page]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getTransactionHistory res", res);
      setTransactions(res?.data?.data?.transactions);
      setTotalPage(res?.data?.data?.pagination?.totalPages || 1);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between items-center gap-5">
          <Link
            to={`/admin/customer/${customerId}/wallet`}
            state={{ user }}
            className="inline-flex gap-1 items-center"
          >
            <ChevronLeft />
            <h2 className="text-[#111928] text-xl font-semibold font-inter">
              Transaction History
            </h2>
          </Link>
          <Button
            className="w-auto px-4"
            onClick={() => setIsModalOpen(true)}
            variant="capsico"
          >
            Manual Wallet Adjustment
          </Button>
        </div>

        <div className="mt-5">
          <div className="rounded-lg border border-outline">
            <div className="bg-white">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Related Order ID</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Initiated By</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn, idx) => (
                    <Transaction1 key={idx} txn={txn} />
                  ))}
                </TableBody>
              </Table>
              {isLoading && <Spinner />}
              {transactions.length === 0 && !isLoading && (
                <DataNotFound name="Transactions" />
              )}

              <ReactPagination totalPage={totalPage} setPage={setPage} />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <ManualWalletAdjustmentDialog
            open={isModalOpen}
            setOpen={setIsModalOpen}
            getTransactionHistory={getTransactionHistory}
          />
        )}
      </div>
    </AdminWrapper>
  );
};

export default TransactionHistory;
