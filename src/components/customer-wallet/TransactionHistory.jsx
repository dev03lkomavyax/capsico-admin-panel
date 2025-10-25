import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Transaction from "@/components/customer-wallet/Transaction";
import Transaction1 from "@/components/customer-wallet/Transaction1";
import useGetApiReq from '@/hooks/useGetApiReq';
import { useParams } from 'react-router-dom';
import DataNotFound from '../DataNotFound';
import Spinner from '../Spinner';
import ManualWalletAdjustmentDialog from './ManualWalletAdjustment';


const TransactionHistory = ({
  isModalOpen,
  setIsModalOpen,
  getWalletDetails,
}) => {
  const [transactions, setTransactions] = useState([]);
  const { customerId } = useParams();

  const { res, fetchData, isLoading } = useGetApiReq();

  const getTransactionHistory = () => {
    fetchData(`/wallet/transactions/${customerId}`);
  };

  useEffect(() => {
    getTransactionHistory();
  }, []);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getTransactionHistory res", res);
      setTransactions(res?.data?.data?.transactions);
    }
  }, [res]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-surface dark:bg-white/5">
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
        <TableBody className="divide-y divide-outline dark:divide-white/10">
          {transactions.map((txn, idx) => (
            <Transaction1 key={idx} txn={txn} />
          ))}
        </TableBody>
      </Table>
      {isLoading && <Spinner />}
      {transactions.length === 0 && !isLoading && (
        <DataNotFound name="Transactions" />
      )}

      {isModalOpen && (
        <ManualWalletAdjustmentDialog
          open={isModalOpen}
          setOpen={setIsModalOpen}
          getTransactionHistory={getTransactionHistory}
          getWalletDetails={getWalletDetails}
        />
      )}
    </div>
  );
};

export default TransactionHistory