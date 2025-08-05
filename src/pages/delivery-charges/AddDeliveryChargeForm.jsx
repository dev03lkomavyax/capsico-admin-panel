import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { deliveryChargeSchema } from "@/schema/DeliveryChargeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddDeliveryChargeForm() {
  const form = useForm({
    resolver: zodResolver(deliveryChargeSchema),
    defaultValues: {
      city: "",
      pincodes: [""],
      baseCharge: 20,
      perKmCharge: 5,
      modifiers: {
        timeOfDay: { day: 0, night: 10 },
        weather: { rain: 15, extreme: 20 },
        demandSurge: { enabled: false, multiplier: 0 },
      },
      isActive: true,
    },
  });
  const [newPincode, setNewPincode] = useState("");
  const navigate = useNavigate();

  const {
    state: { deliveryCharge = "" },
  } = useLocation();

  const { watch, handleSubmit, control, reset } = form;

  useEffect(() => {
    if (deliveryCharge) {
      reset(deliveryCharge);
    }
  }, [deliveryCharge, reset]);

  const { fields, append, remove } = useFieldArray({
    name: "pincodes",
    control: control,
  });

  const handleAddPincode = () => {
    const trimmed = newPincode.trim();

    if (!/^\d{6}$/.test(trimmed)) {
      return toast.error("Pincode must be exactly 6 digits.");
    }

    const isDuplicate = fields.some((f) => f.value === trimmed);
    if (isDuplicate) {
      return toast.error("Pincode already added.");
    }

    append({ pincode: trimmed }); // add to form array
    setNewPincode(""); // clear input
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const onError = (error) => {
    console.log("error", error);
  };

  console.log("fields", fields);
  return (
    <AdminWrapper>
      <button onClick={() => navigate(-1)} className="flex gap-2 items-center">
        <ChevronLeftIcon />
        <h2 className="text-[#000000] text-xl font-medium font-roboto">
          {deliveryCharge ? "Update" : "Add"} Delivery Charge
        </h2>
      </button>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-6 max-w-5xl mx-auto bg-white mt-10 rounded-lg border p-5"
        >
          {/* City */}
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pincodes (Single Input + List) */}
          <FormLabel>Pincodes</FormLabel>

          {/* Input to enter a new pincode */}
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="number"
              maxLength={6}
              pattern="\d{6}"
              value={newPincode}
              onChange={(e) => setNewPincode(e.target.value)}
              placeholder="Enter 6-digit Pincode"
            />
            <Button type="button" variant="outline" onClick={handleAddPincode}>
              Add
            </Button>
          </div>

          {/* Show Zod validation message */}
          <FormMessage>{form.formState.errors?.pincodes?.message}</FormMessage>

          {/* List of added pincodes */}
          {fields.length > 0 && (
            <div className="mt-4 space-y-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between px-3 py-2 border rounded-md"
                >
                  <span>{field.pincode}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Charges */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="baseCharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Charge</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="perKmCharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Per Km Charge</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Modifiers */}
          <div className="">
            <FormLabel className="text-base">Modifiers</FormLabel>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <FormField
                control={control}
                name="modifiers.timeOfDay.day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day Modifier</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="modifiers.timeOfDay.night"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Night Modifier</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="modifiers.weather.rain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rain Modifier</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="modifiers.weather.extreme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extreme Weather Modifier</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Demand Surge */}
          <FormField
            control={control}
            name="modifiers.demandSurge.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <FormLabel>Enable Surge Pricing</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </div>
                <p className="text-sm text-muted-foreground">
                  Surge pricing applies an additional multiplier to the delivery
                  charge during peak demand hours. Enable this if you want the
                  delivery fee to increase dynamically when demand is high.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="modifiers.demandSurge.multiplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surge Multiplier</FormLabel>
                <FormControl>
                  <Input
                    disabled={!watch("modifiers.demandSurge.enabled")}
                    type="number"
                    step="0.1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Active */}
          <FormField
            control={control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Is Active?</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="capsico" type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </AdminWrapper>
  );
}
