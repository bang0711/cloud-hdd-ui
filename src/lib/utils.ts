import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { doctors } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDepartmentStatusColor = (status: Department["status"]) => {
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

export const getStaffStatusColor = (status: Staff["status"]) => {
  const colors = {
    "on-duty": "bg-green-100 text-green-800",
    "off-duty": "bg-gray-100 text-gray-800",
    "on-leave": "bg-yellow-100 text-yellow-800",
  };
  return colors[status];
};

export const getShiftColor = (shift: Shift["shift"]) => {
  const colors = {
    morning: "bg-blue-100 text-blue-800",
    afternoon: "bg-orange-100 text-orange-800",
    night: "bg-purple-100 text-purple-800",
  };
  return colors[shift];
};

export const generateTimeRanges = (
  date: Date,
  doctorId: string,
): TimeRange[] => {
  const doctor = doctors.find((d) => d.id === doctorId);
  if (!doctor) return [];

  const dayOfWeek = format(date, "EEEE").toLowerCase();
  const shift = doctor.schedule[dayOfWeek];

  const workingHours = {
    "Morning Shift": { start: 9, end: 13 },
    "Afternoon Shift": { start: 14, end: 18 },
    "Night Shift": { start: 19, end: 23 },
    Off: { start: 0, end: 0 },
    "On Call": { start: 9, end: 17 },
  }[shift || "Off"];

  if (!workingHours) {
    return [];
  }

  // Mock existing appointments
  const bookedRanges = [
    { start: "10:00", end: "11:00" },
    { start: "14:00", end: "15:30" },
  ];

  const ranges: TimeRange[] = [];
  if (workingHours.start === 0 && workingHours.end === 0) {
    return [];
  }

  for (let hour = workingHours.start; hour < workingHours.end; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const start = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const endHour = minute === 30 ? hour + 1 : hour;
      const endMinute = minute === 30 ? 0 : 30;
      const end = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;

      const isBooked = bookedRanges.some(
        (range) =>
          range.start === start || (range.start < start && range.end > start),
      );

      ranges.push({
        start,
        end,
        available: !isBooked,
        reason: isBooked ? "Already booked" : undefined,
      });
    }
  }

  return ranges;
};
