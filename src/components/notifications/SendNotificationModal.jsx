import { Dialog, DialogContent } from "@/components/ui/dialog";
import usePostApiReq from "@/hooks/usePostApiReq";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const SendNotificationModal = ({
  isAddModalOpen,
  setIsAddModalOpen,
  getNotifications,
}) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        title: z.string().min(1, "Title required."),
        description: z.string().min(1, "Description required."),
        appType: z.string().min(1, "App Type required."),
      })
    ),
    defaultValues: {
      title: "",
      description: "",
      appType: "",
    },
  });

  const { res, fetchData, isLoading } = usePostApiReq();

  const onSubmit = (data) => {
    console.log("data :", data);
    fetchData(`/notification/send-notification`, {
      ...data,
      body: data.description,
    });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("update status res", res);
      setIsAddModalOpen(false);
      getNotifications();
    }
  }, [res, setIsAddModalOpen]);

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-[#111928] text-xl font-semibold font-inter">
              Send Notification
            </h2>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Title..."
                      className={`placeholder:text-[#A6A6A6] resize-none  font-inter rounded-lg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Description..."
                      className={`placeholder:text-[#A6A6A6] resize-none  font-inter rounded-lg`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    App Type
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select App Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="delivery-partner">
                            Delivery Partner
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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

export default SendNotificationModal;
