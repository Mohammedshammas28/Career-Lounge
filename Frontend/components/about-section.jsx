import { Compass, GraduationCap, Briefcase, Globe } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')" // Match Why Choose Us section
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            About Us
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
            <span className="text-primary">Empowering Careers.</span> Enabling Futures.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-100 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>
            Career Lounge is your trusted partner for professional growth, academic advancement, 
            and global opportunities. We specialize in career counselling, educational consultancy 
            (domestic & international), recruitment, and immigration services—helping individuals 
            navigate life-changing decisions with clarity and confidence.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-100 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.4s both'}}>
            Whether you&apos;re a student planning your future, a job seeker preparing for your next role, 
            or a professional aiming to study or settle abroad, Career Lounge is here to guide you 
            every step of the way.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 group animate-fadeInUp hover:bg-white/20 transition-all" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            <div className="mx-auto h-14 w-14 rounded-lg bg-primary/40 flex items-center justify-center mb-6 group-hover:bg-primary/60 group-hover:scale-110 transition-all">
              <Compass className="h-7 w-7 text-white group-hover:animate-rotate-continuous" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">Career Counselling</h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
              Expert guidance to help you discover your strengths, define your goals, 
              and chart a clear path to professional success.
            </p>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 group animate-fadeInUp hover:bg-white/20 transition-all" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
            <div className="mx-auto h-14 w-14 rounded-lg bg-primary/40 flex items-center justify-center mb-6 group-hover:bg-primary/60 group-hover:scale-110 transition-all">
              <GraduationCap className="h-7 w-7 text-white group-hover:animate-rotate-continuous" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">Educational Consultancy</h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
              Comprehensive support for domestic and international education, 
              from course selection to university admissions.
            </p>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 group animate-fadeInUp hover:bg-white/20 transition-all" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>
            <div className="mx-auto h-14 w-14 rounded-lg bg-primary/40 flex items-center justify-center mb-6 group-hover:bg-primary/60 group-hover:scale-110 transition-all">
              <Briefcase className="h-7 w-7 text-white group-hover:animate-rotate-continuous" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">Recruitment Services</h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
              Connecting talented individuals with the right opportunities 
              and helping organizations find their ideal candidates.
            </p>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 group animate-fadeInUp hover:bg-white/20 transition-all" style={{animation: 'fadeInUp 0.6s ease-out 0.4s both'}}>
            <div className="mx-auto h-14 w-14 rounded-lg bg-primary/40 flex items-center justify-center mb-6 group-hover:bg-primary/60 group-hover:scale-110 transition-all">
              <Globe className="h-7 w-7 text-white group-hover:animate-rotate-continuous" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">Immigration Services</h3>
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
              Professional assistance for visa applications, PR pathways, 
              and settling abroad with confidence and ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
