import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShieldCheck } from "lucide-react";

import BookAppointmentDialog from "@/components/shared/book-appointment-dialog";
import ShiftCalendar from "../_components/shared/shift-calendar";
import { instance } from "@/lib/instance";
import { Staff } from "@/types";
import ReturnButton from "@/components/shared/return-button";
import { dayOfWeek } from "@/lib/constants";
import DeleteStaffDialog from "./_components/delete-staff";

type Props = {
  params: Promise<{ id: string }>;
};

const staffMember = {
  id: "S001",
  name: "Dr. Sarah Wilson",
  role: "Senior Doctor",
  department: "Emergency",
  status: "on-duty" as const,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  specialty: "Emergency Medicine",
  isManager: true,
  managingDepartment: "Emergency",
  email: "sarah.wilson@hospital.com",
  phone: "+1 (555) 123-4567",
  address: "123 Medical Center Dr, Suite 456",
  education: "MD - Harvard Medical School",
  experience: "15 years",
  certifications: ["Board Certified in Emergency Medicine", "Advanced Trauma Life Support"],
  schedule: {
    monday: "Morning Shift",
    tuesday: "Morning Shift",
    wednesday: "Off",
    thursday: "Night Shift",
    friday: "Night Shift",
    saturday: "Off",
    sunday: "On Call",
  },
};

async function StaffDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await instance.get(`/staff/${id}`);
  const staff = res.data as Staff;

  const { department, dob, firstName, hiredDate, jobType, lastName, manageDepartment, salary } =
    staff;

  const name = `${firstName} ${lastName}`;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ReturnButton href="/staff" title="Back to Staff List" />

        <BookAppointmentDialog doctorId={id} doctorName={name} />
      </div>

      <Card>
        <CardContent className="flex justify-between p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={staffMember.avatar} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{name}</h2>

                {manageDepartment && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-blue-200 bg-blue-50 text-blue-700"
                  >
                    <ShieldCheck className="h-3 w-3" />
                    {manageDepartment.name} Manager
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground">{jobType}</p>

              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">{department.name}</Badge>
              </div>
            </div>
          </div>

          <DeleteStaffDialog staffId={staff.id} />
        </CardContent>
      </Card>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Salary:</span> {salary}
              </div>

              <div>
                <span className="font-medium">Date of birth:</span>{" "}
                {new Date(dob).toLocaleDateString()}
              </div>

              <div>
                <span className="font-medium">Hired Date:</span>{" "}
                {new Date(hiredDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Education:</span> {staffMember.education}
              </div>

              <div>
                <span className="font-medium">Experience:</span> {staffMember.experience}
              </div>

              <div>
                <span className="font-medium">Certifications:</span>

                <ul className="ml-4 mt-1 list-inside list-disc">
                  {staffMember.certifications.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {dayOfWeek.map((day) => {
                  const days = staff.shifts.filter((shift) => shift.dayOfWeek === day);
                  return (
                    <div key={day} className="flex flex-col rounded-lg border p-3">
                      <span className="mb-2 font-medium capitalize">{day}</span>
                      <div className="flex flex-wrap gap-2">
                        {days.length !== 0 &&
                          days.map((shift, index) => (
                            <span key={index} className={`rounded bg-blue-100 px-2 py-1`}>
                              {shift.time}
                            </span>
                          ))}

                        {days.length === 0 && (
                          <span className="rounded bg-gray-100 px-2 py-1">Off</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <ShiftCalendar selectedDepartment={staffMember.department} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StaffDetailPage;
