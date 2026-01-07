import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CrashRow } from "./CrashRow";
import DataNotFound from "@/components/DataNotFound";
import Spinner from "@/components/Spinner";

export function CrashTable({ crashes, isLoading }) {
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
          {crashes.length === 0 && !isLoading && (
            <DataNotFound name="Crash Reports" />
          )}

          {crashes.length === 0 && isLoading && (
            <Spinner />
          )}
    </div>
  );
}
