import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
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
import { createPayoutSchema1 } from "@/schema/CreatePayoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import OrderTable from "./OrderTable";

const CreatePayout = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(createPayoutSchema1),
    defaultValues: {
      deductFromEarnings: true,
      recipientId: restaurantId,
      recipientType: "MERCHANT",
      startDate: "",
      endDate: "",
      selectedOrders: [], // 👈 IMPORTANT
      totalEarning: 0, // 👈 derived field
    },
  });

  console.log("getValues", form.getValues());

  const { res, fetchData, isLoading } = usePostApiReq();

  const onSubmit = (data) => {
    fetchData("/payout/create-payout", data);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      navigate(`/admin/restaurant/${restaurantId}/payout`);
    }
  }, [res]);

  return (
    <AdminWrapper>
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
        >
          <ArrowLeftIcon className="text-2xl" />
          <h1 className="text-2xl font-semibold text-left">Create Payout</h1>
        </button>
        <div className="bg-white p-4 rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-3 gap-5">
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
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
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
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
              </div>

              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <OrderTable />

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
        </div>
      </div>
    </AdminWrapper>
  );
};

export default CreatePayout;
