import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:from-neutral-800 dark:pb-6 dark:pt-8 lg:static lg:w-auto lg:rounded-none lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-neutral-800">
          Peeaum-BOI Platform
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:size-auto lg:bg-none">
          <div className="pointer-events-none flex gap-4 lg:pointer-events-auto">
            <Link href="/login">
              <Button variant="outline">เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/register">
              <Button>สมัครสมาชิก</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-[-1] my-20 flex place-items-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tighter md:text-7xl">
peeaumboi888
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            AI BOI Import Export Customs Legal Intelligence Platform
          </p>
          <p className="text-lg text-muted-foreground">
            ศูนย์รวมองค์ความรู้และผู้ช่วยอัจฉริยะด้านการส่งเสริมการลงทุนของประเทศไทย
          </p>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <Link
          href="/boi"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h3 className="mb-2 text-2xl font-semibold">
            สิทธิประโยชน์ BOI &rarr;
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            ค้นหาและวิเคราะห์สิทธิประโยชน์ BOI ทั้งหมด
          </p>
        </Link>

        <Link
          href="/import-export"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h3 className="mb-2 text-2xl font-semibold">
            Import Export &rarr;
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            จัดการการนำเข้าและส่งออก
          </p>
        </Link>

        <Link
          href="/customs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h3 className="mb-2 text-2xl font-semibold">
            Customs &rarr;
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            พิกัดศุลกากร FTA และ Rules of Origin
          </p>
        </Link>

        <Link
          href="/chat"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h3 className="mb-2 text-2xl font-semibold">
            AI Assistant &rarr;
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            ผู้ช่วย AI ตอบคำถาม BOI Customs Legal
          </p>
        </Link>
      </div>
    </main>
  );
}
