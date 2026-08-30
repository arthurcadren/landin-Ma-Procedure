"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // À connecter à ton endpoint backend d'inscription newsletter
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-on-primary">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
        <p className="opacity-90 mb-8">{t("subtitle")}</p>

        {status === "success" ? (
          <p className="font-semibold">✓ Merci pour votre inscription !</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 px-4 py-3 rounded-lg text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary-container"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-on-primary text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {t("cta")}
            </button>
          </form>
        )}

        <p className="text-xs opacity-75 mt-4">{t("disclaimer")}</p>
      </div>
    </section>
  );
}