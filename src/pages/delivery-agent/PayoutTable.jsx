import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetApiReq from "@/hooks/useGetApiReq";
import { Payout } from "./Payout";
import { Button } from "@/components/ui/button";
import CreatePayoutModal from "./CreatePayoutModal";

export default function PayoutTable({ getDeliveryPartnerEarnings }) {
  const { deliveryAgentId } = useParams();

  const [payouts, setPayouts] = useState([]);
  const [isCreatePayoutModalOpen, setIsCreatePayoutModalOpen] = useState(false);

  const { res, fetchData, isLoading } = useGetApiReq();

  const getDeliveryPartnerPayouts = () => {
    fetchData(
      `/payout/get-payouts?recipientType=DELIVERY_PARTNER&recipientId=${deliveryAgentId}`
    );
  };

  useEffect(() => {
    getDeliveryPartnerPayouts();
  }, [deliveryAgentId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("getDeliveryPartnerPayoutDetails res", res);
      setPayouts(res?.data?.payouts);
    }
  }, [res]);

  console.log("payouts", payouts);

  return (
    <>
      <Card className="rounded-2xl shadow-sm mt-6">
        <CardHeader className="flex flex-row justify-between items-center gap-4 w-full">
          <CardTitle className="text-xl font-semibold">
            Payout History
          </CardTitle>
          <Button
            onClick={() => setIsCreatePayoutModalOpen(true)}
            className="w-auto px-4"
            variant="capsico"
          >
            Create Payout
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && <Payout.Skeleton />}
              {!isLoading && payouts.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                  No payouts found
                </div>
              )}
              {payouts?.map((payout) => (
                <Payout key={payout._id} payout={payout} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isCreatePayoutModalOpen && (
        <CreatePayoutModal
          isCreatePayoutModalOpen={isCreatePayoutModalOpen}
          setIsCreatePayoutModalOpen={setIsCreatePayoutModalOpen}
          getData={getDeliveryPartnerPayouts}
          getDeliveryPartnerEarnings={getDeliveryPartnerEarnings}
        />
      )}
    </>
  );
}
