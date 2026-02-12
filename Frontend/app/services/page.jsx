import { Header } from "@/components/header"
import Link from "next/link"
import { Compass, GraduationCap, Users, Plane } from "lucide-react"
import { Footer } from "@/components/footer"

export const metadata = {
  title: 'Services | Career Lounge',
  description: 'Explore our comprehensive services including career counselling, educational consultancy, recruitment, and immigration assistance.',
}

const services = [
  {
    icon: Compass,
    title: "Career Counselling",
    description: "Discover your strengths and build a clear career path with personalized guidance and comprehensive assessments.",
    href: "/services/career-counselling",
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
  },
  {
    icon: GraduationCap,
    title: "Educational Consultancy",
    description: "Support for domestic and international education from course selection to university admissions.",
    href: "/services/educational-consultancy",
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop"
  },
  {
    icon: Users,
    title: "Recruitment Services",
    description: "Match talent with opportunities through comprehensive recruitment solutions for job seekers and employers.",
    href: "/services/recruitment",
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
  },
  {
    icon: Plane,
    title: "Immigration Services",
    description: "Expert assistance for visa applications, PR pathways, and settling abroad with confidence.",
    href: "/services/immigration",
    color: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop"
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')"
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/85 dark:bg-background/80 z-10" />
        
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
              What We Do
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
              Our <span className="gradient-text">Core Services</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>
              Click on any service to learn more about how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group"
                  style={{animation: `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s both`}}
                >
                  <div className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-card/80 relative">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('${service.image}')` }}
                      />
                      {/* Gradient overlay on image */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                      {/* Icon overlay */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 relative z-10">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors">
                        {service.description}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        Learn More
                        <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
