import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllExperts } from "@/lib/api";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import ExpertsListClient from "@/components/experts/ExpertsListClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "expertsList" });
  const baseUrl = "https://maprocedure.cm";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${baseUrl}/${locale}/experts`,
      languages: { fr: `${baseUrl}/fr/experts`, en: `${baseUrl}/en/experts` },
    },
  };
}

export default async function ExpertsPage() {
  const experts = await getAllExperts();

  return (
    <>
      <Header />
      <ExpertsListClient experts={experts} />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
