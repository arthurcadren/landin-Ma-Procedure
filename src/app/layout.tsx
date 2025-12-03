import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Ma Procédure | Simplifiez vos démarches administratives au Cameroun",
  description:
    "La première plateforme qui connecte les citoyens camerounais aux experts certifiés pour toutes leurs procédures légales et administratives. Rapide, sécurisé et fiable.",
  keywords: ["Cameroun", "démarches administratives", "services juridiques", "experts", "documents"],
}

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
