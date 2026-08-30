// ============================================================
// FICHIER: app/[locale]/procedures/page.tsx
// Liste + recherche + filtre catégorie (rendu client pour l'interactivité,
// données initiales pré-chargées côté serveur pour le SEO)
// ============================================================

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllProcedures, getCategories } from "@/lib/api";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import ProceduresListClient from "@/components/procedures/ProceduresListClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "proceduresList" });
  const baseUrl = "https://maprocedure.cm";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${baseUrl}/${locale}/procedures`,
      languages: { fr: `${baseUrl}/fr/procedures`, en: `${baseUrl}/en/procedures` },
    },
  };
}

export default async function ProceduresListPage() {
  const [procedures, categories] = await Promise.all([
    getAllProcedures(),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <ProceduresListClient initialProcedures={procedures} categories={categories} />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
