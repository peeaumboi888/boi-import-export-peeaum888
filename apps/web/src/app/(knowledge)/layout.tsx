import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function KnowledgeGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
