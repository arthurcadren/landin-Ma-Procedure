import { getTranslations } from "next-intl/server";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

export default async function MentionsLegalesPage() {
  const t = await getTranslations("legal");

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12 prose prose-sm">
        <h1 className="text-2xl font-bold text-on-surface mb-2">{t("mentionsTitle")}</h1>
        <p className="text-xs text-on-surface-variant mb-8">
          {t("lastUpdated", { date: new Date().toLocaleDateString("fr-FR") })}
        </p>
        <div className="text-on-surface-variant leading-relaxed space-y-4 text-sm">
          <p>Ma Procédure est édité depuis Yaoundé, République du Cameroun.</p>
          <p>Contact : contact@maprocedure.cm</p>
          <p>
            Ce contenu est un modèle de départ — à faire relire et compléter par un
            professionnel du droit avant mise en production, notamment concernant le
            statut juridique exact de la structure éditrice et l&apos;hébergeur du site.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}