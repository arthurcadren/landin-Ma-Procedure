const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://maprocedure.encashpay.com/api";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ProcedureSummary {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  popularity_score?: number;
  category?: Category;
}

export interface ExpertSummary {
  id: number;
  company_name: string;
  rating: number;
  completed_orders: number;
  user?: { name: string };
}

// ISR : revalidation toutes les heures, robuste si l'API est momentanément indisponible
async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getPopularProcedures(): Promise<ProcedureSummary[]> {
  return safeFetch<ProcedureSummary[]>(`${API_URL}/procedures/popular`, []);
}

export async function getCategories(): Promise<Category[]> {
  return safeFetch<Category[]>(`${API_URL}/categories`, []);
}

export async function getFeaturedExperts(): Promise<ExpertSummary[]> {
  return safeFetch<ExpertSummary[]>(`${API_URL}/experts`, []);
}

export async function getPlatformStats(): Promise<{
  proceduresCount: number;
  expertsCount: number;
}> {
  const [procedures, experts] = await Promise.all([
    safeFetch<ProcedureSummary[]>(`${API_URL}/procedures`, []),
    safeFetch<ExpertSummary[]>(`${API_URL}/experts`, []),
  ]);

  return {
    proceduresCount: procedures.length,
    expertsCount: experts.length,
  };
}
