import { z } from "zod";

// export const DeliveryPartnerSchema = z
//   .object({
//     name: z.string().min(3),
//     email: z.string().email(),
//     phone: z.string().regex(/^[6-9]\d{9}$/),
//     dateOfBirth:z.date({ required_error: "Date of birth is required" }),
//     gender: z.enum(["male", "female", "other"]),
//     languages: z.array(z.string()).min(1, "Select at least one language"),

//     address: z.object({
//       street: z.string(),
//       city: z.string(),
//       state: z.string(),
//       pincode: z.string().min(6),
//       latitude: z.string(),
//       longitude: z.string(),
//     }),

//     vehicleType: z.enum(["bike", "bicycle", "3-wheeler"]),
//     vehicleNumber: z.string().optional(),

//     drivingLicenseNumber: z.string().optional(),
//     drivingLicenseExpiry: z.date({ required_error: "Driving license expiry is required" }),

//     aadharNumber: z.string().regex(/^\d{12}$/, "Invalid Aadhar number"),
//     panNumber: z
//       .string()
//       .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),

//     profileImage: z.any(),
//     drivingLicenseImage: z.any().optional(),
//     aadharFrontImage: z.any(),
//     aadharBackImage: z.any(),
//     panCardImage: z.any(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.vehicleType !== "bicycle") {
//       if (!data.vehicleNumber)
//         ctx.addIssue({ path: ["vehicleNumber"], message: "Required" });
//       if (!data.drivingLicenseNumber)
//         ctx.addIssue({ path: ["drivingLicenseNumber"], message: "Required" });
//       if (!data.drivingLicenseExpiry)
//         ctx.addIssue({ path: ["drivingLicenseExpiry"], message: "Required" });
//     }
//   });

export const DeliveryPartnerSchema = z
  .object({
    name: z.string().min(3, "Name must be 3+ characters"),
    email: z.string().email("Invalid email"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    dateOfBirth: z.date({ required_error: "Date of birth is required" }),
    gender: z.enum(["male", "female", "other"]),
    languages: z.array(z.string()).min(1, "Select at least one language"),
    // address fields
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().min(4),
    latitude: z.string().min(1),
    longitude: z.string().min(1),

    vehicleType: z.enum(["bike", "bicycle", "3-wheeler"]),
    vehicleNumber: z.string().optional(),

    drivingLicenseNumber: z.string().optional(),
    drivingLicenseExpiry: z.date({
      required_error: "Driving license expiry is required",
    }),

    aadharNumber: z.string().regex(/^\d{12}$/, "Invalid Aadhar number"),
    panNumber: z
      .string()
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),

    // files will be handled outside zod for File objects; accept any
    profileImage: z.any().optional(),
    drivingLicenseImage: z.any().optional(),
    aadharFrontImage: z.any().optional(),
    aadharBackImage: z.any().optional(),
    panCardImage: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.vehicleType !== "bicycle") {
      if (!data.vehicleNumber) {
        ctx.addIssue({ path: ["vehicleNumber"], message: "Required" });
      }
      if (!data.drivingLicenseNumber) {
        ctx.addIssue({ path: ["drivingLicenseNumber"], message: "Required" });
      }
      if (!data.drivingLicenseExpiry) {
        ctx.addIssue({ path: ["drivingLicenseExpiry"], message: "Required" });
      }
    }

    // files required checks
    if (!data.profileImage) {
      ctx.addIssue({
        path: ["profileImage"],
        message: "Profile image required",
      });
    }
    if (!data.aadharFrontImage) {
      ctx.addIssue({
        path: ["aadharFrontImage"],
        message: "Aadhar front required",
      });
    }
    if (!data.aadharBackImage) {
      ctx.addIssue({
        path: ["aadharBackImage"],
        message: "Aadhar back required",
      });
    }
    if (!data.panCardImage) {
      ctx.addIssue({ path: ["panCardImage"], message: "PAN image required" });
    }
    if (data.vehicleType !== "bicycle" && !data.drivingLicenseImage) {
      ctx.addIssue({
        path: ["drivingLicenseImage"],
        message: "DL image required",
      });
    }
  });
