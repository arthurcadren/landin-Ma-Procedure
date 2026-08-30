import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function WhyUs({
  stats,
}: {
  stats: { proceduresCount: number; expertsCount: number };
}) {
  const t = useTranslations("why");

  return (
    <section className="py-16 md:py-24 bg-primary text-on-primary">
      <div className="max-w-container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t("title")}</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 text-pretty">{t("subtitle")}</p>
        <Link
          href="/a-propos"
          className="inline-block bg-on-primary text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity mb-14"
        >
          {t("cta")} →
        </Link>

        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          <div className="bg-white/10 rounded-xl p-6">
            <p className="text-3xl font-bold">{t("stat1Value")}</p>
            <p className="text-sm opacity-90 mt-1">{t("stat1Label")}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6">
            <p className="text-3xl font-bold">{stats.expertsCount || 12}</p>
            <p className="text-sm opacity-90 mt-1">{t("stat2Label")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
