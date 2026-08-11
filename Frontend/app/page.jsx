"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import PremiumOfferSlider from "@/components/university-banner-slider"
import { CountryScrollCards } from "@/components/country-scroll-cards"
import PopularCoursesCarousel from "@/components/popular-courses-carousel"
import TestPreparationCarousel from "@/components/test-preparation-carousel"
import CareerGuidanceCarousel from "@/components/career-guidance-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Premium University Offers Slider */}
      <PremiumOfferSlider />

      <HeroSection />

      <CareerGuidanceCarousel />

      <TestPreparationCarousel />

      <CountryScrollCards />

      <PopularCoursesCarousel />

      <Footer />
    </main>
  )
}
