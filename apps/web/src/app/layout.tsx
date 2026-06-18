import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'peeaumboi888 | AI BOI Import Export Customs Legal Intelligence Platform',
  description: 'ศูนย์รวมองค์ความรู้และผู้ช่วยอัจฉริยะด้านการส่งเสริมการลงทุนของประเทศไทย',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
