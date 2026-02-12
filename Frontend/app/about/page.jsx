import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: 'About Us | Career Lounge',
  description: 'Learn about Career Lounge and our mission to empower careers and enable futures through expert guidance and services.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutSection />
      <WhyChooseSection />
      <Footer />
    </main>
  )
}
