import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const NotificationTable = ({ notifications }) => {
  return (
    <Table className="w-full border shadow-sm bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[120px]">Type</TableHead>
          <TableHead className="w-[180px]">Channels</TableHead>
          <TableHead className="w-[180px]">Created At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {notifications?.length > 0 ? (
          notifications.map((notification, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                {notification.title}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {notification.description}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {notification.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {notification.channel?.map((ch, i) => (
                    <Badge key={i} variant="secondary" className="capitalize">
                      {ch}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500">
              No notifications found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default NotificationTable;
