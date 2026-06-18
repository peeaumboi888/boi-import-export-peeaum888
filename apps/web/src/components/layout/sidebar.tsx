"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const navigation = [
  {
    title: "Dashboard",
    items: [
      { title: "ภาพรวม", href: "/dashboard", icon: "📊" },
    ],
  },
  {
    title: "BOI",
    items: [
      { title: "BOI Machine", href: "/boi/machine", icon: "🤖" },
      { title: "สิทธิประโยชน์ BOI", href: "/boi/privileges", icon: "🎯" },
      { title: "ใบสมัคร BOI", href: "/boi/applications", icon: "📝" },
      { title: "ใบรับรอง BOI", href: "/boi/certificates", icon: "📜" },
    ],
  },
  {
    title: "Import / Export",
    items: [
      { title: "รายการนำเข้า", href: "/import-export/imports", icon: "📦" },
      { title: "รายการส่งออก", href: "/import-export/exports", icon: "🚢" },
    ],
  },
  {
    title: "Customs",
    items: [
      { title: "HS Code", href: "/customs/hs-codes", icon: "🔍" },
      { title: "FTA", href: "/customs/fta", icon: "🌐" },
      { title: "Rules of Origin", href: "/customs/rules-of-origin", icon: "📋" },
      { title: "Customs Declaration", href: "/customs/declarations", icon: "📄" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "กฎหมาย", href: "/legal/laws", icon: "⚖️" },
      { title: "คำถามที่พบบ่อย", href: "/legal/faq", icon: "❓" },
    ],
  },
  {
    title: "DIW",
    items: [
      { title: "โรงงานอุตสาหกรรม", href: "/diw/factories", icon: "🏭" },
      { title: "ใบอนุญาต รง.4", href: "/diw/licenses", icon: "📋" },
      { title: "วัตถุอันตราย", href: "/diw/hazardous", icon: "⚠️" },
      { title: "คำถามที่พบบ่อย", href: "/diw/faq", icon: "❓" },
    ],
  },
  {
    title: "DFT",
    items: [
      { title: "ใบอนุญาตส่งออก-นำเข้า", href: "/dft/licenses", icon: "📄" },
      { title: "โควตาสินค้า", href: "/dft/quotas", icon: "📊" },
      { title: "การค้าชายแดน", href: "/dft/border-trade", icon: "🌍" },
      { title: "คำถามที่พบบ่อย", href: "/dft/faq", icon: "❓" },
    ],
  },
  {
    title: "Knowledge Base",
    items: [
      { title: "ค้นหา", href: "/knowledge/search", icon: "🔎" },
      { title: "เอกสาร", href: "/knowledge/documents", icon: "📁" },
      { title: "หมวดหมู่", href: "/knowledge/categories", icon: "🏷️" },
    ],
  },
  {
    title: "AI Assistant",
    items: [
      { title: "AI Chat", href: "/chat", icon: "🤖" },
      { title: "BOI Assistant", href: "/boi-assistant", icon: "💡" },
      { title: "Customs Assistant", href: "/customs-assistant", icon: "🚢" },
      { title: "Legal Assistant", href: "/legal-assistant", icon: "⚖️" },
      { title: "Material Assistant", href: "/material-assistant", icon: "🔧" },
    ],
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            peeaumboi888
          </h2>
        </div>
        <Separator />
        <div className="h-[calc(100vh-10rem)] overflow-y-auto">
          <div className="space-y-4">
            {navigation.map((group) => (
              <div key={group.title} className="px-3 py-2">
                <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                      >
                        {item.icon} {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
