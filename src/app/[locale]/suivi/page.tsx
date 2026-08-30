import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import TrackingForm from "@/components/tracking/TrackingForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tracking" });
  const baseUrl = "https://maprocedure.cm";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${baseUrl}/${locale}/suivi`,
      languages: { fr: `${baseUrl}/fr/suivi`, en: `${baseUrl}/en/suivi` },
    },
  };
}

export default function TrackingPage() {
  return (
    <>
      <Header />
      <TrackingForm />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
