import { z } from 'zod'

export const loginSchema = z.object({
    adminId: z.string().min(4, { message: "Admin ID is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})