import { z } from "zod";

export const commissionSchema = z
  .object({
    commissionType: z.enum(["GLOBAL", "CUSTOM"]),
    customCommissionPercentage: z
      .number()
      .min(0, "Must be at least 0%")
      .max(100, "Cannot exceed 100%")
      .optional()
      .nullable(),
  })
  .refine(
    (data) =>
      data.commissionType === "GLOBAL" ||
      data.customCommissionPercentage !== null,
    {
      message: "Custom commission is required",
      path: ["customCommissionPercentage"],
    }
  );


export const commissionGSTSchema = z
  .object({
    gstType: z.enum(["GLOBAL", "CUSTOM"]),
    customPercentage: z
      .number()
      .min(0, "Must be at least 0%")
      .max(100, "Cannot exceed 100%")
      .optional()
      .nullable(),
  })
  .refine(
    (data) => data.gstType === "GLOBAL" || data.customPercentage !== null,
    {
      message: "Custom commission GST is required",
      path: ["customPercentage"],
    }
  );
