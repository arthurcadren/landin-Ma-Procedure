import { Link } from "@/i18n/navigation";
import { FileText, ChevronRight, Flame } from "lucide-react";
import type { ProcedureSummary } from "@/lib/api";

export function ProcedureCard({ procedure }: { procedure: ProcedureSummary }) {
  return (
    <Link
      href={`/procedures/${procedure.slug}`}
      className="group flex items-center gap-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:shadow-card hover:border-primary/40 transition-all"
    >
      <div className="w-12 h-12 rounded-lg bg-primary-container/15 flex items-center justify-center flex-shrink-0">
        <FileText size={22} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-on-surface truncate">{procedure.title}</p>
        {procedure.summary && (
          <p className="text-sm text-on-surface-variant truncate">{procedure.summary}</p>
        )}
        {!!procedure.popularity_score && (
          <div className="flex items-center gap-1 mt-1">
            <Flame size={12} className="text-tertiary" />
            <span className="text-xs text-on-surface-variant">{procedure.popularity_score} demandes</span>
          </div>
        )}
      </div>
      <ChevronRight size={20} className="text-outline group-hover:text-primary transition-colors flex-shrink-0" />
    </Link>
  );
}