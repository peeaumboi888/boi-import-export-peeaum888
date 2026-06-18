import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FAQAccordion } from "@/components/ui/faq-accordion";

const faqData = [
  {
    question: "HS Code คืออะไร?",
    answer: "HS Code (Harmonized System Code) เป็นระบบจำแนกประเภทสินค้าระหว่างประเทศที่ใช้ในการจัดเก็บภาษีนำเข้า-ส่งออก โดยมีตัวเลข 6-10 หลัก แต่ละรหัสจะระบุประเภทสินค้าที่ชัดเจน"
  },
  {
    question: "FTA คืออะไร?",
    answer: "FTA (Free Trade Agreement) หรือความตกลงการค้าเสรี เป็นข้อตกลงระหว่างประเทศที่ลดหรือยกเว้นภาษีนำเข้า-ส่งออก เพื่อส่งเสริมการค้าระหว่างกัน"
  },
  {
    question: "Rules of Origin คืออะไร?",
    answer: "Rules of Origin หรือถิ่นกำเนิดสินค้า เป็นกฎระเบียบที่กำหนดว่าสินค้าจะต้องมีคุณสมบัติอย่างไรจึงจะได้รับสิทธิประโยชน์จาก FTA เช่น การผลิตในประเทศสมาชิก FTA"
  },
  {
    question: "ขั้นตอนการผ่านศุลกากรมีอะไรบ้าง?",
    answer: "ขั้นตอนหลัก ได้แก่: 1) ยื่นใบขนสินค้า 2) ตรวจสอบเอกสาร 3) ชำระภาษีอากร 4) ตรวจปล่อยสินค้า 5) รับสินค้า"
  },
  {
    question: "ต้องใช้เอกสารอะไรบ้างในการนำเข้า-ส่งออก?",
    answer: "เอกสารที่ต้องใช้ ได้แก่: ใบกำกับสินค้า (Invoice), ใบแจ้งหนี้ (Packing List), หนังสือเดินทาง (Bill of Lading), ใบอนุญาตนำเข้า/ส่งออก (ถ้ามี), เอกสารอื่นๆ ตามประเภทสินค้า"
  },
  {
    question: "如何ตรวจสอบสถานะใบขนสินค้า?",
    answer: "สามารถตรวจสอบสถานะได้ทางเว็บไซต์กรมศุลกากร (www.customs.go.th) หรือผ่านระบบ e-Customs โดยใช้เลขที่ใบขนสินค้า"
  }
];

export default function CustomsFAQPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">คำถามที่พบบ่อย - กรมศุลกากร</h1>
        <p className="text-muted-foreground">
          กรมศุลกากร (Thai Customs Department)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>คำถามที่พบบ่อยเกี่ยวกับศุลกากร</CardTitle>
        </CardHeader>
        <CardContent>
          <FAQAccordion items={faqData} />
        </CardContent>
      </Card>
    </div>
  );
}
