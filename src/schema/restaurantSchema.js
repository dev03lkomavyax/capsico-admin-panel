import { z } from "zod";

export const imageSchema = z.object({
  menuImages: z.array(z.instanceof(File)).optional(),
  restaurantImages: z
    .array(z.instanceof(File))
    .min(
      1,
      "Please upload at least one photo of the restaurant's facade (front view)."
    ),
  foodImages: z
    .array(z.instanceof(File))
    .min(1, "Please upload at least one photo of the food."),
});

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
});

export const addItemSchema = z
  .object({
    itemName: z.string().min(1, "Item Name is required"),
    itemImage: z
      .any()
      .refine((file) => file && file.length > 0, "Item Image is required"),
    itemDescription: z.string().min(1, "Item Description is required"),
    cuisine: z.string().min(1, "Cuisine is required"),
    foodType: z.string().min(1, "Food Type is required"),
    // menuCategory: z.string().min(1, "Menu Category is required"),
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
  })
  .refine(
    (data) => {
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
    },
    {
      message:
        "For custom timing, openingTime, closingTime, and at least one day are required.",
      path: ["timingType"],
    }
  );

export const EditProfileSchema1 = z.object({
  restaurantName: z.string().min(1, {
    message: "Restaurant name is required",
  }),
  restaurantEmail: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  addressLine: z.string().min(1, {
    message: "AddressLine is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  pinCode: z.string().length(6, {
    message: "PinCode must be exactly 6 digits long",
  }),
  latitude: z.coerce.string().min(1, {
    message: "Latitude is required",
  }),
  longitude: z.coerce.string().min(1, {
    message: "Longitude is required",
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits",
    })
    .max(15, {
      message: "Phone number cannot exceed 15 digits",
    })
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits",
    }),
  fullName: z.string().min(1, {
    message: "Full name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
});

export const EditProfileSchema2 = z.object({
  restaurantType: z.enum(["BOTH", "VEG", "NON_VEG"], {
    required_error: "Please select a restaurant type.",
  }),
  priceForOne: z.coerce.number().min(1, "Price for one in required"),
  restaurantOptions: z
    .array(z.string())
    .min(1, "Please select at least one restaurant option"),
  cuisines: z.array(z.string()).min(1, "Please select at least one cuisine"),
  openingTime: z.string().min(1, "Please select an opening time"),
  closingTime: z.string().min(1, "Please select a closing time"),
  days: z.array(z.string()).min(1, "Please select at least one day"),
});

export const EditProfileSchema3 = z.object({
  menuImages: z.any(),
  foodImages: z.any(),
  restaurant: z.any(),
});
export const AddProfileSchema3 = z.object({
  menuImages: z
    .any()
    .refine((file) => file && file.length > 0, "Menu Images are required"),
  foodImages: z
    .any()
    .refine((file) => file && file.length > 0, "Food Images are required"),
  restaurant: z
    .any()
    .refine(
      (file) => file && file.length > 0,
      "Restaurant Images are required"
    ),
});

// export const EditProfileSchema4 = z.object({
//     isRefered: z.boolean().default(false),
//     timing: z.string().min(1, "Required field"),
//     menuImages: z
//         .any()
//         .refine((file) => file && file.length > 0, "Menu Images are required"),
//     menuImagesPreview: z.string().optional(), // Can be empty or undefined
//     numberType: z.enum(["Mobile", "Landline"]).optional(), // Restrict to specific types if applicable
//     number: z.string().min(1, "Number is required"),
//     isManually: z.string().default("Enter this information manually"),
//     fullName: z.string().min(1, "Full name is required"),
//     email: z.string().email("Invalid email format").optional(),
//     accountingNotificationsNumber: z.string().optional(),
// });

export const EditProfileSchema4 = z
  .object({
    isRefered: z.boolean().default(false),
    timing: z.string().min(1, "Required field"),
    menuImages: z
      .any(),
      // .refine((file) => file && file.length > 0, "Menu Images are required"),
    menuImagesPreview: z.array(z.string()).optional(),
    numberType: z
      .enum(["Mobile", "Landline", "Same as restaurant mobile no."])
      .optional(),
    number: z.string().min(1, "Number is required"),
    isManually: z
      .enum([
        "Use details of the restaurant owner.",
        "Enter this information manually",
      ])
      .default("Enter this information manually"),
    fullName: z.string().optional(),
    email: z.string().optional(),
    accountingNotificationsNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isManually === "Enter this information manually") {
      if (!data.fullName || data.fullName.trim() === "") {
        ctx.addIssue({
          path: ["fullName"],
          message: "Full name is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.email || data.email.trim() === "") {
        ctx.addIssue({
          path: ["email"],
          message: "Email is required",
          code: z.ZodIssueCode.custom,
        });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        ctx.addIssue({
          path: ["email"],
          message: "Invalid email format",
          code: z.ZodIssueCode.custom,
        });
      }

      if (
        !data.accountingNotificationsNumber ||
        data.accountingNotificationsNumber.trim() === ""
      ) {
        ctx.addIssue({
          path: ["accountingNotificationsNumber"],
          message: "Accounting notifications number is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const EditProfileSchema5 = z.object({
  panNumber: z
    .string()
    .min(10, "PAN number must be 10 characters")
    .max(10, "PAN number must be 10 characters"),
  panImage: z.any(),
  FSSAICertificateNumber: z
    .string()
    .min(14, "FSSAI Certificate must be 14 digits"),
  FSSAIExpiryDate: z.date(),
  fssaiImage: z.any(),
  accountHolderName: z.string().min(1, "Account Holder Name is required"),
  bankAccountNumber: z
    .string()
    .regex(/^\d+$/, "Account number must contain only digits")
    .min(8, "Account number must be at least 8 digits long"),
  IFSCCode: z
    .string()
    .regex(
      /^[A-Z]{4}0[A-Z0-9]{6}$/,
      'IFSC code must be in the format: 4 letters, "0", and 6 alphanumeric characters'
    ),
  bankName: z.string().min(1, "Bank Name is required"),
  bankBranch: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "Branch name must contain only letters and spaces"),
});

export const AddProfileSchema5 = z.object({
  panNumber: z
    .string()
    .min(10, "PAN number must be 10 characters")
    .max(10, "PAN number must be 10 characters"),
  panImage: z
    .any()
    .refine((file) => file && file.length > 0, "Pan Card is required"),
  FSSAICertificateNumber: z
    .string()
    .min(14, "FSSAI Certificate must be 14 digits"),
  FSSAIExpiryDate: z.date(),
  fssaiImage: z
    .any()
    .refine((file) => file && file.length > 0, "FSSAI Certificate is required"),
  accountHolderName: z.string().min(1, "Account Holder Name is required"),
  bankAccountNumber: z
    .string()
    .regex(/^\d+$/, "Account number must contain only digits")
    .min(8, "Account number must be at least 8 digits long"),
  IFSCCode: z
    .string()
    .regex(
      /^[A-Z]{4}0[A-Z0-9]{6}$/,
      'IFSC code must be in the format: 4 letters, "0", and 6 alphanumeric characters'
    ),
  bankName: z.string().min(1, "Bank Name is required"),
  bankBranch: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "Branch name must contain only letters and spaces"),
});

export const categorySchema = z.object({
  category: z
    .string()
    .min(3, "Mininum 3 char is required")
    .max(50, "Category should be less than 50 characters"),
  description: z
    .string()
    .min(3, "Mininum 3 char is required")
    .max(50, "Description should be less than 50 characters"),
  isActive: z.coerce.boolean().optional(),
});

export const subCategorySchema = z.object({
  subCategory: z
    .string()
    .min(3, "Mininum 3 char is required")
    .max(50, "SubCategory Name should be less than 50 characters"),
  description: z
    .string()
    .min(3, "Mininum 3 char is required")
    .max(50, "Description should be less than 50 characters"),
  isActive: z.coerce.boolean().default(true).optional(),
});

export const AddProfileSchema6 = z.object({
  dateOfEstablishment: z.date({
    required_error: "Please select the date of establishment",
  }),
  businessType: z.string().min(1, "Business type is required"),
  unitType: z.string().min(1, "Unit type is required"),

  ownerProfile: z
    .any()
    .refine(
      (file) => file instanceof File,
      "Owner profile picture is required"
    ),

  assignedCity: z.string().min(1, "Assigned city is required"),

  deliveryRadius: z
    .string()
    .min(1, "Delivery radius is required")
    .regex(/^\d+$/, "Enter a valid number"),

  cancellationTime: z
    .string()
    .min(1, "Cancellation consideration time is required")
    .regex(/^\d+$/, "Enter a valid number"),

  taxPercent: z
    .string()
    .min(1, "Tax percent is required")
    .regex(/^\d+(\.\d+)?$/, "Enter valid percent"),

  packagingCharges: z
    .string()
    .min(1, "Packaging charge is required")
    .regex(/^\d+(\.\d+)?$/, "Enter valid amount"),

  costTag: z.string().min(1, "Cost tag is required"),
  udyamNumber: z.string().min(1, "Udyam registration number is required"),

  firmProof: z
    .any()
    .refine(
      (file) => file instanceof File,
      "Firm establishment proof is required"
    ),
  restaurantFront: z
    .any()
    .refine((file) => file instanceof File, "Front image is required"),
  restaurantInside: z
    .any()
    .refine((file) => file instanceof File, "Inside image is required"),
  restaurantKitchen: z
    .any()
    .refine((file) => file instanceof File, "Kitchen image is required"),
  stockArea: z
    .any()
    .refine(
      (file) => file instanceof File,
      "Stock keeping area image is required"
    ),

  commissionPercent: z
    .string()
    .min(1, "Commission percent is required")
    .regex(/^\d+(\.\d+)?$/, "Enter valid percent"),

  onboardingSupport: z
    .string()
    .min(1, "Please specify if onboarding support is needed"),

  supportQuery: z.string().optional(),

  agreementAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the agreement declaration"),
});

// 🟣 Edit Restaurant Step 4 Schema
export const EditProfileSchema6 = z.object({
  dateOfEstablishment: z.union([
    z.date(),
    z.string().min(1, "Date of establishment is required"),
  ]),

  businessType: z.string().min(1, "Business type is required"),
  unitType: z.string().min(1, "Unit type is required"),

  ownerProfile: z
    .any()
    .refine(
      (file) =>
        !file ||
        file instanceof File ||
        typeof file === "string" ||
        (file instanceof FileList && file.length > 0),
      "Owner profile is required"
    )
    .optional(),

  assignedCity: z.string().min(1, "Assigned city is required"),

  deliveryRadius: z.coerce
    .number({
      required_error: "Delivery radius is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(1, "Delivery radius must be greater than 0"),

  cancellationTime: z.coerce
    .number({
      required_error: "Cancellation consideration time is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(1, "Cancellation consideration time must be greater than 0"),

  taxPercent: z.coerce
    .number({
      required_error: "Tax percent is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(0, "Enter a valid tax percent"),

  packagingCharges: z.coerce
    .number({
      required_error: "Packaging charge is required",
      invalid_type_error: "Enter a valid amount",
    })
    .min(0, "Enter a valid packaging charge"),

  costTag: z.coerce
    .number({
      required_error: "Cost tag is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(1, "Cost tag must be greater than 0"),

  udyamNumber: z.string().min(1, "Udyam registration number is required"),

  firmProof: z
    .any()
    .refine(
      (file) =>
        !file ||
        file instanceof File ||
        typeof file === "string" ||
        (file instanceof FileList && file.length > 0),
      "Firm establishment proof is required"
    )
    .optional(),

  restaurantFront: z
    .any()
    .refine(
      (file) =>
        !file ||
        file instanceof File ||
        typeof file === "string" ||
        (file instanceof FileList && file.length > 0),
      "Front image is required"
    )
    .optional(),

  restaurantInside: z
    .any()
    .refine(
      (file) =>
        !file ||
        file instanceof File ||
        typeof file === "string" ||
        (file instanceof FileList && file.length > 0),
      "Inside image is required"
    )
    .optional(),

  restaurantKitchen: z
    .any()
    .refine(
      (file) =>
        !file ||
        file instanceof File ||
        typeof file === "string" ||
        (file instanceof FileList && file.length > 0),
      "Kitchen image is required"
    )
    .optional(),

  stockArea: z
    .any()
    .refine(
      (file) =>
        !file ||
        file instanceof File ||
        typeof file === "string" ||
        (file instanceof FileList && file.length > 0),
      "Stock keeping area image is required"
    )
    .optional(),

  commissionPercent: z.coerce
    .number({
      required_error: "Commission percent is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(0, "Enter a valid commission percent"),

  onboardingSupport: z
    .string()
    .min(1, "Please specify if onboarding support is needed"),

  supportQuery: z.string().optional(),

  agreementAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the agreement declaration"),
});