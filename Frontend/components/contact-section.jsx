"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        role: "",
        message: "",
      })

      toast({
        title: "Success",
        description: "Thank you for reaching out! We'll get back to you soon.",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <div>
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
              Contact
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance mb-6 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
              Ask us <span className="gradient-text">anything</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>
              Are you a professional seeking career guidance, or a company looking to scale? 
              A creative mind, a strategist, a coach, or simply inspired by what we&apos;re building? 
              Let&apos;s connect.
            </p>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mb-12 animate-fadeInUp hover:scale-105 transition-transform" style={{animation: 'fadeInUp 0.6s ease-out 0.4s both'}}>
              Get In Touch
            </Button>

            <div className="space-y-6">
              <div className="flex items-center gap-4 animate-fadeInUp group cursor-pointer" style={{animation: 'fadeInUp 0.6s ease-out 0.45s both'}}>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Mail className="h-5 w-5 text-primary group-hover:animate-spin-slow" />
                </div>
                <div className="group-hover:translate-x-2 transition-transform">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">m.shammas2k6@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 animate-fadeInUp group cursor-pointer" style={{animation: 'fadeInUp 0.6s ease-out 0.50s both'}}>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Phone className="h-5 w-5 text-primary group-hover:animate-bounce" />
                </div>
                <div className="group-hover:translate-x-2 transition-transform">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">+91 9866708665</p>
                </div>
              </div>
              <div className="flex items-center gap-4 animate-fadeInUp group cursor-pointer" style={{animation: 'fadeInUp 0.6s ease-out 0.55s both'}}>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <MapPin className="h-5 w-5 text-primary group-hover:animate-float" />
                </div>
                <div className="group-hover:translate-x-2 transition-transform">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">telangana,Hyderabad,India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="card-gradient border border-border/50 rounded-2xl p-8 card-hover-lift animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.4s both'}}>
            <h3 className="text-xl font-semibold text-foreground mb-2 gradient-text">
              Ready to experience our services?
            </h3>
            <p className="text-muted-foreground mb-8">Let&apos;s start planning.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 animate-stagger-container">
                <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.5s both'}}>
                  <label htmlFor="firstName" className="block text-sm text-muted-foreground mb-2 font-medium">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-secondary/50 border-border hover:border-primary/50 focus:border-primary transition-colors"
                    required
                  />
                </div>
                <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.55s both'}}>
                  <label htmlFor="lastName" className="block text-sm text-muted-foreground mb-2 font-medium">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-secondary/50 border-border hover:border-primary/50 focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.6s both'}}>
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2 font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-secondary/50 border-border hover:border-primary/50 focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 animate-stagger-container">
                <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.65s both'}}>
                  <label htmlFor="organization" className="block text-sm text-muted-foreground mb-2 font-medium">
                    Organization
                  </label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="bg-secondary/50 border-border hover:border-primary/50 focus:border-primary transition-colors"
                  />
                </div>
                <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.7s both'}}>
                  <label htmlFor="role" className="block text-sm text-muted-foreground mb-2 font-medium">
                    Role
                  </label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-secondary/50 border-border hover:border-primary/50 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.75s both'}}>
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2 font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-secondary/50 border-border hover:border-primary/50 focus:border-primary transition-colors resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed animate-fadeInUp hover:scale-105 transition-transform" 
                style={{animation: 'fadeInUp 0.6s ease-out 0.8s both'}}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
