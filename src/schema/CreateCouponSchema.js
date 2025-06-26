import { z } from "zod";

export const CreateCouponSchema = z
  .object({
    couponCode: z
      .string()
      .min(5, "Coupon code must be at least 5 characters long"),
    couponName: z
      .string()
      .min(5, "Coupon name must be at least 5 characters long"),
    description: z.string().min(1, "Description is required"),
    discountType: z.enum(["percentage", "fixed", "buyOneGetOne"], {
      errorMap: () => ({ message: "Select a valid discount type" }),
    }),
    discountValue: z.coerce
      .number()
      .min(0, "Discount value must be 0 or greater")
      .optional(),
    maxDiscount: z.coerce
      .number()
      .min(0, "Maximum discount must be 0 or greater")
      .optional(),
    applicableTo: z.enum(["cuisine", "specific_items", "all"], {
      required_error: "Please specify what the coupon applies to",
    }),

    usageFrequency: z.string({
      required_error: "Please specify usage frequency",
    }),
    applicableItems: z.array(z.string()).optional(),
    applicableCuisines: z.array(z.string()).optional(),
    categoryId: z.string().optional(),
    minOrderValue: z.coerce
      .number()
      .min(0, "Minimum order value must be 0 or greater"),
    maxUsage: z.coerce.number().min(0, "Maximum usage must be 0 or greater"),
    maxUsesPerUser: z.coerce
      .number()
      .min(0, "Max uses per user must be 0 or greater"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    status: z.string({ required_error: "Status is required" }),
    isDealOfDay: z.boolean().optional(),
    dealType: z.enum(["restaurant", "item", "category"]).optional(),
    priorityLevel: z.coerce
      .number()
      .min(0, "Priority level must be 0 or greater"),
  })
  .superRefine((data, ctx) => {
    // Date check
    if (data.startDate && data.endDate && data.startDate >= data.endDate) {
      ctx.addIssue({
        path: ["endDate"],
        code: z.ZodIssueCode.custom,
        message: "End date must be after the start date",
      });
    }

    // Require discountValue if discountType is not buyOneGetOne
    if (data.discountType !== "buyOneGetOne") {
      if (data.discountValue === undefined || isNaN(data.discountValue)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount value is required",
          path: ["discountValue"],
        });
      }
    }

    // Require maxDiscount if type is percentage
    if (data.discountType === "percentage") {
      if (data.maxDiscount === undefined || isNaN(data.maxDiscount)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum discount is required for percentage type",
          path: ["maxDiscount"],
        });
      }
    }

    // Require dealType if isDealOfDay is true
    if (data.isDealOfDay && !data.dealType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Deal type is required when Deal of the Day is active",
        path: ["dealType"],
      });
    }

    // Validate applicableItems or applicableCuisines based on applicableTo
    if (
      data.applicableTo === "cuisine" &&
      (!data.applicableCuisines || data.applicableCuisines.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select at least one cuisine",
        path: ["applicableCuisines"],
      });
    }

    if (
      data.applicableTo === "specific_items" &&
      (!data.applicableItems || data.applicableItems.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select at least one item",
        path: ["applicableItems"],
      });
    }

    if (data.applicableTo === "specific_items" && !data.categoryId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select category",
        path: ["categoryId"],
      });
    }
  });
