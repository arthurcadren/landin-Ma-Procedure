import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-on-surface-variant mb-6 flex-wrap">
      {items.map((item, i) => (
        <span key={item.name} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={14} />}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-on-surface font-medium">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
