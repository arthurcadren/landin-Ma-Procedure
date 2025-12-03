"use client"

import { Award, TrendingUp, Briefcase, ArrowRight } from "lucide-react"

const translations = {
  fr: {
    label: "Pour les Experts",
    title: "Rejoignez notre réseau d'experts",
    subtitle: "Développez votre activité en rejoignant la première plateforme de services administratifs au Cameroun.",
    benefits: [
      {
        icon: TrendingUp,
        title: "Augmentez vos revenus",
        description: "Accédez à des milliers de clients potentiels chaque mois.",
      },
      {
        icon: Award,
        title: "Certification reconnue",
        description: "Obtenez une certification qui renforce votre crédibilité.",
      },
      {
        icon: Briefcase,
        title: "Outils professionnels",
        description: "Gérez vos clients et dossiers avec nos outils dédiés.",
      },
    ],
    cta: "Devenir expert",
    stats: [
      { value: "500+", label: "Experts actifs" },
      { value: "€2,500", label: "Revenu moyen/mois" },
    ],
  },
  en: {
    label: "For Experts",
    title: "Join our expert network",
    subtitle: "Grow your business by joining the first administrative services platform in Cameroon.",
    benefits: [
      {
        icon: TrendingUp,
        title: "Increase your revenue",
        description: "Access thousands of potential clients every month.",
      },
      {
        icon: Award,
        title: "Recognized certification",
        description: "Get certified to strengthen your credibility.",
      },
      {
        icon: Briefcase,
        title: "Professional tools",
        description: "Manage your clients and files with our dedicated tools.",
      },
    ],
    cta: "Become an expert",
    stats: [
      { value: "500+", label: "Active experts" },
      { value: "€2,500", label: "Avg. monthly income" },
    ],
  },
}

export default function Experts({ lang }: { lang: "fr" | "en" }) {
  const t = translations[lang]

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="experts" className="py-20 md:py-28 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-sm font-medium text-primary mb-2 block">{t.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{t.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">{t.subtitle}</p>

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              {t.benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={scrollToWaitlist}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {t.cta}
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Content - Stats Card */}
          <div className="bg-background border border-border rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              {t.stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-card rounded-xl border border-border">
                  <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-primary/5 rounded-xl p-6">
              <p className="text-foreground italic mb-4">
                {lang === "fr"
                  ? '"Ma Procédure a transformé ma pratique. J\'ai triplé ma clientèle en 6 mois."'
                  : '"Ma Procédure transformed my practice. I tripled my client base in 6 months."'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">JN</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Jean Nkongo</p>
                  <p className="text-sm text-muted-foreground">
                    {lang === "fr" ? "Expert juridique, Douala" : "Legal Expert, Douala"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
