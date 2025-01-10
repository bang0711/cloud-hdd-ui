import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Users } from "lucide-react";

import { instance } from "@/lib/instance";

import { Department } from "@/types";

import ReturnButton from "@/components/shared/return-button";

import AddStaffDialog from "../../staff/_components/staff-view/add-staff-dialog";

type Props = {
  params: Promise<{ id: string }>;
};

async function DepartmentDetailPage({ params }: Props) {
  const { id } = await params;

  const departmentRes = await instance.get(`/department/${id}`);

  const department = departmentRes.data as Department;

  const managerName = department.manager.firstName + " " + department.manager.lastName;
  return (
    <div className="space-y-6">
      <ReturnButton href="/departments" title="Return to Department List" />

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{department.name}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <p className="font-medium">Department Head</p>

                <p className="text-muted-foreground">{managerName}</p>
              </div>

              <Avatar>
                <AvatarImage src={"https://api.dicebear.com/7.x/avataaars/svg?seed=John"} />
                <AvatarFallback>
                  {managerName
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
                <p className="text-2xl font-bold">{department._count.staffs}</p>
              </div>

              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="staff">Key Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Department Statistics</CardTitle>

              <AddStaffDialog departmentId={id} />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <span className="font-medium capitalize">Total Staff</span>

                  <span className="text-muted-foreground">{department._count.staffs}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Manager</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={"https://api.dicebear.com/7.x/avataaars/svg?seed=John"} />
                      <AvatarFallback>
                        {managerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{managerName}</p>
                      <p className="text-sm text-muted-foreground">{department.manager.jobType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DepartmentDetailPage;
