import { TableCell, TableRow } from "@/components/ui/table";
import { SeverityBadge } from "./SeverityBadge";
import { useNavigate } from "react-router-dom";

export function CrashRow({ crash  }) {
    const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate(`/admin/settings/${crash.id}`, { state: crash })}
      className="cursor-pointer hover:bg-muted/50"
    >
      <TableCell>
        <SeverityBadge severity={crash.severity} />
      </TableCell>
      <TableCell>{crash.environment}</TableCell>
      <TableCell className="font-mono">
        {crash.errorName}
        <div className="text-xs text-muted-foreground">{crash.file}</div>
      </TableCell>
      <TableCell>
        {crash.appName}
        <div className="text-xs text-muted-foreground">
          {crash.platform} · {crash.version}
        </div>
      </TableCell>
      <TableCell>{crash.user}</TableCell>
      <TableCell>
        {crash.timeAgo}
        <div className="text-xs text-muted-foreground">{crash.timestamp}</div>
      </TableCell>
      <TableCell>{crash.status}</TableCell>
    </TableRow>
  );
}
