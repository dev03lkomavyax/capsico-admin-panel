import { z } from "zod";

export const AddressSchema = z.object({
  lat: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "Latitude is required" })
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90")
  ),

  lng: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ required_error: "Latitude is required" })
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90")
  ),

  state: z
    .string({ required_error: "State is required" })
    .min(2, "State must be at least 2 characters long")
    .max(50, "State must be at most 50 characters long"),

  city: z
    .string({ required_error: "City is required" })
    .min(2, "City must be at least 2 characters long")
    .max(50, "City must be at most 50 characters long"),

  pinCode: z
    .string({ required_error: "Pin Code is required" })
    .regex(/^\d{6}$/, "Pin Code must be 6 digits"),

  addressLine: z
    .string({ required_error: "Address Line is required" })
    .min(5, "Address must be at least 5 characters long")
    .max(200, "Address must be at most 200 characters long"),
});
