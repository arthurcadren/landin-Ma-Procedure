// ============================================================
// FICHIER: components/procedures/ProceduresListClient.tsx
// Partie interactive (recherche/filtre) isolée en Client Component,
// tout en gardant la page parent en Server Component pour le SEO.
// ============================================================

"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search, MessageCircle } from "lucide-react";
import { ProcedureCard } from "./ProcedureCard";
import type { ProcedureSummary, Category } from "@/lib/api";

export default function ProceduresListClient({
  initialProcedures,
  categories,
}: {
  initialProcedures: ProcedureSummary[];
  categories: Category[];
}) {
  const t = useTranslations("proceduresList");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sort, setSort] = useState<"popular" | "az">("popular");

  const filtered = useMemo(() => {
    let list = initialProcedures;

    if (categoryId) {
      list = list.filter((p) => p.category?.id === categoryId);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.summary?.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : (b.popularity_score ?? 0) - (a.popularity_score ?? 0)
    );
  }, [initialProcedures, search, categoryId, sort]);

  return (
    <main className="max-w-container mx-auto px-4 md:px-8 py-10">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">{t("title")}</h1>
        <p className="text-on-surface-variant">{t("subtitle")}</p>
      </div>

      <div className="relative max-w-xl mx-auto mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full pl-11 pr-4 py-3.5 rounded-full border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setCategoryId(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              categoryId === null
                ? "bg-primary text-on-primary border-primary"
                : "border-outline-variant text-on-surface-variant hover:border-primary"
            }`}
          >
            {t("allCategories")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryId(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                categoryId === cat.id
                  ? "bg-primary text-on-primary border-primary"
                  : "border-outline-variant text-on-surface-variant hover:border-primary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "popular" | "az")}
          className="text-sm border border-outline-variant rounded-lg px-3 py-2 bg-surface-container-lowest"
        >
          <option value="popular">{t("sortPopular")}</option>
          <option value="az">{t("sortAz")}</option>
        </select>
      </div>

      <p className="text-sm text-on-surface-variant mb-4">
        {t("resultsCount", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-on-surface-variant mb-4">{t("noResults")}</p>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-5 py-3 rounded-lg hover:bg-primary-container transition-colors"
          >
            <MessageCircle size={18} />
            {t("noResultsCta")}
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <ProcedureCard key={p.id} procedure={p} />
          ))}
        </div>
      )}
    </main>
  );
}