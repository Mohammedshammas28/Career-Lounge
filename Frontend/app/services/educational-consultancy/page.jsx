"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { GraduationCap, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function EducationalConsultancyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop')"
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white dark:from-black/60 dark:via-black/50 dark:to-background z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            <div className="h-16 w-16 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-purple-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Educational <span className="text-purple-400">Consultancy</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Navigate your academic journey from course selection to university admissions with expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
              <h2 className="text-3xl font-bold text-foreground mb-6">Education for Global Success</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Whether you're planning to study in India or pursue international education, we provide comprehensive support at every step. From selecting the perfect institution to visa processing and post-arrival assistance, we're with you throughout your academic journey.
              </p>
              <p className="text-lg text-muted-foreground">
                Our educational consultants have extensive experience with universities across India, USA, UK, Canada, Australia, and more—ensuring you get the best guidance tailored to your aspirations.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 animate-slideInRight" style={{animation: 'slideInRight 0.6s ease-out 0.3s both'}}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Key Benefits</h3>
              <div className="space-y-4">
                {[
                  "Expert guidance on course and university selection",
                  "Knowledge of top institutions globally",
                  "Application strategy and support",
                  "Visa documentation assistance",
                  "Scholarship and financial aid guidance",
                  "Interview preparation for admission",
                  "Post-arrival orientation and support"
                ].map((benefit, idx) => (
                  <div key={benefit} className="flex items-start gap-3 animate-fadeInUp" style={{animation: `fadeInUp 0.6s ease-out ${0.4 + idx * 0.05}s both`}}>
                    <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop')"
          }}
        />
<div className="absolute inset-0 bg-white/70 dark:bg-card/85 z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">Our Services Include</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Domestic & International",
                description: "Guidance for Indian institutions as well as universities in US, UK, Canada, Australia, and other countries."
              },
              {
                title: "Course Selection",
                description: "Expert advice on choosing the right course based on your interests, career goals, and market demand."
              },
              {
                title: "University Selection",
                description: "Personalized recommendations for universities matching your academic profile and aspirations."
              },
              {
                title: "Application Assistance",
                description: "Complete support with applications, essays, and documentation required by universities."
              },
              {
                title: "Visa Support",
                description: "Guidance on visa requirements, document preparation, and interview coaching for various countries."
              },
              {
                title: "Scholarship Guidance",
                description: "Help identifying and applying for scholarships and financial aid opportunities."
              }
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-purple-500/50 transition-all hover:shadow-lg group"
                style={{animation: `fadeInUp 0.6s ease-out ${0.2 + idx * 0.1}s both`}}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-purple-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Pursue Your Dream Education?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get expert guidance for your educational journey. Schedule a consultation with our education experts today.
          </p>
          <Link href="/contact">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              Consult an Expert <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="py-16 lg:py-24 bg-card/50 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Explore Our Other Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/services/career-counselling" className="group">
              <div className="bg-background border border-border rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg transition-all hover:scale-105">
                <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Career Counselling</h3>
                <p className="text-sm text-muted-foreground">Discover your strengths and build your path</p>
              </div>
            </Link>
            <Link href="/services/recruitment" className="group">
              <div className="bg-background border border-border rounded-xl p-6 hover:border-orange-500/50 hover:shadow-lg transition-all hover:scale-105">
                <div className="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                  <svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Recruitment Services</h3>
                <p className="text-sm text-muted-foreground">Match talent with opportunities</p>
              </div>
            </Link>
            <Link href="/services/immigration" className="group">
              <div className="bg-background border border-border rounded-xl p-6 hover:border-green-500/50 hover:shadow-lg transition-all hover:scale-105">
                <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Immigration Services</h3>
                <p className="text-sm text-muted-foreground">Relocation and settlement abroad</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
