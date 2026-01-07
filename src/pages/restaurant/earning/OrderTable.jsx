import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderRow } from "./Order";
import { useFormContext } from "react-hook-form";
import useGetApiReq from "@/hooks/useGetApiReq";
import { useParams } from "react-router-dom";
import { FormMessage } from "@/components/ui/form";

const OrderTable = () => {
  const { watch, setValue, formState } = useFormContext();
  const params = useParams();

  const [orders, setOrders] = useState([]);

  const selectedOrders = watch("selectedOrders") || [];

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getOrdersByDate = () => {
    fetchData(
      `/admin/orders?restaurantId=${params?.restaurantId}&startDate=${startDate}&endDate=${endDate}`
    );
  };

  console.log("formState", formState.errors);

  useEffect(() => {
    startDate && endDate && getOrdersByDate();
  }, [startDate, endDate]);

  // ⬇ Auto select all orders on load
  useEffect(() => {
    if (res?.status === 200) {
      const data = res?.data?.data || [];
      setOrders(data);

      const allOrderIds = data.map((o) => o._id);
      setValue("selectedOrders", allOrderIds);
    }
  }, [res]);

  // ⬇ Calculate total earning
  useEffect(() => {
    const total = orders
      .filter((o) => selectedOrders.includes(o._id))
      .reduce((sum, o) => sum + (o.restaurantEarning || 0), 0);

    setValue("totalEarning", total);
  }, [selectedOrders, orders]);

  return (
    <Card className="rounded-2xl shadow-sm mt-6">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-xl font-semibold">Orders</CardTitle>

        <div className="text-sm font-semibold">
          Total Earnings: ₹{watch("totalEarning")?.toLocaleString("en-IN")}
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Order No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead className="text-right">Order Amount</TableHead>
              <TableHead className="text-right">Restaurant Earn</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && <OrderRow.Skeleton />}

            {!isLoading && orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  No orders found
                </TableCell>
              </TableRow>
            )}

            {orders.map((order) => (
              <OrderRow key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
        {formState.errors?.selectedOrders?.message && (
          <FormMessage>{formState.errors?.selectedOrders?.message}</FormMessage>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTable;
