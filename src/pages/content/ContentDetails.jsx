import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { PolicySchema } from "@/schema/PolicySchema";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils"; //
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "@/components/DatePicker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import Spinner from "@/components/Spinner";

const ContentDetails = () => {
  const form = useForm({
    resolver: zodResolver(PolicySchema),
    defaultValues: {
      type: "privacy-policy",
      title: "",
      content: "",
      version: "1.0",
      isActive: true,
      effectiveDate: new Date(),
    },
  });

  const { handleSubmit, watch, control, reset } = form;

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: addRes,
    fetchData: add,
    isLoading: isAddLoading,
  } = usePostApiReq();

  const getData = () => {
    fetchData(`/termsandPolicy/getTerm-policy?type=${watch("type")}`);
  };

  useEffect(() => {
    getData();
  }, [watch("type")]);

  useEffect(() => {
    if (res?.data) {
        const { type, title, content, version, effectiveDate, isActive } =
          res?.data;
      reset({
        type,
        title,
        content,
        version,
        effectiveDate: new Date(effectiveDate),
        isActive,
      });
    }
  }, [res]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("get Res", res);
    }
  }, [res]);

  const onSubmit = (data) => {
    console.log("data", data);
    add(`/termsandPolicy/create`, data);
  };

  const onError = (error) => {
    console.log("error", error);
  };

  useEffect(() => {
    if (addRes?.status === 200 || addRes?.status === 201) {
      console.log("add Res", addRes);
      getData();
    }
  }, [addRes]);

  return (
    <AdminWrapper>
      <div>
        <h2 className="text-[#000000] text-xl font-medium font-roboto">
          Terms and Policy
        </h2>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-4 bg-white p-4 rounded-md mt-5"
          >
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select policy type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="privacy-policy">
                          Privacy Policy
                        </SelectItem>
                        <SelectItem value="cookie-policy">
                          Cookie Policy
                        </SelectItem>
                        <SelectItem value="user-agreement">
                          User Agreement
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Terms and Conditions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="h-60 !mb-14"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Version */}
              <FormField
                control={control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input placeholder="1.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Effective Date */}
              <FormField
                control={control}
                name="effectiveDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Effective Date</FormLabel>
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

            {/* Is Active */}
            <FormField
              control={control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div>
                    <FormLabel>Active</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Toggle to make this policy active
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-5 justify-end max-w-80 ml-auto">
              <Button variant="secondary" type="button" onClick={() => reset()}>
                Reset
              </Button>
              <Button type="submit" disabled={isAddLoading}>
                {isAddLoading ? <Spinner /> : "Save Policy"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminWrapper>
  );
};

export default ContentDetails;
