"use client";

import { staffMembers } from "@/lib/constants";

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
import { getStaffStatusColor } from "@/lib/utils";
import Link from "next/link";

const departments = Array.from(new Set(staffMembers.map((staff) => staff.department)));

function StaffView() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const filteredStaff =
    selectedDepartment === "all"
      ? staffMembers
      : staffMembers.filter((staff) => staff.department === selectedDepartment);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-[200px]">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>

              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
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
          {filteredStaff.map((staff) => (
            <Link href={`/staff/${staff.id}`} key={staff.id}>
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={staff.avatar} />
                      <AvatarFallback>
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{staff.name}</h3>
                        {staff.isManager && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 border-blue-200 bg-blue-50 text-blue-700"
                          >
                            <ShieldCheck className="h-3 w-3" />
                            {staff.managingDepartment} Manager
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <p>{staff.department}</p>
                      <p className="text-muted-foreground">{staff.specialty}</p>
                    </div>
                    <Badge className={getStaffStatusColor(staff.status)}>{staff.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {filteredStaff.length === 0 && (
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
