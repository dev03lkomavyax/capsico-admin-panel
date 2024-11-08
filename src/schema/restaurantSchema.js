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

export const EditProfileSchema1 = z.object({
    restaurantName: z.string().min(1, {
        message: "Restaurant name is required",
    }),
    restaurantAddress: z.string().min(1, {
        message: "Restaurant address is required",
    }),
    latitude: z.string().min(1, {
        message: "Latitude is required",
    }),
    longitude: z.string().min(1, {
        message: "Longitude is required",
    }),
    phoneNumber: z.string()
        .min(10, {
            message: "Phone number must be at least 10 digits",
        })
        .max(15, {
            message: "Phone number cannot exceed 15 digits",
        })
        .regex(/^\d+$/, {
            message: "Phone number must contain only digits",
        }),
    STDCode: z.string()
        .min(2, {
            message: "STD code must be at least 2 digits",
        })
        .max(5, {
            message: "STD code cannot exceed 5 digits",
        })
        .regex(/^\d+$/, {
            message: "STD code must contain only digits",
        }),
    landlineNumber: z.string()
        .min(5, {
            message: "Landline number must be at least 5 digits",
        })
        .max(15, {
            message: "Landline number cannot exceed 15 digits",
        })
        .regex(/^\d+$/, {
            message: "Landline number must contain only digits",
        }),
    fullName: z.string().min(1, {
        message: "Full name is required",
    }),
    email: z.string()
        .min(1, {
            message: "Email is required",
        })
        .email({
            message: "Invalid email address",
        }),
});

export const EditProfileSchema2 =
    z.object({
        restaurantOptions: z.array(z.string()).min(1, "Please select at least one restaurant option"),
        cuisines: z.array(z.string()).min(1, "Please select at least one cuisine"),
        openingTime: z.string().min(1, "Please select an opening time"),
        closingTime: z.string().min(1, "Please select a closing time"),
        days: z.array(z.string()).min(1, "Please select at least one day"),
    })