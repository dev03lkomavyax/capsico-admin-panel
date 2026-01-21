import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { ArrowLeftIcon, EyeIcon } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const EarningDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);
  const ledger = state.payout;
  const reference = ledger.referenceId;
  const isOrder = ledger.referenceType === "ORDER";
  const isPayout = ledger.referenceType === "PAYOUT";

  return (
    <AdminWrapper>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
        >
          <ArrowLeftIcon className="text-2xl" />
          {/* <h1 className="text-2xl font-semibold text-left">Earning Details</h1> */}
        </button>

        <div className="space-y-6 mt-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">
                {isOrder && `Order #${reference.orderNumber}`}
                {isPayout && "Payout Details"}
              </h1>
              <p className="text-sm text-muted-foreground">{ledger.remark}</p>
            </div>

            {isOrder && (
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  className="px-3"
                  asChild
                  title="View Order Detail"
                >
                  <Link to={`/admin/order/${reference._id}`}>
                    <EyeIcon />
                  </Link>
                </Button>
                <Badge variant="success" className="capitalize">
                  {reference.status}
                </Badge>
              </div>
            )}

            {isPayout && (
              <Badge
                variant={
                  reference.status === "COMPLETED" ? "success" : "destructive"
                }
              >
                {reference.status}
              </Badge>
            )}
          </div>

          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Earning Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <SummaryItem
                label="Type"
                value={ledger.type}
                className={cn(
                  ledger.type === "CREDIT" ? "text-green-600" : "text-red-600",
                )}
              />
              <SummaryItem
                label="Amount"
                value={`₹${ledger.amount?.toFixed(2)}`}
                highlight={ledger.type === "CREDIT"}
              />
              {ledger?.breakup?.incentive && (
                <SummaryItem
                  label="Incentive"
                  value={`₹${ledger?.breakup?.incentive}`}
                />
              )}
              {ledger?.breakup?.deliveryFee && (
                <SummaryItem
                  label="Delivery Fee"
                  value={`₹${ledger?.breakup?.deliveryFee}`}
                />
              )}
              <SummaryItem
                label="Date"
                value={new Date(ledger.createdAt).toLocaleString()}
              />
            </CardContent>
          </Card>

          {isOrder && (
            // <Card>
            //   <CardHeader>
            //     <CardTitle className="text-lg">Order Financials</CardTitle>
            //   </CardHeader>
            //   <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
            //     <SummaryItem
            //       label="Items Total"
            //       value={`₹${reference.amounts.itemsTotal}`}
            //     />
            //     <SummaryItem
            //       label="Tax"
            //       value={`₹${reference.amounts.taxes.total}`}
            //     />
            //     <SummaryItem
            //       label="Delivery Fee"
            //       value={`₹${reference.amounts.deliveryFee}`}
            //     />
            //     <SummaryItem
            //       label="Grand Total"
            //       value={`₹${reference.amounts.total}`}
            //       highlight
            //     />
            //     <SummaryItem
            //       label="Delivery Distance"
            //       value={`${reference?.deliveryMeta?.distanceKm} KM`}
            //     />
            //     <SummaryItem
            //       label="Commission GST Percent"
            //       value={`${ledger?.breakup?.commissionGSTPercent || 0}%`}
            //     />
            //     <SummaryItem
            //       label="Commission GST Amount"
            //       value={`₹${ledger?.breakup?.commissionGSTAmount?.toFixed(2) || 0}`}
            //     />
            //   </CardContent>
            // </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Order Financial Breakdown
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                {reference.items.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {item.name} (₹{item.basePrice})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>

                        {item.addOns?.length > 0 && (
                          <div>
                            <h3>Addd Ons</h3>
                            <ul className="text-xs text-muted-foreground list-disc ml-4 mt-1">
                              {item.addOns.map((addon, i) => (
                                <li key={i}>
                                  {addon.name} × {addon.quantity} (₹
                                  {addon.price})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.variation?.selectedVariations?.length > 0 && (
                          <div>
                            <h3>Variants</h3>
                            <ul className="text-xs text-muted-foreground list-disc ml-4 mt-1">
                              {item.variation?.selectedVariations.map(
                                (variation, i) => (
                                  <li key={i}>
                                    {variation.name} (₹{variation.price})
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      <p className="font-medium">₹{item.itemTotal}</p>
                    </div>
                    {reference.items.length - 1 !== idx && (
                      <Separator className="my-3" />
                    )}
                  </div>
                ))}

                <Separator className="h-1" />

                {/* Item Value */}
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span>₹{reference.amounts.itemsTotal}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Tax on Items</span>
                  <span>
                    ₹{reference.amounts.taxes.restaurantGST?.amount || 0}
                  </span>
                </div>

                <Separator />

                {/* Delivery */}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>₹{reference.amounts.deliveryFee}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Tax on Delivery</span>
                  <span>
                    ₹{reference.amounts.taxes.deliveryFeeGST?.amount || 0}
                  </span>
                </div>

                <Separator />

                {/* Platform Fee */}
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹{reference.amounts.platformFee?.amount || 0}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Tax on Platform Fee</span>
                  <span>
                    ₹{reference.amounts.taxes.platformFeeGST?.amount || 0}
                    {/* {ledger?.breakup?.platformFeeGST?.toFixed(2) || 0} */}
                  </span>
                </div>

                <Separator />

                {/* Commission */}
                <div className="flex justify-between">
                  <span>Commission (Capsico)</span>
                  <span>₹{reference?.commission?.amount?.toFixed(2) || 0}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>
                    Tax on Commission ({reference?.commission?.gstPercent || 0}
                    %)
                  </span>
                  <span>
                    ₹{reference?.commission?.gstAmount?.toFixed(2) || 0}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Restaurant Earning</span>
                  <span>₹{reference?.restaurantEarning || 0}</span>
                </div>

                <Separator />

                {/* Final */}
                <div className="flex justify-between font-semibold text-base">
                  <span>Customer Order Value</span>
                  <span>₹{reference.amounts.total}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Items */}
          {/* {isOrder && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reference.items.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>

                        {item.addOns?.length > 0 && (
                          <ul className="text-xs text-muted-foreground list-disc ml-4 mt-1">
                            {item.addOns.map((addon, i) => (
                              <li key={i}>
                                {addon.name} × {addon.quantity} (₹{addon.price})
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <p className="font-medium">₹{item.itemTotal}</p>
                    </div>
                    <Separator className="my-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )} */}

          {isPayout && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payout Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <SummaryItem label="Amount" value={`₹${reference.amount}`} />
                <SummaryItem
                  label="Transaction No"
                  value={reference.transactionNumber || "—"}
                />
                <SummaryItem
                  label="Transaction Detail"
                  value={reference.transactionDetail}
                />
                <SummaryItem
                  label="Payout Date"
                  value={new Date(reference.payoutDate).toLocaleString()}
                />
                <SummaryItem
                  label="Deducted From Earnings"
                  value={reference.deductedFromEarnings ? "Yes" : "No"}
                />
              </CardContent>
            </Card>
          )}

          {/* Delivery Address */}
          {isOrder && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p className="font-medium">{reference.address.name}</p>
                <p>{reference.address.addressLine}</p>
                <p>
                  {reference.address.city}, {reference.address.state} –{" "}
                  {reference.address.pinCode}
                </p>
                <p>📞 {reference.address.contactNumber}</p>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          {isOrder && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <SummaryItem
                  label="Ordered At"
                  value={new Date(reference.timing.orderedAt).toLocaleString()}
                />
                <SummaryItem
                  label="Delivered At"
                  value={new Date(
                    reference.timing.deliveredAt,
                  ).toLocaleString()}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminWrapper>
  );
};

export default EarningDetails;

function SummaryItem({ label, value, highlight, className }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          `text-base font-semibold ${highlight ? "text-green-600" : ""}`,
          className
        )}
      >
        {value}
      </p>
    </div>
  );
}
