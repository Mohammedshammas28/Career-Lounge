import Link from "next/link"
import { Linkedin, Twitter, Instagram } from "lucide-react"

export function Footer() {
  const footerLinks = {
    navigation: [
      { name: "Home", href: "/" },
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Process", href: "#process" },
      { name: "Contact", href: "#contact" },
    ],
    services: [
      { name: "Resume Building", href: "#services" },
      { name: "Interview Coaching", href: "#services" },
      { name: "Job Search Strategy", href: "#services" },
      { name: "Career Development", href: "#services" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  }

  const socialLinks = [
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
  ]

  return (
    <footer className="bg-card border-t border-border/50 relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                Career<span className="gradient-text">Lounge</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed hover:text-foreground transition-colors">
              Empowering professionals to achieve their career aspirations.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
            <h3 className="text-sm font-semibold text-foreground mb-4 gradient-text">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link, idx) => (
                <li key={link.name} style={{animation: `fadeInUp 0.6s ease-out ${0.1 + idx * 0.05}s both`}} className="animate-fadeInUp">
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
            <h3 className="text-sm font-semibold text-foreground mb-4 gradient-text">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, idx) => (
                <li key={link.name} style={{animation: `fadeInUp 0.6s ease-out ${0.2 + idx * 0.05}s both`}} className="animate-fadeInUp">
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>
            <h3 className="text-sm font-semibold text-foreground mb-4 gradient-text">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, idx) => (
                <li key={link.name} style={{animation: `fadeInUp 0.6s ease-out ${0.3 + idx * 0.05}s both`}} className="animate-fadeInUp">
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.5s both'}}>
          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {new Date().getFullYear()} Career Lounge. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors gradient-text">
            Dedicated to Careers, Growth & Success.
          </p>
        </div>
      </div>
    </footer>
  )
}
