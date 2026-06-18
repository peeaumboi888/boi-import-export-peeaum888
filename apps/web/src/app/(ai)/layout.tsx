import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AI GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
