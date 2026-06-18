"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export default function BOICertificatesPage() {
  const [certificates, setCertificates] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const data = await api.boi.getApplications();
      const approved = data.filter((app: any) => app.status === "approved" && app.certificateNumber);
      setCertificates(approved);
    } catch (err) {
      console.error("Failed to load certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ใบรับรอง BOI</h1>
        <p className="text-muted-foreground">รายการใบรับรองส่งเสริมการลงทุนที่ได้รับอนุมัติ</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : certificates.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8 text-muted-foreground">
            ไม่พบใบรับรอง
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert: any) => (
            <Card key={cert.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-mono text-lg">{cert.certificateNumber}</span>
                  <Badge variant="default">อนุมัติ</Badge>
                </CardTitle>
                <CardDescription>{cert.companyName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">โครงการ</p>
                  <p className="font-medium">{cert.projectName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">เงินลงทุน</p>
                  <p className="font-bold">{formatCurrency(cert.investmentAmount)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
