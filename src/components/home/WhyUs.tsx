// import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/navigation";

// export default function WhyUs({
//   stats,
// }: {
//   stats: { proceduresCount: number; expertsCount: number };
// }) {
//   const t = useTranslations("why");

//   return (
//     <section className="py-16 md:py-24 bg-primary text-on-primary">
//       <div className="max-w-container mx-auto px-4 md:px-8 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t("title")}</h2>
//         <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 text-pretty">{t("subtitle")}</p>
//         <Link
//           href="/a-propos"
//           className="inline-block bg-on-primary text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity mb-14"
//         >
//           {t("cta")} →
//         </Link>

//         <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
//           <div className="bg-white/10 rounded-xl p-6">
//             <p className="text-3xl font-bold">{t("stat1Value")}</p>
//             <p className="text-sm opacity-90 mt-1">{t("stat1Label")}</p>
//           </div>
//           <div className="bg-white/10 rounded-xl p-6">
//             <p className="text-3xl font-bold">{stats.expertsCount || 12}</p>
//             <p className="text-sm opacity-90 mt-1">{t("stat2Label")}</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShieldCheck, Sparkles, Radar, Users2 } from "lucide-react";

export default function WhyUs({
  stats,
  categoriesCount,
}: {
  stats: { proceduresCount: number; expertsCount: number };
  categoriesCount: number;
}) {
  const t = useTranslations("why");
  const p = useTranslations("whyPillars");

  const pillars = [
    { icon: ShieldCheck, title: p("pillar1Title"), desc: p("pillar1Desc") },
    { icon: Sparkles, title: p("pillar2Title"), desc: p("pillar2Desc") },
    { icon: Radar, title: p("pillar3Title"), desc: p("pillar3Desc") },
    { icon: Users2, title: p("pillar4Title"), desc: p("pillar4Desc") },
  ];

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

        {/* Stats numériques — INCHANGÉES, ce sont tes vrais chiffres */}
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-14">
          <div className="bg-white/10 rounded-xl p-6">
            <p className="text-3xl font-bold">{t("stat1Value")}</p>
            <p className="text-sm opacity-90 mt-1">{t("stat1Label")}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6">
            {/* Corrigé : nombre réel de catégories couvertes, plus le
                nombre d'experts (qui n'a rien à voir avec ce libellé) */}
            <p className="text-3xl font-bold">{categoriesCount}</p>
            <p className="text-sm opacity-90 mt-1">{t("stat2Label")}</p>
          </div>
        </div>

        {/* Piliers qualitatifs — nouveau, demandé par GPT */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/10 rounded-xl p-5 text-left">
              <Icon size={20} className="mb-2" />
              <p className="font-semibold text-sm mb-1">{title}</p>
              <p className="text-xs opacity-80">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
