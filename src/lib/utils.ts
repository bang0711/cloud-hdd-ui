import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: Department["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "busy":
      return "bg-yellow-500";
    case "maintenance":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};
