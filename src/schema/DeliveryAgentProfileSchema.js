import { z } from "zod";

export const DeliveryAgentProfileSchema = z.object({
  userImage: z.any(),
  userImagePreview: z.string().default(""),
  panCard: z.any(),
  panCardPreview: z.any(),
  aadharFront: z.any(),
  aadharFrontPreview: z.string().default(""),
  aadharBack: z.any(),
  aadharBackPreview: z.string().default(""),
  drivingLicense: z.any(),
  currentStatus: z.string().optional(),
  backgroundCheckStatus: z.string().optional(),
  drivingLicenseImagePreview: z.string().default(""),
  fullName: z.string().min(1, "Full name is required"),
  address: z.record(z.any()).optional(),
  email: z.string().email("Please enter a valid email address"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.coerce
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  // altPhone: z
  //   .string()
  //   .regex(/^[0-9]{10,12}$/, "Please enter a valid alternate phone number"),
  aadharNumber: z
    .string()
    .length(12, "Aadhar number should be exactly 12 digits"),
  DLNumber: z.string().min(1, "Driving License number is required"),
  DLExpiry: z.date(),
  dateOfBirth: z.date(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  IFSCcode: z.string().optional(),
  upiId: z.string().optional(),
  accountHolderName: z.string().optional(),
  panCardNumber: z.string().optional(),
  cityId: z.string().min(1, {
    message: "City Id is required",
  }),
  //   maximumSecurityDeposit: z.string(),
});
