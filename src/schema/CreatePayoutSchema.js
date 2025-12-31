import { z } from "zod";

export const createPayoutSchema = z.object({
  recipientType: z.enum(["DELIVERY_PARTNER", "MERCHANT"], {
    required_error: "Recipient type is required",
  }),

  recipientId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid recipient ID"),

  amount: z
    .number({ required_error: "Amount is required" })
    .min(1, "Amount must be at least 1"),

  transactionNumber: z.string().trim().optional().nullable(),

  transactionDetail: z
    .string({ required_error: "Transaction detail is required" })
    .min(3, "Transaction detail must be at least 3 characters"),

  payoutDate: z
    .date({ required_error: "Payout date is required" }),

  deductFromEarnings: z.boolean().default(true),
});
