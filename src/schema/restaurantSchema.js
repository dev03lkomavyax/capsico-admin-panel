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

export const addItemSchema = z.object({
    itemName: z.string().min(1, "Item Name is required"),
    itemImage: z
        .any()
        .refine(file => file && file.length > 0, "Item Image is required"),
    itemDescription: z.string().min(1, "Item Description is required"),
    cuisine: z.string().min(1, "Cuisine is required"),
    foodType: z.string().min(1, "Food Type is required"),
    menuCategory: z.string().min(1, "Menu Category is required"),
    basePrice: z.string().min(1, "Price cannot be 0"),
    preparationTime: z.string().min(1, "Preparation Time is required"),
    packagingCharges: z.string().min(1, "Packaging Charges is required"),
    numberOfPeople: z.string().min(1, "Number of People is required"),
    dishSize: z.string().min(1, "Dish Size is required"),
    timingType: z.string().min(1, "Timing Type is required"),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
    days: z.array(z.string()).optional(),
    restaurant: z.string().optional(),
}).refine(data => {
    if (data.timingType === "custom") {
        // Validate only when timingType is 'custom'
        return (
            !!data.openingTime && // Ensure openingTime exists
            !!data.closingTime && // Ensure closingTime exists
            Array.isArray(data.days) && // Ensure days is an array
            data.days.length > 0 // Ensure days has at least one element
        );
    }
    return true;
}, {
    message: "For custom timing, openingTime, closingTime, and at least one day are required.",
    path: ["timingType"],
});

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
    });

export const EditProfileSchema3 =
    z.object({
        menuImages: z.any().refine(file => file && file.length > 0, "Menu Images are required"),
        foodImages: z.any().refine(file => file && file.length > 0, "Food Images are required"),
        restaurant: z.any().refine(file => file && file.length > 0, "Restaurant Images are required"),
    });

export const EditProfileSchema4 =
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

export const EditProfileSchema5 =
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

export const categorySchema = z.object({
    category: z.string().min(3, 'Mininum 3 char is required').max(50, 'Category should be less than 50 characters'),
    description: z.string().min(3, 'Mininum 3 char is required').max(50, 'Description should be less than 50 characters'),
});

export const subCategorySchema = z.object({
    subCategory: z.string().min(3, 'Mininum 3 char is required').max(50, 'SubCategory should be less than 50 characters'),
    description: z.string().min(3, 'Mininum 3 char is required').max(50, 'Description should be less than 50 characters'),
});
