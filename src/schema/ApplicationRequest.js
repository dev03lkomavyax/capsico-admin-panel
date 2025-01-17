import { z } from 'zod'

export const addRestaurantSchema1 = z.object({
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

export const addRestaurantSchema2 =
    z.object({
        restaurantOptions: z.array(z.string()).min(1, "Please select at least one restaurant option"),
        cuisines: z.array(z.string()).min(1, "Please select at least one cuisine"),
        openingTime: z.string().min(1, "Please select an opening time"),
        closingTime: z.string().min(1, "Please select a closing time"),
        days: z.array(z.string()).min(1, "Please select at least one day"),
    });

export const addRestaurantSchema3 =
    z.object({
        menuImages: z.any().refine(file => file && file.length > 0, "Menu Images are required"),
        foodImages: z.any().refine(file => file && file.length > 0, "Food Images are required"),
        restaurant: z.any().refine(file => file && file.length > 0, "Restaurant Images are required"),
    });

export const addRestaurantSchema4 =
    z.object({
        isRefered: z.boolean().default(false),
        timing: z.string().min(1, "Required field"),
        menuImages: z.any().refine(file => file && file.length > 0, "Menu Images are required"),
        menuImagesPreview: z.string().optional(), // Can be empty or undefined
        numberType: z.enum(["Mobile", "Landline"]).optional(), // Restrict to specific types if applicable
        number: z.string().min(1, "Number is required"),
        isManually: z.string().default("Enter this information manually"),
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Invalid email format").optional(),
        accountingNotificationsNumber: z.string().optional(),
    });

export const addRestaurantSchema5 =
    z.object({
        panNumber: z.string().min(10, "PAN number must be 10 characters").max(10, "PAN number must be 10 characters"),
        nameOnPan: z.string().min(1, "Name on PAN is required"),
        address: z.string().min(1, "Address is required"),
        panImage: z.string().optional(),
        FSSAICertificateNumber: z.string().optional(),
        FSSAIExpiryDate: z.string().optional(),
        fssaiImage: z.string().optional(),
        bankAccountNumber: z.string().min(1, "Bank account number is required"),
        reEnterAccountNumber: z.string().min(1, "Re-enter account number"),
        accountType: z.enum(["Savings", "Current"]).optional(), // Restrict to specific account types if applicable
        IFSCCode: z.string().min(1, "IFSC Code is required"),
    });