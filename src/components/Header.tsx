"use client"

import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import Image from "next/image"

const translations = {
  fr: {
    home: "Accueil",
    features: "Fonctionnalités",
    experts: "Pour les Experts",
    waitlist: "Liste d'Attente",
  },
  en: {
    home: "Home",
    features: "Features",
    experts: "For Experts",
    waitlist: "Join Waitlist",
  },
}

interface Props {
  lang: "fr" | "en"
  setLang: (lang: "fr" | "en") => void
}

export default function Header({ lang, setLang }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[lang]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Ma Procédure"
              width={140}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.home}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.features}
            </button>
            <button
              onClick={() => scrollToSection("experts")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.experts}
            </button>
            <button
              onClick={() => scrollToSection("waitlist")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {t.waitlist}
            </button>
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
            >
              <Globe size={16} />
              <span>{lang === "fr" ? "EN" : "FR"}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-border">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              {t.home}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              {t.features}
            </button>
            <button
              onClick={() => scrollToSection("experts")}
              className="block w-full text-left px-4 py-3 text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              {t.experts}
            </button>
            <button
              onClick={() => scrollToSection("waitlist")}
              className="block w-full text-left px-4 py-3 text-primary font-medium hover:bg-accent rounded-lg transition-colors"
            >
              {t.waitlist}
            </button>
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="flex items-center gap-2 px-4 py-3 text-foreground hover:bg-accent rounded-lg w-full transition-colors"
            >
              <Globe size={18} />
              <span>{lang === "fr" ? "English" : "Français"}</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
