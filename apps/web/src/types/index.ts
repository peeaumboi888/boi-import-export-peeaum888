export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "boi_officer" | "investor" | "consultant" | "viewer";
  organization?: string;
  position?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export type BOIPrivilegeCategory = {
  id: string;
  name: string;
  nameTh: string;
  description?: string;
  parentId?: string;
  children?: BOIPrivilegeCategory[];
};

export type BOIPrivilege = {
  id: string;
  categoryId: string;
  category?: BOIPrivilegeCategory;
  code: string;
  name: string;
  nameTh: string;
  description?: string;
  legalReference?: string;
  conditions?: Record<string, any>;
  benefits?: Record<string, any>;
  validFrom?: Date;
  validUntil?: Date;
  isActive: boolean;
};

export type BOIApplication = {
  id: string;
  userId: string;
  companyName: string;
  projectName: string;
  activityType?: string;
  investmentAmount?: number;
  privilegesRequested?: string[];
  status: "pending" | "under_review" | "approved" | "rejected";
  submissionDate?: Date;
  approvalDate?: Date;
  certificateNumber?: string;
};

export type TransactionType = "import" | "export";

export type IETransaction = {
  id: string;
  userId: string;
  transactionType: TransactionType;
  boiApplicationId?: string;
  invoiceNumber?: string;
  invoiceDate?: Date;
  totalValue: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  items?: IEItem[];
};

export type IEItem = {
  id: string;
  transactionId: string;
  productName?: string;
  hsCode?: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  totalPrice: number;
  countryOfOrigin?: string;
  materialType?: "raw_material" | "component" | "finished_product";
  rmtsId?: string;
};

export type Material = {
  id: string;
  boiApplicationId: string;
  materialCode?: string;
  materialName: string;
  hsCode?: string;
  materialType?: string;
  unit?: string;
  bomQuantity?: number;
  yieldRate?: number;
  scrapRate?: number;
  isActive: boolean;
};

export type MaterialMovement = {
  id: string;
  materialId: string;
  movementType:
    | "import"
    | "consumption"
    | "scrap"
    | "waste"
    | "sale"
    | "transfer"
    | "adjustment";
  quantity: number;
  referenceNumber?: string;
  documentDate?: Date;
  remarks?: string;
};

export type MaterialBalance = {
  id: string;
  materialId: string;
  period: Date;
  openingBalance: number;
  importQuantity: number;
  consumptionQuantity: number;
  scrapQuantity: number;
  wasteQuantity: number;
  saleQuantity: number;
  transferQuantity: number;
  closingBalance: number;
};

export type HSCode = {
  id: string;
  code: string;
  description: string;
  descriptionTh?: string;
  unit?: string;
  dutyRate?: number;
  isRestricted: boolean;
  requiresLicense: boolean;
  parentCode?: string;
};

export type FTAAgreement = {
  id: string;
  name: string;
  code: string;
  partnerCountries: string[];
  effectiveDate?: Date;
  status: string;
  documentUrl?: string;
};

export type RuleOfOrigin = {
  id: string;
  ftaId: string;
  hsCode?: string;
  ruleType: "wholly_obtained" | "change_of_classification" | "regional_value_content";
  ruleDescription: string;
  minimumPercentage?: number;
};

export type Law = {
  id: string;
  title: string;
  titleTh?: string;
  lawType: "act" | "ministerial_regulation" | "notification" | "circular";
  category: "investment" | "customs" | "factory" | "labor" | "environment";
  effectiveDate?: Date;
  status: "active" | "amended" | "repealed";
  fullText?: string;
  summary?: string;
};

export type LawSection = {
  id: string;
  lawId: string;
  sectionNumber: string;
  title?: string;
  content: string;
  parentSectionId?: string;
};

export type Document = {
  id: string;
  userId: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  category?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  processed: boolean;
};

export type ChatSession = {
  id: string;
  userId: string;
  agentType: "boi" | "customs" | "legal" | "material";
  title?: string;
  messages?: ChatMessage[];
};

export type ChatMessage = {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "system";
  content: string;
  sources?: {
    documentId?: string;
    documentTitle?: string;
    section?: string;
    relevance?: number;
  }[];
};

export type DashboardSummary = {
  totalApplications: number;
  activeApplications: number;
  pendingApplications: number;
  totalTransactions: number;
  totalValue: number;
  complianceScore: number;
};

export type AgentType = "boi" | "customs" | "legal" | "material";

export type AIResponse = {
  answer: string;
  sources?: {
    title: string;
    content: string;
    relevance: number;
    url?: string;
  }[];
  confidence: number;
};
