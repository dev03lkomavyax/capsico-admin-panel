import { z } from "zod";

export const deliveryChargeSchema = z.object({
  city: z.string().min(1, "City is required"),
  zone: z.string().min(1, "Zone is required"),

  // pincodes: z
  //   .array(
  //     z.object({
  //       pincode: z.string().regex(/^\d{6}$/, {
  //         message: "Pincode must be exactly 6 digits",
  //       }),
  //     })
  //   )
  //   .min(1, "At least one pincode is required"),

  incentive: z.coerce.number().min(1),
  baseCharge: z.coerce.number().min(0),
  perKmCharge: z.coerce.number().min(0),
  from: z.coerce.number().min(0),
  to: z.coerce.number().min(1),

  modifiers: z.object({
    timeOfDay: z.object({
      day: z.coerce.number(),
      night: z.coerce.number(),
    }),
    weather: z.object({
      rain: z.coerce.number(),
      extreme: z.coerce.number(),
    }),
    demandSurge: z.object({
      enabled: z.boolean(),
      multiplier: z.coerce.number(),
    }),
  }),

  isActive: z.boolean(),
});
