// ============================================================
// FICHIER: src/app/[locale]/layout.tsx — CORRIGÉ (sans next/font/google)
// ============================================================

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = "https://maprocedure.cm";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("homeTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("homeDescription"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: { fr: `${baseUrl}/fr`, en: `${baseUrl}/en` },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: `${baseUrl}/${locale}`,
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_CM" : "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Police Inter chargée via lien classique — évite complètement
            le pipeline next/font/google + Turbopack qui nécessite un
            accès réseau spécial au moment du build. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background text-on-background antialiased">
        <NextIntlClientProvider messages={messages}>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
