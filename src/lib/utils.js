import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
console.log("IMAGE URL:", import.meta.env.VITE_IMAGE_URL);

export function viewDbImagePreview(imagePath) {
  return `${import.meta.env.VITE_IMAGE_URL}/${imagePath}`;
}

export function getOrderCountByStatus(data, status) {
  const found = data.find((item) => item.status === status);
  return found ? found.count : 0;
}