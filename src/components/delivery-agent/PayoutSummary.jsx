import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PayoutSummary = ({ data }) => {
  const belowMinimum = data?.netEarnings < 500;

  return (
    <section aria-label="Payout summary" className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-balance">Current Week</h2>
        <p className="text-muted-foreground">{data.date}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-pretty">Net Earnings</span>
            <span className="text-2xl font-semibold">₹ {data.netEarnings}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* separate inner wrapper so we don't mix padding and gap on same element */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Metric label="Base Pay" value={data.basePay} />
            <Metric label="Surge (Peak)" value={data.surgePeakHour} />
            <Metric label="Incentives" value={data.incentives} />
            <Metric label="Tips" value={data.tips} />
            <Metric
              label="Penalties"
              value={-Math.abs(data.penalties)}
              negative
            />
            <div className="col-span-2 md:col-span-1">
              <div className="rounded-md border p-3">
                <p className="text-sm text-muted-foreground">Payout Date</p>
                <p className="font-medium">{data.payoutDate}</p>
              </div>
            </div>
          </div>

          {belowMinimum && (
            <div className="mt-4">
              <Alert variant="destructive" role="status" aria-live="polite">
                <AlertTitle>Below minimum payout</AlertTitle>
                <AlertDescription>
                  Minimum payout is 500. Your balance will carry forward to next
                  week.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default PayoutSummary;

function Metric({ label, value, negative = false }) {
  const isNegative = negative && value !== 0;
  return (
    <div className="rounded-md border p-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`font-medium ${
          isNegative ? "text-destructive-foreground" : ""
        }`}
      >
        {isNegative ? `- ₹ ${Math.abs(value)}` : `₹ ${value}`}
      </p>
    </div>
  );
}
