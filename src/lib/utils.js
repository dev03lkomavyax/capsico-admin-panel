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

export function generateTransactionId(baseId) {
  const prefix = "TXN"; // transaction prefix
  const shortBase = baseId.slice(-6).toUpperCase(); // last 6 chars of baseId
  // const timestamp = Date.now().toString(36).toUpperCase(); // compact time code
  // const random = Math.random().toString(36).substring(2, 6).toUpperCase(); // random suffix
  return `${prefix}-${shortBase}`;
}