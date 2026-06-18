"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const categories = [
  {
    id: "boi",
    title: "BOI",
    description: "สิทธิประโยชน์และมาตรการส่งเสริมการลงทุน",
    icon: "💡",
    color: "bg-blue-500",
  },
  {
    id: "customs",
    title: "Customs",
    description: "พิธีการศุลกากร ใบขนสินค้า และHS Code",
    icon: "🚢",
    color: "bg-green-500",
  },
  {
    id: "legal",
    title: "Legal",
    description: "กฎหมายที่เกี่ยวข้องกับการค้าและการลงทุน",
    icon: "⚖️",
    color: "bg-purple-500",
  },
  {
    id: "diw",
    title: "DIW",
    description: "กรมโรงงานอุตสาหกรรม",
    icon: "🏭",
    color: "bg-orange-500",
  },
  {
    id: "dft",
    title: "DFT",
    description: "กรมเจรจาการค้าระหว่างประเทศ",
    icon: "🤝",
    color: "bg-teal-500",
  },
];

export default function KnowledgeCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">หมวดหมู่ความรู้</h1>
        <p className="text-muted-foreground">เลือกหมวดหมู่ที่ต้องการเรียนรู้</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/knowledge/documents?category=${category.id}`}>
            <Card className="cursor-pointer transition-colors hover:bg-muted h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`h-1 w-full rounded ${category.color}`} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
