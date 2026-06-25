"use client"

import { useState, useEffect, useRef } from "react"
import { parsePhoneNumberFromString } from "libphonenumber-js"
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
import { Mail, Phone, MapPin, CheckCircle2, ShieldAlert, Sparkles, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "info@career-lounge.in",
    delay: "0.2s",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 7396460717",
    delay: "0.25s",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Near Pillar No. 204, Attapur, Hyderabad",
    delay: "0.3s",
  },
]

// Top countries first, then alphabetical
const COUNTRY_CODES = [
  { name: "India",          dialCode: "+91",  iso: "IN",  flag: "🇮🇳" },
  { name: "United States",  dialCode: "+1",   iso: "US",  flag: "🇺🇸" },
  { name: "United Kingdom", dialCode: "+44",  iso: "GB",  flag: "🇬🇧" },
  { name: "Canada",         dialCode: "+1",   iso: "CA",  flag: "🇨🇦" },
  { name: "Australia",      dialCode: "+61",  iso: "AU",  flag: "🇦🇺" },
  { name: "UAE",            dialCode: "+971", iso: "AE",  flag: "🇦🇪" },
  { name: "Saudi Arabia",   dialCode: "+966", iso: "SA",  flag: "🇸🇦" },
  { name: "Pakistan",       dialCode: "+92",  iso: "PK",  flag: "🇵🇰" },
  { name: "Bangladesh",     dialCode: "+880", iso: "BD",  flag: "🇧🇩" },
  { name: "Sri Lanka",      dialCode: "+94",  iso: "LK",  flag: "🇱🇰" },
  { name: "Nepal",          dialCode: "+977", iso: "NP",  flag: "🇳🇵" },
  { name: "Germany",        dialCode: "+49",  iso: "DE",  flag: "🇩🇪" },
  { name: "France",         dialCode: "+33",  iso: "FR",  flag: "🇫🇷" },
  { name: "Italy",          dialCode: "+39",  iso: "IT",  flag: "🇮🇹" },
  { name: "Spain",          dialCode: "+34",  iso: "ES",  flag: "🇪🇸" },
  { name: "Netherlands",    dialCode: "+31",  iso: "NL",  flag: "🇳🇱" },
  { name: "Sweden",         dialCode: "+46",  iso: "SE",  flag: "🇸🇪" },
  { name: "Norway",         dialCode: "+47",  iso: "NO",  flag: "🇳🇴" },
  { name: "Denmark",        dialCode: "+45",  iso: "DK",  flag: "🇩🇰" },
  { name: "Finland",        dialCode: "+358", iso: "FI",  flag: "🇫🇮" },
  { name: "Ireland",        dialCode: "+353", iso: "IE",  flag: "🇮🇪" },
  { name: "New Zealand",    dialCode: "+64",  iso: "NZ",  flag: "🇳🇿" },
  { name: "Singapore",      dialCode: "+65",  iso: "SG",  flag: "🇸🇬" },
  { name: "Malaysia",       dialCode: "+60",  iso: "MY",  flag: "🇲🇾" },
  { name: "Philippines",    dialCode: "+63",  iso: "PH",  flag: "🇵🇭" },
  { name: "Indonesia",      dialCode: "+62",  iso: "ID",  flag: "🇮🇩" },
  { name: "Thailand",       dialCode: "+66",  iso: "TH",  flag: "🇹🇭" },
  { name: "Vietnam",        dialCode: "+84",  iso: "VN",  flag: "🇻🇳" },
  { name: "China",          dialCode: "+86",  iso: "CN",  flag: "🇨🇳" },
  { name: "Japan",          dialCode: "+81",  iso: "JP",  flag: "🇯🇵" },
  { name: "South Korea",    dialCode: "+82",  iso: "KR",  flag: "🇰🇷" },
  { name: "South Africa",   dialCode: "+27",  iso: "ZA",  flag: "🇿🇦" },
  { name: "Nigeria",        dialCode: "+234", iso: "NG",  flag: "🇳🇬" },
  { name: "Kenya",          dialCode: "+254", iso: "KE",  flag: "🇰🇪" },
  { name: "Ghana",          dialCode: "+233", iso: "GH",  flag: "🇬🇭" },
  { name: "Ethiopia",       dialCode: "+251", iso: "ET",  flag: "🇪🇹" },
  { name: "Egypt",          dialCode: "+20",  iso: "EG",  flag: "🇪🇬" },
  { name: "Qatar",          dialCode: "+974", iso: "QA",  flag: "🇶🇦" },
  { name: "Kuwait",         dialCode: "+965", iso: "KW",  flag: "🇰🇼" },
  { name: "Bahrain",        dialCode: "+973", iso: "BH",  flag: "🇧🇭" },
  { name: "Oman",           dialCode: "+968", iso: "OM",  flag: "🇴🇲" },
  { name: "Jordan",         dialCode: "+962", iso: "JO",  flag: "🇯🇴" },
  { name: "Turkey",         dialCode: "+90",  iso: "TR",  flag: "🇹🇷" },
  { name: "Brazil",         dialCode: "+55",  iso: "BR",  flag: "🇧🇷" },
  { name: "Mexico",         dialCode: "+52",  iso: "MX",  flag: "🇲🇽" },
  { name: "Argentina",      dialCode: "+54",  iso: "AR",  flag: "🇦🇷" },
  { name: "Colombia",       dialCode: "+57",  iso: "CO",  flag: "🇨🇴" },
  { name: "Russia",         dialCode: "+7",   iso: "RU",  flag: "🇷🇺" },
]

const SERVICE_OPTIONS = [
  { value: "Study Abroad Consultation", label: "Study Abroad Consultation" },
  { value: "University Admissions", label: "University Admissions" },
  { value: "Visa Assistance", label: "Visa Assistance" },
  { value: "Scholarship Guidance", label: "Scholarship Guidance" },
  { value: "Career Counselling", label: "Career Counselling" },
  { value: "Profile Building", label: "Profile Building" },
  { value: "Application Support", label: "Application Support" },
  { value: "Education Loan Assistance", label: "Education Loan Assistance" },
  { value: "Other", label: "Other" },
]

function SuccessDialog({ isOpen, onClose, fullName, email }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="p-0 overflow-hidden border-0 shadow-2xl max-w-md rounded-3xl bg-transparent">
        {/* Full gradient card */}
        <div className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-3xl overflow-hidden">

          {/* Glowing orbs */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-700/10 rounded-full blur-2xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 px-8 pt-10 pb-8 text-center">

            {/* Animated check circle */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer pulse ring */}
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                {/* Middle glow ring */}
                <div className="absolute inset-1 rounded-full bg-emerald-400/10 blur-sm" />
                {/* Icon container */}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.5)]">
                  <CheckCircle2 className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Stars decoration */}
            <div className="flex justify-center gap-1 mb-4">
              {["⭐","⭐","⭐","⭐","⭐"].map((s, i) => (
                <span key={i} className="text-sm" style={{ animationDelay: `${i * 0.1}s` }}>{s}</span>
              ))}
            </div>

            {/* Title */}
            <AlertDialogHeader className="space-y-0 pb-0">
              <AlertDialogTitle className="text-2xl font-black text-white tracking-tight mb-1">
                🎉 Submission Confirmed!
              </AlertDialogTitle>

              <AlertDialogDescription className="text-center space-y-4" asChild>
                <div>
                  {/* Thank you message */}
                  <div className="mt-4 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <p className="text-white font-semibold text-base">
                      Thank you, {fullName || "there"}!
                    </p>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                      Your inquiry has been received. Our expert advisors will get back to you shortly.
                    </p>
                  </div>

                  {/* Email badge */}
                  <div className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-400/20 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">📧</span>
                    </div>
                    <p className="text-emerald-300 text-xs font-medium">
                      Confirmation sent to{" "}
                      <span className="text-white font-bold">{email || "your email"}</span>
                    </p>
                  </div>

                  {/* Info chips */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      { icon: "⚡", label: "24hr Response" },
                      { icon: "🔒", label: "Secure & Private" },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <span className="text-sm">{icon}</span>
                        <span className="text-slate-300 text-xs font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* CTA Button */}
            <AlertDialogAction
              onClick={onClose}
              className="mt-7 w-full h-12 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_28px_rgba(139,92,246,0.6)] transition-all duration-300 border-0"
            >
              ✨ Explore More Opportunities
            </AlertDialogAction>

            {/* Footer note */}
            <p className="mt-4 text-slate-500 text-xs">
              Questions? Call us at{" "}
              <span className="text-violet-400 font-semibold">+91 7396460717</span>
            </p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export function ContactSection({ searchParams }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    service: "",
    message: ""
  })

  // Phone dial code + raw number state
  const [phoneDialCode, setPhoneDialCode] = useState("+91")  // Default: India
  const [phoneIso, setPhoneIso] = useState("IN")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneError, setPhoneError] = useState("")

  // OTP State (Email only)
  const [emailOtp, setEmailOtp] = useState("")
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false)
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false)

  // Email OTP Cooldown
  const [emailCooldown, setEmailCooldown] = useState(0)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const { toast } = useToast()

  // Cooldown Timer Effect
  useEffect(() => {
    let emailTimer;
    if (emailCooldown > 0) {
      emailTimer = setTimeout(() => setEmailCooldown(emailCooldown - 1), 1000);
    }
    return () => clearTimeout(emailTimer);
  }, [emailCooldown]);

  // Smart Prefilling Logic
  useEffect(() => {
    if (typeof window === "undefined") return;

    let initialMessage = "";
    const university = searchParams?.university;
    const course = searchParams?.course;
    const jobTitle = searchParams?.jobTitle;

    if (university) {
      initialMessage = `I am interested in applying to ${university}${course ? ` for the ${course} program` : ""}. Please provide details.`;
    } else if (course) {
      initialMessage = `I am interested in enquiring about the ${course} program.`;
    } else if (jobTitle) {
      initialMessage = `I am interested in applying for the ${jobTitle} position.`;
    }

    setFormData(prev => ({
      ...prev,
      service: searchParams?.service || "",
      message: prev.message || initialMessage
    }))
  }, [searchParams]);

  const validateBaseFields = () => {
    const { fullName, email, phone, country, service, message } = formData
    if (!fullName.trim() || !email.trim() || !phone.trim() || !country.trim() || !service || !message.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields first before requesting verification.",
        variant: "destructive"
      })
      return false
    }
    return true
  }

  const handleSendEmailOtp = async () => {
    if (!formData.email || !formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive"
      });
      return;
    }
    setIsSendingEmailOtp(true);

    try {
      const response = await fetch("/api/contact/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send code");

      setEmailOtpSent(true);
      setEmailCooldown(60); // 60s cooldown for resend
      toast({
        title: data.devOtp ? `📧 Dev Mode — Your OTP: ${data.devOtp}` : "OTP Sent",
        description: data.devOtp
          ? `Email service is in test mode. Enter the code above to verify.`
          : "6-digit verification code sent to your email address.",
        className: "bg-green-50 text-green-950 border-green-200",
        duration: data.devOtp ? 30000 : 5000,
      });
    } catch (error) {
      toast({
        title: "Send Failed",
        description: error.message || "Could not send OTP. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailOtp || emailOtp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }
    setIsVerifyingEmailOtp(true);

    try {
      const response = await fetch("/api/contact/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: emailOtp })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Incorrect OTP code");

      setEmailVerified(true);
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
        className: "bg-green-50 text-green-950 border-green-200"
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify. Please check the code.",
        variant: "destructive"
      });
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };


  const validatePhoneForCountry = (dialCode, iso, rawNumber) => {
    if (!rawNumber.trim()) return ""
    const fullNumber = dialCode + rawNumber.replace(/^0+/, "").replace(/[\s\-()]/g, "")
    try {
      const parsed = parsePhoneNumberFromString(fullNumber, iso)
      if (!parsed || !parsed.isValid()) {
        return `Invalid number for ${COUNTRY_CODES.find(c => c.iso === iso)?.name || iso}. Please enter the correct number.`
      }
      // Check country code matches selected country
      if (parsed.country && parsed.country !== iso) {
        const enteredCountry = COUNTRY_CODES.find(c => c.iso === parsed.country)
        const selectedCountry = COUNTRY_CODES.find(c => c.iso === iso)
        return `This looks like a ${enteredCountry?.name || parsed.country} number, but you selected ${selectedCountry?.name || iso}. Please enter the correct number or change the country code.`
      }
      return ""
    } catch {
      return "Invalid phone number format."
    }
  }

  const handlePhoneCountryChange = (e) => {
    const selected = COUNTRY_CODES.find(c => c.iso === e.target.value)
    if (!selected) return
    setPhoneDialCode(selected.dialCode)
    setPhoneIso(selected.iso)
    const error = validatePhoneForCountry(selected.dialCode, selected.iso, phoneNumber)
    setPhoneError(error)
    const fullPhone = phoneNumber.trim() ? selected.dialCode + phoneNumber.replace(/^0+/, "").replace(/[\s\-()]/g, "") : ""
    setFormData(prev => ({ ...prev, phone: fullPhone }))
  }

  const handlePhoneNumberChange = (e) => {
    const raw = e.target.value
    setPhoneNumber(raw)
    const error = validatePhoneForCountry(phoneDialCode, phoneIso, raw)
    setPhoneError(error)
    const fullPhone = raw.trim() ? phoneDialCode + raw.replace(/^0+/, "").replace(/[\s\-()]/g, "") : ""
    setFormData(prev => ({ ...prev, phone: fullPhone }))
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!emailVerified) {
      toast({
        title: "Email Verification Required",
        description: "Please verify your email address before submitting.",
        variant: "destructive",
      })
      return;
    }

    // Validate phone before submitting
    const phoneValidationError = validatePhoneForCountry(phoneDialCode, phoneIso, phoneNumber)
    if (phoneValidationError) {
      setPhoneError(phoneValidationError)
      toast({
        title: "Invalid Phone Number",
        description: phoneValidationError,
        variant: "destructive",
      })
      return;
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }

      setShowSuccessDialog(true)
      
      // Reset Form State
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        service: "",
        message: ""
      })
      setEmailOtp("")
      setEmailOtpSent(false)
      setEmailVerified(false)
      setPhoneNumber("")
      setPhoneDialCode("+91")
      setPhoneIso("IN")
      setPhoneError("")
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }  return (
    <section id="contact" className="pt-36 pb-24 lg:pt-44 lg:pb-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Visual background enhancements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-30">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">Get in Touch</p>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about studies abroad or career pathways? Verify your credentials and reach our advisors instantly.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16 items-start">
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            {CONTACT_INFO.map((info) => (
              <div key={info.value} className="p-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl flex gap-4 items-center group hover:border-primary/30 transition-all duration-300 shadow-sm dark:shadow-none">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-bold">{info.title}</h4>
                  <p className="text-foreground font-semibold mt-1 text-sm">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Form Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 lg:p-10 shadow-xl dark:shadow-2xl relative">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> SECURE FORM
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name <span className="text-primary">*</span>
                </label>
                <Input
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 focus:border-primary text-foreground rounded-lg h-11"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Address & Verification */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-foreground">
                  Email Address <span className="text-primary">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 focus:border-primary text-foreground rounded-lg h-11 flex-1"
                    required
                    disabled={emailVerified || emailOtpSent}
                  />
                  {!emailVerified && (
                    <Button
                      type="button"
                      onClick={handleSendEmailOtp}
                      disabled={isSendingEmailOtp || emailCooldown > 0 || !formData.email || emailVerified}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold px-4 rounded-lg min-w-[130px] disabled:opacity-50"
                    >
                      {isSendingEmailOtp ? "Sending..." : emailCooldown > 0 ? `Resend (${emailCooldown}s)` : "Send OTP"}
                    </Button>
                  )}
                  {emailVerified && (
                    <div className="flex items-center gap-1.5 px-4 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Verified
                    </div>
                  )}
                </div>

                {/* Email OTP Verification Input */}
                {emailOtpSent && !emailVerified && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex gap-2 items-center animate-fadeIn">
                    <Input
                      placeholder="Enter 6-digit Email OTP"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value.slice(0, 6))}
                      className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-foreground text-center font-bold tracking-widest text-lg h-11 flex-1"
                      maxLength={6}
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyEmailOtp}
                      disabled={isVerifyingEmailOtp || emailOtp.length !== 6}
                      className="bg-green-600 hover:bg-green-700 text-white h-11 font-semibold px-5 rounded-lg"
                    >
                      {isVerifyingEmailOtp ? "Verifying..." : "Verify"}
                    </Button>
                  </div>
                )}
              </div>

              {/* Mobile Number with Country Code */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Mobile Number <span className="text-primary">*</span>
                </label>
                <div className="flex gap-2">
                  {/* Country Code Dropdown */}
                  <div className="relative flex-shrink-0">
                    <select
                      value={phoneIso}
                      onChange={handlePhoneCountryChange}
                      disabled={isSubmitting}
                      className="appearance-none h-11 pl-3 pr-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-foreground text-sm font-semibold focus:border-primary focus:outline-none transition-all cursor-pointer hover:border-primary/50"
                      style={{ minWidth: "100px" }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`${c.iso}-${c.dialCode}`} value={c.iso} className="bg-white dark:bg-slate-900">
                          {c.flag} {c.dialCode}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">▾</span>
                  </div>
                  {/* Number Input */}
                  <Input
                    name="phoneNumber"
                    type="tel"
                    placeholder="9866708665"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className={`bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 focus:border-primary text-foreground rounded-lg h-11 flex-1 ${
                      phoneError ? "border-red-400 dark:border-red-500 focus:border-red-500" : ""
                    }`}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {/* Validation Error */}
                {phoneError && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-start gap-1">
                    <span className="mt-0.5 flex-shrink-0">⚠️</span>
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Country <span className="text-primary">*</span>
                </label>
                <Input
                  name="country"
                  placeholder="e.g., India"
                  value={formData.country}
                  onChange={handleChange}
                  className="bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 focus:border-primary text-foreground rounded-lg h-11"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Interested Service */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Interested Service <span className="text-primary">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-primary/50 focus:border-primary focus:outline-none transition-all rounded-lg px-4 py-2.5 text-foreground cursor-pointer h-11"
                  required
                  disabled={isSubmitting}
                >
                  <option value="" className="bg-white dark:bg-slate-900 text-muted-foreground">Choose a service...</option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} className="bg-white dark:bg-slate-900 text-foreground">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <Textarea
                  name="message"
                  placeholder="Tell us about your background, requirements, and how we can support you..."
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 focus:border-primary text-foreground rounded-lg"
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !emailVerified}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/95 hover:to-primary/85 text-primary-foreground font-bold py-3 text-base rounded-lg shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 h-12 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>⏳ Processing Submission...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Submit Verified Inquiry
                    </>
                  )}
                </Button>
                
                {!emailVerified && (
                  <p className="text-xs text-primary/80 text-center flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-primary" /> Please verify your email address to unlock form submission.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Location Map Section */}
        <div className="mt-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Visit Our Office</h3>
            <p className="text-muted-foreground text-sm">Near Pillar No. 204, beside Ramdev Granites, Attapur, Dargah Pahad, Chintalmet, Upperpally, Hyderabad, Telangana 500048</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.752!2d78.4145344!3d17.3487697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9778f5c462e9:0x1351877bc2795a1a!2sAlman%20Travel%20Services!5e0!3m2!1sen!2sin!4v1684756891234"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Success Confirmation Dialog */}
        <SuccessDialog
          isOpen={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
          fullName={formData.fullName}
          email={formData.email}
        />
      </div>
    </section>
  )
}
