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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../Spinner";
import SingleImageUpload from "../SingleImageUpload";
import { useParams } from "react-router-dom";
import useGetApiReq from "@/hooks/useGetApiReq";

const formSchema = z.object({
  logo: z.any().refine((file) => file instanceof File, "Logo is required"),
});

const UpdateLogoModal = ({ open, setOpen, offerId }) => {
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: "",
    },
  });

  const { reset, getValues, control, handleSubmit, watch, setValue } = form;

  const { res, fetchData, isLoading } = usePatchApiReq();
  const {
    res: getRes,
    fetchData: getBanner,
    isLoading: isGetBannerLoading,
  } = useGetApiReq();

  const onSubmit = (values) => {
    console.log("data:", values);
    const formData = new FormData();
    formData.append("logo", values.logo);
    formData.append("restaurantId", params.restaurantId);

    fetchData(`/admin/update-logo`, formData);
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("update logo res", res);
      setOpen(false);
    }
  }, [res]);

  const getBannerFun = () => {
    getBanner(`/admin/get-logo?restaurantId=${params.restaurantId}`);
  };

  useEffect(() => {
    getBannerFun();
  }, []);

  useEffect(() => {
    if (getRes?.status === 200 || getRes?.status === 201) {
      console.log("get logo res", getRes);
      reset({
        logoPreview: getRes?.data?.logo || "",
      });
    }
  }, [getRes]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Update Logo</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <SingleImageUpload
              control={control}
              watch={watch}
              setValue={setValue}
              name="logo"
              label="Logo"
              // compress
              className="h-52"
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

export default UpdateLogoModal;
