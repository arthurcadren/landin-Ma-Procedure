import { getTranslations } from "next-intl/server";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

export default async function ConfidentialitePage() {
  const t = await getTranslations("legal");

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12 prose prose-sm">
        <h1 className="text-2xl font-bold text-on-surface mb-2">{t("privacyTitle")}</h1>
        <p className="text-xs text-on-surface-variant mb-8">
          {t("lastUpdated", { date: new Date().toLocaleDateString("fr-FR") })}
        </p>
        <div className="text-on-surface-variant leading-relaxed space-y-4 text-sm">
          <p>
            Nous collectons uniquement les informations nécessaires au traitement de vos
            demandes (nom, téléphone, dossier concerné). Ces données sont utilisées
            exclusivement dans le cadre de la prestation demandée et ne sont jamais
            revendues à des tiers.
          </p>
          <p>
            Ce contenu est un modèle de départ — à compléter avec le détail exact de vos
            traitements de données (durée de conservation, droits d&apos;accès, sous-traitants
            comme Fapshi et WHAPI) avant mise en production.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

