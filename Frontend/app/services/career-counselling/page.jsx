"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Compass, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function CareerCounsellingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&h=1080&fit=crop')"
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            <div className="h-16 w-16 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Compass className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Career <span className="gradient-text">Counselling</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover your strengths, define your goals, and chart a clear path to professional success with expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
              <h2 className="text-3xl font-bold text-foreground mb-6">What is Career Counselling?</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Career counselling is a professional service designed to help you understand yourself better and plan your career trajectory. Whether you're a student exploring options, a graduate starting your career, or a professional looking for a change, our expert counsellors provide personalized guidance tailored to your unique situation.
              </p>
              <p className="text-lg text-muted-foreground">
                We combine psychological assessments, industry insights, and one-on-one mentoring to help you make informed decisions about your professional future.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 animate-slideInRight" style={{animation: 'slideInRight 0.6s ease-out 0.3s both'}}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Key Benefits</h3>
              <div className="space-y-4">
                {[
                  "Clarity on your career goals and aspirations",
                  "Understanding your strengths and skills",
                  "Personalized career roadmap",
                  "Interview preparation and coaching",
                  "Resume optimization guidance",
                  "Ongoing support and mentorship"
                ].map((benefit, idx) => (
                  <div key={benefit} className="flex items-start gap-3 animate-fadeInUp" style={{animation: `fadeInUp 0.6s ease-out ${0.4 + idx * 0.05}s both`}}>
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
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
            backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-card/85 z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">Our Services Include</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "One-on-One Counselling",
                description: "Personalized sessions with our career experts to explore your interests, strengths, and goals in depth."
              },
              {
                title: "Psychometric Tests",
                description: "Comprehensive assessments including aptitude tests, personality profiling, and skill evaluations."
              },
              {
                title: "Career Planning",
                description: "Development of actionable career plans with clear milestones, strategies, and timelines for success."
              },
              {
                title: "Interview Coaching",
                description: "Extensive preparation for interviews including mock sessions, feedback, and confidence building."
              },
              {
                title: "Resume Building",
                description: "Expert guidance on crafting compelling resumes that highlight your strengths and get noticed."
              },
              {
                title: "Ongoing Mentorship",
                description: "Continued support even after landing your role to ensure long-term career success and growth."
              }
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg group"
                style={{animation: `fadeInUp 0.6s ease-out ${0.2 + idx * 0.1}s both`}}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
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
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Transform Your Career?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey toward professional excellence today. Schedule a free consultation call with our career experts.
          </p>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
              Schedule Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="py-16 lg:py-24 bg-card/50 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Explore Our Other Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/services/educational-consultancy" className="group">
              <div className="bg-background border border-border rounded-xl p-6 hover:border-purple-500/50 hover:shadow-lg transition-all hover:scale-105">
                <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.248 6.253 2 10.541 2 15.5S6.248 24.747 12 24.747s10-4.288 10-9.247S17.752 6.253 12 6.253z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Educational Consultancy</h3>
                <p className="text-sm text-muted-foreground">Guidance for domestic and international education</p>
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
