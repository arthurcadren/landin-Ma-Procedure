"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Download } from "lucide-react"

const slides = {
  fr: [
    {
      badge: "Bientot disponible",
      title: "Simplifiez vos demarches administratives",
      subtitle:
        "La premiere plateforme qui connecte les citoyens camerounais aux experts certifies pour toutes leurs procedures legales et administratives.",
    },
    {
      badge: "Rapide & Securise",
      title: "Gagnez du temps sur vos procedures",
      subtitle:
        "Plus besoin de faire la queue pendant des heures. Nos experts s'occupent de tout et vous suivez l'avancement en temps reel.",
    },
    {
      badge: "Experts Certifies",
      title: "Des professionnels a votre service",
      subtitle:
        "Avocats, notaires, huissiers et agents agrees. Tous verifies et certifies pour vous garantir un service de qualite.",
    },
    {
      badge: "100% Digital",
      title: "Toutes vos demarches en quelques clics",
      subtitle:
        "Acte de naissance, casier judiciaire, immatriculation... Gerez toutes vos procedures depuis votre telephone.",
    },
  ],
  en: [
    {
      badge: "Coming Soon",
      title: "Simplify your administrative procedures",
      subtitle:
        "The first platform connecting Cameroonian citizens with certified experts for all legal and administrative procedures.",
    },
    {
      badge: "Fast & Secure",
      title: "Save time on your procedures",
      subtitle:
        "No more waiting in line for hours. Our experts take care of everything and you track progress in real-time.",
    },
    {
      badge: "Certified Experts",
      title: "Professionals at your service",
      subtitle:
        "Lawyers, notaries, bailiffs and certified agents. All verified and certified to guarantee quality service.",
    },
    {
      badge: "100% Digital",
      title: "All your procedures in a few clicks",
      subtitle: "Birth certificate, criminal record, registration... Manage all your procedures from your phone.",
    },
  ],
}

const translations = {
  fr: {
    cta: "Telecharger l'application",
    learnMore: "En savoir plus",
  },
  en: {
    cta: "Download the App",
    learnMore: "Learn more",
  },
}

export default function Hero({ lang }: { lang: "fr" | "en" }) {
  const t = translations[lang]
  const currentSlides = slides[lang]
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlides.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentSlides.length)
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Carousel */}
          <div className="text-center lg:text-left relative">
            {/* Slides Container */}
            <div className="relative min-h-[320px] md:min-h-[280px]">
              {currentSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === currentIndex
                      ? "opacity-100 translate-x-0"
                      : index < currentIndex
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                  }`}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    {slide.badge}
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
                    {slide.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Arrows & Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-6 mb-8">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {currentSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-base font-medium hover:bg-primary/90 transition-all"
              >
                <Download size={18} />
                {t.cta}
              </a>
              <button
                onClick={() => scrollToSection("features")}
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-base font-medium hover:bg-secondary/80 transition-all"
              >
                {t.learnMore}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Content - App Preview (hidden on mobile) */}
          <div className="hidden lg:flex relative justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-foreground rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-card rounded-[2rem] overflow-hidden aspect-[9/19]">
                  {/* Status Bar */}
                  <div className="bg-primary h-10 flex items-center justify-between px-5">
                    <span className="text-primary-foreground text-xs font-medium">Ma Procedure</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-primary-foreground/30 rounded-full" />
                      <div className="w-3 h-3 bg-primary-foreground/30 rounded-full" />
                    </div>
                  </div>

                  {/* App Content Preview */}
                  <div className="p-4 space-y-3">
                    {/* Search */}
                    <div className="bg-accent rounded-xl p-3">
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>

                    {/* Cards */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-card border border-border rounded-xl p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-foreground/10 rounded w-3/4" />
                            <div className="h-2 bg-muted rounded w-1/2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{lang === "fr" ? "Procedure" : "Procedure"}</p>
                    <p className="text-sm font-semibold text-foreground">{lang === "fr" ? "Completee" : "Complete"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
