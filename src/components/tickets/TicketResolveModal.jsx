import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TicketResolveSchema } from "@/schema/TicketResolveSchema";
import usePostApiReq from "@/hooks/usePostApiReq";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import usePutApiReq from "@/hooks/usePutApiReq";

const TicketResolveModal = ({ open, setOpen, ticketId, getTickets }) => {
  const form = useForm({
    resolver: zodResolver(TicketResolveSchema),
    defaultValues: {
      resolutionNote: "",
    },
  });

  const { res, fetchData, isLoading } = usePutApiReq();

  const onSubmit = (data) => {
    console.log("data :", data);

    fetchData(`/deliveryExec/admin/resolve-ticket/${ticketId}`, {
      resolutionNote: data.resolutionNote,
    });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("onSubmit res", res);
      getTickets();
      setOpen(false);
    }
  }, [res]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Resolve Ticket</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="resolutionNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Resolution
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Resolution..."
                      className={`placeholder:text-[#A6A6A6] resize-none min-h-28 font-inter rounded-lg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full text-base font-inter"
              variant="capsico"
              disabled={isLoading}
            >
              {isLoading ? "Submiting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketResolveModal;
