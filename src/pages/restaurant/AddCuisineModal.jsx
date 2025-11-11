import React, { useEffect } from "react";
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
import { z } from "zod";
import usePostApiReq from "@/hooks/usePostApiReq";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const AddCuisineModal = ({ open, setOpen, getCuisines }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { reset, getValues, control, handleSubmit } = form;

  const { res, fetchData, isLoading } = usePostApiReq();

  const onSubmit = (values) => {
    console.log("data:", values);
    const payload = {
      name: values.title,
      description: values.description,
    };

    fetchData(`/admin/cuisine/add`, payload);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("add cuisine res", res);
      setOpen(false);
      getCuisines();
    }
  }, [res]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Cuisine</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea onChange={field.onChange} value={field.value} />
                  </FormControl>
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

export default AddCuisineModal;
