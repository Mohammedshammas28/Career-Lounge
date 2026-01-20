"use client"

import { useState } from "react"
import { Compass, GraduationCap, Users, Plane, ChevronRight } from "lucide-react"

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

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            What We Do
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Our Core Services
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Service list */}
          <div className="space-y-2">
            {services.map((service, index) => (
              <button
                key={service.title}
                onClick={() => setActiveService(index)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 border ${
                  activeService === index
                    ? "bg-card border-primary/50"
                    : "bg-transparent border-border hover:bg-card/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        activeService === index ? "bg-primary/20" : "bg-secondary"
                      }`}
                    >
                      <service.icon
                        className={`h-6 w-6 ${
                          activeService === index ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold ${
                        activeService === index ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      activeService === index
                        ? "text-primary rotate-90"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Service details */}
          <div className="bg-card border border-border rounded-2xl p-8 lg:sticky lg:top-24">
            <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
              {(() => {
                const IconComponent = services[activeService].icon
                return <IconComponent className="h-7 w-7 text-primary" />
              })()}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {services[activeService].title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {services[activeService].description}
            </p>
            <div className="space-y-3">
              {services[activeService].features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <button className="mt-8 text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Learn more
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
