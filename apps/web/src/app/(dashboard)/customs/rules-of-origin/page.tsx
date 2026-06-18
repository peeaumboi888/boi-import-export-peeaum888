"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RulesOfOriginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ถิ่นกำเนิดสินค้า (Rules of Origin)</h1>
        <p className="text-muted-foreground">ข้อมูลเกี่ยวกับถิ่นกำเนิดสินค้าและการใช้สิทธิประโยชน์ทางการค้า</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ถิ่นกำเนิดสินค้าคืออะไร?</CardTitle>
          <CardDescription>หลักการทั่วไปเกี่ยวกับถิ่นกำเนิดสินค้า</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            ถิ่นกำเนิดสินค้า (Rules of Origin) หมายถึง หลักเกณฑ์ที่ใช้ในการพิจารณาว่าสินค้ามีถิ่นกำเนิดจากประเทศใด
            ซึ่งมีความสำคัญในการกำหนดสิทธิประโยชน์ทางการค้า เช่น อัตราภาษีศุลกากรพิเศษ
          </p>
          <p>
            ถิ่นกำเนิดสินค้าแบ่งเป็น 2 ประเภทหลัก:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>ถิ่นกำเนิดแบบ preferential:</strong> ใช้สำหรับการขอรับสิทธิประโยชน์จากความตกลงการค้าเสรี (FTA)
            </li>
            <li>
              <strong>ถิ่นกำเนิดแบบ non-preferential:</strong> ใช้สำหรับการค้าทั่วไป ไม่เกี่ยวกับสิทธิพิเศษทางภาษี
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>เกณฑ์การพิจารณาถิ่นกำเนิดสินค้า</CardTitle>
          <CardDescription>วิธีการคำนวณถิ่นกำเนิดสินค้า</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>วิธีการเปลี่ยนแปลงพิกัดอัตราศุลกากร (Change in Tariff Classification - CTH):</strong>{" "}
              สินค้าต้องผ่านกระบวนการผลิตที่ทำให้พิกัดอัตราศุลกากรเปลี่ยนแปลงจากวัตถุดิบที่ใช้
            </li>
            <li>
              <strong>มูลค่าเพิ่ม (Value Added):</strong>{" "}
              สัดส่วนมูลค่าการผลิตในประเทศต้องเป็นไปตามเกณฑ์ที่กำหนด
            </li>
            <li>
              <strong>กระบวนการผลิตเฉพาะ (Specific Process):</strong>{" "}
              สินค้าต้องผ่านกระบวนการผลิตที่กำหนดไว้โดยเฉพาะ
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>เอกสารที่เกี่ยวข้อง</CardTitle>
          <CardDescription>เอกสารที่ใช้ในการยืนยันถิ่นกำเนิดสินค้า</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>ใบรับรองถิ่นกำเนิดสินค้า (Certificate of Origin - CO):</strong>{" "}
              เอกสารที่ออกโดยหน่วยงานที่ได้รับอนุญาต เพื่อยืนยันถิ่นกำเนิดของสินค้า
            </li>
            <li>
              <strong>ใบประกาศถิ่นกำเนิดสินค้า (Declaration of Origin):</strong>{" "}
              การประกาศถิ่นกำเนิดสินค้าโดยผู้ส่งออก
            </li>
            <li>
              <strong>บันทึกข้อตกลง (Memorandum of Understanding - MOU):</strong>{" "}
              ข้อตกลงระหว่างประเทศเกี่ยวกับการปฏิบัติงานด้านถิ่นกำเนิดสินค้า
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
