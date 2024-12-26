import { DashboardLayout } from "@/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout>
      <main>{children}</main>
    </DashboardLayout>
  );
}
