"use client";

import { departments } from "@/lib/constants";

import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ShieldCheck } from "lucide-react";

import AddStaffDialog from "./add-staff-dialog";
import ShiftCalendar from "../shared/shift-calendar";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Staff } from "@/types";

type Props = {
  staff: Staff[];
  currentDepartment: string;
};

function StaffView({ staff, currentDepartment }: Props) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All"); // Match the SelectItem value

  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-[200px]">
          <Select
            value={currentDepartment}
            onValueChange={(value) => {
              setSelectedDepartment(value);
              router.push(`?department=${value}`);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All">All Departments</SelectItem>

              {departments.map((dept) => (
                <SelectItem key={dept.name} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AddStaffDialog />
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Staff List</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <ShiftCalendar
              selectedDepartment={selectedDepartment === "all" ? "" : selectedDepartment}
            />
          </div>
        </TabsContent>

        <TabsContent value="list" className="flex flex-col space-y-4">
          {staff.map((staff) => (
            <Link href={`/staff/${staff.id}`} key={staff.id}>
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={"https://api.dicebear.com/7.x/avataaars/svg?seed=John"} />
                      <AvatarFallback>
                        {staff.firstName +
                          " " +
                          staff.lastName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {staff.firstName} {staff.firstName}
                        </h3>
                        {staff.id === staff.department.manager.id && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 border-blue-200 bg-blue-50 text-blue-700"
                          >
                            <ShieldCheck className="h-3 w-3" />
                            {staff.department.name} Manager
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{staff.jobType}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <p>{staff.department.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {staff.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">
              No staff members found in this department
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StaffView;
