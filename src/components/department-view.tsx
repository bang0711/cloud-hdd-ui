import React from "react";

type Props = {};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Department {
  id: string;
  name: string;
  manager: {
    name: string;
    avatar: string;
    role: string;
  };
  staffCount: number;
  status: "active" | "busy" | "maintenance";
}
const departments: Department[] = [
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

const getStatusColor = (status: Department["status"]) => {
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
function DepartmentView({}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {departments.map((dept) => (
        <Card
          key={dept.id}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{dept.name}</CardTitle>
              <div
                className={`h-2 w-2 rounded-full ${getStatusColor(dept.status)}`}
              />
            </div>
            <CardDescription>Staff Count: {dept.staffCount}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={dept.manager.avatar} />
                <AvatarFallback>
                  {dept.manager.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{dept.manager.name}</p>
                <p className="text-sm text-muted-foreground">
                  {dept.manager.role}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DepartmentView;
