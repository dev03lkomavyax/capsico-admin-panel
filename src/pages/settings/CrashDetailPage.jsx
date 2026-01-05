import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CrashDetailPage = () => {
  const { crashId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

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
        <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
          <h3 className="mb-2 font-semibold">Application</h3>
          <p className="text-sm">
            {crash.appName} · {crash.platform} · {crash.version}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
            <h3 className="mb-2 font-semibold">User</h3>
            <p className="text-sm">{crash.user}</p>
          </div>
          <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
            <h3 className="mb-2 font-semibold">Error Name</h3>
            <p className="text-sm">{crash.errorName}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-white dark:bg-[#111722] p-4">
          <h3 className="mb-2 font-semibold">Error Message</h3>
          <p className="text-sm">{crash.errorMessage}</p>
        </div>

        {/* Stack Trace (future-ready) */}
        <div className="rounded-lg border bg-black text-green-400 p-4 font-mono text-sm overflow-auto">
          {crash.stackTrace}
        </div>
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
