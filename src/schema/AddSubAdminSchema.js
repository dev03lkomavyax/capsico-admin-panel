import { z } from 'zod';

export const AddSubAdminSchema = z.object({
    position: z.string().min(1, 'Position is required'),
    access: z.string().min(1, 'Access is required'),
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string()
        .length(10, 'Phone number must be exactly 10 digits')
        .regex(/^\d{10}$/, 'Phone number must contain only digits'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const EditSubAdminSchema = z.object({
    position: z.string().min(1, 'Position is required'),
    access: z.string().min(1, 'Access is required'),
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string()
        .length(10, 'Phone number must be exactly 10 digits')
        .regex(/^\d{10}$/, 'Phone number must contain only digits'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const changePasswordSchema = z.object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters long."),
    changePassword: z
      .string()
      .min(8, "New password must be at least 8 characters long.")
      .regex(/[A-Z]/, "New password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "New password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "New password must contain at least one number.")
      .regex(/[@$!%*?&]/, "New password must contain at least one special character."),
  });
