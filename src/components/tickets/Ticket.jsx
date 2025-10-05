import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import TicketAssignModal from "./TicketAssignModal";
import TicketResolveModal from "./TicketResolveModal";

const Ticket = ({ ticket, getTickets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  return (
    <>
      <TableRow key={ticket.ticketId}>
        <TableCell>{ticket.ticketId}</TableCell>
        <TableCell>{ticket.riderName}</TableCell>
        <TableCell>{ticket.riderPhone}</TableCell>
        <TableCell>{ticket.partnerId}</TableCell>
        <TableCell>
          <Badge>{ticket.ticketType}</Badge>
        </TableCell>
        <TableCell>
          <Badge variant="outline">{ticket.priority}</Badge>
        </TableCell>
        <TableCell>{ticket.subject}</TableCell>
        <TableCell>{ticket.description}</TableCell>
        <TableCell>
          <Badge variant="secondary">{ticket.status}</Badge>
        </TableCell>
        <TableCell>{ticket.assignedTo || "NA"}</TableCell>
        <TableCell>{ticket.orderInfo?.orderNumber ?? "-"}</TableCell>
        <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
        <TableCell>{new Date(ticket.updatedAt).toLocaleString()}</TableCell>
        <TableCell>{ticket.deliveryPartnerId}</TableCell>
        <TableCell>{ticket?.resolution?.resolutionNote || "NA"}</TableCell>
        <TableCell>
          {ticket.assignedTo && !ticket?.resolution && (
            <Button
              onClick={() => setIsResolveModalOpen(true)}
              size="sm"
              title="Assign ticket to Subadmin"
            >
              Resolve
            </Button>
          )}
          {!ticket.assignedTo && (
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              title="Assign ticket to Subadmin"
              disabled={ticket.assignedTo}
            >
              Assign
            </Button>
          )}
        </TableCell>
      </TableRow>
      {isModalOpen && (
        <TicketAssignModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          ticketId={ticket.ticketId}
          getTickets={getTickets}
          assignedTo={ticket.assignedTo}
        />
      )}

      {isResolveModalOpen && (
        <TicketResolveModal
          open={isResolveModalOpen}
          setOpen={setIsResolveModalOpen}
          ticketId={ticket.ticketId}
          getTickets={getTickets}
        />
      )}
    </>
  );
};

export default Ticket;
