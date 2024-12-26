import {
  Users,
  UserSquare2,
  Building2,
  Calendar,
  Receipt,
  PlusSquare,
  LucideIcon,
} from "lucide-react";
export const ROUTES: Array<{
  href: string;
  title: string;
  icon: LucideIcon;
}> = [
  {
    title: "Patients",
    href: "patients",
    icon: Users,
  },
  {
    title: "Staff",
    href: "staff",
    icon: UserSquare2,
  },
  {
    title: "Departments",
    href: "departments",
    icon: Building2,
  },
  {
    title: "Appointments",
    href: "appointments",
    icon: Calendar,
  },
  {
    title: "Billing",
    href: "billing",
    icon: Receipt,
  },
  {
    title: "Pharmacy",
    href: "pharmacy",
    icon: PlusSquare,
  },
];
