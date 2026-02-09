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
          
          {/* Right side video/image showcase */}
          <div className="relative animate-slideInRight mt-12 lg:mt-0" style={{animation: 'slideInRight 0.6s ease-out 0.2s both'}}>
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl animate-pulse" />
            <div className="relative">
              {/* Video Container */}
              <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl overflow-hidden border border-primary/30 shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-300 group">
                {/* Video/Image Background */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.1)_75%,rgba(59,130,246,0.1))] bg-[length:40px_40px] animate-pulse" />
                  
                  {/* Play button */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-bounce border-2 border-primary/40">
                      <div className="h-16 w-16 rounded-full bg-primary/30 flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-primary font-semibold text-sm animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>Watch Success Stories</p>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-primary/50 animate-pulse" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full border-2 border-primary/30 animate-pulse" style={{animationDelay: '0.5s'}} />
                </div>

                {/* Info overlay */}
                <div className="bg-card/80 backdrop-blur-sm border-t border-primary/20 p-6 space-y-4 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.35s both'}}>
                  <div>
                    <p className="text-xs font-semibold text-primary tracking-wide uppercase mb-2">Transformational Stories</p>
                    <h3 className="text-lg font-bold text-foreground">From Career Crisis to Success</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    See how professionals like you have transformed their careers with Career Lounge's personalized guidance and expert mentorship.
                  </p>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                    <div className="text-center animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.4s both'}}>
                      <p className="text-lg font-bold text-primary">500+</p>
                      <p className="text-xs text-muted-foreground">Success Stories</p>
                    </div>
                    <div className="text-center animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.45s both'}}>
                      <p className="text-lg font-bold text-primary">4.9★</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="text-center animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.5s both'}}>
                      <p className="text-lg font-bold text-primary">30 min</p>
                      <p className="text-xs text-muted-foreground">Avg. Video</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
