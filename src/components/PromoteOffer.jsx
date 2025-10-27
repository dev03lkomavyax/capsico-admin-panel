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
import Spinner from "./Spinner";
import usePatchApiReq from "@/hooks/usePatchApiReq";

const formSchema = z.object({
  promotionCategory: z.enum(["none", "topRated", "megaSale"], {
    required_error: "Promotion Category is required",
  }),
  priorityLevel: z.coerce
    .number({
      required_error: "Priority level is required",
      invalid_type_error: "Priority level must be a number",
    })
    .min(1, { message: "Minimum value is 1" })
    .max(10, { message: "Maximum value is 10" }),
});

const PromoteOffer = ({ open, setOpen, offerId }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "none",
      priorityLevel: 1,
    },
  });

  const { reset, getValues, control, handleSubmit } = form;

  const { res, fetchData, isLoading } = usePatchApiReq();

  const onSubmit = (values) => {
    console.log("data:", values);
    const payload = {
      promotionCategory: values.promotionCategory,
      priorityLevel: values.priorityLevel,
    };

    fetchData(`/offers/admin/promote/${offerId}`, payload);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("promote offer res", res);
      setOpen(false);
    }
  }, [res]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Promote Offer</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Type */}
            <FormField
              control={control}
              name="priorityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority Level ( 1 to 10)</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      placeholder="Enter a number (1–10)"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="promotionCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Promotion Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="megaSale">Mega Sale</SelectItem>
                      <SelectItem value="topRated">Top Rated</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row-reverse sm:gap-4 pt-2">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-auto px-4"
              >
                {isLoading ? <Spinner /> : "Submit"}
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

export default PromoteOffer;
