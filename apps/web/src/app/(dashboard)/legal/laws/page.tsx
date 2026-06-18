"use client";

import * as React from "react";
import { SearchBar } from "@/components/knowledge/search-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { api } from "@/lib/api";

export default function LawsPage() {
  const [laws, setLaws] = React.useState<any[]>([]);
  const [filteredLaws, setFilteredLaws] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadLaws();
  }, []);

  const loadLaws = async () => {
    try {
      const data = await api.legal.getLaws();
      setLaws(data);
      setFilteredLaws(data);
    } catch (err) {
      console.error("Failed to load laws:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    let filtered = laws;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.title?.toLowerCase().includes(q) ||
          l.titleTh?.toLowerCase().includes(q) ||
          l.summary?.toLowerCase().includes(q)
      );
    }
    setFilteredLaws(filtered);
  };

  const columns = [
    {
      key: "titleTh",
      header: "ชื่อกฎหมาย",
      render: (item: any) => (
        <div>
          <p className="font-medium">{item.titleTh}</p>
          <p className="text-sm text-muted-foreground">{item.title}</p>
        </div>
      ),
    },
    {
      key: "lawType",
      header: "ประเภท",
      render: (item: any) => <Badge variant="outline">{item.lawType}</Badge>,
    },
    {
      key: "category",
      header: "หมวดหมู่",
      render: (item: any) => <Badge variant="secondary">{item.category}</Badge>,
    },
    {
      key: "status",
      header: "สถานะ",
      render: (item: any) => (
        <Badge variant={item.status === "active" ? "default" : "secondary"}>
          {item.status === "active" ? "มีผลบังคับใช้" : item.status}
        </Badge>
      ),
    },
    {
      key: "summary",
      header: "สรุป",
      render: (item: any) => <p className="max-w-[300px] truncate text-sm">{item.summary}</p>,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">กฎหมาย</h1>
        <p className="text-muted-foreground">ค้นหาและศึกษากฎหมายที่เกี่ยวข้อง</p>
      </div>

      <SearchBar placeholder="ค้นหากฎหมาย..." onSearch={handleSearch} />

      <Card>
        <CardHeader>
          <CardTitle>รายการกฎหมาย</CardTitle>
          <CardDescription>พบ {filteredLaws.length} รายการ</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <DataTable title="" columns={columns} data={filteredLaws} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
