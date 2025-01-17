import { z } from 'zod';

export const AddCustomizationCategorySchema = z.object({
  categoryName: z.string().min(1, "Category Name is required"), // Ensure 'categoryName' is not empty
  customizationType: z.string().min(1, "Customization Type is required"), // Ensure 'customizationType' is not empty
})

export const AddCustomizationSchema = z.object({
  customizationName: z.string().min(1, "Customization Name is required"),
  price: z.string().min(1, "Price is required"),
});

