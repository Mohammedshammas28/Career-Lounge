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
          
          {/* Right side CTA card with images */}
          <div className="hidden lg:block relative animate-slideInRight" style={{animation: 'slideInRight 0.6s ease-out 0.2s both'}}>
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-card to-card/80 border border-primary/30 rounded-2xl p-8 space-y-6 transition-all hover:shadow-2xl hover:border-primary/50 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-0" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-0" />
              
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 text-primary font-bold text-lg animate-bounce">
                  🚀
                </div>
                <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Transform Your Career?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Join thousands of professionals who have successfully launched their dream careers with Career Lounge.
                  </p>
                </div>
              </div>

              {/* Visual showcase grid */}
              <div className="relative z-10 grid grid-cols-2 gap-3 pt-4">
                <div className="bg-primary/10 rounded-lg p-4 text-center hover:bg-primary/20 transition-all group animate-fadeInUp hover:scale-105 hover:shadow-lg" style={{animation: 'fadeInUp 0.6s ease-out 0.4s both'}}>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform animate-pulse" style={{animationDelay: '0s'}}>👥</div>
                  <p className="text-xs font-semibold text-foreground">Expert Mentors</p>
                  <p className="text-xs text-muted-foreground mt-1">Industry leaders</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center hover:bg-primary/20 transition-all group animate-fadeInUp hover:scale-105 hover:shadow-lg" style={{animation: 'fadeInUp 0.6s ease-out 0.45s both'}}>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform animate-pulse" style={{animationDelay: '0.2s'}}>📈</div>
                  <p className="text-xs font-semibold text-foreground">95% Success</p>
                  <p className="text-xs text-muted-foreground mt-1">Track record</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center hover:bg-primary/20 transition-all group animate-fadeInUp hover:scale-105 hover:shadow-lg" style={{animation: 'fadeInUp 0.6s ease-out 0.5s both'}}>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform animate-pulse" style={{animationDelay: '0.4s'}}>⏱️</div>
                  <p className="text-xs font-semibold text-foreground">Quick Support</p>
                  <p className="text-xs text-muted-foreground mt-1">24-48 hrs</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center hover:bg-primary/20 transition-all group animate-fadeInUp hover:scale-105 hover:shadow-lg" style={{animation: 'fadeInUp 0.6s ease-out 0.55s both'}}>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform animate-pulse" style={{animationDelay: '0.6s'}}>🎯</div>
                  <p className="text-xs font-semibold text-foreground">Guaranteed</p>
                  <p className="text-xs text-muted-foreground mt-1">Results</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative z-10 pt-4 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.6s both'}}>
                <button
                  onClick={handleScrollToContact}
                  className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  Start Your Journey Today
                </button>
                <p className="text-xs text-muted-foreground text-center mt-3 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.65s both'}}>✓ Free consultation included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
