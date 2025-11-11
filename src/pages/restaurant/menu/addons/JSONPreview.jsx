import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

/* ======================
   JSONPreview Component
 ====================== */
export const JSONPreview = ({ data }) => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>JSON Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          readOnly
          value={JSON.stringify(data, null, 2)}
          className="font-mono text-xs h-48"
        />
      </CardContent>
    </Card>
  );
};
