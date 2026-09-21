import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import logoFooter from "../../../logofooter.png";
import Image from "next/image";


export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface pt-16 pb-8">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="text-xl font-bold mb-3">
              <Link href="/" className="hidden md:flex items-center" aria-label="Ma Procédure">
                  <Image src={logoFooter} alt="Ma Procédure" width={250} height={80} priority className="h-20 w-auto" />
              </Link>
              <Link href="/" className="md:hidden flex items-center" aria-label="Ma Procédure">
                  <Image src={logoFooter} alt="Ma Procédure" width={110} height={32} priority className="h-18 w-auto" />
              </Link>
            </p>
            <p className="text-sm opacity-80 leading-relaxed mb-4">{t("tagline")}</p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <MapPin size={14} />
              <span>Yaoundé, Cameroun</span>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-4">{t("navigation")}</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/">{t("home")}</Link></li>
              <li><Link href="/procedures">{t("procedures")}</Link></li>
              <li><Link href="/experts">{t("experts")}</Link></li>
              <li><Link href="/blog">{t("blog")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-4">{t("support")}</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/contact">{t("contact")}</Link></li>
              <li><Link href="/legal/mentions-legales">{t("legal")}</Link></li>
              <li><Link href="/legal/confidentialite">{t("privacy")}</Link></li>
              <li><Link href="/legal/cgu">{t("terms")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-4">Contact</p>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Mail size={14} /> contact@maprocedure.cm
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} /> +237 6 00 00 00 00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs opacity-60">
          {t("rights", { year })}
        </div>
      </div>
    </footer>
  );
}