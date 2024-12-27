import DashboardLayout from "@/layouts/dashboard";

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
