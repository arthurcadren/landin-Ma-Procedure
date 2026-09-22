import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getProcedureBySlug,
  getAllProcedureSlugs,
  getRelatedProcedures,
} from "@/lib/api";
import { HowToJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/HowToJsonLd";
import { Breadcrumb } from "@/components/procedures/Breadcrumb";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import { routing } from "@/i18n/routing";
import { Wallet, Clock, Landmark, FileStack, Clock3 } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProcedureSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const procedure = await getProcedureBySlug(slug);

  if (!procedure) {
    return { title: "Procédure introuvable" };
  }

  const baseUrl = "https://maprocedure.cm";
  const title =
    locale === "en"
      ? `${procedure.title} in Cameroon — Steps & Requirements`
      : `${procedure.title} au Cameroun — Étapes et documents requis`;
  const description =
    procedure.summary ??
    `Guide complet : ${procedure.title.toLowerCase()} au Cameroun, étapes, documents requis, coûts et délais.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/procedures/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/procedures/${slug}`,
        en: `${baseUrl}/en/procedures/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/procedures/${slug}`,
      type: "article",
    },
  };
}

export default async function ProcedureDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const procedure = await getProcedureBySlug(slug);

  if (!procedure) {
    notFound();
  }

  const t = await getTranslations("procedureDetail");
  const baseUrl = "https://maprocedure.cm";
  const pageUrl = `${baseUrl}/${locale}/procedures/${slug}`;

  const related = procedure.category
    ? await getRelatedProcedures(procedure.category.id, slug)
    : [];

  const breadcrumbItems = [
    { name: t("breadcrumbHome"), href: "/" },
    ...(procedure.category ? [{ name: procedure.category.name, href: "/procedures" }] : []),
    { name: procedure.title },
  ];

  const breadcrumbJsonLdItems = [
    { name: t("breadcrumbHome"), url: `${baseUrl}/${locale}` },
    ...(procedure.category
      ? [{ name: procedure.category.name, url: `${baseUrl}/${locale}/procedures` }]
      : []),
    { name: procedure.title, url: pageUrl },
  ];

  return (
    <>
      <HowToJsonLd procedure={procedure} url={pageUrl} />
      <FaqJsonLd faq={procedure.faq ?? []} />
      <BreadcrumbJsonLd items={breadcrumbJsonLdItems} />

      <Header />

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {procedure.category && (
            <span className="bg-secondary-container text-on-secondary-container text-xs font-semibold px-3 py-1 rounded-full">
              {procedure.category.name}
            </span>
          )}
          {!!procedure.popularity_score && procedure.popularity_score > 50 && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
              🔥 {t("popular")}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-6 text-balance">
          {procedure.title}
        </h1>

        {procedure.summary && (
          <div className="bg-surface-container-low rounded-xl p-5 mb-8">
            <p className="text-on-surface-variant leading-relaxed">{procedure.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <InfoCard icon={Wallet} label={t("estimatedCost")} value={procedure.estimated_cost ?? "—"} />
          <InfoCard icon={Clock} label={t("estimatedDelay")} value={procedure.estimated_delay ?? "—"} />
          <InfoCard icon={Landmark} label={t("administration")} value={procedure.administration ?? "—"} />
          <InfoCard icon={FileStack} label={t("documentsRequired")} value={String(procedure.documents.length)} />
        </div>

        {procedure.steps.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-on-surface mb-4">{t("stepsTitle")}</h2>
            <ol className="space-y-3">
              {procedure.steps
                .sort((a, b) => a.position - b.position)
                .map((step, i) => (
                  <li
                    key={step.id}
                    className="flex gap-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-5"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-on-surface mb-1">{step.title}</h3>
                      {step.description && (
                        <p className="text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
          </section>
        )}

        {procedure.documents.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-on-surface mb-4">{t("documentsTitle")}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {procedure.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-on-surface text-sm">{doc.name}</p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        doc.is_mandatory
                          ? "bg-error-container text-error"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      {doc.is_mandatory ? t("mandatory") : t("optional")}
                    </span>
                  </div>
                  {doc.description && (
                    <p className="text-xs text-on-surface-variant">{doc.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {procedure.faq && procedure.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-on-surface mb-4">{t("faqTitle")}</h2>
            <div className="space-y-2">
              {procedure.faq.map((item) => (
                <details
                  key={item.question}
                  className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-4"
                >
                  <summary className="font-medium text-on-surface cursor-pointer list-none flex items-center justify-between">
                    {item.question}
                    <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="bg-primary text-on-primary rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold mb-2">{t("helpTitle")}</h2>
          <p className="opacity-90 mb-5 text-sm leading-relaxed">{t("helpSubtitle")}</p>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-on-primary text-primary font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-opacity mb-2"
          >
            {t("helpCta")}
          </a>
          <p className="text-xs opacity-75 underline underline-offset-2">{t("helpCtaSecondary")}</p>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-4">{t("relatedTitle")}</h2>
            <div className="space-y-3">
              {related.map((p) => (
                <ProcedureCard key={p.id} procedure={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-center">
      <Icon size={18} className="text-primary mx-auto mb-1.5" />
      <p className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wide">{label}</p>
      <p className="text-sm font-bold text-on-surface mt-0.5 truncate">{value}</p>
    </div>
  );
}

