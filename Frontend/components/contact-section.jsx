"use client"

import { useState, useEffect, useRef } from "react"
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
    value: "support@career-lounge.in",
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
    value: "Near Pillar No. 204, Attapur, Hyderabad",
    delay: "0.3s",
  },
]

const SERVICE_OPTIONS = [
  { value: "Study Abroad Consultation", label: "Study Abroad Consultation" },
  { value: "University Admissions", label: "University Admissions" },
  { value: "Visa Assistance", label: "Visa Assistance" },
  { value: "Scholarship Guidance", label: "Scholarship Guidance" },
  { value: "Career Counselling", label: "Career Counselling" },
<<<<<<< HEAD
  { value: "Profile Building", label: "Profile Building" },
  { value: "Application Support", label: "Application Support" },
  { value: "Education Loan Assistance", label: "Education Loan Assistance" },
=======
  { value: "Test Preparation", label: "Test Preparation" },
  { value: "Language Training", label: "Language Training" },
  { value: "Immigration Services", label: "Immigration Services" },
  { value: "Educational Consultancy", label: "Educational Consultancy" },
  { value: "Domestic Education", label: "Domestic Education" },
  { value: "Overseas Education", label: "Overseas Education" },
  { value: "Recruitment Services", label: "Recruitment Services" },
  { value: "Domestic Recruitment", label: "Domestic Recruitment" },
  { value: "Overseas Recruitment", label: "Overseas Recruitment" },
>>>>>>> 923b55307a620e1e98aab32b32e682fe0c5f6709
  { value: "Other", label: "Other" },
]

function SuccessDialog({ isOpen, onClose, fullName, email }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-slate-950 border-indigo-500/40 max-w-md shadow-2xl text-white">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-bounce shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <AlertDialogTitle className="text-2xl text-center font-bold">
            Submission Confirmed!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center mt-4 text-slate-300">
            <span className="block space-y-2">
              <span className="block text-white font-semibold text-base">
                Thank you, ${fullName}!
              </span>
              <span className="block text-slate-300 text-sm">
                Your mobile and email verification completed successfully. We have received your query.
              </span>
              <span className="block text-xs text-indigo-300">
                📧 Confirmation and resources sent to <br /> <span className="font-semibold text-white">${email}</span>
              </span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction
          onClick={onClose}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-6 font-semibold rounded-lg"
        >
          Explore More
        </AlertDialogAction>
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

  // OTP State
  const [emailOtp, setEmailOtp] = useState("")
  const [phoneOtp, setPhoneOtp] = useState("")
  
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [phoneOtpSent, setPhoneOtpSent] = useState(false)
  
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false)
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false)
  
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false)
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false)

  // Cooldowns
  const [emailCooldown, setEmailCooldown] = useState(0)
  const [phoneCooldown, setPhoneCooldown] = useState(0)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const { toast } = useToast()

  // Cooldown Timer Effects
  useEffect(() => {
    let emailTimer;
    if (emailCooldown > 0) {
      emailTimer = setTimeout(() => setEmailCooldown(emailCooldown - 1), 1000);
    }
    return () => clearTimeout(emailTimer);
  }, [emailCooldown]);

  useEffect(() => {
    let phoneTimer;
    if (phoneCooldown > 0) {
      phoneTimer = setTimeout(() => setPhoneCooldown(phoneCooldown - 1), 1000);
    }
    return () => clearTimeout(phoneTimer);
  }, [phoneCooldown]);

  // Smart Prefilling Logic
  useEffect(() => {
    if (typeof window === "undefined") return;

    let initialMessage = "";
<<<<<<< HEAD
    const university = searchParams.university;
    const course = searchParams.course;
    const jobTitle = searchParams.jobTitle;
=======
    let contextData = {};
    let selectedService = "";
    
    // Get the service parameter from searchParams
    if (searchParams && searchParams.service) {
      selectedService = searchParams.service;
    }
    
    // Check specific parameters that might have been passed
    const university = searchParams?.university;
    const course = searchParams?.course;
    const jobTitle = searchParams?.jobTitle;
    const company = searchParams?.company;
>>>>>>> 923b55307a620e1e98aab32b32e682fe0c5f6709

    if (university) {
      initialMessage = `I am interested in applying to ${university}${course ? ` for the ${course} program` : ""}. Please provide details.`;
    } else if (course) {
      initialMessage = `I am interested in enquiring about the ${course} program.`;
    } else if (jobTitle) {
      initialMessage = `I am interested in applying for the ${jobTitle} position.`;
    }

    setFormData(prev => ({
      ...prev,
<<<<<<< HEAD
      service: searchParams.service || "",
      message: prev.message || initialMessage
=======
      serviceType: selectedService,
      message: prev.message || initialMessage,
      sourceUrl: window.location.href,
      sourcePage: searchParams.sourcePage || document.title,
      referrer: document.referrer,
      contextData: contextData
>>>>>>> 923b55307a620e1e98aab32b32e682fe0c5f6709
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
    if (!validateBaseFields()) return;
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
        title: "OTP Sent",
        description: "6-digit code sent to your email address.",
        className: "bg-green-50 text-green-950 border-green-200"
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

  const handleSendPhoneOtp = async () => {
    if (!validateBaseFields()) return;
    setIsSendingPhoneOtp(true);

    try {
      const response = await fetch("/api/contact/send-phone-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send SMS code");

      setPhoneOtpSent(true);
      setPhoneCooldown(60); // 60s cooldown for resend
      toast({
        title: "OTP Sent",
        description: "6-digit code sent to your mobile number.",
        className: "bg-green-50 text-green-950 border-green-200"
      });
    } catch (error) {
      toast({
        title: "Send Failed",
        description: error.message || "Could not send SMS code. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsSendingPhoneOtp(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (!phoneOtp || phoneOtp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }
    setIsVerifyingPhoneOtp(true);

    try {
      const response = await fetch("/api/contact/verify-phone-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, otp: phoneOtp })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Incorrect OTP code");

      setPhoneVerified(true);
      toast({
        title: "Mobile Verified",
        description: "Your mobile number has been successfully verified.",
        className: "bg-green-50 text-green-950 border-green-200"
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify mobile OTP.",
        variant: "destructive"
      });
    } finally {
      setIsVerifyingPhoneOtp(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!emailVerified || !phoneVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify both email and mobile numbers before submitting.",
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
      setPhoneOtp("")
      setEmailOtpSent(false)
      setPhoneOtpSent(false)
      setEmailVerified(false)
      setPhoneVerified(false)
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
  }

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-slate-950">
      {/* Visual background enhancements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-30">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-indigo-400 font-medium tracking-wide uppercase text-sm mb-4">Get in Touch</p>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Let&apos;s <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about studies abroad or career pathways? Verify your credentials and reach our advisors instantly.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16 items-start">
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            {CONTACT_INFO.map((info) => (
              <div key={info.title} className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl flex gap-4 items-center group hover:border-indigo-500/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
                  <info.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">{info.title}</h4>
                  <p className="text-white font-medium mt-1 text-sm">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Form Card */}
          <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800/80 rounded-2xl p-8 lg:p-10 shadow-2xl relative">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-indigo-300 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> SECURE FORM
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Full Name <span className="text-indigo-400">*</span>
                </label>
                <Input
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-slate-950/60 border-slate-800 focus:border-indigo-500 text-white rounded-lg h-11"
                  required
                  disabled={emailVerified || phoneVerified || emailOtpSent || phoneOtpSent}
                />
              </div>

              {/* Email Address & Verification */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300">
                  Email Address <span className="text-indigo-400">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-slate-950/60 border-slate-800 focus:border-indigo-500 text-white rounded-lg h-11 flex-1"
                    required
                    disabled={emailVerified || emailOtpSent}
                  />
                  {!emailVerified && (
                    <Button
                      type="button"
                      onClick={handleSendEmailOtp}
                      disabled={isSendingEmailOtp || emailCooldown > 0 || !formData.email || emailVerified}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white h-11 font-semibold px-4 rounded-lg min-w-[130px] disabled:opacity-50"
                    >
                      {isSendingEmailOtp ? "Sending..." : emailCooldown > 0 ? `Resend (${emailCooldown}s)` : "Send OTP"}
                    </Button>
                  )}
                  {emailVerified && (
                    <div className="flex items-center gap-1.5 px-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Verified
                    </div>
                  )}
                </div>

                {/* Email OTP Verification Input */}
                {emailOtpSent && !emailVerified && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex gap-2 items-center animate-fadeIn">
                    <Input
                      placeholder="Enter 6-digit Email OTP"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value.slice(0, 6))}
                      className="bg-slate-900 border-slate-700 text-white text-center font-bold tracking-widest text-lg h-11 flex-1"
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

              {/* Mobile Number & Verification */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-300">
                  Mobile Number <span className="text-indigo-400">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    name="phone"
                    placeholder="+91 9866708665"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-slate-950/60 border-slate-800 focus:border-indigo-500 text-white rounded-lg h-11 flex-1"
                    required
                    disabled={phoneVerified || phoneOtpSent}
                  />
                  {!phoneVerified && (
                    <Button
                      type="button"
                      onClick={handleSendPhoneOtp}
                      disabled={isSendingPhoneOtp || phoneCooldown > 0 || !formData.phone || phoneVerified}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white h-11 font-semibold px-4 rounded-lg min-w-[130px] disabled:opacity-50"
                    >
                      {isSendingPhoneOtp ? "Sending..." : phoneCooldown > 0 ? `Resend (${phoneCooldown}s)` : "Send OTP"}
                    </Button>
                  )}
                  {phoneVerified && (
                    <div className="flex items-center gap-1.5 px-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Verified
                    </div>
                  )}
                </div>

                {/* Mobile OTP Verification Input */}
                {phoneOtpSent && !phoneVerified && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex gap-2 items-center animate-fadeIn">
                    <Input
                      placeholder="Enter 6-digit Mobile OTP"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value.slice(0, 6))}
                      className="bg-slate-900 border-slate-700 text-white text-center font-bold tracking-widest text-lg h-11 flex-1"
                      maxLength={6}
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyPhoneOtp}
                      disabled={isVerifyingPhoneOtp || phoneOtp.length !== 6}
                      className="bg-green-600 hover:bg-green-700 text-white h-11 font-semibold px-5 rounded-lg"
                    >
                      {isVerifyingPhoneOtp ? "Verifying..." : "Verify"}
                    </Button>
                  </div>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Country <span className="text-indigo-400">*</span>
                </label>
                <Input
                  name="country"
                  placeholder="e.g., India"
                  value={formData.country}
                  onChange={handleChange}
                  className="bg-slate-950/60 border-slate-800 focus:border-indigo-500 text-white rounded-lg h-11"
                  required
                  disabled={emailVerified || phoneVerified || emailOtpSent || phoneOtpSent}
                />
              </div>

              {/* Interested Service */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Interested Service <span className="text-indigo-400">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all rounded-lg px-4 py-2.5 text-white cursor-pointer h-11"
                  required
                  disabled={emailVerified || phoneVerified || emailOtpSent || phoneOtpSent}
                >
                  <option value="" className="bg-slate-900 text-slate-500">Choose a service...</option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Message <span className="text-indigo-400">*</span>
                </label>
                <Textarea
                  name="message"
                  placeholder="Tell us about your background, requirements, and how we can support you..."
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-slate-950/60 border-slate-800 focus:border-indigo-500 text-white rounded-lg"
                  rows={5}
                  required
                  disabled={emailVerified || phoneVerified || emailOtpSent || phoneOtpSent}
                />
              </div>

              {/* Submit Button */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !emailVerified || !phoneVerified}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 text-base rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 h-12 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>⏳ Processing Submission...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Submit Verified Inquiry
                    </>
                  )}
                </Button>
                
                {(!emailVerified || !phoneVerified) && (
                  <p className="text-xs text-indigo-300/80 text-center flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" /> Form submission is locked until both email and mobile numbers are OTP verified.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Location Map Section */}
        <div className="mt-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Visit Our Office</h3>
            <p className="text-slate-400 text-sm">Near Pillar No. 204, beside Ramdev Granites, Attapur, Dargah Pahad, Chintalmet, Upperpally, Hyderabad, Telangana 500048</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl h-64">
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
