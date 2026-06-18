"use client";

import * as React from "react";
import { SearchBar } from "@/components/knowledge/search-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { api } from "@/lib/api";

export default function HSCodesPage() {
  const [hsCodes, setHSCodes] = React.useState<any[]>([]);
  const [filteredHSCodes, setFilteredHSCodes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadHSCodes();
  }, []);

  const loadHSCodes = async () => {
    try {
      const data = await api.customs.getHSCodes();
      setHSCodes(data);
      setFilteredHSCodes(data);
    } catch (err) {
      console.error("Failed to load HS codes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    let filtered = hsCodes;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.code?.toLowerCase().includes(q) ||
          h.description?.toLowerCase().includes(q) ||
          h.descriptionTh?.toLowerCase().includes(q)
      );
    }
    setFilteredHSCodes(filtered);
  };

  const columns = [
    {
      key: "code",
      header: "HS Code",
      render: (item: any) => <span className="font-mono font-bold">{item.code}</span>,
    },
    {
      key: "descriptionTh",
      header: "รายละเอียด",
      render: (item: any) => (
        <div>
          <p className="font-medium">{item.descriptionTh}</p>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      ),
    },
    {
      key: "dutyRate",
      header: "อัตราภาษี",
      render: (item: any) => <span className="font-bold">{item.dutyRate}%</span>,
    },
    {
      key: "isRestricted",
      header: "สถานะ",
      render: (item: any) => (
        <div className="flex gap-1">
          {item.isRestricted && <Badge variant="destructive">จำกัด</Badge>}
          {item.requiresLicense && <Badge variant="secondary">ต้องขอใบอนุญาต</Badge>}
          {!item.isRestricted && !item.requiresLicense && <Badge variant="default">ปกติ</Badge>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HS Code</h1>
        <p className="text-muted-foreground">ค้นหาและตรวจสอบพิกัดศุลกากร</p>
      </div>

      <SearchBar placeholder="ค้นหา HS Code..." onSearch={handleSearch} />

      <Card>
        <CardHeader>
          <CardTitle>รายการ HS Code</CardTitle>
          <CardDescription>พบ {filteredHSCodes.length} รายการ</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <DataTable title="" columns={columns} data={filteredHSCodes} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
