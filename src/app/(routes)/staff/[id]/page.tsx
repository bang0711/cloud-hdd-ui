import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShieldCheck } from "lucide-react";

import { dayOfWeek } from "@/lib/constants";
import { instance } from "@/lib/instance";
import { Staff } from "@/types";

import ReturnButton from "@/components/shared/return-button";

import DeleteStaffDialog from "./_components/delete-staff";

type Props = {
  params: Promise<{ id: string }>;
};

async function StaffDetailPage({ params }: Props) {
  const { id } = await params;

  const res = await instance.get(`/staff/${id}`);
  const staff = res.data as Staff;

  const {
    department,
    dob,
    firstName,
    hiredDate,
    jobType,
    lastName,
    manageDepartment,
    salary,
    image,
  } = staff;

  const name = `${firstName} ${lastName}`;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ReturnButton href="/staff" title="Back to Staff List" />
      </div>

      <Card>
        <CardContent className="flex justify-between p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={image} />
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StaffDetailPage;
