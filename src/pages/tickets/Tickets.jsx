import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetApiReq from "@/hooks/useGetApiReq";
import ReactPagination from "@/components/pagination/ReactPagination";
import Spinner from "@/components/Spinner";
import DataNotFound from "@/components/DataNotFound";
import Ticket from "@/components/tickets/Ticket";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const Tickets = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [priority, setPriority] = useState("all");
  const [status, setStatus] = useState("all");
  const [ticketType, setTicketType] = useState("all");

  const { res, fetchData, isLoading } = useGetApiReq();

  const getTickets = () => {
    fetchData(
      `/deliveryExec/admin/all-tickets?page=${page}&limit=${10}&priority=${
        priority === "all" ? "" : priority
      }&status=${status === "all" ? "" : status}&ticketType=${
        ticketType === "all" ? "" : ticketType
      }`
    );
  };

  useEffect(() => {
    getTickets();
  }, [page, priority, status, ticketType]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      setTickets(res?.data?.data);
      setTotalPage(res?.data?.pagination?.totalPages);
      console.log("getTickets res", res);
    }
  }, [res]);

  useEffect(() => {
    const interval = setInterval(() => {
      getTickets();
    }, 120000); // 120000ms = 2 minutes

    // Cleanup interval on unmount or dependency change
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminWrapper>
      <div>
        <div className="flex justify-between items-center gap-5">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            Tickets
          </h2>
          <div className="flex gap-3 items-center">
            <div>
              <Button title="Refetch Tickets" onClick={getTickets} className="!size-10" size="icon">
                <RefreshCcw
                  className={cn(
                    "size-5 transition-all",
                    isLoading && "animate-spin"
                  )}
                />
              </Button>
            </div>
            <Select value={priority} onValueChange={(v) => setPriority(v)}>
              <SelectTrigger className="min-w-[140px]">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger className="min-w-[140px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ticketType} onValueChange={(v) => setTicketType(v)}>
              <SelectTrigger className="min-w-[200px]">
                <SelectValue placeholder="Select Ticket Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="accidental">Accidental</SelectItem>
                <SelectItem value="vehicle_breakdown">
                  Vehicle Breakdown
                </SelectItem>
                <SelectItem value="address_not_found">
                  Address Not Found
                </SelectItem>
                <SelectItem value="customer_not_picking_call">
                  Customer Not Picking Call
                </SelectItem>
                <SelectItem value="payment_issue">Payment Issue</SelectItem>
                <SelectItem value="app_bug">App Bug</SelectItem>
                <SelectItem value="account_problem">Account Problem</SelectItem>
                <SelectItem value="order_issue">Order Issue</SelectItem>
                <SelectItem value="vehicle_problem">Vehicle Problem</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="safety_concern">Safety Concern</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white mt-10">
          <Table className="w-full rounded-xl shadow-sm bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Rider Name</TableHead>
                <TableHead>Rider Phone</TableHead>
                <TableHead>Partner ID</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Order Info</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Delivery Partner ID</TableHead>
                <TableHead>Resolution</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tickets?.length > 0 &&
                tickets.map((ticket, index) => (
                  <Ticket ticket={ticket} key={index} getTickets={getTickets} />
                ))}
            </TableBody>
          </Table>

          {isLoading && <Spinner />}
          {!isLoading && tickets.length === 0 && (
            <DataNotFound name="Tickets" />
          )}

          <ReactPagination totalPage={totalPage} setPage={setPage} />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default Tickets;
