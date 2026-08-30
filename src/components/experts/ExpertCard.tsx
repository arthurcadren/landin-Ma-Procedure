import { Link } from "@/i18n/navigation";
import { Star, BadgeCheck } from "lucide-react";
import Image from "next/image";
import type { ExpertDetail } from "@/lib/api";

export function ExpertCard({ expert }: { expert: ExpertDetail }) {
  return (
    <Link
      href={`/experts/${expert.id}`}
      className="block bg-surface-container-lowest border border-outline-variant rounded-xl p-6 text-center hover:shadow-card hover:border-primary/40 transition-all"
    >
      <div className="relative w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-primary-container/20">
        {expert.photo && (
          <Image src={expert.photo} alt={expert.user?.name ?? expert.company_name} fill className="object-cover" />
        )}
      </div>
      <p className="font-bold text-on-surface">{expert.user?.name ?? expert.company_name}</p>
      <p className="text-sm text-primary mb-2">{expert.services?.[0] ?? expert.company_name}</p>

      <div className="flex items-center justify-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={i < Math.round(expert.rating ?? 0) ? "fill-secondary-container text-secondary-container" : "text-outline-variant"}
          />
        ))}
        <span className="text-xs text-on-surface-variant ml-1">({expert.rating?.toFixed(1) ?? "—"})</span>
      </div>

      <div className="flex items-center justify-between text-xs text-on-surface-variant pt-3 border-t border-outline-variant">
        <span>{expert.completed_orders} dossiers</span>
        {expert.status === "approved" && (
          <span className="inline-flex items-center gap-1 text-primary font-medium">
            <BadgeCheck size={14} /> Vérifié
          </span>
        )}
      </div>
    </Link>
  );
}