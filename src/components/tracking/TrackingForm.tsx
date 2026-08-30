"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackServiceRequest, type TrackingResult } from "@/lib/api";
import { Search, Circle, CheckCircle2, Clock, XCircle, MessageCircle } from "lucide-react";

const STATUS_ORDER = ["pending", "accepted", "in_progress", "completed"];

export default function TrackingForm() {
  const t = useTranslations("tracking");
  const [reference, setReference] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;
    setLoading(true);
    setSearched(true);
    const res = await trackServiceRequest(reference.trim());
    setResult(res);
    setLoading(false);
  };

  const statusLabel = (status?: string) => {
    switch (status) {
      case "pending": return t("statusPending");
      case "accepted": return t("statusAccepted");
      case "in_progress": return t("statusInProgress");
      case "completed": return t("statusCompleted");
      case "cancelled": return t("statusCancelled");
      default: return status ?? "";
    }
  };

  const currentIndex = result?.status ? STATUS_ORDER.indexOf(result.status) : -1;

  return (
    <main className="max-w-lg mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">{t("title")}</h1>
        <p className="text-on-surface-variant">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 mb-8">
        <label className="block text-sm font-medium text-on-surface mb-2">
          {t("title") === "Suivez votre dossier" ? "Numéro de dossier" : "Case number"}
        </label>
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary font-semibold py-3 rounded-lg hover:bg-primary-container transition-colors disabled:opacity-60"
        >
          {loading ? "..." : t("cta")}
        </button>
      </form>

      {searched && !loading && result && !result.found && (
        <div className="text-center bg-error-container/40 rounded-xl p-6">
          <XCircle size={32} className="text-error mx-auto mb-3" />
          <p className="font-semibold text-on-surface mb-1">{t("notFoundTitle")}</p>
          <p className="text-sm text-on-surface-variant mb-4">{t("notFoundText")}</p>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
          >
            <MessageCircle size={16} /> {t("helpText")}
          </a>
        </div>
      )}

      {result?.found && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
          <p className="text-xs text-on-surface-variant mb-1">{t("procedureLabel")}</p>
          <p className="font-bold text-on-surface mb-6">{result.procedure_title ?? "—"}</p>

          <div className="space-y-1">
            {STATUS_ORDER.map((status, i) => {
              const isDone = result.status === "cancelled" ? false : i <= currentIndex;
              const isCurrent = status === result.status;

              return (
                <div key={status} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {isDone ? (
                      <CheckCircle2 size={22} className={isCurrent ? "text-primary" : "text-primary/60"} />
                    ) : (
                      <Circle size={22} className="text-outline-variant" />
                    )}
                    {status !== "completed" && (
                      <div className={`w-0.5 h-8 ${isDone ? "bg-primary/60" : "bg-outline-variant"}`} />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className={`text-sm font-medium ${isDone ? "text-on-surface" : "text-on-surface-variant"}`}>
                      {statusLabel(status)}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-primary flex items-center gap-1 mt-0.5">
                        <Clock size={11} /> Statut actuel
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}