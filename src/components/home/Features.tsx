import { useTranslations } from "next-intl";
import { Database, MessageSquareText, Users2, Check } from "lucide-react";

export default function Features() {
  const t = useTranslations("features");

  const features = [
    { icon: Database, title: t("f1Title"), desc: t("f1Desc"), points: [t("f1Point1"), t("f1Point2")] },
    { icon: MessageSquareText, title: t("f2Title"), desc: t("f2Desc"), points: [t("f2Point1"), t("f2Point2")] },
    { icon: Users2, title: t("f3Title"), desc: t("f3Desc"), points: [t("f3Point1"), t("f3Point2")] },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">{t("title")}</h2>
          <p className="text-on-surface-variant text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, points }) => (
            <div
              key={title}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-container/15 flex items-center justify-center mb-5">
                <Icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-3">{title}</h3>
              <p className="text-on-surface-variant mb-5 leading-relaxed">{desc}</p>
              <ul className="space-y-2">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <Check size={16} className="text-primary flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
