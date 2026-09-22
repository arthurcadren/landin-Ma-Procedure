
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

export default function LexiDemo() {
  const t = useTranslations("lexiDemo");

  return (
    <section className="py-16 md:py-24 bg-surface-container-low">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-4">{t("title")}</h2>
            <p className="text-on-surface-variant text-lg mb-8">{t("subtitle")}</p>
            <a
              href="https://wa.me/237600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3.5 rounded-lg hover:bg-primary-container transition-colors"
            >
              <MessageCircle size={18} /> {t("cta")}
            </a>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-card border border-outline-variant p-4 md:p-6 space-y-3 max-w-sm mx-auto w-full">
            <ChatBubble text={t("msgClient1")} fromUser />
            <ChatBubble text={t("msgLexi1")} />
            <ChatBubble text={t("msgClient2")} fromUser />
            <ChatBubble text={t("msgLexi2")} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ text, fromUser = false }: { text: string; fromUser?: boolean }) {
  return (
    <div className={`flex ${fromUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          fromUser
            ? "bg-primary text-on-primary rounded-br-sm"
            : "bg-surface-container text-on-surface rounded-bl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
