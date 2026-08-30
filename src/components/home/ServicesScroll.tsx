"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import {
  IdCard,
  Plane,
  Building2,
  Scale,
  FileText,
  Landmark,
  Car,
  Heart,
  Receipt,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ProcedureSummary } from "@/lib/api";

const ICONS = [IdCard, Plane, Building2, Scale, FileText, Landmark, Car, Heart, Receipt, Briefcase];

const FALLBACK_KEYS = [
  "cni", "passport", "business", "criminalRecord", "birthCertificate",
  "landTitle", "driverLicense", "marriageCertificate", "taxId", "workPermit",
];

export default function ServicesScroll({ procedures }: { procedures: ProcedureSummary[] }) {
  const t = useTranslations("services");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" });
  };

  // On préfère les vraies procédures de la BD ; on complète avec les clés de
  // traduction par défaut uniquement si la base n'en fournit pas assez.
  const items = FALLBACK_KEYS.map((key, i) => {
    const real = procedures[i];
    return {
      title: real?.title ?? t(`items.${key}`),
      slug: real?.slug ?? key,
      icon: ICONS[i],
    };
  });

  return (
    <section className="py-16 md:py-20 bg-surface-container-low">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">{t("title")}</h2>
            <p className="text-on-surface-variant">{t("subtitle")}</p>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map(({ title, slug, icon: Icon }) => (
            <Link
              key={slug}
              href={`/procedures/${slug}`}
              className="group snap-start flex-shrink-0 w-[220px] bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-card hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-container/15 flex items-center justify-center mb-4 group-hover:bg-primary-container/25 transition-colors">
                <Icon size={24} className="text-primary" />
              </div>
              <p className="font-semibold text-on-surface leading-snug">{title}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/procedures" className="text-primary font-semibold hover:underline">
            {t("seeAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
