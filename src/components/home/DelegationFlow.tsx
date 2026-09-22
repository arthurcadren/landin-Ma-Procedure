
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MessageSquare, FileText, CreditCard, UserCheck, Bell } from "lucide-react";

export default function DelegationFlow() {
  const t = useTranslations("delegationFlow");

  const steps = [
    { icon: MessageSquare, title: t("step1"), desc: t("step1Desc") },
    { icon: FileText, title: t("step2"), desc: t("step2Desc") },
    { icon: CreditCard, title: t("step3"), desc: t("step3Desc") },
    { icon: UserCheck, title: t("step4"), desc: t("step4Desc") },
    { icon: Bell, title: t("step5"), desc: t("step5Desc") },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">{t("title")}</h2>
          <p className="text-on-surface-variant">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center mx-auto mb-3">
                {i + 1}
              </div>
              <Icon size={20} className="text-primary mx-auto mb-2" />
              <p className="font-semibold text-on-surface text-sm mb-1">{title}</p>
              <p className="text-xs text-on-surface-variant">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-on-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary-container transition-colors"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
