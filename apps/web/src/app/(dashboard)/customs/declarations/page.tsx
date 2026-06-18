"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CustomsDeclarationsPage() {
  const declarations = [
    {
      type: "ใบขนสินค้าขาเข้า",
      code: "IM",
      description: "ใบอนุญาตให้ของเข้ามาในราชอาณาจักร",
      status: "active",
    },
    {
      type: "ใบขนสินค้าขาออก",
      code: "EX",
      description: "ใบอนุญาตให้ของออกไปนอกราชอาณาจักร",
      status: "active",
    },
    {
      type: "ใบอนุญาตผ่านแดน",
      code: "TR",
      description: "ใบอนุญาตให้ของผ่านแดน",
      status: "active",
    },
    {
      type: "ใบอนุญาตถ่ายถ่ายสินค้า",
      code: "TT",
      description: "ใบอนุญาตให้ถ่ายถ่ายสินค้า",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ใบขนศุลกากร</h1>
        <p className="text-muted-foreground">ข้อมูลเกี่ยวกับใบขนสินค้าศุลกากรและการปฏิบัติพิธีการศุลกากร</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ประเภทใบขนสินค้า</CardTitle>
          <CardDescription>ประเภทของใบขนสินค้าที่ใช้ในการปฏิบัติพิธีการศุลกากร</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {declarations.map((decl) => (
              <div
                key={decl.code}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">{decl.code}</span>
                    <span className="font-medium">{decl.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{decl.description}</p>
                </div>
                <Badge variant={decl.status === "active" ? "default" : "secondary"}>
                  {decl.status === "active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ขั้นตอนการปฏิบัติพิธีการศุลกากร</CardTitle>
          <CardDescription>ขั้นตอนทั่วไปในการปฏิบัติพิธีการศุลกากร</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>การยื่นใบขนสินค้า:</strong> ยื่นใบขนสินค้าผ่านระบบอิเล็กทรอนิกส์ (e-Customs)
            </li>
            <li>
              <strong>การตรวจปล่อยสินค้า:</strong> เจ้าหน้าที่ศุลกากรตรวจเอกสารและสินค้า
            </li>
            <li>
              <strong>การชำระภาษีอากร:</strong> ชำระภาษีอากรและค่าธรรมเนียมต่างๆ
            </li>
            <li>
              <strong>การปล่อยสินค้า:</strong> ได้รับอนุญาตให้นำสินค้าเข้าหรือออกจากด่านศุลกากร
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
