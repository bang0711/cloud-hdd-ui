import DashboardLayout from "@/layouts/dashboard";
import { authOptions } from "@/lib/authOption";

import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import React from "react";

type Props = {
  children: React.ReactNode;
};

async function RoutesLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <DashboardLayout>
      <main>{children}</main>
    </DashboardLayout>
  );
}

export default RoutesLayout;
