"use client"

const translations = {
  fr: {
    stats: [
      { value: "500+", label: "Experts certifiés" },
      { value: "70%", label: "Plus rapide" },
      { value: "10K+", label: "Démarches réussies" },
      { value: "4.8/5", label: "Note moyenne" },
    ],
  },
  en: {
    stats: [
      { value: "500+", label: "Certified experts" },
      { value: "70%", label: "Faster processing" },
      { value: "10K+", label: "Successful procedures" },
      { value: "4.8/5", label: "Average rating" },
    ],
  },
}

export default function Stats({ lang }: { lang: "fr" | "en" }) {
  const t = translations[lang]

  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
