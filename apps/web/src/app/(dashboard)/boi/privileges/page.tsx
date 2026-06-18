"use client";

import * as React from "react";
import { SearchBar } from "@/components/knowledge/search-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { api } from "@/lib/api";

export default function BOIPrivilegesPage() {
  const [privileges, setPrivileges] = React.useState<any[]>([]);
  const [filteredPrivileges, setFilteredPrivileges] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");

  React.useEffect(() => {
    loadPrivileges();
  }, []);

  const loadPrivileges = async () => {
    try {
      const data = await api.boi.getPrivileges();
      setPrivileges(data);
      setFilteredPrivileges(data);
    } catch (err) {
      console.error("Failed to load privileges:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = privileges;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nameTh?.toLowerCase().includes(q) ||
          p.name?.toLowerCase().includes(q) ||
          p.code?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.categoryId === categoryFilter);
    }
    setFilteredPrivileges(filtered);
  };

  const columns = [
    { key: "code", header: "รหัส" },
    {
      key: "nameTh",
      header: "ชื่อสิทธิประโยชน์",
      render: (item: any) => (
        <div>
          <p className="font-medium">{item.nameTh}</p>
          <p className="text-sm text-muted-foreground">{item.name}</p>
        </div>
      ),
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: any) => <p className="max-w-[300px] truncate">{item.description}</p>,
    },
    {
      key: "legalReference",
      header: "อ้างอิงกฎหมาย",
      render: (item: any) => (
        <p className="max-w-[200px] truncate text-xs text-muted-foreground">
          {item.legalReference}
        </p>
      ),
    },
    {
      key: "isActive",
      header: "สถานะ",
      render: (item: any) => (
        <Badge variant={item.isActive ? "default" : "secondary"}>
          {item.isActive ? "ใช้งาน" : "ไม่ใช้งาน"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">สิทธิประโยชน์ BOI</h1>
        <p className="text-muted-foreground">ค้นหาและวิเคราะห์สิทธิประโยชน์ BOI ทั้งหมด</p>
      </div>

      <SearchBar placeholder="ค้นหาสิทธิประโยชน์..." onSearch={handleSearch} />

      <Card>
        <CardHeader>
          <CardTitle>รายการสิทธิประโยชน์</CardTitle>
          <CardDescription>พบ {filteredPrivileges.length} รายการ</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <DataTable title="" columns={columns} data={filteredPrivileges} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
