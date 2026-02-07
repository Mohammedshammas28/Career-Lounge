export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      description:
        "We start with a complimentary consultation to understand your career goals, challenges, and aspirations.",
    },
    {
      number: "02",
      title: "Personalized Plan",
      description:
        "Based on your unique situation, we create a tailored action plan with clear milestones and timelines.",
    },
    {
      number: "03",
      title: "Implementation",
      description:
        "Work one-on-one with our experts to execute your plan, refining your approach as you progress.",
    },
    {
      number: "04",
      title: "Ongoing Support",
      description:
        "Even after you land your dream role, we provide continued guidance to ensure long-term success.",
    },
  ]

  return (
    <section id="process" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
            A <span className="gradient-text">global approach</span> for your career transformation
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="relative animate-fadeInUp transition-all hover:scale-105 card-gradient rounded-xl p-6 border border-border/50"
              style={{animation: `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s both`}}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent -translate-x-4 animate-slideInRight" style={{animation: `slideInRight 0.8s ease-out ${0.4 + index * 0.1}s both`}} />
              )}
              
              <div className="relative group hover:translate-y-[-4px] transition-transform">
                <span className="text-5xl font-bold text-primary/30 group-hover:text-primary/50 transition-all">{step.number}</span>
                <h3 className="text-xl font-semibold text-foreground mt-4 mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
