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

export const departments: Department[] = [
  {
    id: "D001",
    name: "Emergency",
    manager: {
      name: "Dr. Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "Emergency Director",
    },
    staffCount: 45,
    status: "busy",
  },
  {
    id: "D002",
    name: "Cardiology",
    manager: {
      name: "Dr. Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      role: "Head Cardiologist",
    },
    staffCount: 32,
    status: "active",
  },
  {
    id: "D003",
    name: "Pediatrics",
    manager: {
      name: "Dr. Emily Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      role: "Pediatrics Head",
    },
    staffCount: 28,
    status: "active",
  },
  {
    id: "D004",
    name: "Radiology",
    manager: {
      name: "Dr. James Moore",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      role: "Radiology Director",
    },
    staffCount: 15,
    status: "maintenance",
  },
];

export const patients: Patient[] = [
  {
    id: "P001",
    name: "John Smith",
    age: 45,
    condition: "stable",
    room: "201",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    admissionDate: "2024-01-15",
  },
  {
    id: "P002",
    name: "Emma Wilson",
    age: 32,
    condition: "recovering",
    room: "105",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    admissionDate: "2024-02-01",
  },
  {
    id: "P003",
    name: "Robert Chen",
    age: 58,
    condition: "critical",
    room: "ICU-3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    admissionDate: "2024-02-10",
  },
];
