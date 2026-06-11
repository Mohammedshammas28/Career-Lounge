import { Header } from "@/components/header"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: 'Contact Us | Career Lounge',
  description: 'Get in touch with Career Lounge. Fill out our contact form or reach us directly via email, phone, or visit our office.',
}

export default function ContactPage({ searchParams }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ContactSection searchParams={searchParams} />
      <Footer />
    </main>
  )
}
