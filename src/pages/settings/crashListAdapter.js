// crashListAdapter.ts
import { formatDistanceToNow, format } from "date-fns";

export function adaptCrashForList(crash) {
  return {
    id: crash._id,
    severity: crash.severity,
    environment: crash.environment,
    errorName: crash.errorName,
    errorMessage: crash.errorMessage,
    stackTrace: crash.stackTrace,
    file: crash.stackTrace?.split(" ").pop() || "-",

    appName: crash.appName,
    platform: crash.device?.platform || "Unknown",
    version: crash.appVersion,

    user: crash.userId
      ? `${crash.userType} #${crash.userId.slice(-4)}`
      : "Anonymous",

    timeAgo: formatDistanceToNow(new Date(crash.crashAt), { addSuffix: true }),
    timestamp: format(new Date(crash.crashAt), "dd MMM yyyy, hh:mm a"),

    status: crash.resolved ? "Resolved" : "Open",
  };
}
