import React from 'react'
import { TableCell, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { format } from 'date-fns';

const PromotedOfferComp = ({ offer }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{offer.offerCode || "--"}</TableCell>
      <TableCell>{offer.name}</TableCell>
      <TableCell>
        <Badge variant="outline">{offer.offerType}</Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            offer.promotionCategory === "megaSale" ? "destructive" : "secondary"
          }
        >
          {offer.promotionCategory}
        </Badge>
      </TableCell>
      <TableCell>{offer.priorityLevel}</TableCell>
      <TableCell>{offer?.restaurant?.name || "NA"}</TableCell>
      <TableCell>{offer?.restaurant?.city || "NA"}</TableCell>
      <TableCell>
        {offer.promotedAt && format(new Date(offer.promotedAt), "dd MMM yyyy")}
      </TableCell>
      <TableCell>
        {offer?.endDate && format(new Date(offer?.endDate), "dd MMM yyyy")}
      </TableCell>
      {/* <TableCell>{offer.validity.daysRemaining}</TableCell>
      <TableCell>
        {offer.usage.current}/{offer.usage.maximum}
      </TableCell> */}
      {/* <TableCell>{offer.promotion.promotedBy?.name || "—"}</TableCell> */}
      {/* <TableCell className="text-right">
        <Button
          size="sm"
          variant="outline"
          onClick={() => console.log("View details of:", offer.id)}
        >
          View
        </Button>
      </TableCell> */}
    </TableRow>
  );
};

export default PromotedOfferComp