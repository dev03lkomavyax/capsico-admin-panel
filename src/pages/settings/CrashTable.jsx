import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CrashRow } from "./CrashRow";

export function CrashTable({ crashes }) {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Severity</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Error</TableHead>
            <TableHead>App</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crashes.map((crash) => (
            <CrashRow key={crash.id} crash={crash} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
