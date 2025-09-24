import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NotificationCard = ({ notification }) => {
  return (
    <Card className="w-full max-w-md shadow-md rounded-2xl">
      <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {notification.title}
          </CardTitle>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="capitalize">
            {notification.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">{notification.description}</p>

        <div className="flex flex-wrap gap-2">
          {notification.channel?.map((ch, idx) => (
            <Badge key={idx} variant="secondary" className="capitalize">
              {ch}
            </Badge>
          ))}
        </div>

        <div className="text-xs text-gray-400">
          {new Date(notification.createdAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
