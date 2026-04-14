import React from "react"
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { BannerProvider } from '@/components/BannerContext'
import { CoreServicesSlider } from '@/components/core-services-slider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const PRELAUNCH_ONLY = true

export const metadata = {
  title: 'Career Lounge | Elevate Your Professional Journey',
  description: 'Career Lounge helps professionals advance their careers through expert coaching, resume building, and job search strategies.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased relative min-h-screen bg-gradient-to-br from-[#020617] via-[#7C3AED] to-[#3B82F6]`}>
        <div className="pointer-events-none fixed -left-[100px] -top-[100px] -z-10 h-[400px] w-[400px] rounded-full bg-[#3B82F6] opacity-20 blur-[120px]" />
        <div className="pointer-events-none fixed -bottom-[100px] -right-[100px] -z-10 h-[400px] w-[400px] rounded-full bg-[#A78BFA] opacity-20 blur-[120px]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-black/40" />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BannerProvider>
            {PRELAUNCH_ONLY ? (
              <main className="flex min-h-screen w-full items-center justify-center">
                <CoreServicesSlider />
              </main>
            ) : (
              <div className="pt-24 md:pt-0">
                {children}
              </div>
            )}
          </BannerProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
