import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateRangeSchema } from "@/schema/AddDeliveryAgentSchema";
import { useParams } from "react-router-dom";
import useGetApiReq from "@/hooks/useGetApiReq";
import DatePicker from "@/components/DatePicker";
import Spinner from "@/components/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ExportRestaurantPayout = ({ isModalOpen, setIsModalOpen }) => {
  const [url, setUrl] = useState("");
  const { deliveryAgentId } = useParams();

  const form = useForm({
    resolver: zodResolver(dateRangeSchema),
    defaultValues: {
      startDate: null,
      endDate: null,
      type: "",
    },
  });

  const { control, handleSubmit, watch } = form;
  const format = watch("format");

  const fromDate = watch("startDate");
  const toDate = watch("endDate");
  const type = watch("type");

  const { res, fetchData, isLoading } = useGetApiReq();

  const exportDeliveryPartnerPayouts = () => {
    fetchData(
      `/payout/export?startDate=${fromDate}&endDate=${toDate}&type=${type}&ownerType=MERCHANT&ownerId=${deliveryAgentId}`,
      { responseType: "blob" }
    );
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("exportDeliveryPartnerPayout res", res);
      console.log("exportDeliveryPartnerPayout type", typeof res.data);
      if (res?.data instanceof Blob) {
        const downloadUrl = URL.createObjectURL(res?.data);
        setUrl(downloadUrl);
      }
    }
  }, [res]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Export Delivery Partner Payouts</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(exportDeliveryPartnerPayouts)}
            className="space-y-5"
          >
            {/* Start Date */}
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Date</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Transaction Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CREDIT">Credit</SelectItem>
                        <SelectItem value="DEBIT">Debit</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      disabled={{ after: new Date() }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex gap-4 items-center">
              <Button variant="capsico" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Export"}
              </Button>

              {url && (
                <a href={url} download={`PAYOUT.csv`}>
                  <Button className="px-4" type="button" variant="secondary">
                    Download CSV
                  </Button>
                </a>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExportRestaurantPayout;
