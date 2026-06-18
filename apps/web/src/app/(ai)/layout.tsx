import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AIGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
