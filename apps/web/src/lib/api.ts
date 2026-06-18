const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API Error" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchApi<{ user: any; token: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, password: string, name: string) =>
      fetchApi<{ user: any; token: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      }),
  },
  boi: {
    getPrivileges: (categoryId?: string) =>
      fetchApi<any[]>(`/api/boi/privileges${categoryId ? `?categoryId=${categoryId}` : ""}`),
    getApplications: () => fetchApi<any[]>("/api/boi/applications"),
    createApplication: (data: any) =>
      fetchApi<any>("/api/boi/applications", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  customs: {
    getHSCodes: (search?: string) =>
      fetchApi<any[]>(`/api/customs/hs-codes${search ? `?search=${search}` : ""}`),
    getFTA: () => fetchApi<any[]>("/api/customs/fta"),
  },
  legal: {
    getLaws: (search?: string) =>
      fetchApi<any[]>(`/api/legal/laws${search ? `?search=${search}` : ""}`),
    searchLaws: (q: string) =>
      fetchApi<any[]>(`/api/legal/search?q=${encodeURIComponent(q)}`),
  },
  material: {
    getMaterials: () => fetchApi<any[]>("/api/material"),
    getMovements: (id: string) => fetchApi<any[]>(`/api/material/${id}/movements`),
    getBalance: (id: string) => fetchApi<any[]>(`/api/material/${id}/balance`),
  },
  importExport: {
    getTransactions: (type?: string) =>
      fetchApi<any[]>(`/api/import-export/transactions${type ? `?type=${type}` : ""}`),
    createTransaction: (data: any) =>
      fetchApi<any>("/api/import-export/transactions", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  knowledge: {
    getDocuments: () => fetchApi<any[]>("/api/knowledge/documents"),
    search: (q: string) =>
      fetchApi<any[]>(`/api/knowledge/search?q=${encodeURIComponent(q)}`),
  },
  ai: {
    chat: (agentType: string, message: string) =>
      fetchApi<any>("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({ agentType, message }),
      }),
    getSessions: () => fetchApi<any[]>("/api/ai/sessions"),
    getMessages: (sessionId: string) =>
      fetchApi<any[]>(`/api/ai/sessions/${sessionId}/messages`),
  },
};
