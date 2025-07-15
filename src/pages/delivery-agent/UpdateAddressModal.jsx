/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePatchApiReq from "@/hooks/usePatchApiReq";
import usePostApiReq from "@/hooks/usePostApiReq"; // Assuming you're using POST to create address
import { AddressSchema, UpdateAddressSchema } from "@/schema/AddAddressSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateAddressModal = ({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
  address,
}) => {
  const form = useForm({
    resolver: zodResolver(UpdateAddressSchema),
    defaultValues: {
      lng: address?.location?.coordinates?.[0] || "",
      lat: address?.location?.coordinates?.[1] || "",
      state: address?.state || "",
      city: address?.city || "",
      pincode: address?.pincode || "",
      street: address?.street || "",
    },
  });

  const { control, handleSubmit, reset, getValues } = form;
  const { deliveryAgentId } = useParams();
  const { res, fetchData, isLoading } = usePatchApiReq();


  console.log("address", address);
  const onSubmit = (data) => {
    console.log("data", data);

    const address = {
      street: data.street,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      longitude: data.lng,
      latitude: data.lat,
    };

    fetchData(`/admin/update-profile/${deliveryAgentId}`, { address });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      onSuccess?.();
      setIsModalOpen(false);
      reset();
    }
  }, [res]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <h2 className="text-xl font-semibold font-inter">
              {address ? "Update" : "Add"} Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Street Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Pin Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Latitude" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lng"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Longitude" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                variant="capsico"
                className="h-11 text-base font-inter"
                disabled={isLoading}
              >
                {address ? "Update" : "Add"} Address
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressModal;
