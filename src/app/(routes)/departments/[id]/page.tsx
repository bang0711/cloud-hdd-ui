import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Users, BedIcon, Stethoscope } from "lucide-react";

import { getStatusColor } from "@/lib/utils";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

const department = {
  name: "Emergency",
  manager: {
    name: "Dr. Sarah Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    role: "Emergency Director",
    email: "sarah.wilson@hospital.com",
    phone: "+1 (555) 123-4567",
  },
  staffCount: 45,
  status: "busy" as const,
  location: "Building A, Floor 1",
  operatingHours: "24/7",
  facilities: [
    "Trauma Rooms (4)",
    "Triage Area",
    "Resuscitation Bay",
    "Isolation Rooms (2)",
  ],
  equipment: [
    "CT Scanner",
    "X-Ray Machine",
    "Ventilators",
    "Defibrillators",
    "Patient Monitors",
  ],
  stats: {
    totalBeds: 30,
    occupiedBeds: 25,
    availableBeds: 5,
    onDutyStaff: 12,
    averageWaitTime: "45 minutes",
    dailyPatients: 85,
  },
  keyStaff: [
    {
      name: "Dr. John Miller",
      role: "Senior Emergency Physician",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      status: "on-duty",
    },
    {
      name: "Nurse Emma Thompson",
      role: "Head Emergency Nurse",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      status: "on-duty",
    },
  ],
};

async function DepartmentDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Link href={"/departments"}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Departments
        </Button>
      </Link>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">
                  {department.name} ({id})
                </h2>

                <div
                  className={`h-2 w-2 rounded-full ${getStatusColor(
                    department.status,
                  )}`}
                />
              </div>

              <p className="mt-1 text-muted-foreground">
                {department.location} • {department.operatingHours}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <p className="font-medium">Department Head</p>

                <p className="text-muted-foreground">
                  {department.manager.name}
                </p>
              </div>

              <Avatar>
                <AvatarImage src={department.manager.avatar} />
                <AvatarFallback>
                  {department.manager.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{department.staffCount}</p>
              </div>

              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Available Beds</p>
                <p className="text-2xl font-bold">
                  {department.stats.availableBeds}
                </p>
              </div>

              <BedIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">On Duty Staff</p>
                <p className="text-2xl font-bold">
                  {department.stats.onDutyStaff}
                </p>
              </div>
              <Stethoscope className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="staff">Key Staff</TabsTrigger>
          <TabsTrigger value="facilities">Facilities & Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Department Statistics</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Object.entries(department.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>

                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Key Personnel</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {department.keyStaff.map((staff, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
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
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {staff.role}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${staff.status === "on-duty" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}`}
                    >
                      {staff.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {department.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <span className="font-medium">{facility}</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      Active
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {department.equipment.map((equipment) => (
                  <div
                    key={equipment}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <span className="font-medium">{equipment}</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      Available
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DepartmentDetailPage;
