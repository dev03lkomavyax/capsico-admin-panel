import { Dialog, DialogContent } from "@/components/ui/dialog";
import usePostApiReq from "@/hooks/usePostApiReq";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { MdCalendarMonth } from "react-icons/md";
import { format } from "date-fns";

const SendBehaviouralNotificationModal = ({
  isAddModalOpen,
  setIsAddModalOpen,
  getNotifications,
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        title: z.string().min(1, "Title required."),
        description: z.string().min(1, "Description required."),
        appType: z.string().min(1, "App Type required."),
        date: z.date().optional().nullable(),
        time: z.string().optional(),
      })
    ),
    defaultValues: {
      title: "",
      description: "",
      appType: "",
      date: null,
      time: "",
    },
  });

  const { setValue } = form;

  const { res, fetchData, isLoading } = usePostApiReq();

  const handleDateSelect = (value) => {
    setValue("date", value);
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log("data :", data);

    fetchData(`/notification/send-notification`, {
      ...data,
      body: data.description,
      type: "behavioural",
      date:format(new Date(data.date),"yyyy-MM-dd")
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
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-[#111928] text-xl font-semibold font-inter">
              Send Behavioural Notification
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

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Date
                  </FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full flex h-10 px-4 border-[#808080] gap-2 justify-start text-[#717171] max-med:px-3 max-med:h-[46px] max-med:rounded-lg",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <MdCalendarMonth className="text-[#838383] text-xl absolute top-[35%] right-[6.5%]" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-[#838383] text-base font-normal max-med:text-sm">
                              Select a date
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={handleDateSelect}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Time
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      id="time-picker"
                      step="60"
                      // defaultValue="10:30:00"
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
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

export default SendBehaviouralNotificationModal;
