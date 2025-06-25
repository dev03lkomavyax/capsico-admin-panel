import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { changePasswordSchema } from "@/schema/AddSubAdminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

const ReqRejectModal = ({
  isReqRjectModal,
  setIsReqRjectModal,
  restaurantId,
  getRestaurantRequests,
}) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        reason: z
          .string()
          .min(50, "Reason must be at least 50 characters long."),
      })
    ),
    defaultValues: {
      reason: "",
    },
  });

  const { res, fetchData, isLoading } = usePatchApiReq();

  const onSubmit = (data) => {
    console.log("data :", data);
    fetchData(`/admin/update-restaurant-status/${restaurantId}`, {
      status: "REJECTED",
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
                      className={`placeholder:text-[#A6A6A6] resize-none bg-[#f6f6fb] font-inter rounded-lg`}
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
