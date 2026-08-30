import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { FileQuestion } from "lucide-react";

export default async function ProcedureNotFound() {
  const t = await getTranslations("procedureDetail");

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-24 text-center">
        <FileQuestion size={56} className="text-outline mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-on-surface mb-3">{t("notFoundTitle")}</h1>
        <p className="text-on-surface-variant mb-8">{t("notFoundText")}</p>
        <Link
          href="/procedures"
          className="inline-block bg-primary text-on-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary-container transition-colors"
        >
          {t("backToList")}
        </Link>
      </main>
      <Footer />
    </>
  );
}
