import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RecentPayouts = ({ items = [] }) => {
  const hasItems = items && items.length > 0;

  return (
    <section aria-label="Recent payouts" className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Recent Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          {hasItems ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payout Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((p, idx) => (
                    <TableRow key={p.id || idx}>
                      <TableCell>{p.week || "-"}</TableCell>
                      <TableCell>
                        {typeof p.amount === "number" ? p.amount : "-"}
                      </TableCell>
                      <TableCell className="capitalize">
                        {p.status || "-"}
                      </TableCell>
                      <TableCell>{p.payoutDate || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="rounded-md border border-dashed p-6 text-center">
              <p className="font-medium">No payouts yet</p>
              <p className="text-sm text-muted-foreground">
                Your recent payouts will appear here once processed.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default RecentPayouts;
