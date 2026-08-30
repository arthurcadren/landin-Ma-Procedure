
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAppConfig } from "@/lib/api";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import { Check, Info } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  const baseUrl = "https://maprocedure.cm";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${baseUrl}/${locale}/tarifs`,
      languages: { fr: `${baseUrl}/fr/tarifs`, en: `${baseUrl}/en/tarifs` },
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // ← LA LIGNE QUI MANQUAIT ICI

  const t = await getTranslations("pricing");
  const config = await getAppConfig();
  const consultationPrice = config.consultation_price ?? 5000;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-12">
          <span className="inline-block bg-secondary-container text-on-secondary-container text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            {t("badge")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 text-balance">{t("title")}</h1>
          <p className="text-on-surface-variant max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 mb-6">
          <p className="font-bold text-on-surface mb-1">{t("tier1Title")}</p>
          <p className="text-sm text-on-surface-variant mb-4">{t("tier1Subtitle")}</p>
          <p className="text-4xl font-black text-primary mb-4">{t("tier1Price")}</p>
          <ul className="space-y-2 mb-6">
            {[t("tier1Point1"), t("tier1Point2"), t("tier1Point3")].map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-on-surface-variant">
                <Check size={16} className="text-primary" /> {p}
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-primary text-on-primary font-semibold py-3 rounded-lg hover:bg-primary-container transition-colors"
          >
            {t("tier1Cta")}
          </a>
        </div>

        <div className="bg-surface-container-lowest border-2 border-primary rounded-2xl p-8 mb-6 relative">
          <span className="absolute -top-3 left-8 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full">
            {t("tier2Badge")}
          </span>
          <p className="font-bold text-on-surface mb-1">{t("tier2Title")}</p>
          <p className="text-sm text-on-surface-variant mb-5">{t("tier2Subtitle")}</p>
          <div className="space-y-3 mb-6">
            {[
              { label: t("tier2_15min"), price: consultationPrice },
              { label: t("tier2_30min"), price: Math.round(consultationPrice * 1.6) },
              { label: t("tier2_45min"), price: Math.round(consultationPrice * 2.4) },
            ].map((tier) => (
              <div key={tier.label} className="flex items-center justify-between bg-surface-container-low rounded-lg px-4 py-3">
                <span className="text-sm font-medium text-on-surface">{tier.label}</span>
                <span className="font-bold text-primary">{tier.price.toLocaleString("fr-FR")} FCFA</span>
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-primary text-on-primary font-semibold py-3 rounded-lg hover:bg-primary-container transition-colors"
          >
            {t("finalCta")}
          </a>
        </div>

        <div className="bg-primary text-on-primary rounded-2xl p-8 mb-4">
          <p className="font-bold mb-1">{t("tier3Title")}</p>
          <p className="text-sm opacity-90 mb-5">{t("tier3Subtitle")}</p>
          <p className="text-xs opacity-75">{t("tier3PriceLabel")}</p>
          <p className="text-4xl font-black mb-4">25 000 <span className="text-lg">FCFA</span></p>
          <ul className="space-y-2 mb-6">
            {[t("tier3Point1"), t("tier3Point2"), t("tier3Point3")].map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm opacity-90">
                <Check size={16} /> {p}
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-on-primary text-primary font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t("tier3Cta")}
          </a>
        </div>

        <div className="flex gap-3 bg-secondary-container/20 rounded-xl p-4 mb-12">
          <Info size={18} className="text-secondary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-on-surface-variant leading-relaxed">{t("tier3Note")}</p>
        </div>

        <h2 className="text-xl font-bold text-on-surface mb-4">{t("faqTitle")}</h2>
        <div className="space-y-2 mb-12">
          {[
            { q: t("faq1Q"), a: t("faq1A") },
            { q: t("faq2Q"), a: t("faq2A") },
            { q: t("faq3Q"), a: t("faq3A") },
          ].map((item) => (
            <details key={item.q} className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
              <summary className="font-medium text-on-surface cursor-pointer list-none flex justify-between">
                {item.q}
                <span className="text-primary group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-sm text-on-surface-variant mt-3">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="text-center bg-surface-container-low rounded-2xl p-8">
          <h2 className="text-xl font-bold text-on-surface mb-2">{t("finalCtaTitle")}</h2>
          <p className="text-on-surface-variant text-sm mb-5">{t("finalCtaSubtitle")}</p>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-on-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary-container transition-colors mb-2"
          >
            {t("finalCta")}
          </a>
          <p className="text-xs text-on-surface-variant">{t("finalCtaNote")}</p>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
