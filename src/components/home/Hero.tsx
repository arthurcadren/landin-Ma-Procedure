import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero({
  stats,
}: {
  stats: { proceduresCount: number; expertsCount: number };
}) {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block bg-secondary-container text-on-secondary-container text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              {t("badge")}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight tracking-tight text-on-surface mb-6 text-balance">
              {t("title")}
            </h1>

            <p className="text-lg text-on-surface-variant leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/procedures"
                className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3.5 rounded-lg hover:bg-primary-container transition-colors"
              >
                {t("ctaPrimary")}
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/237600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest border border-outline-variant text-on-surface font-semibold px-6 py-3.5 rounded-lg hover:border-primary transition-colors"
              >
                {t("ctaSecondary")}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <Stat value={`${stats.proceduresCount || 150}+`} label={t("stat1Label")} />
              <Stat value={t("stat2Value")} label={t("stat2Label")} />
              <Stat value={t("stat3Value")} label={t("stat3Label")} />
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3]">
              <Image
                src="/logo.png"
                alt=""
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 left-6 right-6 md:left-auto md:right-auto md:-left-6 bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} className="text-on-primary-container" />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">{t("trustBadge")}</p>
                <p className="text-xs text-on-surface-variant">{t("trustBadgeSub")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center lg:text-left">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-on-surface-variant leading-snug mt-1">{label}</p>
    </div>
  );
}
