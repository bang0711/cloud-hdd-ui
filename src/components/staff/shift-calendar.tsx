"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";

import { getShiftColor } from "@/lib/utils";

type Props = {
  selectedDepartment: string;
};

const staffShifts: StaffShift[] = [
  {
    id: "S001",
    name: "Dr. Sarah Wilson",
    role: "Senior Doctor",
    department: "Emergency",
    status: "on-duty",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    specialty: "Emergency Medicine",
    shifts: [
      { id: "SH1", staffId: "S001", date: new Date(), shift: "morning" },
      {
        id: "SH2",
        staffId: "S001",
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        shift: "night",
      },
    ],
  },
  {
    id: "S002",
    name: "Dr. Michael Chen",
    role: "Specialist",
    department: "Cardiology",
    status: "on-duty",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    specialty: "Cardiology",
    shifts: [
      { id: "SH3", staffId: "S002", date: new Date(), shift: "afternoon" },
      {
        id: "SH4",
        staffId: "S002",
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        shift: "morning",
      },
    ],
  },
];

function ShiftCalendar({ selectedDepartment }: Props) {
  const [date, setDate] = useState<Date>(new Date());

  const filteredStaffShifts = selectedDepartment
    ? staffShifts.filter((staff) => staff.department === selectedDepartment)
    : staffShifts;

  const shiftsForDate = filteredStaffShifts.filter((staff) =>
    staff.shifts.some((shift) => format(shift.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
  );
  return (
    <div className="flex gap-4">
      <div className="w-[350px]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border"
        />
      </div>
      <div className="flex-1">
        <h3 className="mb-4 text-lg font-medium">Shifts for {format(date, "MMMM d, yyyy")}</h3>
        <div className="space-y-4">
          {shiftsForDate.map((staff) => (
            <Card key={staff.id}>
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
                    <h4 className="font-medium">{staff.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {staff.role} - {staff.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {staff.shifts
                    .filter(
                      (shift) => format(shift.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                    )
                    .map((shift) => (
                      <Badge key={shift.id} className={getShiftColor(shift.shift)}>
                        {shift.shift}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {shiftsForDate.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">
              No shifts scheduled for this date
              {selectedDepartment && ` in ${selectedDepartment} department`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShiftCalendar;
