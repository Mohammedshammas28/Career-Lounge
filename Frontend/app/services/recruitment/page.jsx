"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Users, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function RecruitmentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop')"
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/60 via-black/50 to-background z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            <div className="h-16 w-16 rounded-xl bg-orange-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-orange-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Recruitment <span className="text-orange-400">Services</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Connecting exceptional talent with the right opportunities for mutual success.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
              <h2 className="text-3xl font-bold text-foreground mb-6">Bridge Talent with Opportunity</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Our recruitment services are designed to help job seekers find roles that match their skills and aspirations, while helping employers identify the perfect candidates for their organizations. We understand that every placement is a relationship that should benefit both parties.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're a fresher stepping into the professional world or an experienced professional seeking new challenges, we have the expertise and networks to help you succeed.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 animate-slideInRight" style={{animation: 'slideInRight 0.6s ease-out 0.3s both'}}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Key Benefits</h3>
              <div className="space-y-4">
                {[
                  "Access to exclusive job opportunities",
                  "Professional resume building and optimization",
                  "Interview coaching and preparation",
                  "Salary negotiation guidance",
                  "Career transition support",
                  "Placement with best-fit companies",
                  "Post-placement support and guidance"
                ].map((benefit, idx) => (
                  <div key={benefit} className="flex items-start gap-3 animate-fadeInUp" style={{animation: `fadeInUp 0.6s ease-out ${0.4 + idx * 0.05}s both`}}>
                    <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
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
            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-card/85 z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">Our Services Include</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Job Placement",
                description: "Placement services for freshers and experienced professionals across various industries and sectors."
              },
              {
                title: "Resume Building",
                description: "Expert assistance in creating compelling resumes that showcase your skills and achievements effectively."
              },
              {
                title: "Interview Coaching",
                description: "Comprehensive interview preparation including mock interviews, tips, and personalized feedback."
              },
              {
                title: "Career Transition",
                description: "Support for professionals looking to switch industries or roles with strategic guidance and planning."
              },
              {
                title: "Employer Connections",
                description: "Direct connections with leading companies seeking talented professionals in your field."
              },
              {
                title: "Recruitment Support",
                description: "For employers: comprehensive recruitment solutions to find and hire top-tier candidates."
              }
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-orange-500/50 transition-all hover:shadow-lg group"
                style={{animation: `fadeInUp 0.6s ease-out ${0.2 + idx * 0.1}s both`}}
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-orange-500 transition-colors">
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
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Find Your Perfect Role?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you land your dream job. Connect with our recruitment specialists today.
          </p>
          <Link href="/contact">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg">
              Connect with Us <ArrowRight className="ml-2 h-5 w-5" />
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
