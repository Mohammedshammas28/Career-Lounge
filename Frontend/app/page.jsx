"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import PremiumOfferSlider from "@/components/university-banner-slider"
import { CountryScrollCards } from "@/components/country-scroll-cards"
import PopularCoursesCarousel from "@/components/popular-courses-carousel"
import TestPreparationCarousel from "@/components/test-preparation-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Premium University Offers Slider */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-background via-purple-900/5 to-slate-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PremiumOfferSlider />
        </div>
      </section>

      <HeroSection />

      <CountryScrollCards />

      <TestPreparationCarousel />

      <PopularCoursesCarousel />

      <Footer />
    </main>
  )
}
