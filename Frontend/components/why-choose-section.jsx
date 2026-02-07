"use client"

import { CheckCircle2, Award, Shield, Network } from "lucide-react"

export function WhyChooseSection() {
  const reasons = [
    {
      icon: Award,
      title: "Certified Experts with Real-World Experience",
      description:
        "Our team comprises certified professionals with extensive industry experience, ensuring you receive guidance that's both credible and practical.",
    },
    {
      icon: CheckCircle2,
      title: "End-to-End Support—From Planning to Execution",
      description:
        "We're with you at every stage—from initial planning and strategy to final execution and beyond, providing comprehensive support throughout your journey.",
    },
    {
      icon: Shield,
      title: "Transparent Process with Honest Guidance",
      description:
        "We believe in complete transparency. Our honest, straightforward guidance ensures you make informed decisions with confidence.",
    },
    {
      icon: Network,
      title: "Growing Network of Universities, Employers & Global Partners",
      description:
        "Access our extensive and ever-expanding network of universities, employers, and international partners to unlock more opportunities.",
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            Why Choose <span className="gradient-text">Career Lounge?</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
            We stand out as your trusted partner because we combine certified expertise, 
            complete transparency, and an extensive global network to support your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="relative group animate-fadeInUp card-gradient card-hover-lift"
                style={{animation: `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s both`}}
              >
                <div className="h-full p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all group-hover:scale-125 group-hover:animate-spin-slow">
                    <Icon className="h-6 w-6 text-primary group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 card-gradient border border-border/50 rounded-xl p-8 md:p-12 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.8s both'}}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group cursor-pointer hover:scale-105 transition-transform">
              <div className="text-4xl font-bold gradient-text mb-2 group-hover:animate-bounce transition-all">500+</div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Happy Clients</div>
            </div>
            <div className="group cursor-pointer hover:scale-105 transition-transform">
              <div className="text-4xl font-bold gradient-text mb-2 group-hover:animate-heartbeat transition-all">95%</div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Success Rate</div>
            </div>
            <div className="group cursor-pointer hover:scale-105 transition-transform">
              <div className="text-4xl font-bold gradient-text mb-2 group-hover:animate-spin-slow transition-all">50+</div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Partner Institutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
