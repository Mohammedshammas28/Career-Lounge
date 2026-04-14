"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { CoreServicesSlider } from "@/components/core-services-slider"

export default function Home() {


  return (
    <main className="min-h-screen bg-background">
      <Header />
      {/* Gap between Header and banner */}
      <div className="h-10" />
      {/* Core Services Sliding Banner */}
      <div className="w-full flex justify-center items-center py-2 px-4 bg-transparent" id="carousel-banner">
        <div className="w-full max-w-6xl">
          <CoreServicesSlider />
        </div>
      </div>
      {/* Gap between banner and hero section */}
      <div className="h-3" />

      <HeroSection />
      <Footer />
    </main>
  )
}
