
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import HeroMarquees from "./HeroMarquees";
import HeroImageCarousel from "./HeroImageCarousel";
import HeroRotatingText from "./HeroRotatingText";
import section1 from "../../../section1.png";

export default function Hero({
  stats,
}: {
  stats: { proceduresCount: number; expertsCount: number };
}) {
  const t = useTranslations("hero");

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="max-w-container mx-auto px-4 md:px-8 pt-8 md:pt-16 pb-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-secondary-container text-on-secondary-container text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                {t("badge")}
              </span>

              {/* <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] tracking-tight text-on-surface mb-5 text-balance">
                {t("title")}
              </h1>

              <p className="text-base md:text-lg text-on-surface-variant leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                {t("subtitle")}
              </p> */}

              <HeroRotatingText />

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-9">
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

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 mb-2">
                <Stat value={`${stats.proceduresCount || 150}+`} label={t("stat1Label")} />
                <Stat value={t("stat2Value")} label={t("stat2Label")} />
                <Stat value={t("stat3Value")} label={t("stat3Label")} />
              </div>

              {/* Défilements — visibles uniquement sur desktop ici, sous le
                  texte de gauche. Sur mobile ils passent après l'image
                  (voir plus bas), pour ne pas surcharger la colonne texte. */}
              <div className="hidden lg:block mt-8">
                <HeroMarquees />
              </div>
            </div>

            <div className="relative mt-2 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3]">
                <HeroImageCarousel />
              </div>

              <div className="relative -mt-8 mx-6 md:mx-8 bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant p-4 flex items-center gap-3">
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

          {/* Sur mobile : défilements après l'image, en pleine largeur */}
          <div className="lg:hidden mt-8">
            <HeroMarquees />
          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-3 sm:px-4 md:px-8 pb-6 md:pb-8">
        <div className="relative overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.18)] h-[150px] sm:h-[200px] md:h-[250px] lg:h-[400px]">
          <div className="absolute inset-0">
            <Image
              src={section1}
              alt=""
              fill
              priority
              className="object-cover scale-105 blur-[1.1px] contrast-[1.08] brightness-[0.9] sm:brightness-[0.8] md:brightness-[0.75]"
            />
          </div>
          <div className="absolute inset-0 bg-slate-950/15 sm:bg-slate-950/20 md:bg-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-900/20 to-slate-950/50" />

          <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 md:px-8">
            <div className="max-w-2xl text-center text-white">
              <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                {t("agentName")}
              </p>
              <p className="mt-1 text-[11px] sm:text-sm md:text-base text-slate-100/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                {t("agentSubtitle")}
              </p>
              <a
                href="https://wa.me/237600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 sm:mt-4 inline-flex items-center justify-center rounded-full border border-white/60 bg-white/8 px-4 py-2 text-[11px] sm:text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                {t("agentCta")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center lg:text-left">
      <p className="text-xl md:text-2xl font-bold text-primary">{value}</p>
      <p className="text-[11px] md:text-xs text-on-surface-variant leading-snug mt-0.5">{label}</p>
    </div>
  );
}
