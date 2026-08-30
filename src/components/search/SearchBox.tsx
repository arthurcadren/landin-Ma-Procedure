"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Search } from "lucide-react";

export default function SearchBox({ initialQuery }: { initialQuery: string }) {
  const t = useTranslations("search");
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/recherche?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
          className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-on-primary font-semibold px-6 rounded-lg hover:bg-primary-container transition-colors"
      >
        {t("cta")}
      </button>
    </form>
  );
}
