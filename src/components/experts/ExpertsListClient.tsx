"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ExpertCard } from "./ExpertCard";
import type { ExpertDetail } from "@/lib/api";

export default function ExpertsListClient({ experts }: { experts: ExpertDetail[] }) {
  const t = useTranslations("expertsList");
  const [specialty, setSpecialty] = useState<string | null>(null);

  const specialties = useMemo(() => {
    const all = experts.flatMap((e) => e.services ?? []);
    return Array.from(new Set(all)).slice(0, 6);
  }, [experts]);

  const filtered = specialty
    ? experts.filter((e) => e.services?.includes(specialty))
    : experts;

  return (
    <main className="max-w-container mx-auto px-4 md:px-8 py-10">
      <div className="max-w-xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">{t("title")}</h1>
        <p className="text-on-surface-variant">{t("subtitle")}</p>
      </div>

      <div className="bg-primary-container/10 rounded-xl p-5 text-center max-w-xs mx-auto mb-8">
        <p className="text-3xl font-bold text-primary">{experts.length}</p>
        <p className="text-sm text-on-surface-variant">{t("activeExperts")}</p>
      </div>

      {specialties.length > 0 && (
        <div className="flex gap-2 justify-center flex-wrap mb-10">
          <button
            onClick={() => setSpecialty(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              specialty === null ? "bg-primary text-on-primary border-primary" : "border-outline-variant hover:border-primary"
            }`}
          >
            {t("allSpecialties")}
          </button>
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSpecialty(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                specialty === s ? "bg-primary text-on-primary border-primary" : "border-outline-variant hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </main>
  );
}