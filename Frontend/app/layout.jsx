import React from "react"
import Link from "next/link"
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { BannerProvider } from '@/components/BannerContext'
import WhatsAppButton from '@/components/WhatsAppButton'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://career-lounge.in"),
  title: {
    default: "Career Lounge | Premium Overseas Education & Consultancy Platform",
    template: "%s | Career Lounge"
  },
  description: "Career Lounge offers premier consultancy services for Overseas Education, Visa processing, profile building, and global recruitment options. Partner with experts today.",
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: {
    icon: "/Careerlounge logo (1).png",
    apple: "/Careerlounge logo (1).png"
  },
  openGraph: {
    title: "Career Lounge | Premium Overseas Education & Consultancy",
    description: "Career Lounge offers premier consultancy services for Overseas Education, Visa processing, profile building, and global recruitment options.",
    url: "https://career-lounge.in",
    siteName: "Career Lounge",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Lounge | Premium Overseas Education & Consultancy",
    description: "Your gateway to top international universities, professional profile coaching, and strategic global job search."
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased relative min-h-screen bg-gradient-to-br from-[#020617] via-[#7C3AED] to-[#3B82F6]`}>
        <div className="pointer-events-none fixed -left-[100px] -top-[100px] -z-10 h-[400px] w-[400px] rounded-full bg-[#3B82F6] opacity-20 blur-[120px]" />
        <div className="pointer-events-none fixed -bottom-[100px] -right-[100px] -z-10 h-[400px] w-[400px] rounded-full bg-[#A78BFA] opacity-20 blur-[120px]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_28%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-black/40" />
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
          <BannerProvider>
            <div className="pt-16 md:pt-0">
              {children}
            </div>
            <WhatsAppButton />
          </BannerProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
