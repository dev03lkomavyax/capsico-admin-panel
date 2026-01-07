import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CrashFilters({
  environment,
  setEnvironment,
  severity,
  setSeverity,
  userType,
  setUserType
}) {
  const handleReset = () => {
    setEnvironment("");
    setSeverity("");
    setUserType("");
  };

  return (
    <div className="grid grid-cols-1 gap-4 border-b p-4 md:grid-cols-4">
      {/* <Input placeholder="Search error..." /> */}

      <Select value={environment} onValueChange={setEnvironment}>
        <SelectTrigger>
          <SelectValue placeholder="Environment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="development">Development</SelectItem>
          <SelectItem value="production">Production</SelectItem>
          <SelectItem value="staging">Staging</SelectItem>
        </SelectContent>
      </Select>

      <Select value={severity} onValueChange={setSeverity}>
        <SelectTrigger>
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="CRITICAL">Critical</SelectItem>
        </SelectContent>
      </Select>
      <Select value={userType} onValueChange={setUserType}>
        <SelectTrigger>
          <SelectValue placeholder="User Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="User">User</SelectItem>
          <SelectItem value="DeliveryPartner">DeliveryPartner</SelectItem>
          <SelectItem value="Restaurant">Restaurant</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleReset} variant="outline">
        Reset
      </Button>
    </div>
  );
}
