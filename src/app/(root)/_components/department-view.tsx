import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { Department } from "@/types";

type Props = {
  departments: Department[];
};

function DepartmentView({ departments }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {departments.map((dept) => (
        <Link href={`/departments/${dept.id}`} key={dept.id}>
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{dept.name}</CardTitle>
              </div>

              <CardDescription>Staff Count: {dept._count.staffs}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={"https://api.dicebear.com/7.x/avataaars/svg?seed=John"} />
                  <AvatarFallback>
                    {dept.manager.firstName +
                      " " +
                      dept.manager.lastName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-medium">
                    {dept.manager.firstName + " " + dept.manager.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{dept.manager.jobType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default DepartmentView;
