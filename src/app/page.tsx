"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Stats from "@/components/Stats"
import Experts from "@/components/Experts"
import Waitlist from "@/components/Waitlist"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import ScrollToTop from "@/components/Scroll-to-top"

export default function Home() {
  const [lang, setLang] = useState<"fr" | "en">("fr")

  return (
    <main className="min-h-screen bg-background">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Stats lang={lang} />
      <Features lang={lang} />
      <Experts lang={lang} />
      <Waitlist lang={lang} />
      <Footer lang={lang} />
      <WhatsAppButton />
      <ScrollToTop />
    </main>
  )
}
