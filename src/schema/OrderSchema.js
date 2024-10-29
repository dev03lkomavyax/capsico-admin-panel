import { z } from "zod";

export const OrderSchema = z.object({
    otp: z
        .string()
        .length(4, { message: "OTP must be exactly 4 digits" })
        .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
    temperature: z.string().optional(),
});