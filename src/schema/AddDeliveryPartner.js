import { z } from 'zod'

export const AddDeliveryPartnerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    mobileNumber: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
    aadharCardNumber: z
        .string()
        .regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
    panCardNumber: z
        .string()
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card number"),
    drivingLicenseNumber: z.string().min(1, "Driving License number is required"),
    expiryDate: z.string().min(1, "Expiry Date is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    pincode: z
        .string()
        .regex(/^\d{6}$/, "Pincode must be 6 digits"),
    vehicle: z.string().min(1, "Vehicle type is required"),
    uploadPhoto: z.any().refine((file) => file?.size > 0, "Photo is required"),
    uploadAadhar: z.any().refine((file) => file?.size > 0, "Aadhar image is required"),
    uploadPan: z.any().refine((file) => file?.size > 0, "PAN image is required"),
    uploadLicense: z.any().refine((file) => file?.size > 0, "Driving License image is required"),
})