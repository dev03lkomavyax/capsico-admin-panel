import { z } from 'zod'

const businessInformationSchema = z.object({
    businessName: z.string().nonempty("Business name is required."),
    primaryFoodCategory: z.string().nonempty("Primary food category is required."),
    title: z.string().nonempty("Title is required."),
    businessAddress: z.string().nonempty("Business address is required."),
    streetAddress: z.string().nonempty("Street address is required."),
    city: z.string().nonempty("City is required."),
    state: z.string().nonempty("State is required."),
    pincode: z
        .string()
        .regex(/^\d{6}$/, "Pincode must be a 6-digit number.")
        .nonempty("Pincode is required."),
});

const contactInfoSchema = z.object({
    email: z.string().email("Invalid email address.").nonempty("Email is required."),
    phoneNumber: z
        .string()
        .regex(/^\d{10}$/, "Phone number must be a 10-digit number.")
        .nonempty("Phone number is required."),
})

const storeDetailsSchema = z.object({
    gstin: z.string().optional(),
    fssaiLicense: z.string().optional(),
    panNumber: z
        .string()
        .regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "Invalid PAN number format.")
        .nonempty("PAN number is required."),
    numberOfEmployees: z
        .number("Number of employees must be an integer.")
        .min(1, "At least 1 employee is required."),
    yearsOfOperation: z
        .number("Years of operation must be an integer.")
        .min(0, "Years of operation cannot be negative."),
});

const bankDetailsSchema = z.object({
    bankName: z.string().nonempty("Bank name is required."),
    branchAddress: z.string().nonempty("Branch address is required."),
    accountNumber: z
        .string()
        .regex(/^\d{9,18}$/, "Account number must be between 9 to 18 digits.")
        .nonempty("Account number is required."),
    ifscCode: z
        .string()
        .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format.")
        .nonempty("IFSC code is required."),
});

const productInformationSchema = z.object({
    productCategories: z.array(z.string()).nonempty("Select at least one product category."),
    productTitle: z.string().nonempty("Product title is required."),
    productRangeDescription: z.string().nonempty("Product range description is required."),
});

const additionalInformationSchema = z.object({
    deliveryRadius: z
        .number("Delivery radius must be an integer.")
        .min(0, "Delivery radius cannot be negative."),
    stockAvailability: z.array(z.string()).nonempty("Select at least one stock availability day."),
    specialRequests: z.string().optional(),
});

export const editProfileSchema = z.object({
    businessInformation: businessInformationSchema,
    contactInfo:contactInfoSchema,
    storeDetails: storeDetailsSchema,
    bankDetails: bankDetailsSchema,
    productInformation: productInformationSchema,
    additionalInformation: additionalInformationSchema
})