import DashboardLayout from "@/layouts/dashboard";

import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import React from "react";

import { authOptions } from "../api/auth/[...nextauth]/route";

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
