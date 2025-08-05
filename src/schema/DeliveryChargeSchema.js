import { z } from "zod";

export const deliveryChargeSchema = z.object({
  city: z.string().min(1, "City is required"),

  pincodes: z
    .array(
      z
        .string()
        .regex(/^\d{6}$/, { message: "Pincode must be exactly 6 digits" })
    )
    .min(1, "At least one pincode is required"),

  baseCharge: z.number().min(0),
  perKmCharge: z.number().min(0),

  modifiers: z.object({
    timeOfDay: z.object({
      day: z.number(),
      night: z.number(),
    }),
    weather: z.object({
      rain: z.number(),
      extreme: z.number(),
    }),
    demandSurge: z.object({
      enabled: z.boolean(),
      multiplier: z.number(),
    }),
  }),

  isActive: z.boolean(),
});
