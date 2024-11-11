import { z } from 'zod'

export const DeliveryAgentProfileSchema = z.object({
    userImage: z.string().default(""),
    userImagePreview: z.string().default(""),
    fullName: z.string().min(1, "Full name is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number should be 10 digits").max(10, "Phone number should be 10 digits"),
    altPhone: z.string().regex(/^[0-9]{10,12}$/, "Please enter a valid alternate phone number"),
    aadharNumber: z.string().length(12, "Aadhar number should be exactly 12 digits"),
    DLNumber: z.string().min(1, "Driving License number is required"),
    DLExpiry: z.date(),
    bankName: z.string().min(1, "Bank name is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    IFSCcode: z.string().min(1, "IFSC code is required"),
    panCardNumber: z.string().min(1, "PAN card number is required"),
    maximumSecurityDeposit: z.string(),
})
