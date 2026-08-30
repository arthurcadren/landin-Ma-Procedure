"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: brancher sur un endpoint POST /api/contact côté Laravel
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="bg-primary-container/10 rounded-xl p-6 text-center">
        <p className="font-semibold text-primary">{t("formSuccess")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">{t("formName")}</label>
        <input required className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">{t("formEmail")}</label>
        <input type="email" required className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">{t("formSubject")}</label>
        <input required className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-on-surface mb-1.5">{t("formMessage")}</label>
        <textarea required rows={4} className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-on-primary font-semibold py-3 rounded-lg hover:bg-primary-container transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "..." : t("formSubmit")}
      </button>
    </form>
  );
}