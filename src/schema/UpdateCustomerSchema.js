import { isValid, parse } from "date-fns";
import { z } from "zod";

const parseDateString = (value) => {
  if (value === null || value === undefined || value === "") return null;

  if (typeof value === "string") {
    const parsed = parse(value, "dd/MM/yyyy", new Date());
    return isValid(parsed) ? parsed : null;
  }

  if (value instanceof Date && isValid(value)) return value;

  return null;
};


export const UpdateCustomerSchema = z.object({
  userImage: z.any(),
  userImagePreview: z.string().default(""),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.preprocess(
    (val) => String(val),
    z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
  ),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.preprocess(parseDateString, z.date()).nullable().optional(),

  anniversary: z.preprocess(parseDateString, z.date()).nullable().optional(),
});
