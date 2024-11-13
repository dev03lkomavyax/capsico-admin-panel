import { z } from 'zod';

export const UpdateAdminProfileSchema = z.object({
    profileImg: z.any().refine(file => file && file.length > 0, "Profile Images are required"),
    adminID: z.string().min(1, 'adminID is required'),
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string()
        .length(10, 'Phone number must be exactly 10 digits')
        .regex(/^\d{10}$/, 'Phone number must contain only digits'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
});
