import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePostApiReq from "@/hooks/usePostApiReq";
import { createPayoutSchema } from "@/schema/CreatePayoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const CreatePayoutModal = ({
  isCreatePayoutModalOpen,
  setIsCreatePayoutModalOpen,
  getData,
  getDeliveryPartnerEarnings,
}) => {
  const { deliveryAgentId } = useParams();

  const form = useForm({
    resolver: zodResolver(createPayoutSchema),
    defaultValues: {
      deductFromEarnings: true,
      recipientId: deliveryAgentId,
      recipientType: "DELIVERY_PARTNER",
    },
  });

  const { res, fetchData, isLoading } = usePostApiReq();

  const onSubmit = (data) => {
    fetchData("/payout/create-payout", data);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      setIsCreatePayoutModalOpen(false);
      form.reset();
      getData();
      getDeliveryPartnerEarnings();
    }
  }, [res]);

  return (
    <Dialog
      open={isCreatePayoutModalOpen}
      onOpenChange={setIsCreatePayoutModalOpen}
    >
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-lg font-semibold">Create Payout</h2>

            {/* Recipient Type */}
            <FormField
              control={form.control}
              name="recipientType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Type</FormLabel>
                  <Select
                    disabled
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DELIVERY_PARTNER">
                        Delivery Partner
                      </SelectItem>
                      <SelectItem value="MERCHANT">Merchant</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Recipient ID */}
            {/* <FormField
              control={form.control}
              name="recipientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Mongo ObjectId" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transaction Number */}
            <FormField
              control={form.control}
              name="transactionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="TXN123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transaction Detail */}
            <FormField
              control={form.control}
              name="transactionDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Detail</FormLabel>
                  <FormControl>
                    <Input placeholder="Weekly payout" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payout Date */}
            <FormField
              control={form.control}
              name="payoutDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payout Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deduct From Earnings */}
            {/* <FormField
              control={form.control}
              name="deductFromEarnings"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Deduct from earnings
                  </FormLabel>
                </FormItem>
              )}
            /> */}

            <Button
              type="submit"
              className="w-full h-11"
              variant="capsico"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Payout"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePayoutModal;
