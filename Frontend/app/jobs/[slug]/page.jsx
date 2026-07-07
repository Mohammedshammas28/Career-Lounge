"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  Calendar,
  Send,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { countryCodes } from "@/lib/country-codes";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+971",
    mobile: "",
    message: ""
  });

  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [emailCooldown, setEmailCooldown] = useState(0);

  useEffect(() => {
    let emailTimer;
    if (emailCooldown > 0) {
      emailTimer = setTimeout(() => setEmailCooldown(emailCooldown - 1), 1000);
    }
    return () => clearTimeout(emailTimer);
  }, [emailCooldown]);

  const handleSendEmailOtp = async () => {
    if (!formData.email || !formData.email.trim()) {
      setFormError("Please enter your email address first.");
      return;
    }
    setIsSendingEmailOtp(true);
    setFormError("");

    try {
      const response = await fetch("/api/contact/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();
      if (!response.ok) {
        setFormError(data.error || "Failed to send code");
        return;
      }

      setEmailOtpSent(true);
      setEmailCooldown(60);
    } catch (err) {
      setFormError(err.message || "Could not send OTP. Try again.");
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailOtp || emailOtp.length !== 6) {
      setFormError("Please enter a 6-digit verification code.");
      return;
    }
    setIsVerifyingEmailOtp(true);
    setFormError("");

    try {
      const response = await fetch("/api/contact/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: emailOtp })
      });

      const data = await response.json();
      if (!response.ok) {
        setFormError(data.error || "Incorrect OTP code");
        return;
      }

      setEmailVerified(true);
    } catch (err) {
      setFormError(err.message || "Failed to verify. Please check the code.");
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };

  useEffect(() => {
    if (params.slug) {
      const fetchJobDetails = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/jobs/${params.slug}`);
          const result = await response.json();

          if (result.success) {
            setJob(result.data);
          } else {
            setError("Job opportunity not found");
          }
        } catch (err) {
          console.error("Error fetching job details:", err);
          setError("Error loading job details");
        } finally {
          setIsLoading(false);
        }
      };

      fetchJobDetails();
    }
  }, [params.slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified) {
      setFormError("Please verify your email address first.");
      return;
    }
    setFormError("");
    setIsSubmittingForm(true);

    try {
      // Validate fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
        setFormError("Please fill in all required fields.");
        setIsSubmittingForm(false);
        return;
      }

      const emailContent = `
Job Title: ${job.title}
Company: ${job.company}
Candidate Name: ${formData.firstName} ${formData.lastName}
Candidate Email: ${formData.email}
Candidate Mobile: ${formData.mobile || "Not provided"}

Cover Letter/Message:
${formData.message}
      `;

      const combinedPhone = `${formData.countryCode || "+971"} ${formData.mobile}`;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: combinedPhone,
          serviceType: `Job Application: ${job.title} at ${job.company}`,
          message: emailContent
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "+971",
          mobile: "",
          message: ""
        });
      } else {
        setFormError(result.error || "Failed to submit your application. Please try again.");
      }
    } catch (err) {
      console.warn("Application submission error:", err.message);
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmittingForm(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-background">
        <Header />
        <div className="pt-[140px] pb-20 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading job details...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-background">
        <Header />
        <div className="pt-[140px] pb-20 flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center px-6">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-2">Job Not Found</h2>
          <p className="text-gray-600 dark:text-muted-foreground mb-6">
            We couldn't find the job opening you're looking for. It may have expired or been filled.
          </p>
          <Link href="/jobs">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              Back to Jobs
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-background/30">
      <Header />

      <div className="pt-[140px] pb-20">
        {/* Hero Banner Section */}
        <section className="relative bg-[#1a1f35] py-16 text-white overflow-hidden">
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -ml-20 -mb-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to Jobs Link */}
            <Link 
              href="/jobs" 
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8 group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Job Opportunities
            </Link>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              {/* Company Logo container */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center border-4 border-white dark:border-border shrink-0">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="max-h-24 max-w-[80%] object-contain"
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-blue-500" />
                )}
              </div>

              {/* Title and details */}
              <div className="text-center md:text-left flex-1 min-w-0">
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    {job.type}
                  </Badge>
                  {job.experience && (
                    <Badge variant="outline" className="text-white border-white bg-white/10">
                      <Clock className="w-3 h-3 mr-1" /> {job.experience}
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                  {job.title}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-gray-300 text-sm">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {job.location}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-400" />
                      {job.salary}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Job Details */}
            <div className="lg:col-span-7 space-y-8">
              {/* Job Description */}
              <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-border p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                  Job Description
                </h2>
                <div className="text-slate-600 dark:text-muted-foreground leading-relaxed whitespace-pre-line text-base sm:text-lg">
                  {job.description}
                </div>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-border p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-4">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-muted-foreground text-base sm:text-lg">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-border p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    Requirements & Qualifications
                  </h2>
                  <ul className="space-y-4">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-muted-foreground text-base sm:text-lg">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              {/* Job Summary Card */}
              <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-border p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-foreground mb-6">Job Summary</h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Role Type</p>
                      <p className="text-sm text-slate-700 dark:text-muted-foreground font-bold">{job.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Location</p>
                      <p className="text-sm text-slate-700 dark:text-muted-foreground font-bold">{job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Salary Package</p>
                      <p className="text-sm text-slate-700 dark:text-muted-foreground font-bold">{job.salary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Experience Requirement</p>
                      <p className="text-sm text-slate-700 dark:text-muted-foreground font-bold">{job.experience || "Freshers"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">Date Posted</p>
                      <p className="text-sm text-slate-700 dark:text-muted-foreground font-bold">
                        {job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Application Form */}
              <div className="bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden group">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 rounded-full -ml-16 -mb-16 blur-3xl group-hover:scale-110 transition-transform duration-500" />

                <div className="relative z-10">
                  {formSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Application Received!</h4>
                      <p className="text-sm text-blue-100 mb-6">
                        Thank you for applying. Our recruitment specialist will review your profile and contact you shortly.
                      </p>
                      <Button 
                        onClick={() => {
                          setFormSubmitted(false);
                          setEmailVerified(false);
                          setEmailOtpSent(false);
                          setEmailOtp("");
                        }}
                        className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold"
                      >
                        Submit Another Application
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-black mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Apply for this Job</h3>
                      <p className="text-blue-100 text-sm font-medium mb-6">
                        Provide your details below to submit your application.
                      </p>

                      {formError && (
                        <div className="bg-red-500/20 text-red-200 text-xs p-3 rounded-lg flex items-center gap-2 mb-4 border border-red-500/30">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="group/input space-y-1.5">
                            <label className="text-xs font-bold text-blue-100 uppercase tracking-wider block">First Name *</label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="John"
                              className="w-full bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-gray-900 border-2 border-white/20 focus:border-white focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400"
                            />
                          </div>
                          <div className="group/input space-y-1.5">
                            <label className="text-xs font-bold text-blue-100 uppercase tracking-wider block">Last Name *</label>
                            <input
                              type="text"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Doe"
                              className="w-full bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-gray-900 border-2 border-white/20 focus:border-white focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400"
                            />
                          </div>
                        </div>

                        {/* Email Verification Form Portion */}
                        <div className="group/input space-y-1.5">
                          <label className="text-xs font-bold text-blue-100 uppercase tracking-wider block">Email Address *</label>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              name="email"
                              required
                              disabled={emailVerified || emailOtpSent}
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="johndoe@example.com"
                              className="w-full bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-gray-900 border-2 border-white/20 focus:border-white focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400 flex-1"
                            />
                            {!emailVerified && (
                              <button
                                type="button"
                                onClick={handleSendEmailOtp}
                                disabled={isSendingEmailOtp || emailCooldown > 0 || !formData.email || emailVerified}
                                className="bg-white hover:bg-blue-50 text-blue-700 h-11 font-bold px-4 rounded-xl text-xs uppercase tracking-wide min-w-[100px] disabled:opacity-50 transition-all flex items-center justify-center shrink-0 border border-white/20"
                              >
                                {isSendingEmailOtp ? "Sending..." : emailCooldown > 0 ? `Resend (${emailCooldown}s)` : "Send OTP"}
                              </button>
                            )}
                            {emailVerified && (
                              <div className="flex items-center gap-1 px-3 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 rounded-xl text-xs font-bold shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                              </div>
                            )}
                          </div>

                          {emailOtpSent && !emailVerified && (
                            <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex gap-2 items-center animate-fadeIn mt-2">
                              <input
                                placeholder="Enter 6-digit OTP"
                                value={emailOtp}
                                onChange={(e) => setEmailOtp(e.target.value.slice(0, 6))}
                                className="bg-white text-gray-900 border-2 border-white/20 rounded-xl text-center font-bold tracking-widest text-base h-11 flex-1 min-w-0 focus:outline-none focus:border-white"
                                maxLength={6}
                              />
                              <button
                                type="button"
                                onClick={handleVerifyEmailOtp}
                                disabled={isVerifyingEmailOtp || emailOtp.length !== 6}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-11 px-4 rounded-xl text-xs uppercase tracking-wide transition-all shrink-0"
                              >
                                {isVerifyingEmailOtp ? "Verifying..." : "Verify"}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="group/input space-y-1.5">
                          <label className="text-xs font-bold text-blue-100 uppercase tracking-wider block">Mobile Number *</label>
                          <div className="flex gap-2">
                            <div className="flex bg-white/95 backdrop-blur-sm rounded-xl border-2 border-white/20 focus-within:border-white transition-all overflow-hidden">
                              <input
                                type="text"
                                name="countryCode"
                                value={formData.countryCode || "+971"}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFormData(prev => ({ ...prev, countryCode: val }));
                                }}
                                placeholder="+971"
                                className="w-16 bg-transparent text-gray-900 px-2 py-3 text-sm font-semibold focus:outline-none border-r border-gray-200"
                              />
                              <select
                                onChange={(e) => {
                                  const code = e.target.value;
                                  setFormData(prev => ({ ...prev, countryCode: code }));
                                }}
                                value=""
                                className="bg-transparent text-gray-500 w-6 focus:outline-none text-xs font-semibold cursor-pointer px-1 pr-2"
                              >
                                <option value="" disabled>▾</option>
                                {countryCodes.map((c) => (
                                  <option key={`${c.code}-${c.name}`} value={c.code}>
                                    {c.code} ({c.name.split(" ").pop().replace(/[()]/g, "")})
                                  </option>
                                ))}
                              </select>
                            </div>
                            <input
                              type="tel"
                              name="mobile"
                              required
                              value={formData.mobile}
                              onChange={handleInputChange}
                              placeholder="50 123 4567"
                              className="w-full bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-gray-900 border-2 border-white/20 focus:border-white focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400 flex-1"
                            />
                          </div>
                        </div>

                        <div className="group/input space-y-1.5">
                          <label className="text-xs font-bold text-blue-100 uppercase tracking-wider block">Cover Letter / Message *</label>
                          <textarea
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Introduce yourself and explain why you're a good fit for this role..."
                            className="w-full bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-gray-900 border-2 border-white/20 focus:border-white focus:outline-none transition-all text-sm font-medium placeholder:text-gray-400 min-h-[120px] resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingForm || !emailVerified}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2 mt-6 group/btn uppercase tracking-wide text-sm font-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmittingForm ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit Application
                            </>
                          )}
                        </button>

                        <p className="text-center text-xs text-blue-100 mt-4 font-medium">✓ 100% Free | No Hidden Charges | Quick Response</p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
