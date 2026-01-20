import { Compass, GraduationCap, Briefcase, Globe } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            About Us
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Empowering Careers. Enabling Futures.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Career Lounge is your trusted partner for professional growth, academic advancement, 
            and global opportunities. We specialize in career counselling, educational consultancy 
            (domestic & international), recruitment, and immigration services—helping individuals 
            navigate life-changing decisions with clarity and confidence.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Whether you&apos;re a student planning your future, a job seeker preparing for your next role, 
            or a professional aiming to study or settle abroad, Career Lounge is here to guide you 
            every step of the way.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Compass className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Career Counselling</h3>
            <p className="text-muted-foreground leading-relaxed">
              Expert guidance to help you discover your strengths, define your goals, 
              and chart a clear path to professional success.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Educational Consultancy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Comprehensive support for domestic and international education, 
              from course selection to university admissions.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Briefcase className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Recruitment Services</h3>
            <p className="text-muted-foreground leading-relaxed">
              Connecting talented individuals with the right opportunities 
              and helping organizations find their ideal candidates.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Globe className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Immigration Services</h3>
            <p className="text-muted-foreground leading-relaxed">
              Professional assistance for visa applications, PR pathways, 
              and settling abroad with confidence and ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
