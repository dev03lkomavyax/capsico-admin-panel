import { z } from "zod";

export const PolicySchema = z.object({
  type: z.enum(["privacy-policy", "cookie-policy", "user-agreement"]),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  version: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  effectiveDate: z.date({
    required_error: "Effective Date is required",
  }),
});
