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
}) {
  const handleReset = () => {
    setEnvironment("");
    setSeverity("");
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

      <Button onClick={handleReset} variant="outline">
        Reset
      </Button>
    </div>
  );
}
