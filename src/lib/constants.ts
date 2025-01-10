import { Users, UserSquare2, Building2, LucideIcon } from "lucide-react";
import { Route } from "next";
export const ROUTES: Array<{
  href: Route;
  title: string;
  icon: LucideIcon;
}> = [
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Staff",
    href: "/staff",
    icon: UserSquare2,
  },
  {
    title: "Departments",
    href: "/departments",
    icon: Building2,
  },
];

export const departments = [
  { name: "Emergency" },
  { name: "Anaesthetics" },
  { name: "Surgery" },
  { name: "Laboratory" },
  { name: "Pediatrics" },
  { name: "Neurology" },
  { name: "Ophthalmology" },
  { name: "Otorhinolaryngology" },
  { name: "Cardiology" },
  { name: "Gastroenterology" },
  { name: "Gynaecology" },
  { name: "Orthopedics" },
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

export const staffMembers: Staff[] = [
  {
    id: "S001",
    name: "Dr. Sarah Wilson",
    role: "Senior Doctor",
    department: "Emergency",
    status: "on-duty",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    specialty: "Emergency Medicine",
    isManager: true,
    managingDepartment: "Emergency",
  },
  {
    id: "S002",
    name: "Dr. Michael Chen",
    role: "Specialist",
    department: "Cardiology",
    status: "on-duty",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    specialty: "Cardiology",
    isManager: true,
    managingDepartment: "Cardiology",
  },
  {
    id: "S003",
    name: "Nurse Emma Brown",
    role: "Head Nurse",
    department: "Pediatrics",
    status: "off-duty",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    specialty: "Pediatric Care",
  },
];

export const doctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr. Sarah Wilson",
    department: "Emergency",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    schedule: {
      monday: "Morning Shift",
      tuesday: "Morning Shift",
      wednesday: "Off",
      thursday: "Night Shift",
      friday: "Night Shift",
      saturday: "Off",
      sunday: "On Call",
    },
  },
  {
    id: "D002",
    name: "Dr. Michael Chen",
    department: "Cardiology",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    schedule: {
      monday: "Afternoon Shift",
      tuesday: "Morning Shift",
      wednesday: "Morning Shift",
      thursday: "Off",
      friday: "Afternoon Shift",
      saturday: "Morning Shift",
      sunday: "Off",
    },
  },
];

export const appointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    doctorId: "D001",
    date: new Date(),
    timeRange: { start: "09:00", end: "10:00" },
    status: "scheduled",
    type: "Check-up",
    patient: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    doctor: {
      name: "Dr. Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      department: "Emergency",
    },
  },
  {
    id: "A002",
    patientId: "P002",
    doctorId: "D002",
    date: new Date(),
    timeRange: { start: "14:30", end: "15:30" },
    status: "scheduled",
    type: "Consultation",
    patient: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    doctor: {
      name: "Dr. Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      department: "Cardiology",
    },
  },
];

export const bills: Bill[] = [
  {
    id: "B001",
    patientName: "John Smith",
    amount: 1250.0,
    date: "2024-02-15",
    status: "pending",
    description: "Emergency Room Visit",
  },
  {
    id: "B002",
    patientName: "Emma Wilson",
    amount: 3500.0,
    date: "2024-02-01",
    status: "paid",
    description: "Surgery - Appendectomy",
  },
  {
    id: "B003",
    patientName: "Robert Chen",
    amount: 750.0,
    date: "2024-01-15",
    status: "overdue",
    description: "Consultation & Tests",
  },
];

export const medicines: Medicine[] = [
  {
    id: "M001",
    name: "Amoxicillin 500mg",
    stock: 532,
    category: "Antibiotics",
    status: "in-stock",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: "M002",
    name: "Lisinopril 10mg",
    stock: 89,
    category: "Blood Pressure",
    status: "low-stock",
    price: 15.5,
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: "M003",
    name: "Metformin 850mg",
    stock: 0,
    category: "Diabetes",
    status: "out-of-stock",
    price: 8.75,
    image:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

export const categories = ["Antibiotics", "Blood Pressure", "Diabetes", "Pain Relief", "Vitamins"];

export const dayOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
