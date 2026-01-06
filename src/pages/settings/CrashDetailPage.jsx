import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CrashDetailPage = () => {
  const { crashId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const request = state.request;
  const device = state.device;

  const crash = state;

  if (!crash) {
    return (
      <AdminWrapper>
        <div className="text-sm text-muted-foreground">Crash not found</div>
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold">{crash.errorName}</h1>
            <p className="text-sm text-muted-foreground">{crash.file}</p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard label="Severity">
            <Badge>{crash.severity}</Badge>
          </InfoCard>

          <InfoCard label="Status">{crash.status}</InfoCard>

          <InfoCard label="Environment">{crash.environment}</InfoCard>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-5">
          <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
            <h3 className="mb-2 font-semibold">Application</h3>
            <p className="text-sm">
              {crash.appName} · {crash.version}
            </p>
          </div>
          <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
            <h3 className="mb-2 font-semibold">User Type</h3>
            <p className="text-sm">{crash.userType}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
            <h3 className="mb-2 font-semibold">User</h3>
            <p className="text-sm">{crash.user}</p>
          </div> */}
          <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
            <h3 className="mb-2 font-semibold">Error Name</h3>
            <p className="text-sm">{crash.errorName || "-"}</p>
          </div>
          <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
            <h3 className="mb-2 font-semibold">Screen Name</h3>
            <p className="text-sm">{crash.screenName || "-"}</p>
          </div>
        </div>

        {request && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Overview</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">Method</h3>
                <Badge variant="outline">{request?.method || "-"}</Badge>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-1">URL</h3>
                <p className="text-sm break-all">{request?.url || "-"}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-1">IP Address</h3>
                <p className="text-sm">{request?.ip || "-"}</p>
              </div>

              {request?.headers && (
                <div>
                  <h3 className="text-sm font-semibold mb-1">User Agent</h3>
                  <p className="text-sm break-all">
                    {request?.headers?.["user-agent"] || "-"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {device && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Device Information</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
                <h3 className="mb-2 text-sm font-semibold">Platform</h3>
                <Badge variant="outline">{device?.platform || "-"}</Badge>
              </div>

              <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
                <h3 className="mb-2 text-sm font-semibold">Operating System</h3>
                <p className="text-sm">
                  {device?.os} {device?.osVersion}
                </p>
              </div>

              <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
                <h3 className="mb-2 text-sm font-semibold">Device Model</h3>
                <p className="text-sm">{device?.deviceModel || "-"}</p>
              </div>

              <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
                <h3 className="mb-2 text-sm font-semibold">Browser</h3>
                <p className="text-sm">{device?.browser || "-"}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
          <h3 className="mb-2 font-semibold">Error Message</h3>
          <p className="text-sm">{crash.errorMessage || "-"}</p>
        </div>

        {/* Stack Trace (future-ready) */}
        {crash.stackTrace && (
          <div className="rounded-lg border bg-black text-green-400 p-4 font-mono text-sm overflow-auto">
            {crash.stackTrace}
          </div>
        )}
      </div>
    </AdminWrapper>
  );
};

export default CrashDetailPage;

function InfoCard({ label, children }) {
  return (
    <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 font-medium">{children}</div>
    </div>
  );
}
