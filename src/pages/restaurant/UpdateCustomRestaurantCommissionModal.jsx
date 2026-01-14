import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { commissionGSTSchema, commissionSchema } from "@/schema/CommissionSchema";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import { useParams } from "react-router-dom";

const UpdateCustomRestaurantCommissionModal = ({
  open,
  setOpen,
  defaultValues,
}) => {
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(commissionGSTSchema),
    defaultValues: {
      gstType: "GLOBAL",
      customPercentage: null,
    },
  });

  const { reset, watch, handleSubmit } = form;

  const gstType = watch("gstType");

  const { res, fetchData, isLoading } = useGetApiReq();
  const {
    res: updateRes,
    fetchData: updatePlatformFee,
    isLoading: isUpdateLoading,
  } = usePostApiReq();

  /* ===============================
  Fetch existing commission
  =============================== */
  const fetchCommission = async () => {
    fetchData(
      `/commission/get-restaurant-commission-gst/${params?.restaurantId}`
    );
  };

  useEffect(() => {
    fetchCommission();
  }, [params?.restaurantId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("fetchCommission res", res?.data);

      const { gst } = res?.data;

      reset({
        gstType: gst?.gstType,
        customPercentage: gst?.effectiveGSTPercentage,
      });
    }
  }, [res]);

  /* ===============================
  Update commission
  =============================== */

  const onSubmit = (data) => {
    if (data.gstType === "GLOBAL") {
      data.customPercentage = null;
    }

    updatePlatformFee(
      `/commission/update-restaurant-commission-gst/${params?.restaurantId}`,
      {
        gstType,
        customPercentage: data.customPercentage,
      }
    );
  };

  useEffect(() => {
    if (updateRes?.status === 200 || updateRes?.status === 201) {
      console.log("updateRes", updateRes);
      setOpen(false);
    }
  }, [updateRes]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Commission GST</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Commission Type */}
          <div className="space-y-2">
            <Label>Commission GST Type</Label>

            <RadioGroup
              value={gstType}
              onValueChange={(value) => form.setValue("gstType", value)}
              className="space-y-2"
            >
              <label className="flex items-center gap-3">
                <RadioGroupItem value="GLOBAL" />
                <span>Apply Global Commission GST</span>
              </label>

              <label className="flex items-center gap-3">
                <RadioGroupItem value="CUSTOM" />
                <span>Apply Custom Commission GST</span>
              </label>
            </RadioGroup>
          </div>

          {/* Custom Commission */}
          {gstType === "CUSTOM" && (
            <div className="space-y-2">
              <Label>Custom Commission GST (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Enter commission GST percentage"
                {...form.register("customPercentage", {
                  valueAsNumber: true,
                })}
              />
              {form.formState.errors.customPercentage && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.customPercentage?.message}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabeld={isUpdateLoading} type="submit" variant="capsico">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCustomRestaurantCommissionModal;
