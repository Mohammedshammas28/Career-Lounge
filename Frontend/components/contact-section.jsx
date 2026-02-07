"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    serviceType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
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
        serviceType: "",
        message: "",
      })

      // Show success dialog
      setShowSuccessDialog(true)
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
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.1s both'}}>
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            Get in Touch
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or ready to take the next step? We&apos;re here to help. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-1 space-y-8">
            <div className="animate-fadeInUp group" style={{animation: 'fadeInUp 0.6s ease-out 0.2s both'}}>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Email</h3>
              <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                m.shammas2k6@gmail.com
              </p>
            </div>

            <div className="animate-fadeInUp group" style={{animation: 'fadeInUp 0.6s ease-out 0.25s both'}}>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Phone</h3>
              <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                +91 9866708665
              </p>
            </div>

            <div className="animate-fadeInUp group" style={{animation: 'fadeInUp 0.6s ease-out 0.3s both'}}>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Location</h3>
              <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                Telangana, Hyderabad, India
              </p>
            </div>
          </div>

          {/* Form - Right Side */}
          <div className="lg:col-span-2 card-gradient border border-border/50 rounded-2xl p-8 lg:p-10 card-hover-lift animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.35s both'}}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.4s both'}}>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
                    First Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-secondary/30 border-border/60 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
                <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.45s both'}}>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-2">
                    Last Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-secondary/30 border-border/60 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.5s both'}}>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address <span className="text-primary">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-secondary/30 border-border/60 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              {/* Service Type */}
              <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.55s both'}}>
                <label htmlFor="serviceType" className="block text-sm font-semibold text-foreground mb-2">
                  Select Service <span className="text-primary">*</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full bg-secondary/30 border border-border/60 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all rounded-lg px-4 py-2.5 text-foreground font-medium"
                  required
                >
                  <option value="">Choose a service...</option>
                  <option value="Career Counselling">Career Counselling</option>
                  <option value="Immigration Services">Immigration Services</option>
                  <option value="Recruitment Services">Recruitment Services</option>
                  <option value="Educational Consultancy">Educational Consultancy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.6s both'}}>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your needs and how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="bg-secondary/30 border-border/60 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none font-medium"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 text-base animate-fadeInUp hover:shadow-lg hover:scale-[1.02] transition-all" 
                style={{animation: 'fadeInUp 0.6s ease-out 0.65s both'}}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center animate-fadeInUp" style={{animation: 'fadeInUp 0.6s ease-out 0.7s both'}}>
                We respect your privacy. We&apos;ll only use your information to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>

        {/* Success Dialog */}
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent className="bg-black border-primary/40 max-w-md shadow-2xl">
            <AlertDialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center animate-bounce-in shadow-lg">
                  <span className="text-3xl text-white">✓</span>
                </div>
              </div>
              <AlertDialogTitle className="text-2xl text-center text-white font-bold">
                Message Received!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center mt-4">
                <div className="space-y-2">
                  <div className="text-white font-semibold text-base">
                    Thank you, {formData.firstName}!
                  </div>
                  <div className="text-white/80 text-sm">
                    We&apos;ve received your message and will contact you within 24-48 hours.
                  </div>
                  <div className="text-sm text-white/70">
                    📧 Confirmation sent to <br/> <span className="font-semibold text-white">{formData.email}</span>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogAction 
              onClick={() => setShowSuccessDialog(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-6 font-semibold"
            >
              Done
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  )
}
