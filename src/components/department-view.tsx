import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { departments } from "@/lib/constants";
import { getStatusColor } from "@/lib/utils";

import Link from "next/link";

function DepartmentView() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {departments.map((dept) => (
        <Link href={`/departments/${dept.id}`} key={dept.id}>
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
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
        </Link>
      ))}
    </div>
  );
}

export default DepartmentView;
