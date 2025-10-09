import { z } from "zod";

export const CreateCouponSchema = z
  .object({
    restaurantId: z.string().min(1, "Select restaurant"),
    // couponCode: z
    //   .string()
    //   .min(5, "Coupon code must be at least 5 characters long"),
    offerName: z.string().min(1, "Offer Name is required"),
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

export const offerSchema = z
  .object({
    // offerCode: z.string().min(1, "Offer Code is required").optional(), // optional unique
    restaurantId: z.string().min(1, "Restaurant is required"),

    offerName: z.string().min(1, "Offer name is required"),
    description: z.string().optional(),

    offerType: z.enum(
      ["flatOff", "percentageDiscount", "bogoOffers", "comboDeals"],
      {
        required_error: "Offer type is required",
      }
    ),

    scope: z.enum(["global", "categorywise", "itemwise"], {
      required_error: "Scope is required",
    }),

    priorityLevel: z.coerce
      .number()
      .min(0, "Priority level must be 0 or greater"),

    discountValue: z.coerce
      .number()
      .min(0, "Discount value must be 0 or greater")
      .optional(),
    maxDiscount: z.coerce
      .number()
      .min(0, "Maximum discount must be 0 or greater")
      .optional(),

    // offerDetails (nested object, conditional fields later)
    offerDetails: z
      .object({
        bogoConfig: z
          .object({
            buyQuantity: z.coerce.number().optional(),
            getQuantity: z.coerce.number().optional(),
            freeItemType: z.string().optional(),
          })
          .optional(),
        comboItems: z
          .array(
            z.object({
              itemId: z.string().optional(),
              quantity: z.coerce.number().optional(),
              isRequired: z.boolean().default(false),
            })
          )
          .optional(),

        comboPrice: z.coerce.number().optional(),
        comboConfig: z
          .object({
            allowSubstitution: z.boolean().default(false),
            substitutionLimit: z.coerce.number().optional(),
          })
          .optional(),
      })
      .optional(),

    applicableItems: z.array(z.string()).optional(),
    applicableCategories: z.array(z.string()).optional(),

    // excludedItems: z.array(z.string()).optional(),
    // excludedCategories: z.array(z.string()).optional(),

    minOrderValue: z.number().optional(),

    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),

    isActive: z.boolean().default(true),
    priority: z.number().min(0).max(100).default(0),

    maxUsage: z.number(),
    maxUsesPerUser: z.number(),

    createdBy: z.string().optional(), // filled from backend
    createdByType: z.enum(["admin", "restaurant"]).optional(),
  })
  .superRefine((data, ctx) => {
    const comboItems = data.offerDetails?.comboItems;
    if (comboItems) {
      const seen = new Set();
      comboItems.forEach((item, index) => {
        if (seen.has(item.itemId)) {
          ctx.addIssue({
            code: "custom",
            path: ["offerDetails", "comboItems", index, "itemId"], // attach error to the specific field
            message: "This item is already added to the combo",
          });
        } else {
          seen.add(item.itemId);
        }
      });
    }

    // Ensure endDate > startDate
    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be later than start date",
      });
    }

    // Offer type validation
    if (
      data.offerType === "flatOff" ||
      data.offerType === "percentageDiscount"
    ) {
      if (!data?.discountValue) {
        ctx.addIssue({
          code: "custom",
          path: ["discountValue"],
          message:
            "Discount value is required for flatOff and percentageDiscount offers",
        });
      }
    }

    if (data.offerType === "percentageDiscount" && !data?.maxDiscount) {
      ctx.addIssue({
        code: "custom",
        path: ["maxDiscount"],
        message: "Max discount is required for percentageDiscount offers",
      });
    }

    if (data.offerType === "bogoOffers") {
      const bogo = data.offerDetails?.bogoConfig;

      // Buy Quantity
      if (bogo?.buyQuantity == null) {
        ctx.addIssue({
          code: "custom",
          path: ["offerDetails", "bogoConfig", "buyQuantity"],
          message: "Buy Quantity is required",
        });
      }

      // Get Quantity
      if (bogo?.getQuantity == null) {
        ctx.addIssue({
          code: "custom",
          path: ["offerDetails", "bogoConfig", "getQuantity"],
          message: "Get Quantity is required",
        });
      }

      // Free Item Type
      if (!bogo?.freeItemType) {
        ctx.addIssue({
          code: "custom",
          path: ["offerDetails", "bogoConfig", "freeItemType"],
          message: "Free Item Type is required",
        });
      }
    }
    if (data.offerType === "comboDeals") {
      if (
        !data.offerDetails?.comboItems ||
        data.offerDetails.comboItems.length < 2
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["offerDetails", "comboItems"],
          message: "At least 2 combo items are required for comboDeals",
        });
      }
      if (!data.offerDetails?.comboPrice) {
        ctx.addIssue({
          code: "custom",
          path: ["offerDetails", "comboPrice"],
          message: "Combo price is required for comboDeals",
        });
      }
    }

    // Scope validation
    if (
      data.scope === "itemwise" &&
      (!data.applicableItems || data.applicableItems.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["applicableItems"],
        message: "Applicable items are required for itemwise scope",
      });
    }

    if (
      data.scope === "categorywise" &&
      (!data.applicableCategories || data.applicableCategories.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["applicableCategories"],
        message: "Applicable categories are required for categorywise scope",
      });
    }
  });
