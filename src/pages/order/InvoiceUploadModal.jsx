import { getSocket } from "@/socket";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SingleImageUpload from "@/components/SingleImageUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/Spinner";
import { fileToBase64 } from "@/utils/fileToBase64";
import toast from "react-hot-toast";

const formSchema = z.object({
  image: z.any()
  // .refine((file) => file instanceof File, "Image is required"),
});

const InvoiceUploadModal = ({ open, setOpen, orderId, getOrderDetails }) => {
  const socket = getSocket();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  const { reset, getValues, control, handleSubmit, watch, setValue } = form;

  const [temperature, setTemperature] = useState("");
  const [sanitized, setSanitized] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("getValues", getValues());
  const onSubmit = async (values) => {

    console.log("values", values);
    
    try {
      setIsLoading(true);

      const file = values.image;

      // ---- VALIDATION ----
      if (!file) {
        toast.error("Invoice image is required");
        return;
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPG and PNG images are allowed");
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Max image size is 2MB");
        return;
      }

      // ---- CONVERT TO BASE64 ----
      const imageBase64 = await fileToBase64(file);
      console.log("imageBase64", imageBase64);

      // ---- SOCKET EMIT ----
      socket.emit("invoice_photo_uploaded", {
        orderId,
        imageBase64,
        imageType: file.type,
      });
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    socket.on("invoice_photo_confirmed", (data) => {
      console.log("invoice_photo_confirmed", data);
      getOrderDetails();
      setIsLoading(false);
      setOpen(false);
    });

    socket.on("error", (err) => {
      console.error("invoice_photo_confirmed error:", err);
      setIsLoading(false);
    });

    return () => {
      socket.off("collection_tasks");
      socket.off("error");
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Invoice</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <SingleImageUpload
              control={control}
              watch={watch}
              setValue={setValue}
              name="image"
              label="Invoice Image"
              compress
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

export default InvoiceUploadModal;
