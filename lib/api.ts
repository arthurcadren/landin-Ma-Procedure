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
// async function safeFetch<T>(url: string, fallback: T): Promise<T> {
//   try {
//     const res = await fetch(url, { next: { revalidate: 3600 } });
//     if (!res.ok) return fallback;
//     const payload = await res.json();

//     if (Array.isArray(fallback)) {
//       if (Array.isArray(payload)) return payload as T;
//       if (Array.isArray(payload?.data)) return payload.data as T;
//       if (Array.isArray(payload?.results)) return payload.results as T;
//       return fallback;
//     }

//     return payload as T;
//   } catch {
//     return fallback;
//   }
// }

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return fallback;
    const data = await res.json();
    // Tolère un format paginé Laravel ({data: [...]}) en plus du tableau brut attendu
    return (Array.isArray(fallback) && data?.data && Array.isArray(data.data) ? data.data : data) as T;
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



export interface ProcedureStep {
  id: number;
  title: string;
  description: string | null;
  position: number;
  is_optional: boolean;
}

export interface ProcedureDocument {
  id: number;
  name: string;
  description: string | null;
  is_mandatory: boolean;
}

export interface ProcedureDetail extends ProcedureSummary {
  overview?: string;
  price?: number | null;
  estimated_cost?: string | null;
  estimated_delay?: string | null;
  administration?: string | null;
  faq?: { question: string; answer: string }[];
  steps: ProcedureStep[];
  documents: ProcedureDocument[];
}

export async function getProcedureBySlug(slug: string): Promise<ProcedureDetail | null> {
  try {
    const res = await fetch(`${API_URL}/procedures/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const procedure = (data?.data ?? data) as ProcedureDetail;
    return {
      ...procedure,
      steps: Array.isArray(procedure.steps) ? procedure.steps : [],
      documents: Array.isArray(procedure.documents) ? procedure.documents : [],
      faq: Array.isArray(procedure.faq) ? procedure.faq : [],
    };
  } catch {
    return null;
  }
}

export async function getAllProcedureSlugs(): Promise<string[]> {
  return safeFetch<string[]>(`${API_URL}/procedures/slugs`, []);
}

export async function getAllProcedures(params?: {
  search?: string;
  category_id?: number;
}): Promise<ProcedureSummary[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.category_id) query.set("category_id", String(params.category_id));

  return safeFetch<ProcedureSummary[]>(`${API_URL}/procedures?${query}`, []);
}

export async function getRelatedProcedures(categoryId: number, excludeSlug: string): Promise<ProcedureSummary[]> {
  const all = await getAllProcedures({ category_id: categoryId });
  return all.filter((p) => p.slug !== excludeSlug).slice(0, 3);
}










export interface ExpertDetail extends ExpertSummary {
  commission_rate: unknown;
  bio?: string;
  services?: string[];
  photo?: string;
  status: string;
}

export interface Review {
  id: number;
  score: number;
  review: string | null;
  user_name?: string;
  created_at: string;
}

export interface TrackingResult {
  found: boolean;
  reference_code?: string;
  status?: string;
  procedure_title?: string;
  created_at?: string;
  accepted_at?: string | null;
  completed_at?: string | null;
}

export async function getAllExperts(): Promise<ExpertDetail[]> {
  return safeFetch<ExpertDetail[]>(`${API_URL}/experts`, []);
}

export async function getExpertById(id: string): Promise<ExpertDetail | null> {
  try {
    const res = await fetch(`${API_URL}/experts/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as ExpertDetail;
  } catch {
    return null;
  }
}

export async function getExpertRatings(id: string): Promise<Review[]> {
  return safeFetch<Review[]>(`${API_URL}/experts/${id}/ratings`, []);
}

export async function trackServiceRequest(reference: string): Promise<TrackingResult> {
  try {
    const res = await fetch(`${API_URL}/track/${reference}`, { cache: "no-store" });
    return (await res.json()) as TrackingResult;
  } catch {
    return { found: false };
  }
}

export async function getAppConfig(): Promise<{ consultation_price?: number }> {
  return safeFetch(`${API_URL}/config`, {});
}


