import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import { Users, ShieldCheck, Zap, Lock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const baseUrl = "https://maprocedure.cm";

  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `${baseUrl}/${locale}/a-propos`,
      languages: { fr: `${baseUrl}/fr/a-propos`, en: `${baseUrl}/en/a-propos` },
    },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  const values = [
    { icon: Zap, title: t("value1Title"), desc: t("value1Desc") },
    { icon: ShieldCheck, title: t("value2Title"), desc: t("value2Desc") },
    { icon: Users, title: t("value3Title"), desc: t("value3Desc") },
    { icon: Lock, title: t("value4Title"), desc: t("value4Desc") },
  ];

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-6 text-center">{t("title")}</h1>
        <p className="text-on-surface-variant leading-relaxed mb-10 text-center">{t("intro")}</p>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-on-surface mb-3">{t("missionTitle")}</h2>
          <p className="text-on-surface-variant leading-relaxed">{t("missionText")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-on-surface mb-6">{t("valuesTitle")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-surface-container-low rounded-xl p-5">
                <Icon size={20} className="text-primary mb-3" />
                <p className="font-semibold text-on-surface mb-1">{title}</p>
                <p className="text-sm text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-primary text-on-primary rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-2">{t("ctaTitle")}</h2>
          <p className="opacity-90 text-sm mb-5">{t("ctaText")}</p>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-on-primary text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t("cta")}
          </a>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
