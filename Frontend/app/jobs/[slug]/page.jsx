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
    mobile: "",
    message: ""
  });

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

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Job Details */}
            <div className="lg:col-span-2 space-y-8">
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
            <div className="space-y-8">
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
              <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-slate-100 dark:border-border p-6 sm:p-8">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-50 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 dark:border-green-900/30">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-foreground mb-2">Application Received!</h4>
                    <p className="text-sm text-slate-500 dark:text-muted-foreground mb-6">
                      Thank you for applying. Our recruitment specialist will review your profile and contact you shortly.
                    </p>
                    <Button 
                      onClick={() => setFormSubmitted(false)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-foreground mb-1">Apply for this Job</h3>
                    <p className="text-xs text-slate-500 dark:text-muted-foreground mb-6">
                      Provide your details below to submit your application.
                    </p>

                    {formError && (
                      <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-lg flex items-center gap-2 mb-4 border border-red-100 dark:border-red-900/30">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600 dark:text-muted-foreground">First Name *</label>
                          <Input
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className="bg-gray-50 border-slate-200 dark:bg-background rounded-lg text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600 dark:text-muted-foreground">Last Name *</label>
                          <Input
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            className="bg-gray-50 border-slate-200 dark:bg-background rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-muted-foreground">Email Address *</label>
                        <Input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="johndoe@example.com"
                          className="bg-gray-50 border-slate-200 dark:bg-background rounded-lg text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-muted-foreground">Mobile Number</label>
                        <Input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="+971 50 123 4567"
                          className="bg-gray-50 border-slate-200 dark:bg-background rounded-lg text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-muted-foreground">Cover Letter / Message *</label>
                        <Textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Introduce yourself and explain why you're a good fit for this role..."
                          className="bg-gray-50 border-slate-200 dark:bg-background rounded-lg text-sm min-h-[120px] resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmittingForm}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none"
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
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
