import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import ContactForm from "@/components/contact/ContactForm";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const baseUrl = "https://maprocedure.cm";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: { fr: `${baseUrl}/fr/contact`, en: `${baseUrl}/en/contact` },
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">{t("title")}</h1>
          <p className="text-on-surface-variant mb-8">{t("subtitle")}</p>
          <ContactForm />
        </div>

        <div>
          <h2 className="font-bold text-on-surface mb-4">{t("infoTitle")}</h2>
          <div className="space-y-4">
            <a
              href="https://wa.me/237600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-surface-container-low rounded-xl p-4 hover:bg-surface-container transition-colors"
            >
              <MessageCircle size={20} className="text-primary" />
              <div>
                <p className="text-xs text-on-surface-variant">{t("whatsappLabel")}</p>
                <p className="font-medium text-on-surface text-sm">+237 6 00 00 00 00</p>
              </div>
            </a>
            <div className="flex items-center gap-3 bg-surface-container-low rounded-xl p-4">
              <Mail size={20} className="text-primary" />
              <div>
                <p className="text-xs text-on-surface-variant">{t("emailLabel")}</p>
                <p className="font-medium text-on-surface text-sm">contact@maprocedure.cm</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-surface-container-low rounded-xl p-4">
              <MapPin size={20} className="text-primary" />
              <div>
                <p className="text-xs text-on-surface-variant">{t("addressLabel")}</p>
                <p className="font-medium text-on-surface text-sm">{t("addressValue")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
