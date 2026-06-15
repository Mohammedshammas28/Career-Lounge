"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Plane, CheckCircle, ArrowRight, Briefcase, Globe, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { JobCard } from "@/components/job-card"

export default function OverseasRecruitmentPage() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/jobs?category=Overseas", {
          headers: { "Cache-Control": "no-cache" },
        })
        if (!response.ok) throw new Error("Failed to fetch jobs")
        const result = await response.json()
        const data = (result.data || []).filter(j => j.category === "Overseas")
        setJobs(data)
      } catch (err) {
        console.error("Error fetching overseas jobs:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const destinations = [
    { country: "United Kingdom", flag: "🇬🇧", roles: "Healthcare, Engineering, IT, Finance" },
    { country: "Canada", flag: "🇨🇦", roles: "Nursing, Teaching, Technology, Trades" },
    { country: "Australia", flag: "🇦🇺", roles: "Allied Health, Engineering, Hospitality" },
    { country: "Germany", flag: "🇩🇪", roles: "Engineering, IT, Manufacturing" },
    { country: "New Zealand", flag: "🇳🇿", roles: "Healthcare, Agriculture, Construction" },
    { country: "Singapore", flag: "🇸🇬", roles: "Finance, Technology, Logistics" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/55 via-black/30 to-white dark:from-violet-900/65 dark:via-black/50 dark:to-background z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center" style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}>
            <div className="h-16 w-16 rounded-xl bg-violet-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Plane className="h-8 w-8 text-violet-300" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-300 mb-3">Recruitment Services</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Overseas <span className="text-violet-400">Recruitment</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Your gateway to international careers — we place top talent with leading employers worldwide.
            </p>
            <Link href={`/contact?service=${encodeURIComponent("Overseas Recruitment")}`}>
              <Button className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-6 text-base font-bold">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}>
              <h2 className="text-3xl font-bold text-foreground mb-6">Work Abroad with Confidence</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Our overseas recruitment service connects skilled professionals with top employers across the UK, Canada, Australia, Europe, and beyond. We handle everything from job matching to visa documentation support.
              </p>
              <p className="text-lg text-muted-foreground">
                With our established international employer network, we ensure you land in a role that truly matches your qualifications, experience, and career goals.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8" style={{ animation: "slideInRight 0.6s ease-out 0.3s both" }}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Overseas Services</h3>
              <div className="space-y-4">
                {[
                  "International job placement across 15+ countries",
                  "Visa & immigration documentation support",
                  "Pre-departure orientation and preparation",
                  "Credential recognition and verification",
                  "Employer direct referral letters",
                  "Relocation guidance and settling-in support",
                  "24/7 post-placement assistance abroad",
                ].map((benefit, idx) => (
                  <div key={benefit} className="flex items-start gap-3" style={{ animation: `fadeInUp 0.6s ease-out ${0.4 + idx * 0.05}s both` }}>
                    <CheckCircle className="h-5 w-5 text-violet-500 flex-shrink-0 mt-1" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 lg:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">Global Reach</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">Where We Place You</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We have active employer partnerships across these key international destinations.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {destinations.map((dest, idx) => (
              <div
                key={dest.country}
                className="bg-background border border-border rounded-2xl p-6 hover:border-violet-400/50 transition-all hover:shadow-lg group flex items-start gap-4"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + idx * 0.1}s both` }}
              >
                <span className="text-4xl">{dest.flag}</span>
                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-violet-600 transition-colors">{dest.country}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{dest.roles}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overseas Job Listings */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">Open Positions</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">Overseas Job Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Current international openings with our partner employers worldwide
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden bg-card p-6 space-y-4">
                  <Skeleton className="h-14 w-14 rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <Globe className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No overseas positions posted yet. New opportunities added regularly — check back soon!</p>
              <Link href={`/contact?service=${encodeURIComponent("Overseas Recruitment")}`} className="inline-block mt-6">
                <Button variant="outline" className="border-violet-300 text-violet-600 hover:bg-violet-50">
                  Register Your Interest
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {jobs.slice(0, 6).map((job, index) => (
                  <div key={job._id || job.slug} style={{ animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.1}s both` }} className="h-full">
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Link href="/jobs">
                  <Button variant="outline" size="lg" className="gap-2 border-violet-300 text-violet-600 hover:bg-violet-50 hover:border-violet-400">
                    View All Jobs <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our streamlined 4-step process makes working overseas straightforward.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Profile Review", desc: "We assess your qualifications, experience, and target countries." },
              { step: "02", title: "Job Matching", desc: "We match you with verified international employers and open roles." },
              { step: "03", title: "Visa & Docs", desc: "Our team helps you with credential authentication and visa applications." },
              { step: "04", title: "Placement", desc: "You land your role abroad with our full pre-departure support." },
            ].map((s, idx) => (
              <div key={s.step} className="text-center" style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + idx * 0.1}s both` }}>
                <div className="w-14 h-14 rounded-2xl bg-violet-600 text-white text-xl font-black flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-200">
                  {s.step}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Work Internationally?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with our overseas recruitment team today and take the first step toward your international career.
          </p>
          <Link href={`/contact?service=${encodeURIComponent("Overseas Recruitment")}`}>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
