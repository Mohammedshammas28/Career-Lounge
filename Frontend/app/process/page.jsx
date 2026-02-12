import { Header } from "@/components/header"
import { ProcessSection } from "@/components/process-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: 'Our Process | Career Lounge',
  description: 'Learn how Career Lounge helps you achieve your career goals through a structured and personalized 4-step process.',
}

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProcessSection />
      <Footer />
    </main>
  )
}
