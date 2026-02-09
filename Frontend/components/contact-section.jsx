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

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "m.shammas2k6@gmail.com",
    delay: "0.2s",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 9866708665",
    delay: "0.25s",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Telangana, Hyderabad, India",
    delay: "0.3s",
  },
]

const SERVICE_OPTIONS = [
  { value: "Career Counselling", label: "Career Counselling" },
  { value: "Immigration Services", label: "Immigration Services" },
  { value: "Recruitment Services", label: "Recruitment Services" },
  { value: "Educational Consultancy", label: "Educational Consultancy" },
  { value: "Other", label: "Other" },
]

const FORM_FIELDS = [
  { name: "firstName", label: "First Name", placeholder: "John", delay: "0.4s" },
  { name: "lastName", label: "Last Name", placeholder: "Doe", delay: "0.45s" },
]

function FormField({ label, name, placeholder, value, onChange, delay, isTextarea = false }) {
  const Component = isTextarea ? Textarea : Input
  return (
    <div className="animate-fadeInUp" style={{ animation: `fadeInUp 0.6s ease-out ${delay} both` }}>
      <label htmlFor={name} className="block text-sm font-semibold text-foreground mb-2">
        {label} <span className="text-primary">*</span>
      </label>
      <Component
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-secondary/30 border border-border/60 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all rounded-lg px-4 py-2.5"
        {...(isTextarea && { rows: 5 })}
        required
      />
    </div>
  )
}

function ContactInfoCard({ icon: Icon, title, value, delay }) {
  return (
    <div className="animate-fadeInUp group" style={{ animation: `fadeInUp 0.6s ease-out ${delay} both` }}>
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-2">{title}</h3>
      <p className="text-foreground font-semibold group-hover:text-primary transition-colors">{value}</p>
    </div>
  )
}

function SuccessDialog({ isOpen, onClose, firstName, email }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
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
            <span className="block space-y-2">
              <span className="block text-white font-semibold text-base">
                Thank you, {firstName}!
              </span>
              <span className="block text-white/80 text-sm">
                We&apos;ve received your message and will contact you within 24-48 hours.
              </span>
              <span className="block text-sm text-white/70">
                📧 Confirmation sent to <br /> <span className="font-semibold text-white">{email}</span>
              </span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction 
          onClick={onClose}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-6 font-semibold"
        >
          Done
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Rewritten form component with improved structure
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

  const validateForm = () => {
    const { firstName, lastName, email, message } = formData
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Reset form and show success
      setFormData({ firstName: "", lastName: "", email: "", serviceType: "", message: "" })
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

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">Get in Touch</p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question or ready to take the next step? We&apos;re here to help. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {CONTACT_INFO.map((info) => (
              <ContactInfoCard key={info.title} {...info} />
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 card-gradient border border-border/50 rounded-2xl p-8 lg:p-10 card-hover-lift animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.35s both' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                {FORM_FIELDS.map((field) => (
                  <FormField
                    key={field.name}
                    {...field}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                ))}
              </div>

              {/* Email */}
              <FormField
                name="email"
                label="Email Address"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                delay="0.5s"
              />

              {/* Service Type */}
              <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.55s both' }}>
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
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <FormField
                name="message"
                label="Message"
                placeholder="Tell us about your needs and how we can help..."
                value={formData.message}
                onChange={handleChange}
                delay="0.6s"
                isTextarea
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 text-base animate-fadeInUp hover:shadow-lg hover:scale-[1.02] transition-all" 
                style={{ animation: 'fadeInUp 0.6s ease-out 0.65s both' }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.7s both' }}>
                We respect your privacy. We&apos;ll only use your information to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>

        {/* Success Dialog */}
        <SuccessDialog
          isOpen={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
          firstName={formData.firstName}
          email={formData.email}
        />
      </div>
    </section>
  )
}
