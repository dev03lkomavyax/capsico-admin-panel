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
import { commissionSchema } from "@/schema/CommissionSchema";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";
import { useParams } from "react-router-dom";

const UpdateCustomCommissionModal = ({ open, setOpen, defaultValues }) => {
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: defaultValues || {
      commissionType: "GLOBAL",
      customCommissionPercentage: null,
    },
  });

  const { reset, watch, handleSubmit ,} = form;

  const commissionType = watch("commissionType");

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
    fetchData(`/commission/get-custom?restaurantId=${params?.restaurantId}`);
  };

  useEffect(() => {
    fetchCommission();
  }, [params?.restaurantId]);

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      console.log("fetchCommission res", res?.data);

      const { commission } = res?.data;

      reset({
        commissionType: commission?.commissionType,
        customCommissionPercentage: commission?.effectiveCommissionPercentage,
      });
    }
  }, [res]);

  /* ===============================
  Update commission
  =============================== */

  const onSubmit = (data) => {
    if (data.commissionType === "GLOBAL") {
      data.customCommissionPercentage = null;
    }

    updatePlatformFee(
      `/commission/update-custom?restaurantId=${params?.restaurantId}`,
      {
        commissionType,
        customCommissionPercentage: data.customCommissionPercentage,
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
          <DialogTitle>Update Commission</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Commission Type */}
          <div className="space-y-2">
            <Label>Commission Type</Label>

            <RadioGroup
              value={commissionType}
              onValueChange={(value) => form.setValue("commissionType", value)}
              className="space-y-2"
            >
              <label className="flex items-center gap-3">
                <RadioGroupItem value="GLOBAL" />
                <span>Apply Global Commission</span>
              </label>

              <label className="flex items-center gap-3">
                <RadioGroupItem value="CUSTOM" />
                <span>Apply Custom Commission</span>
              </label>
            </RadioGroup>
          </div>

          {/* Custom Commission */}
          {commissionType === "CUSTOM" && (
            <div className="space-y-2">
              <Label>Custom Commission (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Enter commission percentage"
                {...form.register("customCommissionPercentage", {
                  valueAsNumber: true,
                })}
              />
              {form.formState.errors.customCommissionPercentage && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.customCommissionPercentage?.message}
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

export default UpdateCustomCommissionModal;
