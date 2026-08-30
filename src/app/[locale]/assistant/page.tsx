import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import { MessageCircle, Sparkles, UserCheck, Briefcase, ShieldCheck, MapPin, Check } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "assistant" });
  const baseUrl = "https://maprocedure.cm";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${baseUrl}/${locale}/assistant`,
      languages: { fr: `${baseUrl}/fr/assistant`, en: `${baseUrl}/en/assistant` },
    },
  };
}

export default async function AssistantPage() {
  const t = await getTranslations("assistant");

  const levels = [
    {
      icon: Sparkles,
      title: t("level1Title"),
      name: t("level1Name"),
      desc: t("level1Desc"),
      points: [t("level1Point1"), t("level1Point2"), t("level1Point3")],
      cta: t("level1Cta"),
      badge: null,
    },
    {
      icon: UserCheck,
      title: t("level2Title"),
      name: t("level2Name"),
      desc: t("level2Desc"),
      points: [t("level2Point1"), t("level2Point2"), t("level2Point3")],
      cta: t("level2Cta"),
      badge: t("level2Badge"),
    },
    {
      icon: Briefcase,
      title: t("level3Title"),
      name: t("level3Name"),
      desc: t("level3Desc"),
      points: [t("level3Point1"), t("level3Point2"), t("level3Point3")],
      cta: t("level3Cta"),
      badge: null,
    },
  ];

  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
    { title: t("step4Title"), desc: t("step4Desc") },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="max-w-2xl mx-auto px-4 pt-12 pb-16 text-center">
          <span className="inline-block bg-secondary-container text-on-secondary-container text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            {t("badge")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-5 text-balance">{t("title")}</h1>
          <p className="text-on-surface-variant mb-8">{t("subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/237600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3.5 rounded-lg hover:bg-primary-container transition-colors"
            >
              <MessageCircle size={18} /> {t("ctaPrimary")}
            </a>
          </div>
        </section>

        <section className="max-w-container mx-auto px-4 md:px-8 py-16 bg-surface-container-low rounded-3xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">{t("levelsTitle")}</h2>
            <p className="text-on-surface-variant">{t("levelsSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {levels.map(({ icon: Icon, title, name, desc, points, cta, badge }) => (
              <div key={name} className="relative bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
                {badge && (
                  <span className="absolute -top-3 left-6 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full">
                    {badge}
                  </span>
                )}
                <div className="w-11 h-11 rounded-lg bg-primary-container/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-on-surface-variant mb-1">{title}</p>
                <p className="font-bold text-on-surface mb-2">{name}</p>
                <p className="text-sm text-on-surface-variant mb-4">{desc}</p>
                <ul className="space-y-2 mb-6">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <Check size={14} className="text-primary flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/237600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-primary text-on-primary font-semibold py-2.5 rounded-lg text-sm hover:bg-primary-container transition-colors"
                >
                  {cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-container mx-auto px-4 md:px-8 py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">{t("howTitle")}</h2>
            <p className="text-on-surface-variant">{t("howSubtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <p className="font-semibold text-on-surface mb-1">{step.title}</p>
                <p className="text-sm text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-container mx-auto px-4 md:px-8 pb-16 grid sm:grid-cols-2 gap-4">
          <div className="bg-surface-container-low rounded-xl p-6 flex items-start gap-3">
            <ShieldCheck size={22} className="text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-on-surface mb-1">{t("secureTitle")}</p>
              <p className="text-sm text-on-surface-variant">{t("secureDesc")}</p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-6 flex items-start gap-3">
            <MapPin size={22} className="text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-on-surface mb-1">{t("coverageTitle")}</p>
              <p className="text-sm text-on-surface-variant">{t("coverageDesc")}</p>
            </div>
          </div>
        </section>

        <section className="bg-primary text-on-primary py-16 text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("finalTitle")}</h2>
          <p className="opacity-90 max-w-lg mx-auto mb-8">{t("finalSubtitle")}</p>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-on-primary text-primary font-semibold px-6 py-3.5 rounded-lg hover:opacity-90 transition-opacity mb-3"
          >
            <MessageCircle size={18} /> {t("finalCta")}
          </a>
          <p className="text-xs opacity-75">✓ {t("finalNote")}</p>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
