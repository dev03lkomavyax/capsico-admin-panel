import { z } from 'zod'

export const imageSchema = z.object({
    menuImages: z.array(z.instanceof(File)).optional(),
    restaurantImages: z.array(z.instanceof(File)).min(1, "Please upload at least one photo of the restaurant's facade (front view)."),
    foodImages: z.array(z.instanceof(File)).min(1, "Please upload at least one photo of the food."),
})

export const uploadDocumentSchema = z.object({
    panNumber: z
        .string()
        .min(10, "PAN number must be 10 characters")
        .max(10, "PAN number must be 10 characters")
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format"),
    nameOnCard: z.string().min(2, "Name on PAN card is required"),
    address: z.string().min(5, "Address is required"),
    fssaCertificate: z
        .instanceof(File)
        .refine((file) => file.type === "application/pdf", {
            message: "FSSA certificate must be a PDF",
        }),
})

export const addMenuSchema = z.object({
    itemName: z.string().min(2, "Item name is required"),
    itemDescription: z.string().optional(),
    foodType: z.enum(["Veg", "Non-Veg", "Egg"], {
        required_error: "Please select a food type",
    }),
    serviceType: z.enum(["Delivery", "Pickup"], {
        required_error: "Please select a service type",
    }),
    menuCategory: z.string().min(1, "Please select a menu category"),
    itemImage: z.any().optional(), // Optional file input validation
    basePrice: z.number({ invalid_type_error: "Please enter a valid price" })
        .positive("Price must be greater than zero"),
    packagingCharges: z.string().optional(),
    variants: z.array(
        z.object({
            variantName: z.string(),
            variantPrice: z.number().positive(),
        })
    ).optional(),
    addOns: z.array(
        z.object({
            addOnName: z.string(),
            addOnPrice: z.number().positive(),
        })
    ).optional(),
    additionalDetails: z.string().optional(),
    servingInfo: z.string().optional(),

})