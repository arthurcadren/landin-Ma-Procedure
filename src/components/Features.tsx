"use client"

import { FileText, Users, Shield, Clock, CheckCircle, Smartphone } from "lucide-react"

const translations = {
  fr: {
    label: "Fonctionnalités",
    title: "Tout ce dont vous avez besoin",
    subtitle: "Une plateforme complète pour simplifier toutes vos démarches administratives au Cameroun.",
    features: [
      {
        icon: FileText,
        title: "Procédures guidées",
        description: "Des guides étape par étape pour chaque procédure administrative avec tous les documents requis.",
      },
      {
        icon: Users,
        title: "Experts certifiés",
        description: "Accédez à un réseau d'experts vérifiés et qualifiés pour vous accompagner.",
      },
      {
        icon: Shield,
        title: "Sécurité garantie",
        description: "Vos documents et données personnelles sont protégés avec un chiffrement de niveau bancaire.",
      },
      {
        icon: Clock,
        title: "Gain de temps",
        description: "Réduisez le temps de vos démarches de 70% grâce à notre processus optimisé.",
      },
      {
        icon: CheckCircle,
        title: "Suivi en temps réel",
        description: "Suivez l'avancement de vos procédures en temps réel depuis votre tableau de bord.",
      },
      {
        icon: Smartphone,
        title: "Application mobile",
        description: "Gérez toutes vos démarches depuis votre smartphone, où que vous soyez.",
      },
    ],
  },
  en: {
    label: "Features",
    title: "Everything you need",
    subtitle: "A comprehensive platform to simplify all your administrative procedures in Cameroon.",
    features: [
      {
        icon: FileText,
        title: "Guided procedures",
        description: "Step-by-step guides for every administrative procedure with all required documents.",
      },
      {
        icon: Users,
        title: "Certified experts",
        description: "Access a network of verified and qualified experts to assist you.",
      },
      {
        icon: Shield,
        title: "Guaranteed security",
        description: "Your documents and personal data are protected with bank-level encryption.",
      },
      {
        icon: Clock,
        title: "Time saving",
        description: "Reduce your procedure time by 70% with our optimized process.",
      },
      {
        icon: CheckCircle,
        title: "Real-time tracking",
        description: "Track the progress of your procedures in real-time from your dashboard.",
      },
      {
        icon: Smartphone,
        title: "Mobile app",
        description: "Manage all your procedures from your smartphone, wherever you are.",
      },
    ],
  },
}

export default function Features({ lang }: { lang: "fr" | "en" }) {
  const t = translations[lang]

  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary mb-2 block">{t.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
