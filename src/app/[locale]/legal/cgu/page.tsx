import { getTranslations } from "next-intl/server";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

export default async function CguPage() {
  const t = await getTranslations("legal");

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12 prose prose-sm">
        <h1 className="text-2xl font-bold text-on-surface mb-2">{t("termsTitle")}</h1>
        <p className="text-xs text-on-surface-variant mb-8">
          {t("lastUpdated", { date: new Date().toLocaleDateString("fr-FR") })}
        </p>
        <div className="text-on-surface-variant leading-relaxed space-y-4 text-sm">
          <p>
            L&apos;utilisation du service d&apos;information (Niveau 1, gratuit) est libre. Les
            services de consultation et de délégation (Niveaux 2 et 3) font l&apos;objet d&apos;un
            paiement préalable via Fapshi (Mobile Money / Orange Money), non remboursable
            sauf cas de non-faisabilité constatée après étude du dossier.
          </p>
          <p>
            Ce contenu est un modèle de départ — à faire valider par un professionnel du
            droit avant mise en production.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}