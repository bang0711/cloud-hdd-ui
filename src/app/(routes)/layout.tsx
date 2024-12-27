
import DashboardLayout from "@/layouts/dashboard";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function RoutesLayout({ children }: Props) {
  return (
    <DashboardLayout>
      <main>{children}</main>
    </DashboardLayout>
  );
}

export default RoutesLayout;
