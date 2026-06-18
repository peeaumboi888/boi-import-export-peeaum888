"use client";

import * as React from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = React.useState({
    privileges: 0,
    imports: 0,
    exports: 0,
    hsCodes: 0,
  });

  React.useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [privileges, hsCodes] = await Promise.all([
        api.boi.getPrivileges().catch(() => []),
        api.customs.getHSCodes().catch(() => []),
      ]);
      setStats({
        privileges: privileges.length,
        imports: 0,
        exports: 0,
        hsCodes: hsCodes.length,
      });
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ภาพรวม</h1>
        <p className="text-muted-foreground">
          ยินดีต้อนรับสู่ peeaumboi888 Platform
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="BOI Machine"
          value="วิเคราะห์"
          description="ระบบวิเคราะห์สิทธิ BOI อัตโนมัติ"
          icon="🤖"
          href="/boi/machine"
        />
        <StatCard
          title="สิทธิประโยชน์ BOI"
          value={stats.privileges}
          description="รายการสิทธิประโยชน์ทั้งหมด"
          icon="🎯"
          href="/boi/privileges"
        />
        <StatCard
          title="HS Code"
          value={stats.hsCodes}
          description="รายการพิกัดศุลกากร"
          icon="🔍"
          href="/customs/hs-codes"
        />
        <StatCard
          title="AI Assistant"
          value="4"
          description="ผู้ช่วย AI พร้อมใช้งาน"
          icon="🤖"
          href="/chat"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>ผู้ช่วยอัจฉริยะสำหรับคำถามของคุณ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/boi-assistant">
              <Button variant="outline" className="w-full justify-start">
                💡 BOI Assistant - ถามเกี่ยวกับสิทธิประโยชน์ BOI
              </Button>
            </Link>
            <Link href="/customs-assistant">
              <Button variant="outline" className="w-full justify-start">
                🚢 Customs Assistant - ถามเกี่ยวกับศุลกากร
              </Button>
            </Link>
            <Link href="/legal-assistant">
              <Button variant="outline" className="w-full justify-start">
                ⚖️ Legal Assistant - ถามเกี่ยวกับกฎหมาย
              </Button>
            </Link>
            <Link href="/material-assistant">
              <Button variant="outline" className="w-full justify-start">
                🔧 Material Assistant - ถามเกี่ยวกับวัตถุดิบ
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>ลิงก์ด่วนสำหรับการทำงาน</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/boi/machine">
              <Button variant="outline" className="w-full justify-start">
                🤖 BOI Machine - วิเคราะห์สิทธิอัตโนมัติ
              </Button>
            </Link>
            <Link href="/boi/privileges">
              <Button variant="outline" className="w-full justify-start">
                🎯 ค้นหาสิทธิประโยชน์ BOI
              </Button>
            </Link>
            <Link href="/customs/hs-codes">
              <Button variant="outline" className="w-full justify-start">
                🔍 ค้นหา HS Code
              </Button>
            </Link>
            <Link href="/customs/fta">
              <Button variant="outline" className="w-full justify-start">
                🌐 ตรวจสอบ FTA
              </Button>
            </Link>
            <Link href="/legal/laws">
              <Button variant="outline" className="w-full justify-start">
                ⚖️ ค้นหากฎหมาย
              </Button>
            </Link>
            <Link href="/knowledge/documents">
              <Button variant="outline" className="w-full justify-start">
                📁 จัดการเอกสาร
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
