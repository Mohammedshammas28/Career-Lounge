import { Header } from "@/components/header"
import { ProcessSection } from "@/components/process-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: 'How It Works | Career Lounge',
  description: 'Discover our proven process to help you transform your career with expert guidance and support.',
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProcessSection />
      <Footer />
    </main>
  )
}
