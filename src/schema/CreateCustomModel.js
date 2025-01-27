import { z } from 'zod'

export const CreateCustomModelFirstSchema = z.object({
    couponCode: z.string().min(3, "Coupon code must be at least 3 characters"),
    couponName: z.string().min(3, "Coupon name must be at least 3 characters"),
    description: z.string(),
    discountType: z.enum(["percentage", "fixed"]),
    discountValue: z.number().min(0),
    maxDiscount: z.number().min(0),
})

export const CreateCustomModelSecondSchema = z.object({
    applicableTo: z.string(),
    usageLimits: z.number().min(0),
    minOrderValue: z.number().min(0),
    maxUsage: z.number().min(0),
    maxUsesPerUser: z.number().min(0),
    usageFrequency: z.string(),
})

export const CreateCustomModelThirdSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
    time: z.string(),
    isDealOfDay: z.boolean(),
    priorityLevel: z.number().min(0),
})