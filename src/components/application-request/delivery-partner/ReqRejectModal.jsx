import { Dialog, DialogContent } from "@/components/ui/dialog";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ReqRejectModal = ({
  isReqRjectModal,
  setIsReqRjectModal,
  id,
  getRestaurantRequests,
}) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        status: z
          .string()
          .min(1, "Select status."),
        reason: z
          .string()
          .min(50, "Reason must be at least 50 characters long."),
      })
    ),
    defaultValues: {
      status: "",
      reason: "",
    },
  });

  const { res, fetchData, isLoading } = usePatchApiReq();

  const onSubmit = (data) => {
    console.log("data :", data);
    fetchData(`/admin/updateStatus/${id}`, {
      status: data.status,
      reason: data.reason,
    });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("update status res", res);
      setIsReqRjectModal(false);
      getRestaurantRequests();
    }
  }, [res, setIsReqRjectModal]);

  return (
    <Dialog open={isReqRjectModal} onOpenChange={setIsReqRjectModal}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-[#111928] text-xl font-semibold font-inter">
              Add Reason
            </h2>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Reason
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="hold">Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Reason
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Reason..."
                      className={`resize-none font-inter`}
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

export default ReqRejectModal;
