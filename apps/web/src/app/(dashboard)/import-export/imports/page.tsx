"use client";

import * as React from "react";
import { SearchBar } from "@/components/knowledge/search-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { api } from "@/lib/api";

export default function ImportsPage() {
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await api.importExport.getTransactions("import");
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (err) {
      console.error("Failed to load imports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    let filtered = transactions;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.companyName?.toLowerCase().includes(q) ||
          t.productName?.toLowerCase().includes(q) ||
          t.hsCode?.toLowerCase().includes(q) ||
          t.originCountry?.toLowerCase().includes(q)
      );
    }
    setFilteredTransactions(filtered);
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
      key: "productName",
      header: "สินค้า",
      render: (item: any) => (
        <div>
          <p className="font-medium">{item.productName}</p>
          <p className="text-sm text-muted-foreground">HS: {item.hsCode}</p>
        </div>
      ),
    },
    {
      key: "originCountry",
      header: "ประเทศต้นทาง",
      render: (item: any) => <span>{item.originCountry}</span>,
    },
    {
      key: "quantity",
      header: "จำนวน",
      render: (item: any) => (
        <span>{item.quantity?.toLocaleString()} {item.unit}</span>
      ),
    },
    {
      key: "value",
      header: "มูลค่า",
      render: (item: any) => (
        <span className="font-bold">{formatCurrency(item.value)}</span>
      ),
    },
    {
      key: "status",
      header: "สถานะ",
      render: (item: any) => (
        <Badge
          variant={
            item.status === "completed"
              ? "default"
              : item.status === "pending"
              ? "secondary"
              : "outline"
          }
        >
          {item.status === "completed"
            ? "เสร็จสิ้น"
            : item.status === "pending"
            ? "รอดำเนินการ"
            : item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">รายการนำเข้า</h1>
        <p className="text-muted-foreground">รายการนำเข้าสินค้าทั้งหมด</p>
      </div>

      <SearchBar placeholder="ค้นหารายการนำเข้า..." onSearch={handleSearch} />

      <Card>
        <CardHeader>
          <CardTitle>รายการนำเข้า</CardTitle>
          <CardDescription>พบ {filteredTransactions.length} รายการ</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              ไม่พบข้อมูลรายการนำเข้า
            </div>
          ) : (
            <DataTable title="" columns={columns} data={filteredTransactions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
