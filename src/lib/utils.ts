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

export const getConditionColor = (condition: Patient["condition"]) => {
  const colors = {
    stable: "bg-green-100 text-green-800",
    recovering: "bg-blue-100 text-blue-800",
    critical: "bg-red-100 text-red-800",
  };
  return colors[condition];
};
