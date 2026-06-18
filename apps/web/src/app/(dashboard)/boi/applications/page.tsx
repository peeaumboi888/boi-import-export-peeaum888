"use client";

import * as React from "react";
import { SearchBar } from "@/components/knowledge/search-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { api } from "@/lib/api";

export default function BOIApplicationsPage() {
  const [applications, setApplications] = React.useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await api.boi.getApplications();
      setApplications(data);
      setFilteredApplications(data);
    } catch (err) {
      console.error("Failed to load applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    let filtered = applications;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.companyName?.toLowerCase().includes(q) ||
          a.projectName?.toLowerCase().includes(q)
      );
    }
    setFilteredApplications(filtered);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns = [
    {
      key: "companyName",
      header: "บริษัท",
      render: (item: any) => <span className="font-medium">{item.companyName}</span>,
    },
    {
      key: "projectName",
      header: "ชื่อโครงการ",
      render: (item: any) => (
        <div>
          <p className="font-medium">{item.projectName}</p>
          {item.projectNameEn && <p className="text-sm text-muted-foreground">{item.projectNameEn}</p>}
        </div>
      ),
    },
    {
      key: "investmentAmount",
      header: "เงินลงทุน",
      render: (item: any) => (
        <span className="font-bold">{formatCurrency(item.investmentAmount)}</span>
      ),
    },
    {
      key: "status",
      header: "สถานะ",
      render: (item: any) => (
        <Badge
          variant={
            item.status === "approved"
              ? "default"
              : item.status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {item.status === "approved"
            ? "อนุมัติ"
            : item.status === "rejected"
            ? "ไม่อนุมัติ"
            : item.status === "pending"
            ? "รอตรวจสอบ"
            : item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ใบสมัคร BOI</h1>
        <p className="text-muted-foreground">รายการใบสมัครส่งเสริมการลงทุน BOI ทั้งหมด</p>
      </div>

      <SearchBar placeholder="ค้นหาใบสมัคร..." onSearch={handleSearch} />

      <Card>
        <CardHeader>
          <CardTitle>รายการใบสมัคร</CardTitle>
          <CardDescription>พบ {filteredApplications.length} รายการ</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              ไม่พบข้อมูลใบสมัคร
            </div>
          ) : (
            <DataTable title="" columns={columns} data={filteredApplications} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
