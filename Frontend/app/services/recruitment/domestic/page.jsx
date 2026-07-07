"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Home, CheckCircle, ArrowRight, Briefcase, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { JobCard } from "@/components/job-card"

export default function DomesticRecruitmentPage() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/jobs?category=Domestic", {
          headers: { "Cache-Control": "no-cache" },
        })
        if (!response.ok) throw new Error("Failed to fetch jobs")
        const result = await response.json()
        const data = (result.data || []).filter(j => (j.category || "Domestic") === "Domestic")
        setJobs(data)
      } catch (err) {
        console.error("Error fetching domestic jobs:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/50 via-black/30 to-white dark:from-emerald-900/60 dark:via-black/50 dark:to-background z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center" style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}>
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Home className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-400" />
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-300 mb-2 sm:mb-3">Recruitment Services</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6">
              Domestic <span className="text-emerald-400">Recruitment</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 px-2 sm:px-0">
              Connecting local talent with the right opportunities across the UAE and the region.
            </p>
            <Link href={`/contact?service=${encodeURIComponent("Domestic Recruitment")}`}>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-bold w-full sm:w-auto">
                Get Placed Today <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Local Talent, Local Opportunities</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4">
                Our domestic recruitment service focuses on placing qualified candidates in roles within the UAE and surrounding region. We have deep industry networks across healthcare, hospitality, finance, technology, and more.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                Whether you&apos;re a fresh graduate or a seasoned professional, we match your skills with employer requirements for the best fit.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 sm:p-8" style={{ animation: "slideInRight 0.6s ease-out 0.3s both" }}>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">What We Offer</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Job placement in UAE and GCC markets",
                  "Professional resume writing and review",
                  "Pre-interview coaching sessions",
                  "Salary benchmarking guidance",
                  "Direct employer introductions",
                  "Post-placement follow-up support",
                ].map((benefit, idx) => (
                  <div key={benefit} className="flex items-start gap-3" style={{ animation: `fadeInUp 0.6s ease-out ${0.4 + idx * 0.05}s both` }}>
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-1" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 lg:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Healthcare & Allied Health", desc: "Nurses, doctors, allied health workers for hospitals and clinics." },
              { title: "Hospitality & Tourism", desc: "Hotels, restaurants, event management across UAE." },
              { title: "Finance & Banking", desc: "Accountants, analysts, compliance officers." },
              { title: "Technology & IT", desc: "Developers, project managers, IT support roles." },
              { title: "Education", desc: "Teachers, trainers, academic administrators." },
              { title: "Administration & Sales", desc: "Coordinators, executives, business development roles." },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg group"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + idx * 0.1}s both` }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domestic Job Listings */}
      <section className="py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">Open Positions</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Domestic Job Opportunities</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Current domestic openings across the UAE and GCC region
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden bg-card p-5 sm:p-6 space-y-4">
                  <Skeleton className="h-14 w-14 rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No domestic jobs posted yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-8 sm:mb-10">
                {jobs.slice(0, 6).map((job, index) => (
                  <div key={job._id || job.slug} style={{ animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.1}s both` }} className="h-full">
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Link href="/jobs">
                  <Button variant="outline" size="lg" className="gap-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400">
                    View All Jobs <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-24 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Speak with our recruitment specialists and find the right domestic opportunity for you.
          </p>
          <Link href={`/contact?service=${encodeURIComponent("Domestic Recruitment")}`}>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
