import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function Knowledge GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
