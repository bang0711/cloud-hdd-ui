import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { ShieldCheck, ArrowLeft } from "lucide-react";

import Link from "next/link";

import BookAppointmentDialog from "@/components/shared/book-appointment-dialog";
import ShiftCalendar from "../_components/shared/shift-calendar";

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

const getStatusColor = (status: "on-duty" | "off-duty" | "on-leave") => {
  const colors = {
    "on-duty": "bg-green-100 text-green-800",
    "off-duty": "bg-gray-100 text-gray-800",
    "on-leave": "bg-yellow-100 text-yellow-800",
  };
  return colors[status];
};

async function StaffDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href={"/staff"}>
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Staff List
          </Button>
        </Link>

        <BookAppointmentDialog doctorId={staffMember.id} doctorName={staffMember.name} />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={staffMember.avatar} />
              <AvatarFallback>
                {staffMember.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">
                  {staffMember.name} ({id})
                </h2>

                {staffMember.isManager && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-blue-200 bg-blue-50 text-blue-700"
                  >
                    <ShieldCheck className="h-3 w-3" />
                    {staffMember.managingDepartment} Manager
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground">{staffMember.role}</p>

              <div className="mt-2 flex items-center gap-2">
                <Badge className={getStatusColor(staffMember.status)}>{staffMember.status}</Badge>
                <Badge variant="outline">{staffMember.department}</Badge>
                <Badge variant="outline">{staffMember.specialty}</Badge>
              </div>
            </div>
          </div>
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
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <span className="font-medium">Email:</span> {staffMember.email}
              </div>

              <div>
                <span className="font-medium">Phone:</span> {staffMember.phone}
              </div>

              <div>
                <span className="font-medium">Address:</span> {staffMember.address}
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
                {Object.entries(staffMember.schedule).map(([day, shift]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <span className="sfont-medium capitalize">{day}</span>
                    <span
                      className={`rounded px-2 py-1 ${shift === "Off" ? "bg-gray-100" : "bg-blue-100"}`}
                    >
                      {shift}
                    </span>
                  </div>
                ))}
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
