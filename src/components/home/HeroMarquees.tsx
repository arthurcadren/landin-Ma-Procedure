
import { useTranslations } from "next-intl";
import {
  IdCard, Plane, Building2, Scale, FileText, Landmark, Car, Heart, Receipt, Briefcase,
  ShieldCheck, Clock, MessageSquareText, Star,
} from "lucide-react";
import { Marquee } from "./Marquee";

const SERVICE_ICONS = [IdCard, Plane, Building2, Scale, FileText, Landmark, Car, Heart, Receipt, Briefcase];

export default function HeroMarquees() {
  const t = useTranslations("services.items");

  const services = [
    "cni", "passport", "business", "criminalRecord", "birthCertificate",
    "landTitle", "driverLicense", "marriageCertificate", "taxId", "workPermit",
  ];

  const trustPoints = [
    { icon: ShieldCheck, label: "Contenus vérifiés par des experts" },
    { icon: Clock, label: "Réponses instantanées 24/7" },
    { icon: MessageSquareText, label: "Assistant disponible sur WhatsApp" },
    { icon: Star, label: "98% de satisfaction utilisateurs" },
  ];

  const testimonials = [
    "\"J'ai refait ma CNI sans me déplacer 3 fois.\" — Aïcha, Douala",
    "\"L'assistant m'a évité une longue file d'attente.\" — Paul, Yaoundé",
    "\"Rapide, clair, et l'expert a confirmé mes documents.\" — Sandrine, Bafoussam",
    "\"Enfin une plateforme fiable pour l'administration.\" — Marc, Garoua",
  ];

  const paymentMethods = ["MTN Mobile Money", "Orange Money", "Paiement sécurisé Fapshi", "Support WhatsApp 24/7"];

  return (
    <div className="space-y-6 py-8">
      {/* 1. Services (icônes) */}
      <Marquee speedSeconds={35}>
        {services.map((key, i) => {
          const Icon = SERVICE_ICONS[i];
          return (
            <div
              key={key}
              className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 flex-shrink-0"
            >
              <Icon size={16} className="text-primary" />
              <span className="text-sm font-medium text-on-surface whitespace-nowrap">{t(key)}</span>
            </div>
          );
        })}
      </Marquee>

      {/* 2. Points de confiance */}
      <Marquee speedSeconds={28} reverse>
        {trustPoints.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 bg-primary-container/10 rounded-full px-4 py-2 flex-shrink-0"
          >
            <Icon size={16} className="text-primary" />
            <span className="text-sm font-medium text-on-surface whitespace-nowrap">{label}</span>
          </div>
        ))}
      </Marquee>

      {/* 3. Témoignages */}
      <Marquee speedSeconds={40}>
        {testimonials.map((quote) => (
          <div
            key={quote}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl px-5 py-3 flex-shrink-0 max-w-xs"
          >
            <p className="text-sm text-on-surface-variant italic whitespace-nowrap">{quote}</p>
          </div>
        ))}
      </Marquee>

      {/* 4. Moyens de paiement / partenaires */}
      <Marquee speedSeconds={25} reverse>
        {paymentMethods.map((method) => (
          <div
            key={method}
            className="flex items-center gap-2 bg-secondary-container/15 text-on-secondary-container rounded-full px-4 py-2 flex-shrink-0"
          >
            <span className="text-sm font-semibold whitespace-nowrap">{method}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
