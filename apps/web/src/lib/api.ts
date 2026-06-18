const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const MOCK_USERS = [
  { id: "1", email: "admin@peeaum-boi.com", password: "admin123", name: "Admin", role: "admin" },
  { id: "2", email: "demo@peeaum-boi.com", password: "demo1234", name: "Demo User", role: "user" },
];

function mockLogin(email: string, password: string) {
  const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  const { password: _, ...safeUser } = user;
  return { user: safeUser, token: `mock-token-${user.id}-${Date.now()}` };
}

function mockRegister(email: string, password: string, name: string) {
  if (MOCK_USERS.find((u) => u.email === email)) throw new Error("อีเมลนี้ถูกใช้แล้ว");
  const newUser = { id: String(MOCK_USERS.length + 1), email, password, name, role: "user" };
  MOCK_USERS.push(newUser);
  const { password: _, ...safeUser } = newUser;
  return { user: safeUser, token: `mock-token-${newUser.id}-${Date.now()}` };
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API Error" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

async function tryFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

const mockBoiPrivileges = [
  { id: "1", name: "ส่งเสริมการลงทุนในเขตพัฒนาพิเศษ", category: "เขตเศรษฐกิจพิเศษ", taxIncentive: "ลดหย่อนภาษีเงินได้นิติบุคคล 10 ปี", status: "เปิดรับสมัคร" },
  { id: "2", name: "ส่งเสริมการลงทุนในอุตสาหกรรมเป้าหมาย", category: "อุตสาหกรรมเป้าหมาย", taxIncentive: "ยกเว้นภาษีเงินได้นิติบุคคล 8 ปี", status: "เปิดรับสมัคร" },
  { id: "3", name: "ส่งเสริมการลงทุนวิจัยและพัฒนา", category: "การวิจัยและพัฒนา", taxIncentive: "ลดหย่อนภาษี 200% ของค่าใช้จ่ายวิจัย", status: "เปิดรับสมัคร" },
];

const mockHSCodes = [
  { code: "8471", description: "คอมพิวเตอร์และอุปกรณ์ต่อพ่วง", unit: "หน่วย" },
  { code: "8517", description: "โทรศัพท์และอุปกรณ์สื่อสาร", unit: "เครื่อง" },
  { code: "8415", description: "เครื่องปรับอากาศ", unit: "เครื่อง" },
  { code: "8703", description: "รถยนต์นั่ง", unit: "คัน" },
];

const mockFTA = [
  { id: "1", name: " ASEAN Free Trade Area (AFTA)", country: "อาเซียน", rate: "0-5%", effectiveDate: "1992-01-01" },
  { id: "2", name: "Japan-Thailand EPA", country: "ญี่ปุ่น", rate: "0%", effectiveDate: "2007-11-01" },
  { id: "3", name: "Thailand-Australia FTA", country: "ออสเตรเลีย", rate: "0%", effectiveDate: "2005-01-01" },
];

const mockLaws = [
  { id: "1", title: "พระราชบัญญัติส่งเสริมการลงทุน พ.ศ. 2520", category: "การลงทุน", status: "มีผลบังคับใช้" },
  { id: "2", title: "พระราชบัญญัติศุลกากร พ.ศ. 2469", category: "ศุลกากร", status: "มีผลบังคับใช้" },
  { id: "3", title: "พระราชกำหนดพิกัดอัตราศุลกากร พ.ศ. 2530", category: "พิกัดศุลกากร", status: "มีผลบังคับใช้" },
];

const mockApplications = [
  { id: "1", projectName: "โครงการผลิตชิ้นส่วนอิเล็กทรอนิกส์", status: "pending", submitDate: "2026-01-15" },
  { id: "2", projectName: "โครงการพัฒนาซอฟต์แวร์", status: "approved", submitDate: "2026-02-20" },
];

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      try {
        return await fetchApi<{ user: any; token: string }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
      } catch {
        return mockLogin(email, password);
      }
    },
    register: async (email: string, password: string, name: string) => {
      try {
        return await fetchApi<{ user: any; token: string }>("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ email, password, name }),
        });
      } catch {
        return mockRegister(email, password, name);
      }
    },
  },
  boi: {
    getPrivileges: (categoryId?: string) =>
      tryFetch(
        () => fetchApi<any[]>(`/api/boi/privileges${categoryId ? `?categoryId=${categoryId}` : ""}`),
        mockBoiPrivileges
      ),
    getApplications: () => tryFetch(() => fetchApi<any[]>("/api/boi/applications"), mockApplications),
    createApplication: (data: any) =>
      tryFetch(
        () => fetchApi<any>("/api/boi/applications", { method: "POST", body: JSON.stringify(data) }),
        { id: "new", ...data, status: "pending" }
      ),
  },
  customs: {
    getHSCodes: (search?: string) =>
      tryFetch(
        () => fetchApi<any[]>(`/api/customs/hs-codes${search ? `?search=${search}` : ""}`),
        mockHSCodes
      ),
    getFTA: () => tryFetch(() => fetchApi<any[]>("/api/customs/fta"), mockFTA),
  },
  legal: {
    getLaws: (search?: string) =>
      tryFetch(
        () => fetchApi<any[]>(`/api/legal/laws${search ? `?search=${search}` : ""}`),
        mockLaws
      ),
    searchLaws: (q: string) =>
      tryFetch(
        () => fetchApi<any[]>(`/api/legal/search?q=${encodeURIComponent(q)}`),
        mockLaws.filter((l) => l.title.includes(q))
      ),
  },
  material: {
    getMaterials: () => tryFetch(() => fetchApi<any[]>("/api/material"), []),
    getMovements: (id: string) => tryFetch(() => fetchApi<any[]>(`/api/material/${id}/movements`), []),
    getBalance: (id: string) => tryFetch(() => fetchApi<any[]>(`/api/material/${id}/balance`), []),
  },
  importExport: {
    getTransactions: (type?: string) =>
      tryFetch(
        () => fetchApi<any[]>(`/api/import-export/transactions${type ? `?type=${type}` : ""}`),
        []
      ),
    createTransaction: (data: any) =>
      tryFetch(
        () => fetchApi<any>("/api/import-export/transactions", { method: "POST", body: JSON.stringify(data) }),
        { id: "new", ...data }
      ),
  },
  knowledge: {
    getDocuments: () => tryFetch(() => fetchApi<any[]>("/api/knowledge/documents"), []),
    search: (q: string) =>
      tryFetch(
        () => fetchApi<any[]>(`/api/knowledge/search?q=${encodeURIComponent(q)}`),
        []
      ),
  },
  ai: {
    chat: async (agentType: string, message: string) => {
      try {
        return await fetchApi<any>("/api/ai/chat", {
          method: "POST",
          body: JSON.stringify({ agentType, message }),
        });
      } catch {
        return {
          reply: `ขออภัยค่ะ ระบบ AI ยังไม่พร้อมใช้งานในขณะนี้ (โหมด Demo)\n\nคำถามของคุณ: "${message}"\n\nกรุณาลองใหม่อีกครั้งเมื่อระบบ Backend พร้อมใช้งาน`,
          sources: [],
        };
      }
    },
    getSessions: () => tryFetch(() => fetchApi<any[]>("/api/ai/sessions"), []),
    getMessages: (sessionId: string) =>
      tryFetch(() => fetchApi<any[]>(`/api/ai/sessions/${sessionId}/messages`), []),
  },
};
