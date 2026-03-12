"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { AnnouncementCarousel } from "@/components/announcement-carousel"

export default function Home() {


  return (
    <main className="min-h-screen bg-background">
      <Header />
      {/* Gap between Header and banner */}
      <div className="h-10" />
      {/* Announcement Carousel Banner */}
      <div className="w-full flex justify-center items-center py-2 px-0 bg-transparent" id="carousel-banner">
        <AnnouncementCarousel />
      </div>
      {/* Gap between banner and hero section */}
      <div className="h-3" />

      <HeroSection />
      <Footer />
    </main>
  )
}
