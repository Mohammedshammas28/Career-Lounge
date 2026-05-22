"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { PremiumOffersSlider } from "@/components/premium-offers-slider"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Premium Offers Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PremiumOffersSlider />
        </div>
      </section>

      <HeroSection />
      <Footer />
    </main>
  )
}
