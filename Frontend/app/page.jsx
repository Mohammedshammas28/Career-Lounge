import { Header } from "@/components/header"
import { SlidingBanner } from "@/components/sliding-banner"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SlidingBanner />
      <HeroSection />
      <Footer />
    </main>
  )
}
