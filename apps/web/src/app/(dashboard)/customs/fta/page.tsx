"use client";

import * as React from "react";
import { SearchBar } from "@/components/knowledge/search-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { api } from "@/lib/api";

export default function FTAPage() {
  const [ftaList, setFtaList] = React.useState<any[]>([]);
  const [filteredFtaList, setFilteredFtaList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadFTA();
  }, []);

  const loadFTA = async () => {
    try {
      const data = await api.customs.getFTA();
      setFtaList(data);
      setFilteredFtaList(data);
    } catch (err) {
      console.error("Failed to load FTA:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    let filtered = ftaList;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.name?.toLowerCase().includes(q) ||
          f.code?.toLowerCase().includes(q) ||
          f.partnerCountries?.toLowerCase().includes(q)
      );
    }
    setFilteredFtaList(filtered);
  };

  const columns = [
    {
      key: "code",
      header: "รหัส",
      render: (item: any) => <span className="font-mono font-bold">{item.code}</span>,
    },
    {
      key: "name",
      header: "ชื่อความตกลง",
      render: (item: any) => (
        <div>
          <p className="font-medium">{item.name}</p>
          {item.nameTh && <p className="text-sm text-muted-foreground">{item.nameTh}</p>}
        </div>
      ),
    },
    {
      key: "partnerCountries",
      header: "ประเทศคู่ค้า",
      render: (item: any) => <span>{item.partnerCountries}</span>,
    },
    {
      key: "effectiveDate",
      header: "วันที่มีผลบังคับใช้",
      render: (item: any) => (
        <span>{item.effectiveDate ? new Date(item.effectiveDate).toLocaleDateString("th-TH") : "-"}</span>
      ),
    },
    {
      key: "status",
      header: "สถานะ",
      render: (item: any) => (
        <Badge variant={item.status === "active" ? "default" : "secondary"}>
          {item.status === "active" ? "มีผลบังคับใช้" : item.status || "ไม่ทราบ"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ความตกลงการค้าเสรี (FTA)</h1>
        <p className="text-muted-foreground">ค้นหาและตรวจสอบความตกลงการค้าเสรีทั้งหมด</p>
      </div>

      <SearchBar placeholder="ค้นหา FTA..." onSearch={handleSearch} />

      <Card>
        <CardHeader>
          <CardTitle>รายการ FTA</CardTitle>
          <CardDescription>พบ {filteredFtaList.length} รายการ</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filteredFtaList.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              ไม่พบข้อมูล FTA
            </div>
          ) : (
            <DataTable title="" columns={columns} data={filteredFtaList} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
