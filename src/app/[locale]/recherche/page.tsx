import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllProcedures } from "@/lib/api";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import SearchBox from "@/components/search/SearchBox";
import { MessageCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });

  return {
    title: t("title"),
    robots: { index: false, follow: true }, // pages de résultats de recherche : pas d'indexation directe
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const t = await getTranslations("search");
  const results = q ? await getAllProcedures({ search: q }) : [];

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-6 text-center">{t("title")}</h1>

        <SearchBox initialQuery={q ?? ""} />

        {q && (
          <>
            <p className="text-sm text-on-surface-variant my-6">
              {t("resultsCount", { count: results.length })}
            </p>

            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-on-surface-variant mb-4">{t("noResults", { query: q })}</p>
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
                {results.map((p) => (
                  <ProcedureCard key={p.id} procedure={p} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}