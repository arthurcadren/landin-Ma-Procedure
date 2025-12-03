"use client"

import { Facebook, Twitter, Linkedin, Instagram, MapPin } from "lucide-react"
import Image from "next/image"

const translations = {
  fr: {
    tagline: "Simplifiez vos démarches administratives au Cameroun",
    company: "Entreprise",
    about: "À propos",
    experts: "Pour les Experts",
    careers: "Carrières",
    support: "Support",
    help: "Centre d'aide",
    contact: "Contact",
    faq: "FAQ",
    legal: "Légal",
    terms: "Conditions",
    privacy: "Confidentialité",
    rights: "2024 Ma Procédure. Tous droits réservés.",
    madeIn: "Conçu au Cameroun",
  },
  en: {
    tagline: "Simplify your administrative procedures in Cameroon",
    company: "Company",
    about: "About",
    experts: "For Experts",
    careers: "Careers",
    support: "Support",
    help: "Help Center",
    contact: "Contact",
    faq: "FAQ",
    legal: "Legal",
    terms: "Terms",
    privacy: "Privacy",
    rights: "2024 Ma Procédure. All rights reserved.",
    madeIn: "Made in Cameroon",
  },
}

interface Props {
  lang: "fr" | "en"
}

export default function Footer({ lang }: Props) {
  const t = translations[lang]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Ma Procédure"
                width={250}
                height={180}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-background/60 text-sm mb-4">{t.tagline}</p>
            <div className="flex items-center gap-2 text-background/60 text-sm">
              <MapPin size={14} />
              <span>Yaoundé, Cameroun</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-background mb-4">{t.company}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("experts")}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {t.experts}
                </button>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t.careers}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-background mb-4">{t.support}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t.help}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t.contact}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-background mb-4">{t.legal}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t.terms}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                  {t.privacy}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">{t.rights}</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
