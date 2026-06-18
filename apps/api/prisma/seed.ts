import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@peeaum-boi.com' },
    update: {},
    create: {
      email: 'admin@peeaum-boi.com',
      name: 'Admin',
      passwordHash: adminPassword,
      role: 'admin',
    },
  });
  console.log('Admin user:', admin.email);

  // Demo user
  const demoPassword = await bcrypt.hash('demo1234', 10);
  await prisma.user.upsert({
    where: { email: 'demo@peeaum-boi.com' },
    update: {},
    create: {
      email: 'demo@peeaum-boi.com',
      name: 'Demo User',
      passwordHash: demoPassword,
      role: 'investor',
      organization: 'ABC Company Limited',
    },
  });
  console.log('Demo user: demo@peeaum-boi.com / demo1234');

  // BOI Privilege Categories
  const catTax = await prisma.bOIPrivilegeCategory.create({ data: { name: 'Tax Privileges', nameTh: 'สิทธิประโยชน์ทางภาษี' } });
  const catImport = await prisma.bOIPrivilegeCategory.create({ data: { name: 'Import Duty Privileges', nameTh: 'สิทธิประโยชน์ด้านภาษีนำเข้า' } });
  const catDeduction = await prisma.bOIPrivilegeCategory.create({ data: { name: 'Expense Deduction', nameTh: 'สิทธิหักรายจ่าย' } });
  const catOther = await prisma.bOIPrivilegeCategory.create({ data: { name: 'Other Privileges', nameTh: 'สิทธิประโยชน์อื่นๆ' } });
  const catVisa = await prisma.bOIPrivilegeCategory.create({ data: { name: 'Visa & Immigration', nameTh: 'สิทธิวีซ่าและการเข้าเมือง' } });
  const catIndustry = await prisma.bOIPrivilegeCategory.create({ data: { name: 'Target Industries', nameTh: 'อุตสาหกรรมเป้าหมาย' } });
  console.log('Created BOI privilege categories');

  // BOI Privileges
  const privileges = [
    { categoryId: catTax.id, code: 'C1', name: 'Corporate Income Tax Exemption', nameTh: 'ยกเว้นภาษีเงินได้นิติบุคคล', description: 'ยกเว้นภาษีเงินได้นิติบุคคลสูงสุด 8 ปี นับตั้งแต่วันเริ่มมีรายได้', legalReference: 'พระราชบัญญัติส่งเสริมการลงทุน มาตรา 28' },
    { categoryId: catTax.id, code: 'C2', name: 'Tax Holiday for 5 Years', nameTh: 'ยกเว้นภาษีเงินได้นิติบุคคล 5 ปี', description: 'ยกเว้นภาษีเงินได้นิติบุคคล 5 ปี สำหรับกิจการทั่วไป', legalReference: 'พระราชบัญญัติส่งเสริมการลงทุน มาตรา 28' },
    { categoryId: catTax.id, code: 'C3', name: 'Reduced Corporate Tax Rate', nameTh: 'ลดหย่อนภาษีเงินได้นิติบุคคล 50% เป็นเวลา 5 ปี', description: 'เสียภาษีเงินได้นิติบุคคลในอัตราครึ่งหนึ่งของอัตราปกติ เป็นเวลา 5 ปี', legalReference: 'พระราชบัญญัติส่งเสริมการลงทุน มาตรา 28' },
    { categoryId: catTax.id, code: 'C4', name: 'Dividend Tax Exemption', nameTh: 'ยกเว้นภาษีเงินปันผล', description: 'ยกเว้นภาษีเงินปันผลที่จ่ายจากกำไรที่ได้รับยกเว้นภาษี', legalReference: 'ประมวลรัษฎากร มาตรา 65 ทวิ' },
    { categoryId: catImport.id, code: 'M1', name: 'Import Duty Exemption on Machinery', nameTh: 'ยกเว้นอากรขาเข้าเครื่องจักรและอุปกรณ์', description: 'ยกเว้นอากรขาเข้าเครื่องจักร เครื่องมือ และอุปกรณ์ ที่นำมาใช้ในการผลิต', legalReference: 'พระราชบัญญัติส่งเสริมการลงทุน มาตรา 29' },
    { categoryId: catImport.id, code: 'M2', name: 'Import Duty Exemption on Raw Materials (5 years)', nameTh: 'ยกเว้นอากรขาเข้าวัตถุดิบเป็นเวลา 5 ปี', description: 'ยกเว้นอากรขาเข้าวัตถุดิบที่ใช้ในการผลิตสินค้าส่งออก เป็นเวลา 5 ปี', legalReference: 'พระราชบัญญัติส่งเสริมการลงทุน มาตรา 30' },
    { categoryId: catImport.id, code: 'M3', name: 'Import Duty Exemption on Raw Materials (10 years)', nameTh: 'ยกเว้นอากรขาเข้าวัตถุดิบเป็นเวลา 10 ปี', description: 'ยกเว้นอากรขาเข้าวัตถุดิบที่ใช้ในการผลิตสินค้าส่งออก เป็นเวลา 10 ปี', legalReference: 'พระราชบัญญัติส่งเสริมการลงทุน มาตรา 30' },
    { categoryId: catDeduction.id, code: 'D1', name: 'Double Deduction for R&D Expenses', nameTh: 'หักรายจ่ายค่าใช้จ่ายในการวิจัยและพัฒนาได้ 2 เท่า', description: 'หักค่าใช้จ่ายในการวิจัยและพัฒนาเทคโนโลยีได้ 2 เท่า ของรายจ่ายจริง', legalReference: 'ประมวลรัษฎากร มาตรา 65 ทวิ' },
    { categoryId: catDeduction.id, code: 'D2', name: 'Double Deduction for Training Expenses', nameTh: 'หักรายจ่ายค่าฝึกอบรมได้ 2 เท่า', description: 'หักค่าใช้จ่ายในการฝึกอบรมพนักงานได้ 2 เท่า ของรายจ่ายจริง', legalReference: 'ประมวลรัษฎากร มาตรา 65 ทวิ' },
    { categoryId: catDeduction.id, code: 'D3', name: 'Enhanced Deduction for Utilities (1.5x)', nameTh: 'หักรายจ่ายค่าไฟฟ้าและค่าน้ำประปาได้ 1.5 เท่า', description: 'หักค่าไฟฟ้าและค่าน้ำประปาได้ 1.5 เท่า ของรายจ่ายจริง', legalReference: 'ประมวลรัษฎากร มาตรา 65 ตรี' },
    { categoryId: catDeduction.id, code: 'D4', name: 'Enhanced Deduction for Transportation (1.5x)', nameTh: 'หักรายจ่ายค่าขนส่งได้ 1.5 เท่า', description: 'หักค่าขนส่งสินค้าได้ 1.5 เท่า ของรายจ่ายจริง', legalReference: 'ประมวลรัษฎากร มาตรา 65 ตรี' },
    { categoryId: catOther.id, code: 'L1', name: 'Land Ownership Right', nameTh: 'สิทธิครอบครองที่ดิน', description: 'สิทธิในการเป็นเจ้าของที่ดินสำหรับการลงทุนในกิจการที่ได้รับการส่งเสริม', legalReference: 'พระราชบัญญัติการเช่าที่ดินเพื่อการพาณิชย์' },
    { categoryId: catOther.id, code: 'L2', name: 'Permission to Bring in Foreign Workers', nameTh: 'สิทธินำช่างฝีมือและผู้เชี่ยวชาญต่างชาติเข้ามาทำงาน', description: 'อนุญาตให้นำคนต่างด้าวเข้ามาทำงานในตำแหน่งที่กำหนด', legalReference: 'พระราชบัญญัติการทำงานของคนต่างด้าว' },
    { categoryId: catOther.id, code: 'L3', name: 'Foreign Ownership Permission', nameTh: 'สิทธิการถือหุ้นของคนต่างชาติ', description: 'อนุญาตให้คนต่างชาติถือหุ้นได้เกิน 49% ในบางกิจการ', legalReference: 'พระราชบัญญัติการประกอบธุรกิจของคนต่างชาติ' },
    { categoryId: catVisa.id, code: 'V1', name: 'Smart Visa', nameTh: 'Smart Visa', description: 'วีซ่าสำหรับผู้เชี่ยวชาญ นักลงทุน ผู้บริหาร และวิศวกร 有效期 4 ปี', legalReference: 'ประกาศ ก.ตร. ว่าด้วยการออกวีซ่า' },
    { categoryId: catVisa.id, code: 'V2', name: 'Long-Term Resident Visa', nameTh: 'Long-Term Resident (LTR) Visa', description: 'วีซ่าพำนักระยะยาว 10 ปี สำหรับกลุ่มเป้าหมาย 4 กลุ่ม', legalReference: 'ประกาศ ก.ตร. ว่าด้วย LTR Visa' },
    { categoryId: catIndustry.id, code: 'I1', name: 'BCG Economy', nameTh: 'ส่งเสริมเศรษฐกิจชีวภาพ (BCG)', description: 'ส่งเสริมอุตสาหกรรม Bio-Circular-Green Economy', legalReference: 'BOI Notification 2024' },
    { categoryId: catIndustry.id, code: 'I2', name: 'Digital Industry', nameTh: 'ส่งเสริมอุตสาหกรรมดิจิทัล', description: 'ส่งเสริมอุตสาหกรรมดิจิทัล ซอฟต์แวร์ ดาต้าเซ็นเตอร์', legalReference: 'BOI Notification 2024' },
    { categoryId: catIndustry.id, code: 'I3', name: 'EV Industry', nameTh: 'ส่งเสริมอุตสาหกรรมยานยนต์ไฟฟ้า (EV)', description: 'ส่งเสริมการผลิตรถยนต์ไฟฟ้า แบตเตอรี่ และชิ้นส่วน', legalReference: 'BOI Notification 2024' },
    { categoryId: catIndustry.id, code: 'I4', name: 'Semiconductor Industry', nameTh: 'ส่งเสริมอุตสาหกรรมเซมิคอนดักเตอร์', description: 'ส่งเสริมการผลิตและการออกแบบวงจรรวม', legalReference: 'BOI Notification 2024' },
    { categoryId: catIndustry.id, code: 'I5', name: 'Medical Hub', nameTh: 'ส่งเสริมการเป็นศูนย์กลางทางการแพทย์', description: 'ส่งเสริมอุตสาหกรรมเครื่องมือแพทย์ ยา และเวชภัณฑ์', legalReference: 'BOI Notification 2024' },
  ];

  for (const p of privileges) {
    await prisma.bOIPrivilege.create({ data: { ...p, isActive: true } });
  }
  console.log(`Created ${privileges.length} BOI privileges`);

  // HS Codes
  const hsCodes = [
    { code: '8471.30', description: 'Portable digital automatic data processing machines', descriptionTh: 'เครื่องคอมพิวเตอร์พกพา', unit: 'unit', dutyRate: 0, isRestricted: false, requiresLicense: false },
    { code: '8471.50', description: 'Other digital processing units', descriptionTh: 'หน่วยประมวลผลดิจิทัลอื่นๆ', unit: 'unit', dutyRate: 0, isRestricted: false, requiresLicense: false },
    { code: '8542.31', description: 'Electronic integrated circuits: processors and controllers', descriptionTh: 'วงจรรวมอิเล็กทรอนิกส์: โปรเซสเซอร์', unit: 'unit', dutyRate: 0, isRestricted: false, requiresLicense: false },
    { code: '8542.32', description: 'Electronic integrated circuits: memories', descriptionTh: 'วงจรรวมอิเล็กทรอนิกส์: เมมโมรี่', unit: 'unit', dutyRate: 0, isRestricted: false, requiresLicense: false },
    { code: '8541.40', description: 'Photosensitive semiconductor devices', descriptionTh: 'อุปกรณ์เซมิคอนดักเตอร์ไวแสง', unit: 'kg', dutyRate: 0, isRestricted: false, requiresLicense: false },
    { code: '8507.60', description: 'Lithium-ion accumulators', descriptionTh: 'แบตเตอรี่ลิเธียมไอออน', unit: 'kg', dutyRate: 10, isRestricted: false, requiresLicense: false },
    { code: '8703.80', description: 'Motor vehicles with electric motor only', descriptionTh: 'รถยนต์ที่ขับเคลื่อนด้วยมอเตอร์ไฟฟ้า', unit: 'unit', dutyRate: 0, isRestricted: false, requiresLicense: false },
    { code: '3004.90', description: 'Medicaments for therapeutic use', descriptionTh: 'ยาสำหรับการรักษา', unit: 'kg', dutyRate: 5, isRestricted: true, requiresLicense: false },
    { code: '2710.19', description: 'Other petroleum oils', descriptionTh: 'น้ำมันปิโตรเลียมอื่นๆ', unit: 'kg', dutyRate: 20, isRestricted: true, requiresLicense: true },
    { code: '7108.13', description: 'Gold in semi-manufactured forms', descriptionTh: 'ทองคำกึ่งสำเร็จรูป', unit: 'kg', dutyRate: 0, isRestricted: true, requiresLicense: false },
    { code: '7208.51', description: 'Flat-rolled products of iron/steel', descriptionTh: 'เหล็กม้วนแบน', unit: 'kg', dutyRate: 5, isRestricted: false, requiresLicense: false },
    { code: '3901.10', description: 'Polyethylene (specific gravity < 0.94)', descriptionTh: 'พอลิเอทิลีน', unit: 'kg', dutyRate: 10, isRestricted: false, requiresLicense: false },
    { code: '8523.51', description: 'Semiconductor media (solid-state)', descriptionTh: 'สื่อบันทึกข้อมูลแบบโซลิดสเตท', unit: 'unit', dutyRate: 0, isRestricted: false, requiresLicense: false },
    { code: '9018.90', description: 'Instruments for medical use', descriptionTh: 'เครื่องมือแพทย์', unit: 'unit', dutyRate: 0, isRestricted: false, requiresLicense: false },
    { code: '8486.20', description: 'Machinery for manufacturing semiconductor devices', descriptionTh: 'เครื่องจักรผลิตเซมิคอนดักเตอร์', unit: 'unit', dutyRate: 0, isRestricted: false, requiresLicense: false },
  ];

  for (const h of hsCodes) {
    await prisma.hSCode.create({ data: h });
  }
  console.log(`Created ${hsCodes.length} HS codes`);

  // FTA Agreements
  const ftas = [
    { name: 'ASEAN Free Trade Area', code: 'AFTA', partnerCountries: 'ASEAN', status: 'active', effectiveDate: new Date('1992-01-01') },
    { name: 'Thailand-Japan Economic Partnership Agreement', code: 'TJCEPA', partnerCountries: 'Japan', status: 'active', effectiveDate: new Date('2007-11-01') },
    { name: 'Thailand-Australia Free Trade Agreement', code: 'TAFTA', partnerCountries: 'Australia', status: 'active', effectiveDate: new Date('2005-01-01') },
    { name: 'Thailand-New Zealand Closer Economic Partnership', code: 'TNZCEP', partnerCountries: 'New Zealand', status: 'active', effectiveDate: new Date('2005-07-01') },
    { name: 'Thailand-Chile Free Trade Agreement', code: 'TH-CHILE', partnerCountries: 'Chile', status: 'active', effectiveDate: new Date('2015-06-01') },
    { name: 'ASEAN-Korea Free Trade Agreement', code: 'AKFTA', partnerCountries: 'South Korea', status: 'active', effectiveDate: new Date('2010-01-01') },
    { name: 'ASEAN-India Free Trade Agreement', code: 'AIFTA', partnerCountries: 'India', status: 'active', effectiveDate: new Date('2010-01-01') },
    { name: 'ASEAN-China Free Trade Agreement', code: 'ACFTA', partnerCountries: 'China', status: 'active', effectiveDate: new Date('2010-01-01') },
    { name: 'ASEAN-Japan Comprehensive Economic Partnership', code: 'AJCEP', partnerCountries: 'Japan', status: 'active', effectiveDate: new Date('2008-12-01') },
    { name: 'ASEAN-Australia-New Zealand FTA', code: 'AANZFTA', partnerCountries: 'Australia, New Zealand', status: 'active', effectiveDate: new Date('2010-01-01') },
    { name: 'Regional Comprehensive Economic Partnership', code: 'RCEP', partnerCountries: 'Australia, China, Japan, Korea, New Zealand, ASEAN', status: 'active', effectiveDate: new Date('2022-01-01') },
    { name: 'Thailand-Hong Kong CEPA', code: 'TH-HK', partnerCountries: 'Hong Kong', status: 'active', effectiveDate: new Date('2019-03-01') },
  ];

  for (const f of ftas) {
    await prisma.fTAAgreement.create({ data: f });
  }
  console.log(`Created ${ftas.length} FTA agreements`);

  // Laws
  const laws = [
    { title: 'Investment Promotion Act B.E. 2520', titleTh: 'พระราชบัญญัติส่งเสริมการลงทุน พ.ศ. 2520', lawType: 'act', category: 'investment', status: 'active', effectiveDate: new Date('1977-04-01'), summary: 'กฎหมายว่าด้วยการส่งเสริมการลงทุน มีวัตถุประสงค์เพื่อส่งเสริมและอำนวยความสะดวกในการลงทุน' },
    { title: 'Customs Act B.E. 2560', titleTh: 'พระราชบัญญัติศุลกากร พ.ศ. 2560', lawType: 'act', category: 'customs', status: 'active', effectiveDate: new Date('2017-11-13'), summary: 'กฎหมายว่าด้วยศุลกากร กำหนดพิกัดอัตราภาษี ขั้นตอนการนำเข้า-ส่งออก' },
    { title: 'Factory Act B.E. 2535', titleTh: 'พระราชบัญญัติโรงงาน พ.ศ. 2535', lawType: 'act', category: 'factory', status: 'active', effectiveDate: new Date('1992-04-24'), summary: 'กฎหมายว่าด้วยโรงงาน กำหนดการขออนุญาตประกอบกิจการโรงงาน' },
    { title: 'Revenue Code', titleTh: 'ประมวลรัษฎากร', lawType: 'act', category: 'tax', status: 'active', effectiveDate: new Date('1961-09-28'), summary: 'ประมวลกฎหมายว่าด้วยภาษีอากร ครอบคลุมภาษีเงินได้ ภาษีมูลค่าเพิ่ม' },
    { title: 'Labour Protection Act B.E. 2541', titleTh: 'พระราชบัญญัติคุ้มครองแรงงาน พ.ศ. 2541', lawType: 'act', category: 'labor', status: 'active', effectiveDate: new Date('1998-08-24'), summary: 'กฎหมายคุ้มครองแรงงาน กำหนดสิทธิหน้าที่ของนายจ้างและลูกจ้าง' },
    { title: 'Alien Employment Act B.E. 2551', titleTh: 'พระราชบัญญัติการทำงานของคนต่างด้าว พ.ศ. 2551', lawType: 'act', category: 'labor', status: 'active', effectiveDate: new Date('2008-06-24'), summary: 'กฎหมายว่าด้วยการทำงานของคนต่างด้าว กำหนดการอนุญาตให้คนต่างด้าวทำงานในไทย' },
    { title: 'Hazardous Substance Act B.E. 2535', titleTh: 'พระราชบัญญัติวัตถุอันตราย พ.ศ. 2535', lawType: 'act', category: 'environment', status: 'active', effectiveDate: new Date('1992-10-23'), summary: 'กฎหมายวัตถุอันตราย กำหนดการจัดการและควบคุมวัตถุอันตราย' },
    { title: 'National Environmental Quality Act B.E. 2535', titleTh: 'พระราชบัญญัติส่งเสริมและอนุรักษ์สิ่งแวดล้อม พ.ศ. 2535', lawType: 'act', category: 'environment', status: 'active', effectiveDate: new Date('1992-06-19'), summary: 'กฎหมายสิ่งแวดล้อม กำหนดการประเมินผลกระทบสิ่งแวดล้อม' },
    { title: 'BOI Notification: Investment Promotion for Target Industries 2024', titleTh: 'ประกาศ BOI ส่งเสริมการลงทุนในอุตสาหกรรมเป้าหมาย พ.ศ. 2567', lawType: 'notification', category: 'investment', status: 'active', effectiveDate: new Date('2024-01-01'), summary: 'ประกาศล่าสุดเกี่ยวกับสิทธิประโยชน์สำหรับอุตสาหกรรมเป้าหมาย ได้แก่ EV, Digital, Semiconductor, BCG, Medical Hub' },
  ];

  for (const l of laws) {
    await prisma.law.create({ data: l });
  }
  console.log(`Created ${laws.length} laws`);

  // Sample BOI Application
  const demoUser = await prisma.user.findUnique({ where: { email: 'demo@peeaum-boi.com' } });
  if (demoUser) {
    await prisma.bOIApplication.create({
      data: {
        userId: demoUser.id,
        companyName: 'ABC Company Limited',
        projectName: 'EV Battery Production Facility',
        activityType: 'manufacturing',
        investmentAmount: 5000000000,
        status: 'approved',
        certificateNumber: 'BOI-2024-00123',
        approvalDate: new Date('2024-06-15'),
      },
    });
    console.log('Created sample BOI application');
  }

  console.log('Seeding completed!');
  console.log('');
  console.log('Login credentials:');
  console.log('  Admin: admin@peeaum-boi.com / admin123');
  console.log('  Demo:  demo@peeaum-boi.com / demo1234');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
