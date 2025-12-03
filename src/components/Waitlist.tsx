"use client"

import type React from "react"

import { useState } from "react"
import { Mail, CheckCircle, Loader2 } from "lucide-react"

const translations = {
  fr: {
    label: "Liste d'Attente",
    title: "Soyez les premiers informés",
    subtitle:
      "Inscrivez-vous à notre liste d'attente pour être notifié du lancement et bénéficier d'avantages exclusifs.",
    placeholder: "Entrez votre email",
    button: "Rejoindre",
    loading: "Inscription...",
    success: "Merci ! Vous êtes inscrit.",
    error: "Une erreur est survenue. Veuillez réessayer.",
    benefits: ["Accès anticipé à la plateforme", "Offre de lancement exclusive", "Aucun spam, promis"],
  },
  en: {
    label: "Waitlist",
    title: "Be the first to know",
    subtitle: "Sign up to our waitlist to be notified at launch and receive exclusive benefits.",
    placeholder: "Enter your email",
    button: "Join",
    loading: "Signing up...",
    success: "Thank you! You're on the list.",
    error: "An error occurred. Please try again.",
    benefits: ["Early access to the platform", "Exclusive launch offer", "No spam, we promise"],
  },
}

export default function Waitlist({ lang }: { lang: "fr" | "en" }) {
  const t = translations[lang]
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, always succeed
    setStatus("success")
    setEmail("")
  }

  return (
    <section id="waitlist" className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-sm font-medium text-primary mb-2 block">{t.label}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{t.title}</h2>
        <p className="text-lg text-muted-foreground mb-8 text-pretty">{t.subtitle}</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                required
                disabled={status === "loading" || status === "success"}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.loading}
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  {t.success}
                </>
              ) : (
                t.button
              )}
            </button>
          </div>
        </form>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6">
          {t.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
