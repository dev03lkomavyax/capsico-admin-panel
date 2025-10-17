import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useParams } from "react-router-dom";
import usePostApiReq from "@/hooks/usePostApiReq";

const formSchema = z.object({
  type: z.enum(["credit", "debit"], { required_error: "Type is required" }),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than zero"),
  reason: z.string().min(3, "Reason is required"),
});

const ManualWalletAdjustmentDialog = ({
  open,
  setOpen,
  getTransactionHistory,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "credit",
      amount: null,
      reason: "",
    },
  });

  const { reset, getValues, control, handleSubmit } = form;
  const { customerId } = useParams();

  const { res, fetchData, isLoading } = usePostApiReq();

  const onSubmit = (values) => {
    console.log("Wallet adjustment submitted:", values);
    const payload = {
      userId: customerId,
      amount: values.amount,
      reason: values.reason,
      type: values.type,
      initiatedBy: "admin",
    };

    if (values.type === "debit") {
      fetchData(`/wallet/debit`, payload);
    } else {
      fetchData(`/wallet/credit`, payload);
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("wallet debit/credit res", res);
      setOpen(false);
      reset();
      getTransactionHistory()
    }
  }, [res]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manual Wallet Adjustment</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Type */}
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="debit">Debit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reason */}
            <FormField
              control={control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Reason <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter reason for adjustment"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row-reverse sm:gap-4 pt-2">
              <Button type="submit" className="w-auto px-4">
                Submit
              </Button>
              <Button
                type="button"
                variant="outline"
                className="mt-3 sm:mt-0 w-auto px-4"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManualWalletAdjustmentDialog;
