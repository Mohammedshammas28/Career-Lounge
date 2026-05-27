"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Globe, CheckCircle, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function OverseasEducationPage() {
  const [universities, setUniversities] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const features = [
    {
      title: "University Selection",
      description: "Expert guidance in choosing the perfect university matching your profile and goals",
      icon: Globe
    },
    {
      title: "Application Support",
      description: "Complete assistance with university applications and documentation",
      icon: CheckCircle
    },
    {
      title: "Visa Assistance",
      description: "Expert guidance through the visa application process",
      icon: Plane
    }
  ]

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/universities", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        })

        if (!response.ok) throw new Error("Failed to fetch universities")

        const result = await response.json()
        const data = result.data || result.universities || []
        setUniversities(data)
      } catch (err) {
        console.error("Error fetching universities:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUniversities()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white dark:from-black/60 dark:via-black/50 dark:to-background z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
            <div className="h-16 w-16 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Globe className="h-8 w-8 text-purple-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Overseas <span className="text-purple-400">Education</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Study at world-class universities across the globe
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
              <h2 className="text-3xl font-bold text-foreground mb-6">Global Education Opportunities</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Pursue your academic dreams at prestigious universities worldwide. Our overseas education services are designed to help you secure admissions at top institutions globally.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                From selecting the right university to visa processing and post-arrival assistance, we guide you through every step of your international education journey.
              </p>
              <p className="text-lg text-muted-foreground">
                Our educational consultants have extensive experience with universities across USA, UK, Canada, Australia, and more—ensuring you get the best guidance tailored to your aspirations.
              </p>
            </div>
            <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
              <img
                src="https://images.unsplash.com/photo-1427504494785-cdded0338d6f?w=600&h=400&fit=crop"
                alt="Overseas Education"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete support for your overseas education goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-lg animate-fadeInUp"
                  style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both` }}
                >
                  <Icon className="h-10 w-10 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Countries & Universities - Simple Preview */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Partner Universities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our network of prestigious universities across the globe
            </p>
          </div>

          {/* Universities Grid - Show first 3-4 */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2 pt-4">
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-10 flex-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : universities.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No universities available at the moment</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
                {universities.slice(0, 4).map((uni, index) => (
                  <div
                    key={uni._id || uni.slug}
                    className="bg-white rounded-[1.5rem] p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center group"
                  >
                    {/* University Logo */}
                    <div className="w-full h-32 flex items-center justify-center mb-6">
                      {uni.logo ? (
                        <img
                          src={uni.logo}
                          alt={uni.universityName}
                          className="max-h-24 max-w-[80%] object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                          <Globe className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Divider (Thin) */}
                    <div className="w-full h-px bg-slate-100 mb-6" />

                    {/* Name & Location */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 min-h-[3rem] line-clamp-2 leading-tight">
                      {uni.universityName}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium mb-4 h-10 line-clamp-2">
                      {uni.city && `${uni.city}, `}{uni.country}
                    </p>

                    {/* Website */}
                    <p className="text-[12px] text-slate-500 font-medium mb-8 truncate w-full">
                      {uni.website ? uni.website.replace(/^https?:\/\/(www\.)?/, "") : "No website available"}
                    </p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                      <Link href={`/university/${uni.slug || uni._id}`} className="w-full">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 h-11 text-xs font-bold"
                        >
                          Know More
                        </Button>
                      </Link>
                      <Link href={`/contact?university=${uni.slug || uni._id}`} className="w-full">
                        <Button
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 h-11 text-xs font-bold"
                        >
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Universities Button */}
              <div className="flex justify-center">
                <Link href="/universities">
                  <Button variant="outline" size="lg" className="gap-2">
                    View All Universities
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Support Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "University Shortlisting & Selection",
              "Statement of Purpose (SOP) Writing",
              "Application Document Preparation",
              "English Proficiency Test Guidance (IELTS/TOEFL)",
              "Standardized Test Preparation (GRE/GMAT/SAT)",
              "Interview Preparation",
              "Visa Documentation & Process Guidance",
              "Post-Arrival Accommodation & Settlement"
            ].map((service, index) => (
              <div
                key={index}
                className="flex items-center p-4 rounded-lg bg-background hover:bg-secondary transition-all border border-border hover:border-primary/50"
              >
                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                <span className="text-foreground">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Start Your Global Journey</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with our educational consultants to explore universities worldwide and kickstart your international education journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/services/educational-consultancy/domestic">
              <Button variant="outline" className="px-8 py-6 text-lg">
                Explore Domestic Education
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
