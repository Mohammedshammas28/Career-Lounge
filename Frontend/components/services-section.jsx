"use client"

import { useState } from "react"
import { Compass, GraduationCap, Users, Plane, ChevronRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const services = [
  {
    icon: Compass,
    title: "Career Counselling",
    description:
      "We help you discover your strengths, align your interests, and build a clear career path through personalized guidance and comprehensive assessments.",
    features: [
      "Personalized one-on-one counselling sessions",
      "Psychometric tests & skill assessments",
      "Career planning for students, graduates & professionals",
    ],
  },
  {
    icon: GraduationCap,
    title: "Educational Consultancy (India & Abroad)",
    description:
      "From selecting the right course to settling in a new country, we support your academic journey every step of the way.",
    features: [
      "University selection (Indian & international institutions)",
      "Application & visa assistance",
      "Scholarship guidance and interview preparation",
    ],
  },
  {
    icon: Users,
    title: "Recruitment Services",
    description:
      "We match the right talent with the right opportunity, offering comprehensive recruitment solutions for both job seekers and employers.",
    features: [
      "Job placement services for freshers & professionals",
      "Resume building & interview coaching",
      "Recruitment support for companies seeking top-tier candidates",
    ],
  },
  {
    icon: Plane,
    title: "Immigration Services",
    description:
      "Thinking of moving abroad? We provide expert assistance to make your international relocation smooth and successful.",
    features: [
      "PR, work visa, and migration consultation",
      "Country-specific immigration support (Canada, Australia, UK, etc.)",
      "Document processing & post-arrival assistance",
    ],
  },
]

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="services" className="py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`mx-auto max-w-2xl text-center mb-16 ${isVisible ? 'scroll-reveal-up' : ''}`}>
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            What We Do
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Our <span className="gradient-text">Core Services</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Service list */}
          <div className="space-y-2">
            {services.map((service, index) => (
              <button
                key={service.title}
                onClick={() => setActiveService(index)}
                style={{animation: `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s both`}}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 border group relative overflow-hidden ${
                  activeService === index
                    ? "bg-card border-primary/50 animate-glow-border shadow-lg scale-105"
                    : "bg-transparent border-border hover:bg-card/50 hover:border-primary/30"
                }`}
              >
                {/* Animated background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transition-all duration-500 ${activeService === index ? 'animate-shimmer' : 'opacity-0 group-hover:opacity-100'}`} />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center transition-all ${
                        activeService === index 
                          ? "bg-primary/20 scale-110 animate-bounce-in shadow-lg shadow-primary/50" 
                          : "bg-secondary group-hover:scale-110 group-hover:bg-primary/10"
                      }`}
                    >
                      <service.icon
                        className={`h-6 w-6 transition-all ${
                          activeService === index 
                            ? "text-primary animate-spin-slow" 
                            : "text-muted-foreground group-hover:text-primary group-hover:animate-wiggle"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold transition-all ${
                        activeService === index 
                          ? "text-foreground animate-pulse-text" 
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 transition-all ${
                      activeService === index
                        ? "text-primary rotate-90 animate-bounce"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Service details */}
          <div className="bg-card border border-border rounded-2xl p-8 lg:sticky lg:top-24 animate-slideInRight group overflow-hidden relative" style={{animation: 'slideInRight 0.6s ease-out 0.3s both'}} >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-blob" />
            
            <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 animate-bounce-in shadow-lg shadow-primary/20 relative z-10" style={{animation: 'bounce-in 0.6s ease-out'}}>
              {(() => {
                const IconComponent = services[activeService].icon
                return <IconComponent className="h-7 w-7 text-primary animate-spin-slow" />
              })()}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 animate-slideInLeft relative z-10" style={{animation: 'slideInLeft 0.6s ease-out 0.1s both'}}>
              {services[activeService].title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 animate-fadeInUp relative z-10" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
              {services[activeService].description}
            </p>
            <div className="space-y-3 relative z-10">
              {services[activeService].features.map((feature, idx) => (
                <div 
                  key={feature} 
                  className="flex items-center gap-3 animate-fadeInUp transition-all hover:translate-x-2 hover:text-primary group/item"
                  style={{animation: `fadeInUp 0.6s ease-out ${0.3 + idx * 0.1}s both`}}
                >
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse group-hover/item:scale-125 transition-transform" />
                  <span className="text-foreground group-hover/item:text-primary transition-colors">{feature}</span>
                </div>
              ))}
            </div>
            <button className="mt-8 text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all hover:translate-x-2 group/btn relative z-10 hover:text-foreground">
              Learn more
              <ChevronRight className="h-4 w-4 group-hover/btn:rotate-90 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
