import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataNotFound from "../DataNotFound";

const PayoutRules = ({ rules=[] }) => {
      const hasItems = rules && rules.length > 0;
  return (
    <section aria-label="Payout rules" className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Rules</CardTitle>
        </CardHeader>
        <CardContent>
          {hasItems?<ol className="list-decimal pl-5 space-y-2">
            {rules.map((rule, idx) => (
              <li key={idx} className="text-sm text-pretty">
                {rule}
              </li>
            ))}
          </ol>:
          <DataNotFound name="Rules" />}
        </CardContent>
      </Card>
    </section>
  );
};

export default PayoutRules;
