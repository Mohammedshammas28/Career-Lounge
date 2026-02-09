"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background animate-pulse" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4 animate-slideInLeft" style={{animation: 'slideInLeft 0.6s ease-out 0.1s both'}}>
              Your Career Partner
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance animate-slideInLeft" style={{animation: 'slideInLeft 0.6s ease-out 0.2s both'}}>
              Where ambition meets{" "}
              <span className="text-primary inline-block animate-float">opportunity</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-slideInLeft" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>
              We help professionals navigate their career journey with expert coaching, 
              strategic guidance, and personalized support. Transform your potential into success.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slideInLeft" style={{animation: 'fadeInUp 0.6s ease-out 0.4s both'}}>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 transition-all hover:shadow-lg hover:scale-105"
                onClick={handleScrollToContact}
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent transition-all hover:shadow-lg hover:scale-105">
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8 animate-slideInLeft" style={{animation: 'fadeInUp 0.6s ease-out 0.5s both'}}>
              <div className="transition-all hover:scale-110 hover:text-primary">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Careers Launched</p>
              </div>
              <div className="transition-all hover:scale-110 hover:text-primary">
                <p className="text-3xl font-bold text-primary">95%</p>
                <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
              </div>
              <div className="transition-all hover:scale-110 hover:text-primary">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Industry Partners</p>
              </div>
            </div>
          </div>
          
          {/* Right side decorative element */}
          <div className="hidden lg:block relative animate-slideInRight" style={{animation: 'slideInRight 0.6s ease-out 0.2s both'}}>
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl animate-pulse" />
            <div className="relative bg-card border border-border rounded-2xl p-8 space-y-6 transition-all hover:shadow-xl hover:border-primary/50">
              <div className="flex items-center gap-4 transition-transform hover:translate-x-1">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center animate-float">
                  <span className="text-primary font-bold">CL</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Career Lounge</p>
                  <p className="text-sm text-muted-foreground">Professional Development</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-3 bg-secondary rounded-full w-full animate-shimmer" style={{animation: 'slideInLeft 0.6s ease-out 0.3s both'}} />
                <div className="h-3 bg-secondary rounded-full w-4/5 animate-shimmer" style={{animation: 'slideInLeft 0.6s ease-out 0.4s both'}} />
                <div className="h-3 bg-secondary rounded-full w-3/5 animate-shimmer" style={{animation: 'slideInLeft 0.6s ease-out 0.5s both'}} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-secondary rounded-lg p-4 transition-all hover:bg-primary/20 hover:scale-105">
                  <p className="text-xs text-muted-foreground">Resume Score</p>
                  <p className="text-2xl font-bold text-primary">92%</p>
                </div>
                <div className="bg-secondary rounded-lg p-4 transition-all hover:bg-primary/20 hover:scale-105">
                  <p className="text-xs text-muted-foreground">Interview Ready</p>
                  <p className="text-2xl font-bold text-primary">Yes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
