"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";

interface SelectedPrivilege {
  id: string;
  code: string;
  nameTh: string;
  name: string;
  description: string;
  selected: boolean;
}

export default function BOIMachinePage() {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [privileges, setPrivileges] = React.useState<SelectedPrivilege[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  // Form data
  const [companyName, setCompanyName] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [investmentAmount, setInvestmentAmount] = React.useState("");
  const [activityType, setActivityType] = React.useState("");
  const [exportRatio, setExportRatio] = React.useState("100");

  React.useEffect(() => {
    loadPrivileges();
  }, []);

  const loadPrivileges = async () => {
    try {
      const data = await api.boi.getPrivileges();
      setPrivileges(data.map((p: any) => ({ ...p, selected: false })));
    } catch (err) {
      console.error("Failed to load privileges:", err);
    }
  };

  const togglePrivilege = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedPrivileges = privileges.filter((p) => selectedIds.includes(p.id));

  const getRecommendation = () => {
    const investment = parseFloat(investmentAmount) || 0;
    const results: string[] = [];

    if (investment >= 1000000000) {
      results.push("ควรยื่นขอ BOI ประเภท A1 ได้สิทธิยกเว้นภาษีเงินได้นิติบุคคลสูงสุด 8 ปี");
    } else if (investment >= 500000000) {
      results.push("ควรยื่นขอ BOI ประเภท A2 ได้สิทธิยกเว้นภาษีเงินได้นิติบุคคล 5 ปี");
    } else if (investment >= 200000000) {
      results.push("ควรยื่นขอ BOI ประเภท B ได้สิทธิหักรายจ่ายค่าเสื่อมราคา 2 เท่า");
    }

    if (parseInt(exportRatio) >= 50) {
      results.push("ส่งออกมากกว่า 50% ได้สิทธิยกเว้นอากรขาเข้าวัตถุดิบ");
    }

    if (activityType === "manufacturing") {
      results.push("กิจการผลิต ได้สิทธิยกเว้นอากรขาเข้าเครื่องจักร");
    }

    if (activityType === "digital" || activityType === "software") {
      results.push("อุตสาหกรรมดิจิทัล ได้สิทธิยกเว้นภาษีเงินได้นิติบุคคล 8-10 ปี + หักรายจ่าย R&D 2 เท่า");
    }

    if (activityType === "ev" || activityType === "battery") {
      results.push("อุตสาหกรรม EV ได้สิทธิพิเศษสูงสุด ยกเว้นภาษีเงินได้นิติบุคคล 10-15 ปี");
    }

    if (activityType === "semiconductor") {
      results.push("อุตสาหกรรมเซมิคอนดักเตอร์ ได้สิทธิยกเว้นภาษีเงินได้นิติบุคคลสูงสุด 15 ปี");
    }

    if (results.length === 0) {
      results.push("กรุณากรอกข้อมูลให้ครบถ้วนเพื่อรับคำแนะนำ");
    }

    return results;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">BOI Machine</h1>
        <p className="text-muted-foreground">
          ระบบวิเคราะห์และแนะนำสิทธิประโยชน์ BOI อัตโนมัติ
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`h-1 flex-1 ${
                  step > s ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span className={step === 1 ? "font-bold text-foreground" : ""}>
          1. ข้อมูลโครงการ
        </span>
        <span className={step === 2 ? "font-bold text-foreground" : ""}>
          2. เลือกสิทธิประโยชน์
        </span>
        <span className={step === 3 ? "font-bold text-foreground" : ""}>
          3. ผลวิเคราะห์
        </span>
      </div>

      {/* Step 1: Project Info */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลโครงการ</CardTitle>
            <CardDescription>กรอกข้อมูลเกี่ยวกับโครงการลงทุน</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">ชื่อบริษัท</Label>
                <Input
                  id="company"
                  placeholder="บริษัท จำกัด"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">ชื่อโครงการ</Label>
                <Input
                  id="project"
                  placeholder="โครงการผลิต..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment">เงินลงทุน (บาท)</Label>
                <Input
                  id="investment"
                  type="number"
                  placeholder="100000000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity">ประเภทกิจการ</Label>
                <select
                  id="activity"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                >
                  <option value="">เลือกประเภท</option>
                  <option value="manufacturing">ผลิต (Manufacturing)</option>
                  <option value="service">บริการ (Service)</option>
                  <option value="digital">ดิจิทัล (Digital)</option>
                  <option value="software">ซอฟต์แวร์ (Software)</option>
                  <option value="ev">ยานยนต์ไฟฟ้า (EV)</option>
                  <option value="battery">แบตเตอรี่ (Battery)</option>
                  <option value="semiconductor">เซมิคอนดักเตอร์ (Semiconductor)</option>
                  <option value="medical">เครื่องมือแพทย์ (Medical Hub)</option>
                  <option value="bcg">BCG Economy</option>
                  <option value="logistics">โลจิสติกส์ (Logistics)</option>
                  <option value="r_and_d">วิจัยและพัฒนา (R&D)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="export">สัดส่วนการส่งออก (%)</Label>
                <Input
                  id="export"
                  type="number"
                  placeholder="100"
                  value={exportRatio}
                  onChange={(e) => setExportRatio(e.target.value)}
                  min={0}
                  max={100}
                />
              </div>
            </div>
            <Button onClick={() => setStep(2)} className="mt-4">
              ถัดไป &rarr;
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Privileges */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>เลือกสิทธิประโยชน์ที่ต้องการ</CardTitle>
            <CardDescription>
              พบ {privileges.length} รายการ | เลือกแล้ว {selectedIds.length} รายการ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {privileges.map((p) => (
                <div
                  key={p.id}
                  className={`cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedIds.includes(p.id)
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => togglePrivilege(p.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-primary">
                          {p.code}
                        </span>
                        <span className="font-medium">{p.nameTh}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(p.id)}
                      onChange={() => togglePrivilege(p.id)}
                      className="mt-1 h-5 w-5"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                &larr; ย้อนกลับ
              </Button>
              <Button onClick={() => setStep(3)}>ถัดไป &rarr;</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Results */}
      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ผลวิเคราะห์สิทธิประโยชน์ BOI</CardTitle>
              <CardDescription>
                สำหรับโครงการ {projectName || "ไม่ระบุ"} - เงินลงทุน {parseFloat(investmentAmount || "0").toLocaleString()} บาท
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Summary */}
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-semibold">สรุปข้อมูลโครงการ</h3>
                <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                  <p>บริษัท: {companyName || "-"}</p>
                  <p>โครงการ: {projectName || "-"}</p>
                  <p>เงินลงทุน: {(parseFloat(investmentAmount || "0")).toLocaleString()} บาท</p>
                  <p>ประเภท: {activityType || "-"}</p>
                  <p>สัดส่วนส่งออก: {exportRatio}%</p>
                </div>
              </div>

              <Separator />

              {/* AI Recommendations */}
              <div>
                <h3 className="mb-3 font-semibold">คำแนะนำจากระบบ</h3>
                <div className="space-y-2">
                  {getRecommendation().map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg border p-3">
                      <span className="mt-0.5 text-primary">💡</span>
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Selected Privileges */}
              <div>
                <h3 className="mb-3 font-semibold">
                  สิทธิประโยชน์ที่เลือก ({selectedPrivileges.length} รายการ)
                </h3>
                <div className="space-y-2">
                  {selectedPrivileges.length === 0 ? (
                    <p className="text-muted-foreground">ไม่ได้เลือกสิทธิประโยชน์</p>
                  ) : (
                    selectedPrivileges.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 rounded-lg border p-3">
                        <Badge variant="default">{p.code}</Badge>
                        <div>
                          <p className="font-medium">{p.nameTh}</p>
                          <p className="text-xs text-muted-foreground">{p.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <Separator />

              {/* Estimated Benefits */}
              <div>
                <h3 className="mb-3 font-semibold">ผลประโยชน์โดยประมาณ</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-sm text-muted-foreground">อายุสิทธิ (ปี)</p>
                    <p className="text-3xl font-bold text-primary">
                      {parseFloat(investmentAmount || "0") >= 1000000000 ? 8 : parseFloat(investmentAmount || "0") >= 500000000 ? 5 : 3}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-sm text-muted-foreground">มูลค่าสิทธิ (บาท/ปี)</p>
                    <p className="text-3xl font-bold text-primary">
                      {((parseFloat(investmentAmount || "0") * 0.2) / 8).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-sm text-muted-foreground">ยอดรวม 8 ปี (บาท)</p>
                    <p className="text-3xl font-bold text-primary">
                      {(parseFloat(investmentAmount || "0") * 0.2).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  &larr; ย้อนกลับ
                </Button>
                <Button variant="outline" onClick={() => setStep(1)}>
                  เริ่มใหม่
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
