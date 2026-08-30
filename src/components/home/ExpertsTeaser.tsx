import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Star } from "lucide-react";
import type { ExpertSummary } from "@/lib/api";

export default function ExpertsTeaser({ experts }: { experts: ExpertSummary[] }) {
  const t = useTranslations("expertsTeaser");

  if (experts.length === 0) {
    return null; // On préfère ne rien afficher plutôt qu'inventer des experts fictifs
  }

  return (
    <section className="py-16 md:py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">{t("title")}</h2>
          <p className="text-on-surface-variant text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.slice(0, 4).map((expert) => (
            <div
              key={expert.id}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 text-center hover:shadow-card transition-shadow"
            >
              <div className="w-20 h-20 rounded-full bg-primary-container/20 mx-auto mb-4" />
              <p className="font-bold text-on-surface">{expert.user?.name ?? expert.company_name}</p>
              <p className="text-sm text-on-surface-variant mb-2">{expert.company_name}</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star size={14} className="fill-secondary-container text-secondary-container" />
                <span className="text-sm font-medium">{expert.rating?.toFixed(1) ?? "—"}</span>
              </div>
              <Link
                href={`/experts/${expert.id}`}
                className="block w-full text-sm font-semibold text-primary border border-primary rounded-lg py-2 hover:bg-primary hover:text-on-primary transition-colors"
              >
                {t("cta")}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/experts" className="text-primary font-semibold hover:underline">
            {t("seeAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
