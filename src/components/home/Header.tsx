"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="sticky top-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant">
      <nav className="max-w-container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary tracking-tight">
          Ma Procédure
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/procedures" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            {t("procedures")}
          </Link>
          <Link href="/experts" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            {t("experts")}
          </Link>
          <Link href="/tarifs" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            {t("pricing")}
          </Link>
          <Link href="/suivi" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            {t("track")}
          </Link>

          <Link
            href={pathname}
            locale={otherLocale}
            className="text-sm font-semibold px-3 py-1.5 rounded-full border border-outline-variant hover:border-primary hover:text-primary transition-colors"
          >
            {locale === "fr" ? "EN" : "FR"}
          </Link>

          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-container transition-colors"
          >
            {t("cta")}
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-on-surface"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-outline-variant px-4 py-4 flex flex-col gap-3 bg-surface-container-lowest">
          <Link href="/procedures" onClick={() => setOpen(false)} className="py-2 text-on-surface">
            {t("procedures")}
          </Link>
          <Link href="/experts" onClick={() => setOpen(false)} className="py-2 text-on-surface">
            {t("experts")}
          </Link>
          <Link href="/tarifs" onClick={() => setOpen(false)} className="py-2 text-on-surface">
            {t("pricing")}
          </Link>
          <Link href="/suivi" onClick={() => setOpen(false)} className="py-2 text-on-surface">
            {t("track")}
          </Link>
          <Link href={pathname} locale={otherLocale} className="py-2 font-semibold text-primary">
            {locale === "fr" ? "English" : "Français"}
          </Link>
          <a
            href="https://wa.me/237600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-primary text-on-primary text-center font-semibold px-5 py-3 rounded-lg"
          >
            {t("cta")}
          </a>
        </div>
      )}
    </header>
  );
}